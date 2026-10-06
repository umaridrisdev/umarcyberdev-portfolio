import React from 'react';
import { 
  User, 
  Compass, 
  GraduationCap, 
  Users, 
  FolderGit2, 
  Cpu, 
  Quote, 
  BookOpen, 
  Sparkles, 
  Rocket, 
  Lock, 
  Target,
  ShieldCheck
} from 'lucide-react';

export default function AboutSection() {
  const visionCards = [
    {
      title: 'Practical Technology Education',
      desc: 'Hands-on learning environments that bridge theoretical study with practical system usage.',
      icon: BookOpen,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30'
    },
    {
      title: 'Cybersecurity Training',
      desc: 'Introductory and intermediate labs covering threat analysis, network security, and defense.',
      icon: Lock,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: 'Youth Mentorship',
      desc: 'Guiding aspiring developers and security enthusiasts to build confidence and practical skills.',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      title: 'Real-World Projects',
      desc: 'Collaborative development of live web, AI, and document management applications.',
      icon: FolderGit2,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30'
    },
    {
      title: 'Digital Skills Development',
      desc: 'Equipping youth with essential tech capabilities for modern careers.',
      icon: Cpu,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30'
    },
    {
      title: 'Impact Solutions',
      desc: 'Creating accessible, scalable digital tools tailored to educational and social impact.',
      icon: Rocket,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-24 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Main Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-wider shadow-sm">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & IDENTITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Umar Idris Abubakar</span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-3xl mx-auto leading-relaxed border-y border-slate-800/80 py-3">
            CompTIA Security+ Certified Cybersecurity Specialist &bull; Computer Science Graduate &bull; Tech Entrepreneur &bull; Founder, ApoxylTech Innovation Hub
          </p>
        </div>

        {/* SECTION 1 — MY JOURNEY */}
        <div className="p-6 sm:p-10 rounded-3xl bg-glass-card border border-slate-800/80 space-y-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">My Journey & Drive</h3>
          </div>

          <div className="space-y-3.5 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            <p>
              I am a Computer Science graduate and cybersecurity practitioner from Bauchi, Nigeria, with a passion for technology that began when I was still in primary school. From an early age, I was curious about computers and dreamed of building a meaningful career in technology.
            </p>
            <p>
              My journey has required strong determination. My parents initially hoped I would pursue medicine out of concern for technology career opportunities. However, I believed deeply in the power of computing and software to solve real-world problems. Through persistent study, certifications, and project building, I have continued demonstrating that technology can be a powerful engine for positive change.
            </p>
            <p>
              One of the defining challenges of my journey was access to computing resources. Early on, without a personal computer, I walked several kilometres to internet cafés to learn and build. I also volunteered with NGOs and community foundations to contribute my skills while gaining access to practical systems. Rather than holding me back, these experiences forged my discipline and resourcefulness.
            </p>
          </div>
        </div>

        {/* SECTION 2 — FROM LEARNING TO PRACTICAL EXPERIENCE */}
        <div className="p-6 sm:p-10 rounded-3xl bg-glass-card border border-slate-800/80 space-y-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Academic Foundation & Practical Capabilities</h3>
          </div>

          <div className="space-y-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            <p>
              I studied Computer Science at <strong className="text-white">Abubakar Tatari Ali Polytechnic</strong>, developing core foundations in computer networks, programming, database design, operating systems, and cybersecurity principles.
            </p>
            <p>
              I expanded this foundation through software engineering programs with <strong className="text-white">Power Learn Project</strong>, specialized practical training with <strong className="text-white">Cisco Networking Academy</strong>, and earning the globally recognized <strong className="text-cyan-300">CompTIA Security+ (SY0-701)</strong> credential.
            </p>
            
            {/* Target Goal Pill */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Professional Focus</p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Targeting <span className="text-gradient">SOC Analyst & Cybersecurity Specialist</span> roles where I can apply threat analysis, SIEM/packet monitoring, and secure system engineering to defend critical infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 — STARTUP VISION (ApoxylTech Innovation Hub) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-glass-card border border-slate-800/80 space-y-6 sm:space-y-8 shadow-xl">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-purple-400 font-semibold tracking-wider uppercase">Entrepreneurial Leadership</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Founder & CEO — ApoxylTech Innovation Hub</h3>
              </div>
            </div>

            <div className="space-y-3.5 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed pt-2">
              <p>
                As founder of <strong className="text-white">ApoxylTech Innovation Hub</strong>, my goal is to bridge the divide between theoretical tech education and hands-on professional mastery.
              </p>
              <p>
                Having experienced firsthand the challenge of studying technology without sufficient laboratory access, I established ApoxylTech to empower students with practical mentorship, collaborative project experience, and digital skills.
              </p>
            </div>
          </div>

          {/* 6 Vision Areas Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
              Core Pillars of ApoxylTech Innovation Hub
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visionCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-2.5 group shadow-sm"
                  >
                    <div className={`w-9 h-9 rounded-xl ${card.bgColor} border ${card.borderColor} flex items-center justify-center ${card.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* SECTION 4 — PHILOSOPHY & FEATURED QUOTE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Philosophy Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-glass-card border border-slate-800/80 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Professional Philosophy</h3>
              </div>

              <p className="text-sm sm:text-base font-semibold text-gradient">
                Limited resources should never limit ambition.
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Persistence, hands-on lab work, mentorship, and continuous learning can transform any constraint into strength. I am committed to continuous growth as a cybersecurity professional while opening doors for others.
              </p>
            </div>
          </div>

          {/* Featured Quote Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center space-y-3 group">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Quote className="w-5 h-5 rotate-180" />
            </div>

            <blockquote className="text-base sm:text-lg font-bold text-white leading-snug tracking-wide italic">
              “I started with limited resources, but I never allowed limited resources to limit my dream.”
            </blockquote>

            <div className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
              &mdash; Umar Idris Abubakar
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
