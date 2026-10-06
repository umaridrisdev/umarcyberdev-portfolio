import React, { useState } from 'react';
import { Code2, ShieldCheck, Database, Wrench, Layers, Search, Check, Filter } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function SkillsSection() {
  const { skills } = resumeData;
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const skillCategories = [
    {
      name: 'SOC & Blue Team Defense',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      items: skills.cybersecurity
    },
    {
      name: 'Security & Penetration Tools',
      icon: Wrench,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      items: skills.tools
    },
    {
      name: 'Programming & Scripting',
      icon: Code2,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      items: skills.programming
    },
    {
      name: 'Full-Stack Frameworks & Libraries',
      icon: Layers,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      items: skills.frameworks
    },
    {
      name: 'Databases & System Platforms',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      items: skills.databases
    }
  ];

  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  const displayedCategories = skillCategories.filter(cat => 
    activeCategory === 'All' || cat.name === activeCategory
  );

  return (
    <section id="skills" className="py-20 sm:py-24 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL MATRIX ({totalSkillsCount} COMPETENCIES)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">Core Competencies</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Hands-on expertise across industry security frameworks, network packet analysis, vulnerability tools, and modern full-stack development.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-300 font-semibold cursor-pointer ${
                activeCategory === 'All'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Domains ({totalSkillsCount})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-2 rounded-xl transition-all duration-300 font-semibold cursor-pointer ${
                  activeCategory === cat.name
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Wireshark, NIST, Python)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search skills matrix"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors shadow-sm"
            />
          </div>

        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedCategories.map((cat) => {
            const filteredItems = cat.items.filter(item =>
              item.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && filteredItems.length === 0) return null;

            const IconComponent = cat.icon;

            return (
              <div
                key={cat.name}
                className="p-6 rounded-3xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 space-y-5 shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center ${cat.color} flex-shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">{cat.name}</h3>
                    <p className="text-[11px] font-mono text-slate-400">{filteredItems.length} Competencies</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {filteredItems.map((skill, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-1.5 hover:border-cyan-500/40 hover:text-cyan-300 transition-all shadow-sm"
                    >
                      <Check className={`w-3.5 h-3.5 ${cat.color} flex-shrink-0`} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
