import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function getBotResponse(input: string): string {
  const t = input.toLowerCase();

  if (/hello|hi|hey|good (morning|evening|afternoon)|howdy/.test(t))
    return "Hello! 👋 I'm Chrono, your AI assistant from Chronigen. I can help you learn about our AI agents, chatbots, pricing, or how to get started. What would you like to know?";

  if (/what (do you|can you|does chronigen)|your service|what (you|chronigen) offer|tell me about/.test(t))
    return "Chronigen offers three core AI solutions:\n\n🤖 **AI Agents** — Autonomous agents that automate complex tasks 24/7\n💬 **AI Chatbots** — Conversational AI for customer support & sales\n🛠️ **Custom AI Solutions** — Tailored systems built for your business\n\nWhich one interests you most?";

  if (/price|cost|pricing|how much|afford|plan|package|tier/.test(t))
    return "Our pricing is tailored to your scale and needs:\n\n🌱 **Starter** — Perfect for small businesses, affordable entry point\n🚀 **Growth** — For scaling teams, advanced features\n🏢 **Enterprise** — Unlimited scale, dedicated support, SLAs\n\nAll plans include a free consultation. Contact us for a custom quote!";

  if (/ai agent|autonomous|automate|automation|workflow/.test(t))
    return "Our **AI Agents** are autonomous systems that:\n\n✅ Execute multi-step tasks without human intervention\n✅ Make intelligent real-time decisions\n✅ Operate 24/7 with zero downtime\n✅ Integrate with your existing tools\n✅ Learn and improve over time\n\nGreat for data processing, lead generation, order management, and more!";

  if (/chatbot|chat bot|conversation|customer support|nlp/.test(t))
    return "Our **AI Chatbots** feature:\n\n✅ Natural language understanding (GPT-4 powered)\n✅ Multi-channel: web, mobile, WhatsApp, Slack\n✅ 98% customer satisfaction rate\n✅ Instant 24/7 responses\n✅ Seamless handoff to human agents\n✅ Full analytics dashboard\n\nReduce support costs by 60% while improving satisfaction!";

  if (/contact|reach|email|phone|talk to (a )?(human|person|team|someone)|sales/.test(t))
    return "You can reach our team at:\n\n📧 chronigenai@gmail.com\n📞 +91 9604788111\n📍 Chh Sambhaji Nagar, MH, India\n\nOr visit our **Contact page** to send a message. We respond within 24 hours — usually much faster!";

  if (/start|begin|get started|sign up|onboard|demo|trial|pilot/.test(t))
    return "Getting started is easy! 🚀\n\n1. **Free 30-min Consultation** — Tell us your goals\n2. **Solution Design** — We architect your AI system\n3. **Rapid Deployment** — Live within 48 hours\n4. **Ongoing Support** — We're with you 24/7\n\nNo long contracts. See results before you commit. Ready to start?";

  if (/about|company|who are you|who is chronigen|founded|team|history/.test(t))
    return "**Chronigen AI** was founded to make enterprise-grade AI accessible to every business.\n\n🏢 Founded: 2023\n👥 50+ AI specialists\n🌍 500+ clients worldwide\n⭐ 4.9/5 average rating\n🏆 SOC 2 & ISO 27001 certified\n\nWe're on a mission to give every business the power of AI!";

  if (/security|safe|secure|privacy|data|gdpr|compliance|encrypt|soc|iso/.test(t))
    return "Security is our top priority:\n\n🔒 AES-256 encryption at rest & in transit\n✅ SOC 2 Type II certified\n✅ ISO 27001 certified\n🌍 GDPR & CCPA compliant\n🛡️ Zero-trust architecture\n🔐 Data never used for model training\n\nYour data stays yours — always.";

  if (/tech|technology|model|gpt|claude|llm|machine learning|stack/.test(t))
    return "We use the best AI technologies:\n\n🧠 LLMs: GPT-4o, Claude 3, Gemini\n🔗 Frameworks: LangChain, LlamaIndex\n☁️ Cloud: AWS, Google Cloud, Azure\n🐍 Backend: Python, Node.js\n📊 Analytics: Custom dashboards\n\nAll enterprise-grade, all battle-tested!";

  if (/integrat|connect|api|crm|salesforce|hubspot|slack|zapier|shopify/.test(t))
    return "We integrate with 100+ platforms:\n\n📊 CRM: Salesforce, HubSpot, Zoho\n💬 Comms: Slack, Microsoft Teams\n🛒 E-commerce: Shopify, WooCommerce\n📧 Email: Mailchimp, SendGrid\n🔗 Automation: Zapier, Make\n\nDon't see yours? We build custom integrations too!";

  if (/result|roi|return|benefit|outcome|success|save|reduce|increase/.test(t))
    return "Our clients see real results:\n\n📈 **60% reduction** in operational costs\n⚡ **10x faster** task completion\n😊 **98% customer** satisfaction\n🎯 **45% increase** in lead conversion\n💰 **Average 350% ROI** in year one\n\nJoin 500+ businesses transforming with Chronigen!";

  if (/career|job|hiring|work|position|role|join/.test(t))
    return "We're always hiring talented people! 🌟\n\nCurrent openings:\n👨‍💻 Senior AI/ML Engineer\n💻 Full-Stack Developer\n📊 Data Scientist\n🎯 Solutions Architect\n\nVisit our **Careers page** for all openings. We offer great salaries, full remote, and amazing culture!";

  return "Great question! I'd love to help. Could you be a bit more specific?\n\nI can answer questions about:\n• 🤖 Our AI services\n• 💰 Pricing & plans\n• 🚀 Getting started\n• 🔒 Security & compliance\n• 🏢 Our company\n• 🤝 Integrations\n\nOr feel free to **contact our team** directly for a personalized conversation!";
}

