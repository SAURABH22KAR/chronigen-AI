import { Link } from 'react-router-dom';
import { Sparkles, Users, Target, Award, Zap, Shield, TrendingUp, Building2, Globe, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'AI researcher with 10+ years of experience building intelligent systems',
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Engineering',
      bio: 'Full-stack developer specializing in scalable AI infrastructure',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Client Success',
      bio: 'Customer-focused professional ensuring successful implementations',
    },
    {
      name: 'David Liu',
      role: 'Lead AI Scientist',
      bio: 'PhD in Machine Learning with publications in top-tier conferences',
    },
  ];

  const values = [
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We push the boundaries of what\'s possible with AI technology',
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Your success is our success. We\'re committed to your goals',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver high-quality solutions that exceed expectations',
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'We operate with transparency and ethical practices',
    },
  ];

  const milestones = [
    { year: '2023', title: 'Company Founded', description: 'Chronigen launched with a vision to democratize AI' },
    { year: '2023', title: 'First 100 Clients', description: 'Rapid adoption across healthcare, finance, and retail' },
    { year: '2024', title: 'Series A Funding', description: 'Secured $5M to accelerate product development' },
    { year: '2024', title: 'Global Expansion', description: 'Opened offices in US, EU, and Asia-Pacific regions' },
    { year: '2025', title: '500+ Happy Clients', description: 'Expanded services to 25+ countries worldwide' },
    { year: '2025', title: 'AI Innovation Award', description: 'Recognized as industry leader in enterprise AI solutions' },
  ];

  const expertise = [
    { icon: Zap, title: 'Machine Learning', description: 'Custom ML models and predictive analytics' },
    { icon: Shield, title: 'Enterprise Security', description: 'Secure, compliant AI deployments' },
    { icon: TrendingUp, title: 'Business Analytics', description: 'Data-driven insights and optimization' },
    { icon: Globe, title: 'Global Scale', description: 'Multi-language, multi-region support' },
  ];

  const partnerships = [
    'AWS Partner',
    'Google Cloud Partner',
    'Azure Advanced Specialist',
    'ISO 27001 Certified',
    'SOC 2 Type II Compliant',
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Chronigen
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We're on a mission to make AI accessible and transformative for businesses of all sizes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-slate-300 text-lg mb-4">
              Chronigen was founded in 2023 with a vision to democratize AI technology. We recognized that many businesses struggled to implement AI solutions due to complexity, cost, and lack of expertise.
            </p>
            <p className="text-slate-300 text-lg mb-4">
              Today, we're proud to serve hundreds of companies across various industries, helping them unlock the power of artificial intelligence to drive growth, efficiency, and innovation.
            </p>
            <p className="text-slate-300 text-lg">
              Our commitment remains unchanged: deliver cutting-edge AI solutions that are easy to implement, scalable, and deliver measurable results.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-slate-800/20 border border-blue-500/30 rounded-2xl p-12 h-80 flex items-center justify-center">
            <Sparkles className="text-blue-400" size={100} />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-600/20 p-4 rounded-lg">
                      <Icon className="text-blue-400" size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-slate-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-600/20 p-4 rounded-lg">
                      <Icon className="text-blue-400" size={32} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-slate-400 text-sm">{exp.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Company Milestones</h2>
          <div className="relative">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm text-center">{milestone.year}</span>
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-1 h-12 bg-blue-500/30 mt-4"></div>
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                    <p className="text-slate-400 mt-1">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Partnerships & Certifications</h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {partnerships.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-4">
                  <CheckCircle className="text-blue-400 flex-shrink-0" size={24} />
                  <span className="text-white font-semibold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <Users className="text-white" size={48} />
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-4xl font-bold text-blue-400 mb-2">500+</p>
            <p className="text-xl text-slate-300">Happy Clients</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-4xl font-bold text-blue-400 mb-2">1000+</p>
            <p className="text-xl text-slate-300">Projects Deployed</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-4xl font-bold text-blue-400 mb-2">99.9%</p>
            <p className="text-xl text-slate-300">Uptime Guarantee</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Join Us on Our Journey</h3>
          <p className="text-blue-100 text-lg mb-8">
            Let's build the future of AI together
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
