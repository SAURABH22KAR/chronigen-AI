import { Quote, Star } from 'lucide-react';
import Hero from '../components/Hero';
import Features from '../components/Features';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechCorp Inc.',
    content: 'Chronigen transformed our customer support operations. We reduced response time by 80% while improving satisfaction scores significantly.',
    stars: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'VP Operations, RetailMax',
    content: 'The AI agents handle thousands of transactions daily without a single hiccup. ROI was evident within the first quarter of deployment.',
    stars: 5,
  },
  {
    name: 'Priya Patel',
    role: 'CEO, HealthFirst',
    content: "Implementing Chronigen's chatbot was seamless. Our patient engagement increased 3x and our team can now focus on what truly matters.",
    stars: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />

      {/* Testimonials */}
      <section className="py-24 bg-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <span className="text-blue-400 text-sm font-medium">Customer Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how leading companies are transforming their operations with Chronigen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-7 hover:border-slate-600 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
              >
                <Quote className="text-blue-400/30 mb-4" size={32} />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={15} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed text-sm">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
