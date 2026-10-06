import React, { useState } from 'react';
import { ShieldCheck, Award, MapPin, Mail, Linkedin, Github, FileText, ArrowRight, Code2, Terminal, ExternalLink } from 'lucide-react';
import CartoonRobotAvatar from './CartoonRobotAvatar';
import { resumeData } from '../data/resumeData';

export default function HeroSection({ data }) {
  const personalInfo = data?.personalInfo || resumeData.personalInfo;
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center cyber-grid overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-indigo-600/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & Hero Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CompTIA Security+ Certified Specialist (SY0-701)</span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none font-sans">
                {personalInfo.name}
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-gradient">
                {personalInfo.title}
              </p>
              <div className="text-xs sm:text-sm font-mono text-cyan-400/95 flex items-center justify-center lg:justify-start gap-2 pt-1">
                <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="leading-relaxed">{personalInfo.subTitle}</span>
              </div>
            </div>

            {/* Resume Summary Text */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personalInfo.summary}
            </p>

            {/* Quick Location & Affiliation Badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{personalInfo.location}</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ApoxylTech Innovation Hub (Founder)</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Power Learn Project Scholar</span>
              </span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.cvPath}
                download
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>

              <a
                href="#certifications"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Verify Credentials</span>
              </a>
            </div>

            {/* Social Icons & Email Fast Link */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-3 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
                title="LinkedIn Profile"
                aria-label="Umar Idris Abubakar LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
                title="GitHub Profile"
                aria-label="Umar Idris Abubakar GitHub Profile"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
                title="Send Direct Email"
                aria-label="Send Direct Email to Umar Idris Abubakar"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href="#contact"
                className="ml-auto text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Direct Contact Channel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Profile Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Live Robot Greeting Badge */}
            <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2 p-2.5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-md animate-bounce">
              <CartoonRobotAvatar size="small" emotion="happy" />
              <div className="font-mono text-[10px]">
                <p className="text-cyan-400 font-bold">👋 Welcome!</p>
                <p className="text-slate-300">Apoxyl Assistant Online</p>
              </div>
            </div>

            <div className="relative group w-full max-w-sm sm:max-w-md">
              
              {/* Outer Cyber Glow Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 opacity-40 blur-xl group-hover:opacity-75 transition duration-500 pointer-events-none" />
              
              <div className="relative rounded-3xl bg-slate-950 p-5 sm:p-6 border border-slate-800/80 shadow-2xl space-y-5">
                
                {/* Image Frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-cyan-500/30 bg-slate-900">
                  {!imgError ? (
                    <img
                      src={personalInfo.profilePic}
                      alt={personalInfo.name}
                      loading="eager"
                      decoding="async"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900">
                      <ShieldCheck className="w-16 h-16 text-cyan-400 mb-2" />
                      <p className="font-bold text-white text-base">{personalInfo.name}</p>
                      <p className="text-xs text-cyan-400 font-mono">Cybersecurity Specialist</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85 pointer-events-none" />
                  
                  {/* Badge floating on image */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/95 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between shadow-lg">
                    <div>
                      <p className="text-xs font-mono text-cyan-400 font-bold">ApoxylTech Innovation Hub</p>
                      <p className="text-[11px] text-slate-300">Founder & CEO</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2.5 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-sm sm:text-base font-bold text-cyan-400">CompTIA</p>
                    <p className="text-[10px] text-slate-400">Sec+ (SY0-701)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-sm sm:text-base font-bold text-emerald-400">NIST</p>
                    <p className="text-[10px] text-slate-400">Cyber Defense</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-sm sm:text-base font-bold text-indigo-400">AI & Web</p>
                    <p className="text-[10px] text-slate-400">Full-Stack Dev</p>
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
