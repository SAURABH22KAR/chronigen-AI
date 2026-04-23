import { Quote, Star, ArrowRight, CheckCircle, Cpu, Globe, Lock, TrendingUp, Zap, Bot, MessageSquare, Layers, Phone, HeartPulse, ShoppingBag, UtensilsCrossed, Truck, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { useInView } from '../hooks/useInView';

/* ─── Animated counter ─── */
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="gradient-text text-5xl md:text-6xl font-extrabold tabular-nums">
      {count}{suffix}
    </span>
  );
}

/* ─── Data ─── */
const clients = [
  'TechCorp', 'RetailMax', 'HealthFirst', 'FinanceHub', 'LogiTech',
  'MediaPro', 'EduBase', 'CloudNine', 'DataSync', 'NexaGroup',
];

const steps = [
  {
    num: '01',
    title: 'Free Consultation',
    desc: 'Tell us your goals and challenges. Our AI experts will assess the best solution for your business.',
    icon: MessageSquare,
    color: 'purple',
  },
  {
    num: '02',
    title: 'Custom Design & Build',
    desc: "We architect and build your AI system — agents, chatbots, or custom models — tailored to your workflow.",
    icon: Cpu,
    color: 'blue',
  },
  {
    num: '03',
    title: 'Deploy & Scale',
    desc: 'Go live in 48 hours. Monitor performance, measure ROI, and scale as your business grows.',
    icon: TrendingUp,
    color: 'cyan',
  },
];

const services = [
  {
    icon: Phone,
    title: 'AI Receptionist',
    desc: 'An AI receptionist that answers calls, books appointments, and qualifies leads 24/7 — for a fraction of human cost.',
    href: '/services/ai-receptionist',
    features: ['Answers calls 24/7', 'Books appointments', 'Qualifies leads', 'Live in 48hrs'],
    color: 'green',
    badge: 'New — #1 Pick',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    desc: 'Autonomous agents that execute complex, multi-step workflows around the clock with zero downtime.',
    href: '/services/ai-agents',
    features: ['Task automation', '24/7 operation', 'Multi-system integration', 'Self-improving'],
    color: 'purple',
    badge: 'Most Popular',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    desc: 'Conversational AI that understands context, handles objections, and drives customer engagement.',
    href: '/services/chatbots',
    features: ['NLP powered', 'Multi-channel', '98% satisfaction', 'Human handoff'],
    color: 'blue',
    badge: 'Best ROI',
  },
];

const stats = [
  { value: 500, suffix: '+', label: 'Businesses Transformed', icon: Globe },
  { value: 99, suffix: '.9%', label: 'Platform Uptime', icon: CheckCircle },
  { value: 350, suffix: '%', label: 'Average ROI', icon: TrendingUp },
  { value: 60, suffix: '%', label: 'Cost Reduction', icon: Zap },
];

