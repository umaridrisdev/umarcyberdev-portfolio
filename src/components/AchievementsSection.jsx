import React from 'react';
import { Trophy, Users, Languages, Heart, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function AchievementsSection({ data }) {
  const extracurricular = data?.extracurricular || resumeData.extracurricular;
  const achievements = data?.achievements || resumeData.achievements;
  const languages = data?.languages || resumeData.languages;
  const interests = data?.interests || resumeData.interests;

  return (
    <section id="achievements" className="py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Trophy className="w-3.5 h-3.5" />
            <span>LEADERSHIP & HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Achievements & <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Community leadership, peer mentorship, multi-lingual fluency, and technical passions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cyber Nations Bootcamp & Achievements */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Extracurricular Leadership */}
            {extracurricular.map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-glass-card border border-slate-800/80 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs font-mono text-purple-400">{item.role}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {item.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Key Achievements Card */}
            <div className="p-8 rounded-3xl bg-glass-card border border-slate-800/80 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Key Milestone Highlights</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {achievements.map((ach, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Languages & Technical Interests */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Spoken Languages */}
            <div className="p-8 rounded-3xl bg-glass-card border border-slate-800/80 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Languages</h3>
              </div>

              <div className="space-y-3 pt-2">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono text-xs">
                    <span className="text-white font-semibold">{lang.language}</span>
                    <span className="text-cyan-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Interests */}
            <div className="p-8 rounded-3xl bg-glass-card border border-slate-800/80 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Core Interests</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                {interests.map((interest, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
