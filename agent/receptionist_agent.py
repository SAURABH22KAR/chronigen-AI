#!/usr/bin/env python3
"""
AI Receptionist Agent — Powered by Chronigen AI
Demo of a fully functional AI receptionist for local businesses.
Run: ANTHROPIC_API_KEY=your_key python receptionist_agent.py
"""

import os
import re
from datetime import datetime
import anthropic

# ─── Business Configuration ───────────────────────────────────────────────────
# Swap this dict to deploy the same agent for any business.

BUSINESS = {
    "name": "Bright Smile Dental Clinic",
    "type": "dental clinic",
    "tagline": "Your smile, our passion",
    "phone": "+91 9604788111",
    "email": "chronigenai@gmail.com",
    "address": "Shop 12, Aurangabad Plaza, Chh Sambhaji Nagar, MH 431001",
    "hours": {
        "Monday–Friday": "9:00 AM – 7:00 PM",
        "Saturday": "9:00 AM – 5:00 PM",
        "Sunday": "Closed (Emergencies: call +91 9604788111)",
    },
    "services": [
        "General Checkup & Cleaning — ₹500",
        "Teeth Whitening (Laser) — ₹3,500",
        "Root Canal Treatment — ₹4,000–₹8,000",
        "Dental Implants — ₹25,000 per implant",
        "Braces & Clear Aligners — ₹40,000–₹80,000",
        "Pediatric Dentistry — ₹400",
        "Emergency Dental Care — Same-day available",
    ],
    "faqs": [
        {"q": "Do you accept walk-ins?",
         "a": "Yes, walk-ins are welcome, but appointments are recommended to avoid waiting."},
        {"q": "Which insurance do you accept?",
         "a": "We accept Star Health, HDFC Ergo, Bajaj Allianz, and most major Indian health insurance plans."},
        {"q": "How long does a checkup take?",
         "a": "A routine checkup and cleaning takes about 45–60 minutes."},
        {"q": "Is teeth whitening painful?",
         "a": "No. Our laser whitening is comfortable; some patients feel mild sensitivity for 24 hours after."},
        {"q": "Do you offer EMI?",
         "a": "Yes — 0% EMI on treatments above ₹10,000 via all major credit cards."},
    ],
    "next_available": "Tomorrow at 10:00 AM",
    "booking_url": "https://brightsmile.in/book",
}

# ─── System Prompt ────────────────────────────────────────────────────────────

def build_system_prompt(biz: dict) -> str:
    hours = "\n".join(f"  • {d}: {t}" for d, t in biz["hours"].items())
    services = "\n".join(f"  • {s}" for s in biz["services"])
    faqs = "\n\n".join(f"  Q: {f['q']}\n  A: {f['a']}" for f in biz["faqs"])

    return f"""You are the AI receptionist for {biz['name']} ({biz['tagline']}).
Your role: help patients book appointments, answer questions, and capture their contact details.

━━ BUSINESS INFO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phone   : {biz['phone']}
Email   : {biz['email']}
Address : {biz['address']}

Hours:
{hours}

Services & Pricing:
{services}

Frequently Asked Questions:
{faqs}

Next Available Slot : {biz['next_available']}
Online Booking      : {biz['booking_url']}

━━ BEHAVIOR RULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Be warm, friendly, and professional. Use the patient's name once you have it.
- Keep replies SHORT — 2–4 sentences unless listing services or prices.
- Always steer the conversation toward booking an appointment.
- To book, collect in order: (1) patient name, (2) phone or email, (3) preferred date/time.
- If you don't know something, say "Let me check with our team — may I take your contact info?"
- Never make up prices, availability, or policies beyond what's listed above.
- End every reply with a helpful question or clear next step.

━━ LEAD CAPTURE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Once you have confirmed the patient's name AND a phone number or email,
append this marker on its own line at the very end of your message:

[LEAD] name=<Full Name> | contact=<phone or email> | service=<what they need>

Example:
[LEAD] name=Priya Sharma | contact=9876543210 | service=Teeth Whitening

Output this marker exactly once, the first time all three fields are confirmed.
Do not output it again in subsequent messages."""


# ─── Helpers ──────────────────────────────────────────────────────────────────

LEAD_RE = re.compile(
    r'\[LEAD\]\s*name=(.+?)\s*\|\s*contact=(.+?)\s*\|\s*service=(.+)',
    re.IGNORECASE,
)

def parse_lead(text: str) -> dict | None:
    m = LEAD_RE.search(text)
    if m:
        return {
            "name": m.group(1).strip(),
            "contact": m.group(2).strip(),
            "service": m.group(3).strip(),
        }
    return None


