import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Zap, Brain, Clock, TrendingUp, ArrowRight, Phone, Calendar, Star } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Comprehensive AI solutions designed to elevate your business operations
          </p>
        </div>

        {/* AI Receptionist — Featured */}
        <Link
          to="/services/ai-receptionist"
          className="group block bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/40 rounded-2xl p-8 mb-8 hover:border-green-500/70 transition-all hover:shadow-xl hover:shadow-green-500/10 cursor-pointer"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600/20 p-4 rounded-xl group-hover:bg-green-600/30 transition-colors">
                <Phone className="text-green-400" size={40} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-white">AI Receptionist</h2>
                  <span className="text-xs font-bold bg-green-500/15 text-green-300 border border-green-500/30 px-3 py-1 rounded-full">New — #1 Pick</span>
                </div>
                <p className="text-slate-300">Answers calls, books appointments & qualifies leads 24/7 — live in 48 hours</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
              {['Answers calls 24/7', 'Books appointments', 'Live in 48hrs'].map((f) => (
                <span key={f} className="flex items-center gap-1.5 text-xs text-green-300">
                  <Star size={11} className="fill-green-400 text-green-400" />
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors mt-6">
            <span>See How It Works</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Link
            to="/services/ai-agents"
            className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-600/20 p-4 rounded-xl group-hover:bg-blue-600/30 transition-colors">
                <Bot className="text-blue-400" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white">AI Agents</h2>
            </div>
            <p className="text-slate-300 text-lg mb-6">
              Deploy intelligent autonomous agents that handle complex tasks, make decisions, and learn from interactions to continuously improve performance.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <Zap className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-slate-300">Automated task execution and workflow management</span>
              </li>
              <li className="flex items-start space-x-3">
                <Brain className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-slate-300">Advanced decision-making capabilities</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-slate-300">24/7 operation without human intervention</span>
              </li>
            </ul>
            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
              <span>Learn More</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/services/chatbots"
            className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-600/20 p-4 rounded-xl group-hover:bg-blue-600/30 transition-colors">
                <MessageSquare className="text-blue-400" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white">Chatbots</h2>
            </div>
            <p className="text-slate-300 text-lg mb-6">
              Create engaging conversational experiences with AI-powered chatbots that understand context, intent, and provide human-like interactions.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <MessageSquare className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-slate-300">Natural language understanding and processing</span>
              </li>
              <li className="flex items-start space-x-3">
                <TrendingUp className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-slate-300">Increase customer satisfaction and engagement</span>
              </li>
              <li className="flex items-start space-x-3">
                <Zap className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-slate-300">Instant responses and multi-channel support</span>
              </li>
            </ul>
            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
              <span>Learn More</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-600/10 to-slate-700/10 border border-blue-500/30 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Custom AI Solutions
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-6">
              Every business is unique. We develop bespoke AI solutions tailored to your specific challenges,
              industry requirements, and growth objectives. From concept to deployment, we're with you every step of the way.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Discuss Your Custom Solution
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
