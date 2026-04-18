import { Shield, Rocket, Users, BarChart, Code, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with industry standards to keep your data safe',
  },
  {
    icon: Rocket,
    title: 'Rapid Deployment',
    description: 'Get up and running quickly with our streamlined implementation process',
  },
  {
    icon: Users,
    title: 'User-Friendly',
    description: 'Intuitive interfaces designed for seamless adoption across your organization',
  },
  {
    icon: BarChart,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights and reporting to track performance and ROI',
  },
  {
    icon: Code,
    title: 'Custom Integration',
    description: 'Seamlessly connect with your existing tools and workflows via our open APIs',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated team of AI specialists ready to help you succeed at every stage',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-blue-400 text-sm font-medium">Why Chronigen</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Built for Enterprise,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Designed for Scale
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Experience the advantage of working with a trusted AI partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="bg-slate-800 border border-slate-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:border-blue-500/40 group-hover:bg-blue-600/10 transition-all duration-200">
                <feature.icon className="text-blue-400" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 md:p-14 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join 500+ leading companies that trust Chronigen to power their AI initiatives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Schedule a Consultation
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
