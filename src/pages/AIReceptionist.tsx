import { Link } from 'react-router-dom';
import { Phone, Calendar, Clock, MessageSquare, Star, CheckCircle, ArrowRight, Zap, Building2, Stethoscope, Scale, Scissors, UtensilsCrossed, Home } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const niches = [
  { icon: Stethoscope, label: 'Medical & Dental Clinics', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', price: '$299/mo' },
  { icon: Scale, label: 'Law Firms', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', price: '$499/mo' },
  { icon: Home, label: 'Real Estate Agents', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', price: '$399/mo' },
  { icon: Scissors, label: 'Salons & Spas', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20', price: '$199/mo' },
  { icon: UtensilsCrossed, label: 'Restaurants', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', price: '$199/mo' },
  { icon: Building2, label: 'Any Local Business', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', price: 'Custom' },
];

const features = [
  {
    icon: Phone,
    title: 'Answers Calls & Messages 24/7',
    desc: 'Never miss a customer again. Your AI receptionist picks up every call, WhatsApp, and SMS — even at 2am.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Calendar,
    title: 'Books Appointments Instantly',
    desc: 'Syncs with your calendar in real-time and books, reschedules, or cancels appointments without any human involvement.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: MessageSquare,
    title: 'Answers FAQs Perfectly',
    desc: 'Trained on your business info — pricing, hours, location, services — so it gives accurate answers every time.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Zap,
    title: 'Qualifies & Captures Leads',
    desc: 'Collects caller name, need, and contact info. Sends you an instant summary so you follow up with hot leads only.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: Clock,
    title: 'Live in 48 Hours',
    desc: 'We handle the entire setup. You provide your business info — we deploy your AI receptionist within 2 business days.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: Star,
    title: 'Human Escalation',
    desc: 'When a customer needs a real person, the AI smoothly hands off the conversation with full context — no frustration.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
];

const steps = [
  { num: '01', title: 'Book a Free Demo', desc: 'We show you a live AI receptionist in action for a business like yours. Takes 15 minutes.' },
  { num: '02', title: 'We Build It for You', desc: 'Send us your business info, FAQs, and calendar link. We do all the setup — zero work for you.' },
  { num: '03', title: 'Go Live in 48hrs', desc: 'Your AI receptionist starts answering calls and messages. You get daily reports on every interaction.' },
];

const testimonials = [
  {
    name: 'Dr. Priya Mehta',
    role: 'Dental Clinic Owner',
    text: 'We were losing 30% of calls to voicemail. The AI receptionist now handles 200+ calls a week — bookings are up 40%.',
    stars: 5,
  },
  {
    name: 'Rajan Sharma',
    role: 'Real Estate Agent',
    text: 'It qualifies my leads at midnight so I wake up with a hot list every morning. Best investment I made this year.',
    stars: 5,
  },
  {
    name: 'Neha Patil',
    role: 'Salon Owner',
    text: 'My customers love that they can book on WhatsApp anytime. No more missed appointments. Worth every rupee.',
    stars: 5,
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`glow-card rounded-2xl p-6 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${feature.bg}`}>
        <feature.icon size={20} className={feature.color} />
      </div>
      <h3 className="text-white font-bold mb-2">{feature.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
    </div>
  );
}

function NicheCard({ niche, index }: { niche: typeof niches[0]; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`border rounded-2xl p-5 flex items-center gap-4 transition-all duration-500 hover:-translate-y-1 ${niche.bg} ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5`}>
        <niche.icon size={20} className={niche.color} />
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold text-sm">{niche.label}</p>
      </div>
      <span className={`text-xs font-bold ${niche.color}`}>{niche.price}</span>
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`glow-card rounded-2xl p-6 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-slate-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
      <div>
        <p className="text-white font-semibold text-sm">{t.name}</p>
        <p className="text-slate-500 text-xs">{t.role}</p>
      </div>
    </div>
  );
}

export default function AIReceptionist() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: stepsRef, inView: stepsInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  return (
    <div className="min-h-screen pt-16" style={{ background: '#030712' }}>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="orb w-96 h-96 bg-purple-600/20 -top-24 right-0 translate-x-1/3" />
        <div className="orb w-72 h-72 bg-blue-600/10 bottom-0 -left-24" />

        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
            <Phone size={13} className="text-green-400" />
            <span className="text-green-300 text-sm font-medium">AI Receptionist — Live in 48 Hours</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Your Business Deserves a{' '}
            <span className="gradient-text">Receptionist That Never Sleeps</span>
          </h1>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            An AI receptionist that answers calls, books appointments, and qualifies leads 24/7 —
            for a fraction of what a human receptionist costs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="btn-gradient flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-xl"
            >
              <Zap size={16} />
              Try Live Demo
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {[
              { val: '48hrs', label: 'Setup Time' },
              { val: '24/7', label: 'Always On' },
              { val: '60%', label: 'Cost vs Human' },
              { val: '0', label: 'Missed Calls' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold gradient-text">{val}</p>
                <p className="text-slate-500 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Everything a Receptionist Does — Automated</h2>
            <p className="text-slate-400">No training. No sick days. No overtime pay.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="pb-24 px-4" style={{ background: '#03070f' }}>
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Built for Your Industry</h2>
            <p className="text-slate-400">Each receptionist is trained specifically for your type of business.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {niches.map((n, i) => <NicheCard key={n.label} niche={n} index={i} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div
          ref={stepsRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Up and Running in 3 Steps</h2>
            <p className="text-slate-400">We handle everything. You just show up to the demo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-2xl btn-gradient flex items-center justify-center text-white font-extrabold text-lg mx-auto mb-5">
                  {step.num}
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute mt-7 ml-full">
                    <ArrowRight size={20} className="text-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-24 px-4" style={{ background: '#03070f' }}>
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Businesses Love Their AI Receptionist</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div
          ref={ctaRef}
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="glow-card rounded-3xl p-12">
            <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center mx-auto mb-6">
              <Phone size={28} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              See It Live in 15 Minutes
            </h2>
            <p className="text-slate-400 mb-8">
              Book a free demo and we'll show you an AI receptionist already trained for your industry. No commitment, no credit card.
            </p>
            <Link
              to="/contact"
              className="btn-gradient inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-xl"
            >
              <Zap size={16} />
              Book Free Demo
              <ArrowRight size={16} />
            </Link>
            <p className="text-slate-600 text-xs mt-5">Setup in 48hrs · Cancel anytime · No contracts</p>
          </div>
        </div>
      </section>
    </div>
  );
}
