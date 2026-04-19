import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Send, ArrowRight, Zap, RotateCcw, Stethoscope, Scale, Home, Scissors, UtensilsCrossed, Building2 } from 'lucide-react';

/* ─── Business types ─── */
const BUSINESSES = [
  {
    id: 'clinic',
    label: 'Dental Clinic',
    icon: Stethoscope,
    color: 'text-blue-400',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
    name: 'SmileCare Dental',
    greeting: "Hello! Thanks for calling SmileCare Dental. I'm your AI receptionist. Are you looking to book an appointment, or do you have a question about our services?",
  },
  {
    id: 'salon',
    label: 'Salon & Spa',
    icon: Scissors,
    color: 'text-pink-400',
    border: 'border-pink-500/40',
    bg: 'bg-pink-500/10',
    name: 'Luxe Hair Studio',
    greeting: "Hi there! Welcome to Luxe Hair Studio. I'm your AI receptionist. Would you like to book a service, check our prices, or find out about availability?",
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    icon: UtensilsCrossed,
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    name: 'The Grand Table',
    greeting: "Welcome to The Grand Table! I'm your AI assistant. I can help you make a reservation, check our menu, or answer any questions. How can I help?",
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    icon: Home,
    color: 'text-cyan-400',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-500/10',
    name: 'Horizon Properties',
    greeting: "Hi! You've reached Horizon Properties. I'm the AI assistant. Are you looking to buy, sell, or rent a property? I can also schedule a call with one of our agents.",
  },
  {
    id: 'law',
    label: 'Law Firm',
    icon: Scale,
    color: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/10',
    name: 'Sharma & Associates',
    greeting: "Good day! You've reached Sharma & Associates. I'm the AI receptionist. I can help schedule a consultation or provide information about our practice areas. How may I assist you?",
  },
  {
    id: 'generic',
    label: 'Other Business',
    icon: Building2,
    color: 'text-green-400',
    border: 'border-green-500/40',
    bg: 'bg-green-500/10',
    name: 'Chronigen Demo Co.',
    greeting: "Hello! Thank you for reaching out. I'm your AI receptionist. I'm here to help you 24/7. What can I assist you with today?",
  },
];

/* ─── Response engine ─── */
type Stage = 'greeting' | 'collecting_date' | 'collecting_name' | 'collecting_phone' | 'confirmed' | 'faq';

