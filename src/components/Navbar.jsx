import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Download, Palette, Zap, Rocket } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Navbar({ data, currentTheme, onSelectTheme, onShowWelcome, onOpenSpace }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);

  const info = data?.personalInfo || resumeData.personalInfo;
  const brandName = info.brandName || "UMAR PORTFOLIO";
  const brandSubtitle = info.brandSubtitle || "Cybersecurity & AI";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-glass py-3 shadow-2xl shadow-cyan-950/20 border-b border-slate-800/60' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-wider font-mono group-hover:text-cyan-400 transition-colors">
                {brandName}
              </span>
              <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">
                {brandSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-slate-800/40 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs">

          {/* Space Explorer Button */}
            <button
              onClick={onOpenSpace}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
              title="Launch Realistic Space Explorer"
            >
              <Rocket className="w-4 h-4 animate-bounce" />
              <span>Space</span>
            </button>

            {/* Welcome Gateway Trigger */}
            <button
              onClick={onShowWelcome}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors"
              title="Show Welcome Gateway Screen"
            >
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-bold">Gateway</span>
            </button>

            {/* Theme Picker */}
            <div className="relative">
              <button
                onClick={() => setThemePickerOpen(!themePickerOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                title="Change Portfolio Color Theme"
              >
                <Palette className="w-4 h-4" />
              </button>

              {themePickerOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-950 border border-slate-800 p-2 shadow-2xl space-y-1 font-mono text-xs">
                  <p className="px-2 py-1 text-[10px] text-slate-500 uppercase tracking-wider">Select Theme</p>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTheme(t.id);
                        setThemePickerOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                        currentTheme === t.id ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${t.color}`} />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resume Download */}
            <a
              href={resumeData.personalInfo.cvPath}
              download
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-500/10"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2 font-mono">
            <button
              onClick={onShowWelcome}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-2 font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900 text-sm"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={resumeData.personalInfo.cvPath}
              download
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
