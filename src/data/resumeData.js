export const resumeData = {
  personalInfo: {
    name: "Umar Idris Abubakar",
    title: "Cybersecurity Specialist & AI Software Engineer",
    subTitle: "Founder & CEO at ApoxylTech Innovation Hub | CompTIA Security+ Certified",
    tagline: "Building secure, scalable, and intelligent software solutions that drive real-world impact across Africa.",
    location: "Bauchi State, Nigeria",
    phone: "+234 9112647372",
    email: "umaraidkundak@gmail.com",
    linkedin: "https://www.linkedin.com/in/umar-idris-abubakar-b26a702b7/",
    github: "https://github.com/umaridrisdev",
    portfolioUrl: "https://umarplp.github.io/plp-portfolio/home.html",
    cvPath: "/assets/Umar_CV.pdf",
    profilePic: "/assets/umar.jpg",
    summary: "Computer Science graduate and cybersecurity professional with hands-on experience in cybersecurity training, networking, Linux, Cisco Packet Tracer, SOC analysis, incident response, vulnerability assessment, and web application security. Invited by Abubakar Tatari Ali Polytechnic to return and support teaching activities, including HND students. Committed to furthering education in Cybersecurity while continuing to build practical and professional expertise."
  },

  education: [
    {
      institution: "Abubakar Tatari Ali Polytechnic",
      degree: "National Diploma (ND), Computer Science",
      location: "Bauchi State, Nigeria",
      period: "2023 – 2025",
      coursework: [
        "Computer Networks",
        "Programming & Linux CLI",
        "Database Systems",
        "Operating Systems",
        "Software Engineering",
        "Cybersecurity & Threat Defense"
      ]
    },
    {
      institution: "Power Learn Project (PLP)",
      degree: "Software Engineering Scholarship Program",
      location: "African Tech Program",
      period: "2025 Cohort",
      details: "Full-stack web development, secure software design patterns, database architecture, and tech for impact across Africa."
    }
  ],

  experience: [
    {
      company: "Abubakar Tatari Ali Polytechnic",
      role: "Cybersecurity Instructor / Technical Support",
      period: "2026 - Present",
      location: "Bauchi State, Nigeria",
      highlights: [
        "Support cybersecurity and networking practical laboratory sessions, including instructing HND students.",
        "Assist learners with Linux command line, Cisco Packet Tracer, system configuration, and network defense labs.",
        "Mentor students through hands-on packet inspection, vulnerability scanning, and secure networking methodologies."
      ]
    },
    {
      company: "ApoxylTech Innovation Hub",
      role: "Founder & CEO",
      period: "Present",
      location: "Bauchi State, Nigeria",
      highlights: [
        "Lead cybersecurity and software development projects from technical architecture to deployment.",
        "Engineered digital solutions for student identity verification, attendance, and institutional management.",
        "Coordinate youth tech mentorship programs in web development and cybersecurity defense."
      ]
    },
    {
      company: "Networkwalks Technologies",
      role: "Cybersecurity Intern",
      period: "2026",
      location: "Online / Global",
      highlights: [
        "Completed rigorous practical cybersecurity training and threat assessment labs with a 95/100 final assessment score.",
        "Performed web application penetration testing, network defense simulations, and security auditing.",
        "Conducted log analysis, vulnerability scanning, and incident response documentation."
      ]
    },
    {
      company: "Darussada Academy",
      role: "Administrative Officer",
      period: "2024 - 2025",
      location: "Bauchi State, Nigeria",
      highlights: [
        "Supported school administration, academic record keeping, and staff/student services.",
        "Assisted in managing administrative data workflows and institutional operations."
      ]
    }
  ],

  projects: [
    {
      id: "ai-admission",
      title: "AI-Powered Student Admission Management System",
      category: "AI & Full-Stack",
      shortDesc: "An intelligent student admission platform designed to streamline and automate institutional admissions with role-based access control.",
      fullDesc: "Designed and developed an intelligent student admission platform that automates administrative evaluation workflows, enforces strict role-based access control (RBAC), and provides a responsive web interface for applicants and school officials.",
      highlights: [
        "Secure role-based authentication system.",
        "Automated admission workflow processing to drastically reduce administrative overhead.",
        "Responsive web interface built with modern UI frameworks."
      ],
      technologies: ["Python", "React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
      gallery: ["/assets/project1.png", "/assets/project2.png"],
      demoUrl: "#",
      githubUrl: "https://github.com/umaridrisdev"
    },
    {
      id: "student-file-mgmt",
      title: "Student File Management System",
      category: "Secure Systems",
      shortDesc: "Digital document management system featuring secure record storage, PDF export, and QR-code document authenticity verification.",
      fullDesc: "Built a digital document management system for educational institutions featuring secure storage and fast retrieval of student academic records, administrative role management, PDF report generation, and embedded QR-code document verification.",
      highlights: [
        "Encrypted document storage & retrieval mechanisms.",
        "Role-based access permissions for departmental staff and administrators.",
        "Dynamic PDF generation and tamper-evident QR verification for document authenticity."
      ],
      technologies: ["JavaScript", "Node.js", "Express.js", "SQLite", "Prisma ORM", "QR Verification"],
      gallery: ["/assets/project3.png", "/assets/project4.png"],
      demoUrl: "#",
      githubUrl: "https://github.com/umaridrisdev"
    },
    {
      id: "kdex-smart-attendance",
      title: "KdexSmArt Smart Attendance System",
      category: "Computer Vision & AI",
      shortDesc: "AI-powered facial recognition attendance solution with offline verification capability for educational institutions.",
      fullDesc: "Developed an AI-powered facial recognition attendance solution designed for rapid and tamper-proof student attendance tracking in schools. Features offline image processing, identity verification, and high-accuracy computer vision models.",
      highlights: [
        "Facial recognition computer vision pipeline.",
        "Offline attendance capture with localized secure identity verification.",
        "Scalable architecture designed for high-density school deployment."
      ],
      technologies: ["Python", "Computer Vision / OpenCV", "Firebase", "React Native", "SQLite"],
      gallery: ["/assets/project5.png", "/assets/project1.png"],
      demoUrl: "#",
      githubUrl: "https://github.com/umaridrisdev"
    }
  ],

  certifications: [
    {
      id: "comptia-secplus",
      title: "CompTIA Security+ (SY0-701)",
      issuer: "CompTIA",
      date: "2026",
      badge: "🛡️ CompTIA Certified",
      pdfPath: "/assets/comptia-security-plus.png",
      verificationUrl: "http://verify.CompTIA.org",
      description: "CompTIA Security+ Certified (Candidate ID: COMP001023063729 | Code: 734b2cabd0f14c3a99317f2bcd389c96). Validated expertise in threat analysis, vulnerability mitigation, and NIST security frameworks.",
      verified: true
    },
    {
      id: "ibm-cyber-architecture",
      title: "Cybersecurity Architecture",
      issuer: "IBM (Coursera)",
      date: "Sep 2026",
      badge: "🏢 IBM Certified",
      pdfPath: "/assets/ibm-cybersecurity-architecture.png",
      verificationUrl: "https://coursera.org/verify/CZTZQZ79NYOW",
      description: "Authorized by IBM Skills Network. Core architecture principles for enterprise cybersecurity, zero trust, and secure network boundaries.",
      verified: true
    },
    {
      id: "ibm-cyber-careers",
      title: "Introduction to Cybersecurity Careers",
      issuer: "IBM (Coursera)",
      date: "Oct 2026",
      badge: "🛡️ IBM Skills",
      pdfPath: "/assets/ibm-intro-to-cybersecurity-careers.pdf",
      verificationUrl: "https://coursera.org/verify/89PNR6QAV8DY",
      description: "Authorized by IBM and offered through Coursera. Comprehensive overview of cybersecurity operations, threat vectors, and defense practices.",
      verified: true
    },
    {
      id: "aisec-ai-security",
      title: "Introduction to AI Security",
      issuer: "AISEC University",
      date: "Sep 2026",
      badge: "🤖 AISEC Certified",
      pdfPath: "/assets/aisec-ai-security.png",
      verificationUrl: "https://aisec.university/verify/370580c8-3e27-4c0d-a515-830bbf08d8a5",
      description: "Certificate of Completion from AI Security University (2 CPE Credits) covering AI system vulnerabilities, LLM security risks, and AI defense frameworks.",
      verified: true
    },
    {
      id: "cisco-cybersecurity-essentials",
      title: "Cybersecurity Essentials",
      issuer: "Cisco Networking Academy",
      date: "Sep 2025",
      badge: "🔒 Cisco Certified",
      pdfPath: "/assets/cisco-cybersecurity-essentials.png",
      verificationUrl: "https://www.netacad.com/",
      description: "Offered by Prof. Iya Abubakar Community Resource Center through the Cisco Networking Academy program.",
      verified: true
    },
    {
      id: "cisco-cyberops",
      title: "Cisco CyberOps Associate",
      issuer: "Cisco Networking Academy",
      date: "2026",
      badge: "⚡ Cisco CyberOps",
      pdfPath: "/assets/ethicalhacking.pdf",
      verificationUrl: "https://www.netacad.com/",
      description: "Security Operations Center (SOC) monitoring, threat detection, security event analysis, packet inspection with Wireshark, and incident response.",
      verified: true
    },
    {
      id: "networkwalks-internship",
      title: "Cybersecurity Internship Certificate (Final Score: 95/100)",
      issuer: "Networkwalks Technologies",
      date: "Sep 2026",
      badge: "🏆 Score 95/100",
      pdfPath: "/assets/networkwalks-cybersecurity-internship.pdf",
      verificationUrl: "https://networkwalks.com/",
      description: "Successfully completed the Cybersecurity Internship Program organized by Networkwalks Technologies with a 95/100 score, demonstrating excellence in penetration testing and system defense.",
      verified: true
    },
    {
      id: "cisco-instructor",
      title: "Cisco Networking Academy - Instructor Role",
      issuer: "Cisco Networking Academy",
      date: "2026",
      badge: "🎓 Cisco Instructor",
      pdfPath: "/assets/ethicalhacking.pdf",
      verificationUrl: "https://www.netacad.com/",
      description: "Recognized instructor status assisting and mentoring students in networking fundamentals, Packet Tracer simulations, and cybersecurity labs.",
      verified: true
    },
    {
      id: "cisco-ethical-hacker",
      title: "Cisco Ethical Hacker",
      issuer: "Cisco Networking Academy",
      date: "2025",
      badge: "🔒 Cisco Certified",
      pdfPath: "/assets/ethicalhacking.pdf",
      verificationUrl: "https://www.netacad.com/",
      description: "Comprehensive practical training covering penetration testing methodologies, reconnaissance, vulnerability scanning with Nmap/Zenmap, exploitation using Metasploit, and defensive countermeasures.",
      verified: true
    },
    {
      id: "cisco-jr-analyst",
      title: "Cisco Junior Cybersecurity Analyst Career Path",
      issuer: "Cisco Networking Academy",
      date: "2025",
      badge: "⚡ Cisco Professional",
      pdfPath: "/assets/ethicalhacking.pdf",
      verificationUrl: "https://www.netacad.com/",
      description: "Validation of Security Operations Center (SOC) fundamentals, security monitoring, packet analysis using Wireshark, threat intelligence, and network defense strategies.",
      verified: true
    },
    {
      id: "isc2-candidate",
      title: "ISC2 Candidate",
      issuer: "ISC2",
      date: "2025",
      badge: "🔑 ISC2 Member",
      pdfPath: "/assets/awareness.pdf",
      verificationUrl: "https://www.isc2.org/",
      description: "Official status as an ISC2 Candidate actively demonstrating commitment to cybersecurity excellence and governance frameworks.",
      verified: true
    },
    {
      id: "itu-academy",
      title: "ITU Academy Cybersecurity Certificate",
      issuer: "International Telecommunication Union (ITU)",
      date: "2024",
      badge: "🌐 ITU Certified",
      pdfPath: "/assets/awareness.pdf",
      verificationUrl: "https://academy.itu.int/",
      description: "Specialized certification in global cybersecurity standards, policy framework, critical infrastructure protection, and threat mitigation.",
      verified: true
    },
    {
      id: "ai-learning-passport",
      title: "AI Learning Certificate",
      issuer: "Nigeria Learning Passport",
      date: "2025",
      badge: "🤖 AI Certified",
      pdfPath: "/assets/ai-certificate.pdf",
      verificationUrl: "https://nigeria.learningpassport.org/",
      description: "Fundamental and applied Artificial Intelligence concepts, machine learning fundamentals, and AI technology applications for societal growth.",
      verified: true
    },
    {
      id: "plp-software-engineering",
      title: "Software Engineering Scholarship Certificate",
      issuer: "Power Learn Project (PLP)",
      date: "2025",
      badge: "💻 PLP Scholar",
      pdfPath: "/assets/Umar_CV.pdf",
      verificationUrl: "https://powerlearnproject.org/",
      description: "Full-stack software development, modern web architecture, Git workflows, database management, and agile software development lifecycle.",
      verified: true
    },
    {
      id: "typing-speed-cert",
      title: "Certified Professional Typing Speed & Accuracy",
      issuer: "TypingTest.com",
      date: "2026",
      badge: "⌨️ Speed Certified",
      pdfPath: "/assets/typingtest_me_certificate_Umar_Idris_Abubakar_2026-09-16.png",
      verificationUrl: "https://www.typingtest.com/",
      description: "Certified keyboard proficiency, high-accuracy coding throughput, and technical documentation speed verification.",
      verified: true
    }
  ],

  skills: {
    programming: ["Python", "JavaScript", "HTML5", "CSS3", "SQL"],
    frameworks: ["React", "Node.js", "Express.js", "Tailwind CSS", "Vite"],
    databases: ["PostgreSQL", "SQLite", "Prisma ORM", "Firebase DB"],
    cybersecurity: [
      "NIST Cybersecurity Framework",
      "OWASP Top 10",
      "Network Security",
      "Vulnerability Assessment",
      "Risk Assessment",
      "Threat Analysis",
      "Security Monitoring",
      "Secure System Design"
    ],
    tools: [
      "Wireshark",
      "Nmap",
      "Zenmap",
      "Metasploit",
      "Git & GitHub",
      "Linux CLI",
      "Cisco Packet Tracer",
      "VS Code"
    ]
  },

  extracurricular: [
    {
      title: "Cyber Nations Bootcamp",
      role: "Peer Leader",
      details: [
        "Coordinated collaborative learning activities and hands-on laboratory exercises for team members.",
        "Facilitated team collaboration during complex cybersecurity and threat assessment projects.",
        "Supported participants in troubleshooting network configurations and completing technical assignments."
      ]
    }
  ],

  achievements: [
    "Founder & CEO of ApoxylTech Innovation Hub.",
    "Successfully completed multiple international cybersecurity training programs.",
    "Engineered AI-based educational tech solutions (KdexSmArt & AI Admission System).",
    "Mentored aspiring cybersecurity learners and developers through volunteer community instruction."
  ],

  languages: [
    { language: "English", proficiency: "Professional Working Proficiency" },
    { language: "Hausa", proficiency: "Native" }
  ],

  interests: [
    "Cybersecurity",
    "Artificial Intelligence",
    "Software Engineering",
    "Cloud Computing",
    "Secure Software Development",
    "Digital Innovation"
  ]
};
