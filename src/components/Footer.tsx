import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, Zap, MapPin, Phone } from 'lucide-react';

const serviceLinks = [
  { to: '/services/ai-agents', label: 'AI Agents' },
  { to: '/services/chatbots', label: 'AI Chatbots' },
  { to: '/services', label: 'Custom Solutions' },
  { to: '/services', label: 'Enterprise AI' },
];

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/roi-calculator', label: 'ROI Calculator' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:chronigenai@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#03070f' }}>
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* Background orbs */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative">
                <img src="/Chronigen.png" alt="Chronigen" className="h-9 w-9 object-contain relative z-10" />
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md" />
              </div>
              <span className="text-lg font-extrabold tracking-widest">
                <span className="text-white">CHRON</span>
                <span className="gradient-text">IGEN</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Empowering businesses with enterprise-grade AI agents and chatbots that deliver
              measurable results from day one.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Mail size={12} className="text-purple-400" />
                <span>chronigenai@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Phone size={12} className="text-blue-400" />
                <span>+91 9604788111</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <MapPin size={12} className="text-cyan-400" />
                <span>Chh Sambhaji Nagar, MH, India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-purple-300 text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-blue-300 text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter CTA */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Get the latest AI insights and product updates.
            </p>
            <Link
              to="/contact"
              className="btn-gradient flex items-center justify-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl w-full"
            >
              <Zap size={13} />
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Chronigen AI, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
