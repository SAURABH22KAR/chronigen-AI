import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src="/Chronigen.png" alt="Chronigen" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">CHRONIGEN</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/services"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-slate-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/careers"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Careers
            </Link>
            <Link
              to="/"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/services"
              className="block w-full text-left text-slate-300 hover:text-white py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block w-full text-left text-slate-300 hover:text-white py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/careers"
              className="block w-full text-left text-slate-300 hover:text-white py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
            <Link
              to="/"
              className="block w-full text-left text-slate-300 hover:text-white py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/contact"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