function getReply(input: string, businessId: string, stage: Stage): { text: string; nextStage: Stage } {
  const t = input.toLowerCase();

  // Appointment flow
  if (stage === 'collecting_date') {
    return {
      text: `Perfect! I have that noted. And what's your full name so I can confirm the booking?`,
      nextStage: 'collecting_name',
    };
  }
  if (stage === 'collecting_name') {
    const name = input.trim().split(' ')[0];
    return {
      text: `Great, ${name}! Last step — what's the best phone number to reach you?`,
      nextStage: 'collecting_phone',
    };
  }
  if (stage === 'collecting_phone') {
    return {
      text: `✅ Booking confirmed! You'll receive a confirmation message shortly. Our team will also send a reminder 24 hours before. Is there anything else I can help you with?`,
      nextStage: 'confirmed',
    };
  }

  // Book / appointment intent
  if (/book|appoint|schedul|reserv|slot|availab|visit|meet|consult/.test(t)) {
    const prompts: Record<string, string> = {
      clinic: "I'd love to book that for you! We have slots available Monday–Saturday, 9am–6pm. What date and time works best for you?",
      salon: "Absolutely! We're open Tuesday–Sunday, 10am–7pm. Which service are you interested in — haircut, color, treatment, or a full package?",
      restaurant: "Happy to make a reservation! We're open daily 12pm–10pm. How many guests, and what date/time would you prefer?",
      realestate: "Of course! Our agents are available for viewings 7 days a week. Which property are you interested in, and when would you like to visit?",
      law: "I can schedule a consultation for you. Our attorneys are available Monday–Friday, 10am–5pm. What area of law is your matter related to?",
      generic: "I'd be happy to schedule that! What date and time works best for you?",
    };
    return { text: prompts[businessId] ?? prompts.generic, nextStage: 'collecting_date' };
  }

  // Pricing / cost
  if (/price|cost|fee|charge|rate|how much|pricing/.test(t)) {
    const prices: Record<string, string> = {
      clinic: "Our services start from ₹500 for a basic check-up and cleaning. Fillings from ₹800, root canals from ₹3,500, and teeth whitening from ₹2,500. Would you like to book a check-up?",
      salon: "Our haircuts start from ₹300, color from ₹800, and full spa packages from ₹2,000. We also offer seasonal packages with up to 30% off! Want to book a slot?",
      restaurant: "Our lunch menu starts from ₹350 per person and dinner from ₹600. We also offer a special tasting menu for ₹1,200. Would you like to make a reservation?",
      realestate: "Our listings range from ₹25L to ₹5Cr depending on location and size. Consultations are completely free. Shall I connect you with an agent?",
      law: "Initial consultations are ₹1,500 for 30 minutes. Our retainer packages start from ₹10,000/month depending on the nature of the case. Would you like to schedule a consultation?",
      generic: "Our pricing depends on your specific requirements. Would you like me to schedule a free consultation to discuss the details?",
    };
    return { text: prices[businessId] ?? prices.generic, nextStage: 'faq' };
  }

  // Hours / location
  if (/hour|open|close|timing|time|when|where|location|address/.test(t)) {
    const info: Record<string, string> = {
      clinic: "SmileCare Dental is open Monday to Saturday, 9am–6pm. We're located at MG Road, Chh Sambhaji Nagar. Emergency dental care is available on call 24/7.",
      salon: "Luxe Hair Studio is open Tuesday to Sunday, 10am–7pm. We're on FC Road, near the main square. Walk-ins welcome but appointments are recommended.",
      restaurant: "The Grand Table is open daily from 12pm–3pm (lunch) and 7pm–10:30pm (dinner). We're at Bund Garden Road. Valet parking available!",
      realestate: "Our Horizon Properties office is open Monday to Saturday, 10am–6pm. We're on Nagar Road. Virtual tours are also available anytime!",
      law: "Sharma & Associates is open Monday to Friday, 10am–5pm. We're on High Court Road. Virtual consultations are also available.",
      generic: "We're open Monday–Saturday, 9am–6pm. Feel free to reach out anytime — I'm available 24/7 to answer questions!",
    };
    return { text: info[businessId] ?? info.generic, nextStage: 'faq' };
  }

  // Cancellation / reschedule
  if (/cancel|reschedul|change|postpone/.test(t)) {
    return {
      text: "No problem at all! You can cancel or reschedule up to 2 hours before your appointment at no charge. Would you like me to reschedule for another time, or shall I process a cancellation?",
      nextStage: 'faq',
    };
  }

  // Thank you / done
  if (/thank|bye|goodbye|that's all|no thanks|nothing else/.test(t)) {
    return {
      text: "You're welcome! Have a wonderful day. Don't hesitate to reach out anytime — I'm here 24/7. 😊",
      nextStage: 'confirmed',
    };
  }

  // Fallback
  const fallbacks = [
    "I'd be happy to help with that! Could you give me a bit more detail so I can assist you better?",
    "Great question! Let me make sure I understand — are you looking to book an appointment, check pricing, or get some information?",
    "I'm here to help! You can ask me about bookings, pricing, hours, or location. What would you like to know?",
  ];
  return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], nextStage: stage };
}

