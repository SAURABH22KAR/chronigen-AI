import { Shield, Rocket, Users, BarChart, Code, Headphones, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level AES-256 encryption, SOC 2 Type II & ISO 27001 certified. Your data is always protected.',
    color: 'purple',
    badge: 'SOC 2 Certified',
  },
  {
    icon: Rocket,
    title: 'Rapid Deployment',
    description: 'Go live in days, not months. Our streamlined onboarding gets your AI running fast with zero disruption.',
    color: 'blue',
    badge: 'Live in 48hrs',
  },
  {
    icon: Users,
    title: 'Team-Friendly',
    description: 'Intuitive no-code dashboards designed for everyone — not just developers. Adoption happens naturally.',
    color: 'cyan',
    badge: 'No-Code Ready',
  },
  {
    icon: BarChart,
    title: 'Advanced Analytics',
    description: 'Real-time dashboards with deep insights into performance, ROI, and customer behavior patterns.',
    color: 'green',
    badge: 'Real-Time Data',
  },
  {
    icon: Code,
    title: '100+ Integrations',
    description: 'Native connectors for Salesforce, HubSpot, Slack, Shopify, Zapier, and 95+ more platforms.',
    color: 'orange',
    badge: 'Open API',
  },
  {
    icon: Headphones,
    title: '24/7 Expert Support',
    description: 'Dedicated AI specialists and 24/7 live support. We partner with you for long-term success.',
    color: 'pink',
    badge: 'Always On',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', glow: 'group-hover:border-purple-500/40 group-hover:shadow-purple-500/10' },
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   icon: 'text-blue-400',   glow: 'group-hover:border-blue-500/40 group-hover:shadow-blue-500/10' },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   icon: 'text-cyan-400',   glow: 'group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10' },
  green:  { bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',icon: 'text-emerald-400',glow: 'group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: 'text-orange-400', glow: 'group-hover:border-orange-500/40 group-hover:shadow-orange-500/10' },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/20',   icon: 'text-pink-400',   glow: 'group-hover:border-pink-500/40 group-hover:shadow-pink-500/10' },
};

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, inView } = useInView();
  const c = colorMap[feature.color];

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 80}ms` }}
      className={`group glow-card rounded-2xl p-6 transition-all duration-300 cursor-default ${c.glow} hover:shadow-xl ${
        inView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.bg} border ${c.border}`}>
          <feature.icon size={20} className={c.icon} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${c.bg} ${c.icon} border ${c.border}`}>
          {feature.badge}
        </span>
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

export default function Features() {
  const { ref, inView } = useInView();

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: '#030712' }}>
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-5">
            <CheckCircle size={13} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Why Chronigen</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Built for Enterprise,{' '}
            <span className="gradient-text">Designed to Scale</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to deploy AI at scale — security, speed, and support included.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>

        {/* CTA banner */}
        <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-cyan-600/50">
          <div className="relative bg-[#0a0f1e] rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            <div className="orb w-80 h-80 bg-purple-600/15 -top-24 -right-24" />
            <div className="orb w-64 h-64 bg-blue-600/10 -bottom-16 -left-16" />
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Ready to Transform Your Business?
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join 500+ companies already using Chronigen to automate, scale, and win.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="btn-gradient inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl text-base font-semibold"
                >
                  Schedule Free Consultation
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
