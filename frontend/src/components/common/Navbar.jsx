import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Headphones, Menu, X, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Research', path: '/research' },
    { name: 'How it works', path: '/#how-it-works' },
    { name: 'Privacy', path: '/privacy' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.substring(2));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(path.substring(2));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090D12]/90 backdrop-blur-md border-b border-[#26313C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1DB954] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-[#141B24] border border-[#26313C] flex items-center justify-center text-[#1DB954] group-hover:border-[#1DB954]/50 group-hover:bg-[#18212B] transition-all">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-[#F5F7FA] group-hover:text-white transition-colors">
                  Spotify Age Research
                </span>
              </div>
              <span className="hidden sm:block text-xs text-[#6F7A87]">
                Voluntary Academic & Statistical Study
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium transition-colors focus:outline-none focus:text-[#1DB954] ${
                    isActive
                      ? 'text-[#1DB954]'
                      : 'text-[#A7B0BC] hover:text-[#F5F7FA]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/consent"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-semibold text-sm transition-all duration-150 shadow-md hover:shadow-[#1DB954]/20 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 focus:ring-offset-[#090D12]"
            >
              <span>Participate</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#A7B0BC] hover:text-white hover:bg-[#141B24] border border-[#26313C] focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0E141B] border-b border-[#26313C] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="px-2 py-1 text-xs uppercase tracking-wider text-[#6F7A87] font-mono">
            Navigation Menu
          </div>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-[#F5F7FA] hover:bg-[#141B24] hover:text-[#1DB954] border border-transparent hover:border-[#26313C] transition-all"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2">
            <Link
              to="/consent"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-semibold text-base shadow-md"
            >
              <span>Participate in Study</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