const techStack = [
  { name: 'GPT-4o', color: 'text-green-400 border-green-500/20 bg-green-500/8' },
  { name: 'Claude 3', color: 'text-orange-400 border-orange-500/20 bg-orange-500/8' },
  { name: 'Gemini', color: 'text-blue-400 border-blue-500/20 bg-blue-500/8' },
  { name: 'LangChain', color: 'text-purple-400 border-purple-500/20 bg-purple-500/8' },
  { name: 'Python', color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/8' },
  { name: 'AWS', color: 'text-orange-300 border-orange-500/20 bg-orange-500/8' },
  { name: 'Google Cloud', color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/8' },
  { name: 'Azure', color: 'text-blue-300 border-blue-400/20 bg-blue-500/8' },
  { name: 'LlamaIndex', color: 'text-pink-400 border-pink-500/20 bg-pink-500/8' },
  { name: 'FastAPI', color: 'text-teal-400 border-teal-500/20 bg-teal-500/8' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechCorp Inc.',
    content: 'Chronigen transformed our customer support. Response time dropped 80% while satisfaction scores hit an all-time high. The ROI was clear within the first month.',
    stars: 5,
    metric: '80% faster response',
  },
  {
    name: 'Marcus Williams',
    role: 'VP Operations, RetailMax',
    content: "The AI agents handle thousands of transactions daily without a single error. We've scaled our operations 5x without adding headcount. Truly remarkable.",
    stars: 5,
    metric: '5x operational scale',
  },
  {
    name: 'Priya Patel',
    role: 'CEO, HealthFirst',
    content: "Chronigen's chatbot deployment was seamless. Patient engagement tripled, and our staff can now focus on high-value care rather than admin tasks.",
    stars: 5,
    metric: '3x patient engagement',
  },
];

const colorMap: Record<string, { badge: string; icon: string; border: string; bg: string; check: string }> = {
  purple: {
    badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    icon: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    border: 'hover:border-purple-500/40',
    bg: 'hover:bg-purple-500/5',
    check: 'text-purple-400',
  },
  blue: {
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    icon: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    border: 'hover:border-blue-500/40',
    bg: 'hover:bg-blue-500/5',
    check: 'text-blue-400',
  },
  cyan: {
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    border: 'hover:border-cyan-500/40',
    bg: 'hover:bg-cyan-500/5',
    check: 'text-cyan-400',
  },
  green: {
    badge: 'bg-green-500/15 text-green-300 border-green-500/30',
    icon: 'text-green-400 bg-green-500/10 border-green-500/20',
    border: 'hover:border-green-500/40',
    bg: 'hover:bg-green-500/5',
    check: 'text-green-400',
  },
};

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { ref: stepsRef, inView: stepsInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();

  return (
    <div className="min-h-screen" style={{ background: '#030712' }}>
      <Hero />

      {/* ── Trusted By ── */}
      <section className="py-14 overflow-hidden border-y border-white/5" style={{ background: '#030712' }}>
        <p className="text-center text-slate-500 text-xs font-medium uppercase tracking-widest mb-8">
          Trusted by innovative companies worldwide
        </p>
        <div className="relative">
          <div ref={marqueeRef} className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="text-slate-500 font-bold text-sm tracking-widest hover:text-slate-300 transition-colors cursor-default select-none">
                {c.toUpperCase()}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030712] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030712] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-28 relative" style={{ background: '#030712' }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-5">
              <Zap size={13} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">How It Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              From Idea to AI in{' '}
              <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              We make AI adoption effortless. No complexity, no lengthy contracts.
            </p>
          </div>

          <div
            ref={stepsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          >
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-500/40 to-blue-500/40" />

            {steps.map((step, i) => {
              const c = colorMap[step.color];
              return (
                <div
                  key={i}
                  style={{ animationDelay: `${i * 150}ms` }}
                  className={`glow-card rounded-2xl p-7 relative ${c.border} ${c.bg} transition-all duration-500 ${
                    stepsInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
                  }`}
                >
                  <div className={`text-6xl font-extrabold mb-4 opacity-10 ${c.check}`}>{step.num}</div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${c.icon}`}>
                    <step.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Features />

      {/* ── Services ── */}
      <section className="py-28 relative" style={{ background: '#030712' }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
              <Layers size={13} className="text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Our Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              AI Solutions That{' '}
              <span className="gradient-text">Drive Results</span>
            </h2>
          </div>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {services.map((svc, i) => {
              const c = colorMap[svc.color];
              return (
                <div
                  key={i}
                  style={{ animationDelay: `${i * 100}ms` }}
                  className={`glow-card rounded-2xl p-7 flex flex-col ${c.border} ${c.bg} transition-all duration-500 ${
                    servicesInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${c.icon}`}>
                      <svc.icon size={22} />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge}`}>
                      {svc.badge}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{svc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{svc.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-slate-300 text-xs">
                        <CheckCircle size={13} className={c.check} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={svc.href}
                    className="flex items-center gap-2 text-sm font-semibold group"
                    style={{ color: 'inherit' }}
                  >
                    <span className={c.check}>Learn more</span>
                    <ArrowRight size={14} className={`${c.check} group-hover:translate-x-1 transition-transform`} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        ref={statsRef}
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0820 0%, #030712 50%, #0a1628 100%)' }}
      >
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="orb absolute w-96 h-96 bg-purple-600/10 -top-32 -left-32" />
        <div className="orb absolute w-80 h-80 bg-blue-600/8 -bottom-24 -right-24" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
              Numbers That <span className="gradient-text">Speak for Themselves</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glow-card rounded-2xl p-7 text-center flex flex-col items-center">
                <stat.icon size={20} className="text-slate-500 mb-3" />
                {statsInView && <Counter end={stat.value} suffix={stat.suffix} />}
                {!statsInView && (
                  <span className="gradient-text text-5xl md:text-6xl font-extrabold">0</span>
                )}
                <p className="text-slate-400 text-xs mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="py-28 relative" style={{ background: '#030712' }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-5">
              <Building2 size={13} className="text-green-400" />
              <span className="text-green-300 text-sm font-medium">Industries We Serve</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              AI That Works for{' '}
              <span className="gradient-text">Your Industry</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              We build AI solutions tailored to how your industry actually works.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: HeartPulse,
                industry: 'Healthcare & Clinics',
                useCase: 'AI receptionist handles appointment booking, patient queries, and follow-up reminders — 24/7.',
                outcome: '70% fewer missed calls',
                color: 'rose',
              },
              {
                icon: ShoppingBag,
                industry: 'Retail & E-commerce',
                useCase: 'AI chatbot answers product questions, tracks orders, and recovers abandoned carts automatically.',
                outcome: '3× faster response time',
                color: 'blue',
              },
              {
                icon: UtensilsCrossed,
                industry: 'Restaurants & F&B',
                useCase: 'AI agent takes reservations, handles menu queries, and sends order status updates via WhatsApp.',
                outcome: '40% reduction in staff workload',
                color: 'orange',
              },
              {
                icon: Truck,
                industry: 'Logistics & Transport',
                useCase: 'AI bot gives real-time shipment updates, handles delivery queries, and escalates issues instantly.',
                outcome: '80% of queries resolved automatically',
                color: 'cyan',
              },
              {
                icon: Building2,
                industry: 'Real Estate',
                useCase: 'AI agent qualifies leads, answers property queries, and schedules site visits without human intervention.',
                outcome: '5× more qualified leads',
                color: 'purple',
              },
              {
                icon: Cpu,
                industry: 'IT & SaaS Companies',
                useCase: 'AI handles tier-1 support tickets, onboarding questions, and feature FAQs across Slack, email, and chat.',
                outcome: '60% reduction in support costs',
                color: 'green',
              },
            ].map(({ icon: Icon, industry, useCase, outcome, color }) => {
              const colorStyles: Record<string, { badge: string; icon: string; border: string }> = {
                rose:   { badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',     icon: 'text-rose-400 bg-rose-500/10 border-rose-500/20',     border: 'hover:border-rose-500/30' },
                blue:   { badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',     icon: 'text-blue-400 bg-blue-500/10 border-blue-500/20',     border: 'hover:border-blue-500/30' },
                orange: { badge: 'bg-orange-500/10 text-orange-300 border-orange-500/20', icon: 'text-orange-400 bg-orange-500/10 border-orange-500/20', border: 'hover:border-orange-500/30' },
                cyan:   { badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',     icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',     border: 'hover:border-cyan-500/30' },
                purple: { badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20', icon: 'text-purple-400 bg-purple-500/10 border-purple-500/20', border: 'hover:border-purple-500/30' },
                green:  { badge: 'bg-green-500/10 text-green-300 border-green-500/20',  icon: 'text-green-400 bg-green-500/10 border-green-500/20',  border: 'hover:border-green-500/30' },
              };
              const c = colorStyles[color];
              return (
                <div
                  key={industry}
                  className={`glow-card rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${c.border}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${c.icon}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{industry}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{useCase}</p>
                  </div>
                  <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>
                    {outcome}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="btn-gradient inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold"
            >
              Get a Free Industry Demo
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Technology Stack ── */}
      <section className="py-20 relative" style={{ background: '#030712' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-8 font-medium">
            Powered by industry-leading AI technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-28 relative" style={{ background: '#030712' }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-5">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">Customer Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Trusted by Industry <span className="gradient-text">Leaders</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Real results from real businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glow-card rounded-2xl p-7 flex flex-col hover:border-purple-500/30 transition-all duration-300"
              >
                <Quote className="text-purple-500/20 mb-4" size={32} />
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-purple-300 font-semibold mb-4 block">{t.metric}</span>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.content}"</p>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security badges ── */}
      <section className="py-16 border-y border-white/5" style={{ background: '#030712' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-8 font-medium">
            Enterprise security & compliance
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'SOC 2 Type II', icon: Lock },
              { label: 'ISO 27001', icon: Lock },
              { label: 'GDPR Compliant', icon: CheckCircle },
              { label: 'CCPA Compliant', icon: CheckCircle },
              { label: 'AES-256 Encrypted', icon: Lock },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400 text-sm glass px-4 py-2.5 rounded-xl">
                <Icon size={14} className="text-green-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 relative overflow-hidden" style={{ background: '#030712' }}>
        <div className="orb absolute w-[500px] h-[500px] bg-purple-600/10 -top-48 left-1/2 -translate-x-1/2" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
            <Zap size={13} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Start Today — Free</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            The Future of Your
            <br />
            Business Is <span className="gradient-text">AI-Powered</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Join 500+ companies already using Chronigen to automate, scale, and deliver results faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group btn-gradient inline-flex items-center justify-center gap-2 text-white px-10 py-4 rounded-xl text-base font-semibold shadow-xl shadow-purple-900/30"
            >
              Get Started for Free
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-xl text-base font-semibold transition-all"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
