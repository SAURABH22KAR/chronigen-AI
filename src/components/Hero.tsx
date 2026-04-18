import { Bot, MessageSquare, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-16">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
            <Zap className="text-blue-400" size={14} />
            <span className="text-blue-400 text-sm font-medium">Next-Generation AI Platform</span>
          </div>

          {/* Logo + Title */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <img src="/chronigen-icon.png" alt="Chronigen" className="h-24 w-24 md:h-28 md:w-28 mix-blend-screen drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest leading-none">
              <span className="text-white">CHRON</span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">IGEN</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto font-medium">
            Powering the Future with Intelligent AI Solutions
          </p>

          <p className="text-base md:text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your business with cutting-edge AI agents and chatbots that deliver real, measurable results — faster than ever.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              to="/contact"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105"
            >
              Get Started Today
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:bg-slate-800/50"
            >
              Explore Services
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-20">
            {[
              { value: '500+', label: 'Businesses Served' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '1000+', label: 'AI Models Deployed' },
              { value: '24/7', label: 'Expert Support' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm mt-0.5">{stat.label}</div>
                </div>
                {i < 3 && <div className="hidden sm:block w-px h-10 bg-slate-700/60" />}
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: Bot,
                title: 'AI Agents',
                description: 'Autonomous intelligent agents that work 24/7 to automate complex tasks',
              },
              {
                icon: MessageSquare,
                title: 'Chatbots',
                description: 'Conversational AI that delights customers and drives deeper engagement',
              },
              {
                icon: Sparkles,
                title: 'Custom Solutions',
                description: 'Tailored AI systems built specifically for your unique business needs',
              },
            ].map(({ icon: Icon, title, description }, i) => (
              <div
                key={i}
                className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="bg-blue-600/10 border border-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <Icon className="text-blue-400" size={22} />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