def clean_reply(text: str) -> str:
    return LEAD_RE.sub("", text).strip()


def print_banner(biz: dict) -> None:
    width = 56
    print("\n" + "═" * width)
    print(f"  🦷  {biz['name']}")
    print(f"  AI Receptionist  ·  Powered by Chronigen AI")
    print("═" * width)
    print("  Type your message to begin.  ('quit' to exit)\n")


def print_lead_card(lead: dict, biz_name: str) -> None:
    width = 56
    ts = datetime.now().strftime("%Y-%m-%d  %H:%M:%S")
    print("\n" + "┌" + "─" * (width - 2) + "┐")
    print(f"│  ✅  LEAD CAPTURED — Chronigen AI Receptionist{' ' * 5}│")
    print("├" + "─" * (width - 2) + "┤")
    print(f"│  Business : {biz_name:<40} │")
    print(f"│  Name     : {lead['name']:<40} │")
    print(f"│  Contact  : {lead['contact']:<40} │")
    print(f"│  Service  : {lead['service']:<40} │")
    print(f"│  Time     : {ts:<40} │")
    print("└" + "─" * (width - 2) + "┘")
    print("  📬  Follow-up queued for the clinic team.\n")


# ─── Agent Loop ───────────────────────────────────────────────────────────────

def run() -> None:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("❌  ANTHROPIC_API_KEY not set.")
        print("    export ANTHROPIC_API_KEY=your_key_here")
        return

    client = anthropic.Anthropic(api_key=api_key)
    system_prompt = build_system_prompt(BUSINESS)

    # The system prompt contains the full business config — it's large and static,
    # so we cache it. Subsequent turns read from cache (~10x cheaper).
    system_blocks = [
        {
            "type": "text",
            "text": system_prompt,
            "cache_control": {"type": "ephemeral"},
        }
    ]

    messages: list[dict] = []
    captured_lead: dict | None = None
    turn_count = 0

    print_banner(BUSINESS)

    # Initial greeting (injected as assistant turn — no API call needed)
    greeting = (
        f"Hello! Welcome to {BUSINESS['name']}. 😊 "
        f"I'm your AI receptionist. How can I help you today?"
    )
    print(f"Receptionist: {greeting}\n")
    messages.append({"role": "assistant", "content": greeting})

    EXIT_WORDS = {"quit", "exit", "bye", "goodbye", "thanks bye", "thank you bye"}

    while True:
        # ── User input ──────────────────────────────────────────────────────
        try:
            raw = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\nReceptionist: Thank you for reaching out. Have a great day! 😊")
            break

        if not raw:
            continue

        if raw.lower() in EXIT_WORDS:
            print(
                "\nReceptionist: Thank you for contacting Bright Smile Dental Clinic! "
                "We look forward to seeing you soon. Have a wonderful day! 😊"
            )
            break

        messages.append({"role": "user", "content": raw})
        turn_count += 1

        # ── API call ────────────────────────────────────────────────────────
        try:
            response = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=400,
                system=system_blocks,
                messages=messages,
            )
        except anthropic.AuthenticationError:
            print("\n❌  Invalid API key. Please check ANTHROPIC_API_KEY.")
            break
        except anthropic.RateLimitError:
            print("\n⚠️   Rate limited — please wait a moment and try again.")
            messages.pop()  # remove the unanswered user turn
            continue
        except anthropic.BadRequestError as e:
            print(f"\n⚠️   Bad request: {e}")
            messages.pop()
            continue
        except anthropic.APIError as e:
            print(f"\n⚠️   API error ({e.status_code}): {e.message}")
            messages.pop()
            continue

        raw_reply = response.content[0].text
        messages.append({"role": "assistant", "content": raw_reply})

        # ── Lead detection ──────────────────────────────────────────────────
        newly_captured = None
        if not captured_lead:
            newly_captured = parse_lead(raw_reply)
            if newly_captured:
                captured_lead = newly_captured

        # ── Display ─────────────────────────────────────────────────────────
        display = clean_reply(raw_reply)
        print(f"\nReceptionist: {display}\n")

        if newly_captured:
            print_lead_card(captured_lead, BUSINESS["name"])
            print("Receptionist: Is there anything else I can help you with? 😊\n")

    # ── Session summary ──────────────────────────────────────────────────────
    print("\n" + "─" * 56)
    print(f"  Session ended  ·  {turn_count} exchange(s)")
    if captured_lead:
        print(f"  ✅ Lead: {captured_lead['name']}  ({captured_lead['contact']})")
    else:
        print("  ℹ️  No lead captured this session.")
    print("─" * 56 + "\n")


if __name__ == "__main__":
    run()
