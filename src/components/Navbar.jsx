import React, { useState, useEffect, useRef } from 'react';
import { Shield, Menu, X, Download, Palette, Zap, Rocket, Check } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Navbar({ data, currentTheme, onSelectTheme, onShowWelcome, onOpenSpace }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const themePickerRef = useRef(null);

  const info = data?.personalInfo || resumeData.personalInfo;
  const brandName = info.brandName || "UMAR PORTFOLIO";
  const brandSubtitle = info.brandSubtitle || "Cybersecurity & AI";

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const themes = [
    { id: 'cyan', name: 'Cyber Cyan', color: 'bg-cyan-400' },
    { id: 'matrix', name: 'Matrix Emerald', color: 'bg-emerald-400' },
    { id: 'purple', name: 'Plasma Purple', color: 'bg-purple-400' },
    { id: 'amber', name: 'Solar Gold', color: 'bg-amber-400' },
  ];

  // Scroll listener for sticky navbar glass styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to dynamically highlight active section in Navbar
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1,
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close theme picker on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themePickerRef.current && !themePickerRef.current.contains(e.target)) {
        setThemePickerOpen(false);
      }
    };
    if (themePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [themePickerOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (themePickerOpen) setThemePickerOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [themePickerOpen, mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav
        aria-label="Main Navigation"
        className={`transition-all duration-300 ${
          scrolled ? 'bg-glass py-3 shadow-2xl shadow-cyan-950/20 border-b border-slate-800/60' : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Branding */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-xl p-1" aria-label={`${brandName} Home`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg text-white tracking-wider font-mono group-hover:text-cyan-400 transition-colors">
                  {brandName}
                </span>
                <span className="text-[10px] text-cyan-400/90 font-mono tracking-widest uppercase">
                  {brandSubtitle}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 font-mono text-xs">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-500/10 font-bold border-b-2 border-cyan-400'
                        : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 font-mono text-xs">

              {/* Space Explorer Simulator Button */}
              <button
                onClick={onOpenSpace}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 hover:shadow-indigo-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                title="Launch 3D Space & Cyber Explorer"
                aria-label="Launch 3D Space and Cyber Explorer"
              >
                <Rocket className="w-4 h-4" />
                <span>3D Cosmos</span>
              </button>

              {/* Welcome Gateway Trigger */}
              <button
                onClick={onShowWelcome}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                title="Open Interactive Cyber Gateway"
                aria-label="Open Interactive Cyber Gateway"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">Gateway</span>
              </button>

              {/* Theme Picker */}
              <div className="relative" ref={themePickerRef}>
                <button
                  onClick={() => setThemePickerOpen(!themePickerOpen)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  title="Change Portfolio Color Theme"
                  aria-label="Change Color Theme"
                  aria-haspopup="true"
                  aria-expanded={themePickerOpen}
                >
                  <Palette className="w-4 h-4" />
                </button>

                {themePickerOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-950 border border-slate-800 p-2 shadow-2xl space-y-1 font-mono text-xs z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <p className="px-2 py-1 text-[10px] text-slate-400 uppercase tracking-wider">Select Accent Theme</p>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        role="menuitem"
                        onClick={() => {
                          onSelectTheme(t.id);
                          setThemePickerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                          currentTheme === t.id ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${t.color}`} />
                          <span>{t.name}</span>
                        </div>
                        {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Resume Download */}
              <a
                href={resumeData.personalInfo.cvPath}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Download className="w-4 h-4" />
                <span>Resume PDF</span>
              </a>
            </div>

            {/* Mobile Menu Action Buttons */}
            <div className="lg:hidden flex items-center gap-2 font-mono">
              <button
                onClick={onOpenSpace}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 hover:text-white"
                title="Launch 3D Cosmos"
                aria-label="Launch 3D Cosmos"
              >
                <Rocket className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-2 font-mono shadow-2xl animate-in slide-in-from-top-2 duration-200"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10 font-bold border-l-4 border-cyan-400'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Mobile Theme Switcher */}
            <div className="pt-3 border-t border-slate-800/80">
              <p className="px-3 text-[10px] text-slate-400 uppercase tracking-wider mb-2">Accent Theme</p>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors ${
                      currentTheme === t.id ? 'bg-slate-800 text-cyan-400 font-bold border border-cyan-500/40' : 'bg-slate-900 text-slate-300'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 space-y-2">
              <a
                href={resumeData.personalInfo.cvPath}
                download
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onShowWelcome();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Launch Motion Gateway</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
