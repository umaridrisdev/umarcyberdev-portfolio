import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Download, ArrowRight, RefreshCw } from 'lucide-react';
import CartoonRobotAvatar from './CartoonRobotAvatar';
import { resumeData } from '../data/resumeData';

export default function AiAssistant({ data, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `👋 Hi there! I'm **Apoxyl AI**, Umar's live cartoon robot assistant! I'm here to welcome you, answer your questions, and show you Umar's credentials and projects. Ask me anything!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const info = data?.personalInfo || resumeData.personalInfo;

  const quickPrompts = [
    "Is Umar available for hire?",
    "What is CompTIA Security+?",
    "Tell me about ApoxylTech Hub",
    "Download Resume"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Hide initial greeting bubble after 12s
  useEffect(() => {
    const timer = setTimeout(() => setShowGreetingBubble(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  const generateBotResponse = (userInput) => {
    const text = userInput.toLowerCase();

    if (text.includes('hire') || text.includes('available') || text.includes('contact') || text.includes('work')) {
      return {
        text: `**Yes!** Umar is open for full-time roles, cybersecurity consultancy, and high-impact software engineering opportunities. \n\n📧 **Email:** ${info.email}\n📱 **Phone:** ${info.phone}\n📍 **Location:** ${info.location}`,
        action: { label: 'Contact Umar Now', href: '#contact' }
      };
    }

    if (text.includes('security+') || text.includes('comptia') || text.includes('certif')) {
      return {
        text: `Umar holds the globally accredited **CompTIA Security+ (SY0-701)** certification! He also holds Cisco Ethical Hacker and Cisco Junior Cybersecurity Analyst credentials specializing in NIST frameworks, threat analysis, and SOC operations.`,
        action: { label: 'View Verified Badges', href: '#certifications' }
      };
    }

    if (text.includes('apoxyl') || text.includes('hub') || text.includes('founder') || text.includes('company')) {
      return {
        text: `Umar is the **Founder & CEO of ApoxylTech Innovation Hub** based in Bauchi State, Nigeria. ApoxylTech focuses on software development, digital identity management, and cybersecurity mentorship for youth across Africa.`,
        action: { label: 'Learn More About ApoxylTech', href: '#about' }
      };
    }

    if (text.includes('resume') || text.includes('cv') || text.includes('download')) {
      return {
        text: `You can download Umar's latest official CV in PDF format.`,
        action: { label: '📄 Download CV PDF', href: info.cvPath, isDownload: true }
      };
    }

    if (text.includes('project') || text.includes('app') || text.includes('portfolio') || text.includes('code')) {
      return {
        text: `Umar has built AI-Powered Admission Management Systems, KdexSmArt Facial Recognition Attendance Systems, and Secure PDF/QR Document Verification Systems.`,
        action: { label: 'Explore Featured Projects', href: '#projects' }
      };
    }

    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return {
        text: `Hello friend! 👋 I'm delighted to meet you! How can I help you explore Umar's portfolio today?`
      };
    }

    return {
      text: `I'm happy to help! Umar Idris Abubakar is a Cybersecurity Specialist (CompTIA Security+ Certified) and AI Software Engineer. Feel free to ask about his credentials, projects, or how to collaborate with ApoxylTech Hub.`
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        action: response.action,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating SVG Cartoon Robot (Fixed Position, Live Waving Hands, No mouse following!) */}
      {!isOpen && (
        <div className="relative flex flex-col items-end">
          
          {/* Animated Welcoming Speech Bubble */}
          {showGreetingBubble && (
            <div className="mb-2 p-3 rounded-2xl bg-slate-950/95 border border-cyan-500/60 text-white font-mono text-xs shadow-2xl animate-bounce relative max-w-[220px] text-center backdrop-blur-md">
              <p className="text-[11px] font-bold text-cyan-300">👋 Hi! I'm Apoxyl AI Robot! Click me to chat!</p>
              <div className="absolute -bottom-2 right-8 w-3 h-3 bg-slate-950 border-r border-b border-cyan-500/60 rotate-45" />
            </div>
          )}

          {/* Large Friendly Cartoon Robot Character (Live Moving Waving Hands!) */}
          <div
            onClick={() => {
              setIsOpen(true);
              setShowGreetingBubble(false);
            }}
            className="cursor-pointer hover:scale-115 active:scale-95 transition-transform duration-300"
            title="Click to talk to Apoxyl AI Robot!"
          >
            <CartoonRobotAvatar size="xlarge" isWaving={true} emotion="happy" />
          </div>

        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] rounded-3xl bg-slate-950 border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header with Animated Cartoon Robot Avatar */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CartoonRobotAvatar size="medium" isTalking={isTyping} emotion="happy" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold font-mono text-white">Apoxyl AI Robot</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-cyan-400/90 font-mono">
                  {isTyping ? '💬 Talking & Thinking...' : '👋 Ready to assist you!'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([{
                  id: Date.now(),
                  sender: 'bot',
                  text: "👋 Chat reset! I'm ready to talk! What would you like to know?",
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Clear Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-900/40 border-b border-slate-800/60 overflow-x-auto scrollbar-none flex gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[90%]">
                  {msg.sender === 'bot' && (
                    <div className="flex-shrink-0 mb-1">
                      <CartoonRobotAvatar size="small" emotion="happy" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-lg'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                    {/* Optional Action Button */}
                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800">
                        <a
                          href={msg.action.href}
                          download={msg.action.isDownload ? true : undefined}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 font-bold hover:underline"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 w-fit">
                <CartoonRobotAvatar size="small" isTalking={true} />
                <span className="text-[11px] font-mono animate-pulse">Robot assistant typing response...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Apoxyl AI Robot..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
