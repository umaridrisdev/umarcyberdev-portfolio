import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, ShieldCheck, Building } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function ExperienceSection() {
  const { experience } = resumeData;

  return (
    <section id="experience" className="py-20 sm:py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER & LEADERSHIP TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Hands-on digital leadership, administrative infrastructure management, and community cybersecurity instruction.
          </p>
        </div>

        {/* Experience Connected Timeline Grid */}
        <div className="relative max-w-4xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Vertical Timeline Guide Line on Desktop */}
          <div className="hidden sm:block absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent pointer-events-none" />

          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="relative sm:pl-16 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="hidden sm:flex absolute left-4 top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-125 transition-transform duration-300 z-10">
                <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-cyan-400 animate-ping' : 'bg-cyan-400'}`} />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden shadow-xl space-y-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      {exp.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors pt-1">
                      {exp.company}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-2.5 pt-1">
                  {exp.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
