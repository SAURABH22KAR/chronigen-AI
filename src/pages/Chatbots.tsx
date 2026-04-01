import { Link } from 'react-router-dom';
import { MessageSquare, Users, Zap, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

export default function ChatbotsPage() {
  const benefits = [
    'Natural language understanding for human-like conversations',
    'Multi-language support to reach global customers',
    'Instant response times reducing customer wait times',
    'Seamless integration across multiple communication channels',
    'Continuous learning from customer interactions',
    'Reduced support costs while improving satisfaction',
  ];

  const features = [
    {
      title: 'Conversational AI',
      description: 'Advanced NLP technology that understands context, intent, and nuance in customer conversations',
    },
    {
      title: 'Multi-Channel Support',
      description: 'Deploy on websites, mobile apps, WhatsApp, Facebook Messenger, and more',
    },
    {
      title: 'Intelligent Routing',
      description: 'Automatically escalate complex issues to human agents when needed',
    },
    {
      title: 'Analytics & Insights',
      description: 'Understand customer sentiment and improve responses through detailed analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <Link to="/services" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
            <ArrowRight size={20} className="mr-2 rotate-180" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                AI Chatbots
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Create engaging conversational experiences that delight customers. Our AI-powered chatbots understand context, respond naturally, and handle complex inquiries while providing a seamless user experience.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
                <button className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold transition-all">
                  View Demo
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-slate-800/20 border border-blue-500/30 rounded-2xl p-12 flex items-center justify-center min-h-80">
              <MessageSquare className="text-blue-400" size={120} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Users className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Customer Engagement</h3>
            <p className="text-slate-400">Provide instant support and build meaningful relationships with customers</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <TrendingUp className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Conversion Boost</h3>
            <p className="text-slate-400">Guide customers through the sales funnel with intelligent recommendations</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Zap className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Instant Responses</h3>
            <p className="text-slate-400">Answer customer questions immediately, 24/7, without human intervention</p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose Our Chatbots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                <p className="text-slate-300 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Transform Your Customer Support</h3>
          <p className="text-blue-100 text-lg mb-8">
            Deploy intelligent chatbots that work for you around the clock
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
