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
    cvPath: "assets/Umar_CV.pdf",
    profilePic: "assets/umar.jpg",
    summary: "CompTIA Security+ certified Computer Science student with hands-on experience in cybersecurity, software development, networking, and AI-powered applications. Experienced in developing secure web applications, conducting security assessments, and implementing cybersecurity best practices using the NIST Cybersecurity Framework. Founder of ApoxylTech Innovation Hub and volunteer cybersecurity instructor with demonstrated leadership, problem-solving, and technical communication skills. Passionate about building secure, scalable technologies that create meaningful impact."
  },

  education: [
    {
      institution: "Abubakar Tatari Ali Polytechnic",
      degree: "National Diploma (ND), Computer Science",
      location: "Bauchi State, Nigeria",
      period: "2023 – 2025",
      coursework: [
        "Computer Networks",
        "Programming",
        "Database Systems",
        "Operating Systems",
        "Software Engineering",
        "Cybersecurity Fundamentals"
      ]
    },
    {
      institution: "Power Learn Project (PLP)",
      degree: "Software Engineering Scholarship Program",
      location: "African Tech Program",
      period: "2025 Cohort",
      details: "Enrolled in intensive software engineering training focusing on full-stack web development, software design patterns, and tech for impact across Africa."
    }
  ],

  experience: [
    {
      company: "ApoxylTech Innovation Hub",
      role: "Founder & CEO",
      period: "Present",
      location: "Bauchi State, Nigeria",
      highlights: [
        "Lead software and cybersecurity projects from concept to full technical deployment.",
        "Develop innovative digital solutions for education, organizational management, and identity verification.",
        "Coordinate strategic project planning, system architecture design, and secure code implementation.",
        "Mentor and empower aspiring software developers and cybersecurity learners."
      ]
    },
    {
      company: "Darussaada Academy",
      role: "Administrative Officer & ICT Officer",
      period: "2024 - 2025",
      location: "Bauchi State, Nigeria",
      highlights: [
        "Managed digital administrative operations and enterprise communication workflows.",
        "Supported school ICT infrastructure, local network setup, and technology adoption.",
        "Assisted in implementing digital solutions for admissions, grading, and record management.",
        "Provided technical support and troubleshooting for administrative staff and students."
      ]
    },
    {
      company: "Professor Iya Abubakar Community Resource Centre",
      role: "Cybersecurity Instructor (Volunteer)",
      period: "2024",
      location: "Bauchi State, Nigeria",
      highlights: [
        "Delivered interactive introductory cybersecurity and network security training sessions.",
        "Assisted learners in hands-on networking and ethical hacking laboratory exercises using Nmap, Metasploit, and Wireshark.",
        "Introduced students to industrial cybersecurity tools, threat defense, and ethical hacking best practices.",
        "Promoted community cybersecurity awareness and safe digital hygiene."
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
      gallery: ["assets/project1.png", "assets/project2.png"],
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
      gallery: ["assets/project3.png", "assets/project4.png"],
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
      gallery: ["assets/project5.png", "assets/project1.png"],
      demoUrl: "#",
      githubUrl: "https://github.com/umaridrisdev"
    }
  ],

  certifications: [
    {
      id: "comptia-secplus",
      title: "CompTIA Security+ (SY0-701)",
      issuer: "CompTIA",
      date: "2024 / 2025",
      badge: "🛡️ CompTIA Certified",
      pdfPath: "assets/awareness.pdf", // default linkable pdf
      verificationUrl: "https://www.credly.com/", // verification link
      description: "Globally recognized baseline cybersecurity certification covering network security, threat assessment, incident response, vulnerability scanning, and risk management.",
      verified: true
    },
    {
      id: "cisco-ethical-hacker",
      title: "Cisco Ethical Hacker",
      issuer: "Cisco Networking Academy",
      date: "2025",
      badge: "🔒 Cisco Certified",
      pdfPath: "assets/ethicalhacking.pdf",
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
      pdfPath: "assets/ethicalhacking.pdf",
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
      pdfPath: "assets/awareness.pdf",
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
      pdfPath: "assets/awareness.pdf",
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
      pdfPath: "assets/ai-certificate.pdf",
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
      pdfPath: "assets/Umar_CV.pdf",
      verificationUrl: "https://powerlearnproject.org/",
      description: "Full-stack software development, modern web architecture, Git workflows, database management, and agile software development lifecycle.",
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
