import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const serviceLinks = [
  { to: '/services/ai-agents', label: 'AI Agents' },
  { to: '/services/chatbots', label: 'Chatbots' },
  { to: '/services', label: 'Custom Solutions' },
];

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@chronigen.ai', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 group w-fit">
              <img src="/Chronigen.png" alt="Chronigen" className="h-8 w-8 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xl font-bold text-white tracking-wide">CHRONIGEN</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering businesses with intelligent AI solutions for a smarter, more efficient future.
            </p>
            <div className="flex gap-2 mt-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-105"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white text-sm transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white text-sm transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Chronigen AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
