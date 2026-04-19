import { Menu, X, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const navLinks = [
    { to: '/services', label: 'Services' },
    { to: '/demo', label: 'Live Demo' },
    { to: '/chrono', label: 'Chrono AI', highlight: true },
    { to: '/pricing', label: 'Pricing' },
    { to: '/roi-calculator', label: 'ROI Calculator' },
    { to: '/about', label: 'About' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img
                src="/Chronigen.png"
                alt="Chronigen"
                className="h-9 w-9 object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
              />
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md group-hover:bg-purple-500/40 transition-all duration-300" />
            </div>
            <span className="text-lg font-extrabold tracking-widest">
              <span className="text-white">CHRON</span>
              <span className="gradient-text">IGEN</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.highlight ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-1.5 text-sm font-semibold text-cyan-400 border border-cyan-500/30 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-200 mx-1"
                >
                  ✦ {link.label}
                </Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 group ${
                    isActive(link.to) ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                      isActive(link.to)
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="btn-gradient flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
            >
              <Zap size={14} />
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors p-2"
            onClick={() => setIsMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#030712]/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'text-white bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-3 btn-gradient text-white text-sm font-semibold px-4 py-3 rounded-xl text-center"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
