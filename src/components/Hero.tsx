import { ArrowRight, Sparkles, Bot, MessageSquare, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const typingWords = ['AI Agents', 'Smart Chatbots', 'Automation', 'Intelligence'];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = typingWords[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayed(current.slice(0, displayed.length + 1));
          if (displayed.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setDisplayed(current.slice(0, displayed.length - 1));
          if (displayed.length - 1 === 0) {
            setIsDeleting(false);
            setPhraseIndex((p) => (p + 1) % typingWords.length);
          }
        }
      },
      isDeleting ? 45 : 90
    );
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  const stats = [
    { value: '500+', label: 'Businesses Served' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '10x', label: 'Faster Operations' },
    { value: '24/7', label: 'AI Support' },
  ];

  const techTags = ['GPT-4o', 'Claude AI', 'LangChain', 'Python', 'AWS', 'Gemini'];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-gradient pt-16">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-[600px] h-[600px] bg-purple-600/10 -top-64 -right-64 animate-float-slow" />
        <div className="orb w-[500px] h-[500px] bg-blue-600/10 -bottom-48 -left-48 animate-float animation-delay-2000" />
        <div className="orb w-[300px] h-[300px] bg-cyan-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-delayed" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
          <Sparkles size={13} className="text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">Next-Generation AI Platform</span>
          <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full">2025</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6 animate-fade-in animation-delay-200">
          <span className="text-white">Supercharge Your</span>
          <br />
          <span className="text-white">Business With </span>
          <span className="gradient-text typing-cursor">{displayed}</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
          Deploy enterprise-grade AI agents and chatbots that automate workflows,
          delight customers, and drive measurable ROI — live in days, not months.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in animation-delay-600">
          <Link
            to="/contact"
            className="group btn-gradient flex items-center gap-2.5 text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg shadow-purple-900/30"
          >
            Start for Free
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            to="/services"
            className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 backdrop-blur-sm"
          >
            Explore Solutions
          </Link>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-16 animate-fade-in animation-delay-800">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="glass text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full hover:border-purple-500/40 hover:text-purple-300 transition-all duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16 animate-fade-in animation-delay-1000">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glow-card rounded-2xl p-5 flex flex-col items-center"
            >
              <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
              <div className="text-slate-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature mini cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in animation-delay-1200">
          {[
            { icon: Bot, title: 'AI Agents', desc: 'Autonomous 24/7 task automation', color: 'purple' },
            { icon: MessageSquare, title: 'AI Chatbots', desc: 'Intelligent customer conversations', color: 'blue' },
            { icon: Sparkles, title: 'Custom AI', desc: 'Tailored solutions for your needs', color: 'cyan' },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={i}
              className="glow-card rounded-2xl p-5 flex items-start gap-3 text-left"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  color === 'purple'
                    ? 'bg-purple-500/15 border border-purple-500/20'
                    : color === 'blue'
                    ? 'bg-blue-500/15 border border-blue-500/20'
                    : 'bg-cyan-500/15 border border-cyan-500/20'
                }`}
              >
                <Icon
                  size={18}
                  className={
                    color === 'purple'
                      ? 'text-purple-400'
                      : color === 'blue'
                      ? 'text-blue-400'
                      : 'text-cyan-400'
                  }
                />
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-0.5">{title}</div>
                <div className="text-slate-400 text-xs">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce-slow">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
