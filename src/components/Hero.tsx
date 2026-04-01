import { Bot, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Sparkles className="text-blue-400" size={32} />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              CHRONIGEN
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto">
            Powering the Future with Intelligent AI Solutions
          </p>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Transform your business with cutting-edge AI agents and chatbots that deliver real results
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/50"
            >
              Get Started Today
            </Link>
            <Link
              to="/services"
              className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Learn More
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <Bot className="text-blue-400 mx-auto mb-4" size={48} />
              <h3 className="text-white text-xl font-semibold mb-2">AI Agents</h3>
              <p className="text-slate-400">Autonomous intelligent agents that work 24/7</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <MessageSquare className="text-blue-400 mx-auto mb-4" size={48} />
              <h3 className="text-white text-xl font-semibold mb-2">Chatbots</h3>
              <p className="text-slate-400">Conversational AI for customer engagement</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <Sparkles className="text-blue-400 mx-auto mb-4" size={48} />
              <h3 className="text-white text-xl font-semibold mb-2">Custom Solutions</h3>
              <p className="text-slate-400">Tailored AI systems for your unique needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
