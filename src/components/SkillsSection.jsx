import React, { useState } from 'react';
import { Code2, ShieldCheck, Database, Wrench, Layers, Search, Check } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function SkillsSection() {
  const { skills } = resumeData;
  const [searchTerm, setSearchTerm] = useState('');

  const skillCategories = [
    {
      name: 'Cybersecurity',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      items: skills.cybersecurity
    },
    {
      name: 'Programming Languages',
      icon: Code2,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      items: skills.programming
    },
    {
      name: 'Frameworks & Libraries',
      icon: Layers,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      items: skills.frameworks
    },
    {
      name: 'Databases & ORM',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      items: skills.databases
    },
    {
      name: 'Security & Dev Tools',
      icon: Wrench,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      items: skills.tools
    }
  ];

  return (
    <section id="skills" className="py-24 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">Competencies</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Comprehensive breakdown of security frameworks, programming languages, databases, and ethical hacking tools.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills (e.g. Wireshark, NIST, React, Python)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-lg"
          />
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat) => {
            const filteredItems = cat.items.filter(item =>
              item.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && filteredItems.length === 0) return null;

            const IconComponent = cat.icon;

            return (
              <div
                key={cat.name}
                className="p-6 rounded-3xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 space-y-6 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center ${cat.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cat.name}</h3>
                    <p className="text-[11px] font-mono text-slate-400">{filteredItems.length} Technologies</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {filteredItems.map((skill, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-1.5 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                    >
                      <Check className={`w-3.5 h-3.5 ${cat.color}`} />
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
