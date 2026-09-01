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
  Target
} from 'lucide-react';

export default function AboutSection() {
  // Startup vision cards
  const visionCards = [
    {
      title: 'Practical Technology Education',
      desc: 'Hands-on learning environments that bridge theoretical study with real system usage.',
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
      title: 'Mentorship',
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
      title: 'Technology Solutions',
      desc: 'Creating accessible, scalable digital tools tailored to educational and social impact.',
      icon: Rocket,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30'
    }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT UMAR IDRIS ABUBAKAR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Umar Idris Abubakar</span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-3xl mx-auto leading-relaxed border-y border-slate-800/80 py-3">
            CompTIA Security+ Certified Cybersecurity Professional &bull; Computer Science &bull; Technology Entrepreneur &bull; Founder, ApoxylTech Innovation Hub
          </p>
        </div>

        {/* SECTION 1 — MY JOURNEY */}
        <div className="p-8 sm:p-10 rounded-3xl bg-glass-card border border-slate-800/80 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">My Journey</h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am a Computer Science graduate and cybersecurity practitioner from Bauchi, Nigeria, with a passion for technology that began when I was still in primary school. From an early age, I was curious about computers and dreamed of building a professional career in technology.
            </p>
            <p>
              My journey has not always been easy. My parents initially wanted me to become a doctor because they were concerned that studying Computer Science might not provide enough career opportunities. However, I believed strongly in my passion for technology and decided to pursue it. I have continued working hard to prove that technology can be a meaningful career and a powerful tool for creating positive change.
            </p>
            <p>
              One of the biggest challenges I have faced throughout my journey has been access to a computer. For a long time, I did not have my own system. There were times when I walked several kilometres to an internet café simply to access a computer so I could learn, practise, and work on my projects. I also volunteered with NGOs and foundations, where I contributed my skills while gaining access to computer resources and practical learning opportunities.
            </p>
            <p className="font-semibold text-cyan-300 pt-1">
              Rather than allowing these limitations to stop me, they strengthened my determination to keep learning.
            </p>
          </div>
        </div>

        {/* SECTION 2 — FROM LEARNING TO PRACTICAL EXPERIENCE */}
        <div className="p-8 sm:p-10 rounded-3xl bg-glass-card border border-slate-800/80 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">From Learning to Practical Experience</h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              I studied Computer Science at <strong className="text-white">Abubakar Tatari Ali Polytechnic</strong>, where I developed a foundation in computer networks, programming, databases, operating systems, software engineering, and cybersecurity.
            </p>
            <p>
              I later expanded my skills through practical cybersecurity training, software engineering programmes, internships, personal projects, and community mentoring. I have earned the <strong className="text-cyan-300">CompTIA Security+ certification</strong> and continue to develop my skills in cybersecurity, networking, software development, security operations, and information security.
            </p>
            
            {/* Target Goal Pill */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Career Objective</p>
                <p className="text-sm font-semibold text-white">
                  My goal is to become a highly skilled <span className="text-gradient">SOC/Cybersecurity Analyst</span> while continuing to build practical technology solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 — STARTUP VISION (ApoxylTech Innovation Hub) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-glass-card border border-slate-800/80 space-y-8 shadow-xl">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-purple-400 font-semibold tracking-wider uppercase">Startup Vision</span>
                <h3 className="text-2xl font-bold text-white">Founder & CEO — ApoxylTech Innovation Hub</h3>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
              <p>My personal experience also shaped my entrepreneurial vision.</p>
              <p>
                As the founder of <strong className="text-white">ApoxylTech Innovation Hub</strong>, I want to help bridge the gap between theoretical education and practical technology skills.
              </p>
              <p>
                I have seen how students can study Computer Science, Information Technology, or related fields without having enough access to computers, practical laboratories, mentorship, or real-world projects. I experienced some of these challenges myself, and they motivated me to think beyond my own career.
              </p>
              <p className="font-semibold text-white">
                My vision is to create opportunities where students and young people can <span className="text-cyan-300">learn, practise, build, and innovate</span>.
              </p>
            </div>
          </div>

          {/* 6 Vision Areas Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Core Focus Areas of ApoxylTech Innovation Hub
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visionCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3 group"
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

        {/* SECTION 4 — MY PROFESSIONAL PHILOSOPHY & FEATURED QUOTE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Philosophy Card */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-glass-card border border-slate-800/80 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">My Philosophy</h3>
              </div>

              <p className="text-base font-semibold text-gradient">
                I believe that limited resources should not limit ambition.
              </p>

              <p className="text-slate-300 text-sm leading-relaxed">
                My journey has taught me that practical experience, persistence, mentorship, and access to technology can transform a person's future. I want to continue developing myself as a cybersecurity professional while using what I learn to create opportunities for others.
              </p>

              <p className="text-slate-300 text-sm leading-relaxed">
                My long-term vision is to build technology solutions, grow as a cybersecurity professional, and help create an environment where young people can access the practical skills and resources they need to turn their ideas into reality.
              </p>
            </div>
          </div>

          {/* FEATURED QUOTE CARD */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center space-y-4 group">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Quote className="w-6 h-6 rotate-180" />
            </div>

            <blockquote className="text-lg sm:text-xl font-extrabold text-white leading-snug tracking-wide italic">
              “I started with limited resources, but I never allowed limited resources to limit my dream.”
            </blockquote>

            <div className="pt-2 font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
              &mdash; Umar Idris Abubakar
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