const QUICK_REPLIES = [
  'What services do you offer?',
  'How much does it cost?',
  'How do I get started?',
  'Tell me about AI Agents',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm **Chrono** 🤖, your AI assistant. Ask me anything about Chronigen's services, pricing, or how AI can transform your business!",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = (text?: string) => {
    const msgText = (text ?? input).trim();
    if (!msgText) return;

    setMessages((prev) => [...prev, { id: Date.now(), text: msgText, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: getBotResponse(msgText), sender: 'bot' },
        ]);
        setIsTyping(false);
      },
      700 + Math.random() * 800
    );
  };

  const reset = () => {
    setMessages([{ id: 1, text: "Hi! I'm **Chrono** 🤖 — how can I help you today?", sender: 'bot' }]);
  };

  const renderText = (text: string) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-4 w-[22rem] sm:w-[26rem] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 animate-fade-in-up"
          style={{ height: '520px', background: '#0a0f1e' }}>
          {/* Header */}
          <div className="btn-gradient px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Chrono AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/70 text-xs">Online · Powered by AI</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={reset} className="text-white/60 hover:text-white transition-colors" title="Reset chat">
                <RotateCcw size={14} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.sender === 'bot'
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                      : 'bg-slate-700'
                  }`}
                >
                  {msg.sender === 'bot' ? (
                    <Bot size={13} className="text-white" />
                  ) : (
                    <User size={13} className="text-slate-300" />
                  )}
                </div>
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'bot'
                      ? 'bg-white/5 border border-white/7 text-slate-200 rounded-tl-none'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none'
                  }`}
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}

            {/* Quick replies (only after first message) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {QUICK_REPLIES.map((r) => (
                  <button
                    key={r}
                    onClick={() => sendMessage(r)}
                    className="text-xs px-3 py-1.5 rounded-full border border-purple-500/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-150"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="bg-white/5 border border-white/7 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                  {[0, 150, 300].map((d) => (
                    <div
                      key={d}
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/5 flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity flex-shrink-0"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="relative w-14 h-14 rounded-full btn-gradient flex items-center justify-center shadow-2xl shadow-purple-900/40 hover:scale-110 transition-all duration-200"
        aria-label="Open chat"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-ping-slow opacity-20" />
        {isOpen ? (
          <X size={22} className="text-white relative z-10" />
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <MessageSquare size={22} className="text-white" />
            <Sparkles size={10} className="text-yellow-300 absolute -top-1 -right-1" />
          </div>
        )}
      </button>
    </div>
  );
}