/* ─── Types ─── */
interface Message {
  from: 'agent' | 'user';
  text: string;
  time: string;
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ─── Chat bubble ─── */
function Bubble({ msg }: { msg: Message }) {
  const isAgent = msg.from === 'agent';
  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-3`}>
      <div className={`max-w-[80%] ${isAgent ? 'order-2' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isAgent
              ? 'bg-white/8 border border-white/10 text-slate-200 rounded-tl-sm'
              : 'btn-gradient text-white rounded-tr-sm'
          }`}
        >
          {msg.text}
        </div>
        <p className={`text-xs text-slate-600 mt-1 ${isAgent ? 'text-left' : 'text-right'}`}>{msg.time}</p>
      </div>
    </div>
  );
}

/* ─── Typing indicator ─── */
function Typing() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-white/8 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Quick reply chips ─── */
const QUICK_REPLIES: Record<string, string[]> = {
  clinic: ['Book appointment', 'What are your prices?', 'What are your hours?', 'Emergency dental care'],
  salon: ['Book a haircut', 'Colour pricing', 'Opening hours', 'Do you do bridal packages?'],
  restaurant: ['Make a reservation', 'View the menu', 'Opening hours', 'Private dining available?'],
  realestate: ['Schedule a viewing', 'Properties for sale', 'Rental listings', 'Talk to an agent'],
  law: ['Book consultation', 'Practice areas', 'Office hours', 'Fee structure'],
  generic: ['Book a meeting', 'Pricing info', 'Office hours', 'Talk to someone'],
};

export default function Demo() {
  const [selectedBiz, setSelectedBiz] = useState<typeof BUSINESSES[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [stage, setStage] = useState<Stage>('greeting');
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function startDemo(biz: typeof BUSINESSES[0]) {
    setSelectedBiz(biz);
    setMessages([]);
    setStage('greeting');
    setStarted(true);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages([{ from: 'agent', text: biz.greeting, time: now() }]);
    }, 1200);
  }

  function reset() {
    setSelectedBiz(null);
    setMessages([]);
    setStage('greeting');
    setStarted(false);
    setInput('');
  }

  function sendMessage(text: string) {
    if (!text.trim() || !selectedBiz) return;
    const userMsg: Message = { from: 'user', text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const { text: replyText, nextStage } = getReply(text, selectedBiz.id, stage);
      setStage(nextStage);
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'agent', text: replyText, time: now() }]);
    }, delay);
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#030712' }}>
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="orb w-80 h-80 bg-green-600/15 -top-20 right-0 translate-x-1/3" />
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-5">
            <Phone size={13} className="text-green-400" />
            <span className="text-green-300 text-sm font-medium">Live Demo — No Sign-up Required</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Talk to an{' '}
            <span className="gradient-text">AI Receptionist</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Pick a business type below and see exactly how your AI receptionist would handle real customer conversations.
          </p>
        </div>
      </section>

      <section className="pb-28 px-4">
        <div className="max-w-4xl mx-auto">
          {!started ? (
            /* Business picker */
            <div>
              <p className="text-slate-400 text-center mb-8 text-sm">Choose a business type to start the demo:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {BUSINESSES.map((biz) => (
                  <button
                    key={biz.id}
                    onClick={() => startDemo(biz)}
                    className={`group glow-card rounded-2xl p-6 text-left border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${biz.border}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${biz.bg} ${biz.border}`}>
                      <biz.icon size={20} className={biz.color} />
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{biz.label}</p>
                    <p className={`text-xs font-medium ${biz.color}`}>{biz.name}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat UI */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat window */}
              <div className="lg:col-span-2">
                <div className="glow-card rounded-2xl overflow-hidden">
                  {/* Chat header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-white/3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${selectedBiz!.bg} ${selectedBiz!.border}`}>
                        <selectedBiz!.icon size={18} className={selectedBiz!.color} />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{selectedBiz!.name}</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-green-400 text-xs">AI Receptionist Online</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={reset}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs transition-colors"
                    >
                      <RotateCcw size={13} />
                      Reset
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-5 space-y-1">
                    {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
                    {typing && <Typing />}
                    <div ref={bottomRef} />
                  </div>

                  {/* Quick replies */}
                  {messages.length <= 2 && !typing && (
                    <div className="px-5 pb-3 flex flex-wrap gap-2">
                      {(QUICK_REPLIES[selectedBiz!.id] ?? QUICK_REPLIES.generic).map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-5 pb-5">
                    <form
                      onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                      className="flex gap-3"
                    >
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || typing}
                        className="btn-gradient text-white px-4 py-3 rounded-xl disabled:opacity-40 transition-opacity"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Side panel */}
              <div className="space-y-5">
                <div className="glow-card rounded-2xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-4">Try asking:</h3>
                  <ul className="space-y-2">
                    {[
                      'Book an appointment',
                      'What are your prices?',
                      'What time are you open?',
                      'Can I reschedule?',
                      'Where are you located?',
                    ].map((s) => (
                      <li key={s}>
                        <button
                          onClick={() => sendMessage(s)}
                          className="w-full text-left text-xs text-slate-400 hover:text-purple-300 flex items-center gap-2 transition-colors"
                        >
                          <ArrowRight size={11} className="flex-shrink-0" />
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glow-card rounded-2xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-3">This agent handles:</h3>
                  <ul className="space-y-2">
                    {['Appointment booking', 'Pricing questions', 'Hours & location', 'Cancellations', 'Lead capture', '24/7 availability'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glow-card rounded-2xl p-5 text-center">
                  <p className="text-slate-400 text-xs mb-4">Want this for your business?</p>
                  <Link
                    to="/contact"
                    className="btn-gradient w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl"
                  >
                    <Zap size={13} />
                    Get Mine — Free Demo
                  </Link>
                  <p className="text-slate-600 text-xs mt-3">Live in 48hrs · No contracts</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
