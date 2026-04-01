import { Shield, Rocket, Users, BarChart, Code, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Features() {
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
      description: 'Seamlessly integrate with your existing tools and workflows',
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: 'Dedicated support team ready to help you succeed at every stage',
    },
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Chronigen
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Experience the advantage of working with a trusted AI partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:transform hover:scale-105"
            >
              <div className="bg-blue-600/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join leading companies that trust Chronigen to power their AI initiatives
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
