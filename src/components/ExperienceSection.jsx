import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, ChevronRight, ShieldAlert } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function ExperienceSection() {
  const { experience } = resumeData;

  return (
    <section id="experience" className="py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Proven track record in digital leadership, ICT administrative infrastructure, and community cybersecurity education.
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                    {exp.role}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.company}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="pt-6 space-y-3">
                {exp.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
