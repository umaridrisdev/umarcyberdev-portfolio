import React from 'react';
import { ShieldCheck, Award, MapPin, Mail, Linkedin, Github, FileText, ArrowRight, Code2, Terminal } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function HeroSection({ data }) {
  const personalInfo = data?.personalInfo || resumeData.personalInfo;

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center cyber-grid overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Hero Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CompTIA Security+ Certified Specialist</span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
                {personalInfo.name}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-gradient">
                {personalInfo.title}
              </p>
              <p className="text-sm font-mono text-cyan-400/90 flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>{personalInfo.subTitle}</span>
              </p>
            </div>

            {/* Resume Summary Text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personalInfo.summary}
            </p>

            {/* Quick Badges/Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {personalInfo.location}
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ApoxylTech Innovation Hub
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                Power Learn Project Scholar
              </span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#certifications"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 hover:text-white hover:border-cyan-500 hover:bg-slate-800 font-semibold text-sm transition-all duration-300 shadow-lg"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Verify Credentials</span>
              </a>

              <a
                href={personalInfo.cvPath}
                download
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 font-mono text-xs transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-800/80 max-w-md">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              
              {/* Outer Cyber Glow Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 opacity-50 blur-xl group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
              
              <div className="relative rounded-3xl bg-slate-950 p-6 border border-slate-800/80 shadow-2xl space-y-6">
                
                {/* Image Frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-cyan-500/30">
                  <img
                    src={personalInfo.profilePic}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Badge floating on image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-cyan-400 font-semibold">ApoxylTech Innovation Hub</p>
                      <p className="text-[11px] text-slate-400">Founder & CEO</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-3 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <p className="text-lg font-bold text-cyan-400">CompTIA</p>
                    <p className="text-[10px] text-slate-400">Sec+ Certified</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <p className="text-lg font-bold text-emerald-400">NIST</p>
                    <p className="text-[10px] text-slate-400">Framework</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <p className="text-lg font-bold text-indigo-400">AI & Web</p>
                    <p className="text-[10px] text-slate-400">Full-Stack</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
