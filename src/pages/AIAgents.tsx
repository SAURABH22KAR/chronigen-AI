import { Link } from 'react-router-dom';
import { Bot, Zap, Brain, Clock, ArrowRight, CheckCircle } from 'lucide-react';

export default function AIAgentsPage() {
  const benefits = [
    'Autonomous task execution without human intervention',
    'Intelligent decision-making powered by advanced algorithms',
    'Real-time learning and continuous improvement',
    'Seamless integration with existing business systems',
    'Cost reduction through process automation',
    'Scalable solutions that grow with your business',
  ];

  const useCases = [
    {
      title: 'Customer Service Automation',
      description: 'Deploy AI agents to handle customer inquiries, troubleshooting, and support tickets 24/7',
    },
    {
      title: 'Data Processing',
      description: 'Automate complex data analysis, transformation, and reporting workflows',
    },
    {
      title: 'Business Operations',
      description: 'Streamline workflows like scheduling, inventory management, and order processing',
    },
    {
      title: 'Lead Generation',
      description: 'Intelligent agents that qualify leads and nurture prospects automatically',
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
                AI Agents
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Deploy intelligent autonomous agents that transform how your business operates. Our AI agents handle complex tasks, make informed decisions, and continuously learn from interactions to deliver exceptional results.
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
              <Bot className="text-blue-400" size={120} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Zap className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Automated Execution</h3>
            <p className="text-slate-400">Handle repetitive tasks automatically, freeing up your team for strategic work</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Brain className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Smart Decision Making</h3>
            <p className="text-slate-400">Advanced algorithms analyze data and make informed decisions in real-time</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Clock className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">24/7 Operation</h3>
            <p className="text-slate-400">Your agents work continuously without breaks or fatigue</p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Key Benefits</h2>
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
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Real-World Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-slate-300 text-lg">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Automate Your Business?</h3>
          <p className="text-blue-100 text-lg mb-8">
            Let our team help you design and deploy the perfect AI agent solution
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
