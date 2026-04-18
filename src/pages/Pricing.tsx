import { Link } from 'react-router-dom';
import { Check, Zap, Building2, Rocket, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 499,
    description: 'Perfect for small businesses taking their first step into AI.',
    color: 'blue',
    features: [
      'Up to 3 AI Agents',
      '1 AI Chatbot',
      '10,000 API calls / month',
      '3 integrations (Slack, HubSpot, etc.)',
      'Basic analytics dashboard',
      'Email support (48h response)',
      'Onboarding call included',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    icon: Rocket,
    price: 1499,
    description: 'For scaling teams that need more power and fewer limits.',
    color: 'purple',
    features: [
      'Unlimited AI Agents',
      '3 AI Chatbots (multi-channel)',
      '100,000 API calls / month',
      '25+ integrations',
      'Advanced analytics & ROI reports',
      'Priority support (4h response)',
      'Custom workflows & automations',
      'Dedicated success manager',
      'A/B testing for chatbots',
    ],
    cta: 'Start Growing',
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Building2,
    price: null,
    description: 'Unlimited scale, dedicated support, and custom everything.',
    color: 'cyan',
    features: [
      'Everything in Growth',
      'Unlimited API calls',
      'Unlimited chatbots & agents',
      'Custom AI model fine-tuning',
      'White-label option',
      '100+ integrations + custom',
      '24/7 phone & dedicated Slack',
      'SLA guarantee (99.9% uptime)',
      'On-premise deployment option',
      'Compliance & security audit',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle and we pro-rate any differences.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We offer a free 30-minute consultation and a pilot program for qualified businesses. Contact us to discuss a proof-of-concept before committing.',
  },
  {
    q: 'What counts as an "API call"?',
    a: 'Each message processed by an AI agent or chatbot counts as one API call. Internal logic, routing, and system operations do not count.',
  },
  {
    q: 'Do you offer annual billing discounts?',
    a: 'Yes — pay annually and get 2 months free (equivalent to ~17% off). Contact us to switch to annual billing.',
  },
  {
    q: 'What integrations are included?',
    a: 'Starter includes Slack, HubSpot, and one more of your choice. Growth includes 25+ including Salesforce, Shopify, Zapier, and more. Enterprise gets unlimited custom integrations.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most clients are live within 48 hours. Complex enterprise setups may take 1–2 weeks depending on integrations and custom requirements.',
  },
];

const colorMap: Record<string, { border: string; icon: string; badge: string; glow: string }> = {
  blue:   { border: 'border-blue-500/30',   icon: 'text-blue-400',   badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',   glow: 'hover:border-blue-500/50 hover:shadow-blue-500/10' },
  purple: { border: 'border-purple-500/50', icon: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30', glow: 'hover:border-purple-500/60 hover:shadow-purple-500/15' },
  cyan:   { border: 'border-cyan-500/30',   icon: 'text-cyan-400',   badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',   glow: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10' },
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-medium text-sm hover:bg-white/3 transition-colors"
      >
        {q}
        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40' : 'max-h-0'}`}>
        <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Pricing() {
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: faqRef, inView: faqInView } = useInView();
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="orb w-96 h-96 bg-purple-600/15 top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <div className="orb w-72 h-72 bg-blue-600/10 bottom-0 left-0 -translate-x-1/3 translate-y-1/3" />

        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto px-4 text-center transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
            <Zap size={13} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            One Price,{' '}
            <span className="gradient-text">Infinite Value</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            No hidden fees. No long contracts. Cancel anytime. Start seeing ROI in week one.
          </p>

          {/* Annual toggle */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual((p) => !p)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-white/10'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${annual ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-slate-500'}`}>
              Annual <span className="text-green-400 text-xs font-bold">−17%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const c = colorMap[plan.color];
            const { ref, inView } = useInView();
            const displayPrice = plan.price ? (annual ? Math.round(plan.price * 10 / 12) : plan.price) : null;

            return (
              <div
                key={plan.name}
                ref={ref}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`relative rounded-2xl p-7 border flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${c.border} ${c.glow} ${
                  inView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
                } ${plan.popular ? 'bg-[#0d1424]' : 'bg-white/2'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="btn-gradient text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-white/5 border ${c.border}`}>
                    <plan.icon size={20} className={c.icon} />
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-8">
                  {displayPrice ? (
                    <div className="flex items-end gap-1.5">
                      <span className="text-4xl font-extrabold text-white">${displayPrice.toLocaleString()}</span>
                      <span className="text-slate-500 text-sm mb-1.5">/month{annual ? ' (billed annually)' : ''}</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-extrabold text-white">Custom</div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check size={15} className={`${c.icon} flex-shrink-0 mt-0.5`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'btn-gradient text-white hover:opacity-90'
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="max-w-2xl mx-auto mt-14 text-center">
          <p className="text-slate-500 text-sm mb-4">Trusted by 500+ companies worldwide</p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-600">
            {['SOC 2 Certified', 'ISO 27001', 'GDPR Compliant', 'No lock-in contracts', '99.9% uptime SLA'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={11} className="text-green-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28 px-4" style={{ background: '#03070f' }}>
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div
          ref={faqRef}
          className={`max-w-2xl mx-auto pt-20 transition-all duration-700 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl font-extrabold text-white text-center mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-center mb-10">Everything you need to know before you start.</p>
          <div className="space-y-3">
            {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>

          <div className="mt-14 text-center glow-card rounded-2xl p-10">
            <h3 className="text-2xl font-extrabold text-white mb-3">Still have questions?</h3>
            <p className="text-slate-400 text-sm mb-6">Book a free 30-minute call with our team — no pressure, just answers.</p>
            <Link to="/contact" className="btn-gradient inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold">
              <Zap size={15} />
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
