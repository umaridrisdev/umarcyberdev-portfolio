import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import SkillsSection from './components/SkillsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import AiAssistant from './components/AiAssistant';
import WelcomePage from './components/WelcomePage';
import WireframeBackground from './components/WireframeBackground';
import SpaceExplorer from './components/SpaceExplorer';
import { resumeData as initialData } from './data/resumeData';

export default function App() {
  const [currentData, setCurrentData] = useState(initialData);

  // Default to false so recruiters and hiring managers see portfolio content immediately
  const [showWelcomePage, setShowWelcomePage] = useState(false);
  const [isSpaceOpen, setIsSpaceOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('umar_portfolio_theme') || 'cyan';
  });

  useEffect(() => {
    // Apply body theme class
    document.body.className = currentTheme === 'cyan' ? '' : `theme-${currentTheme}`;
    localStorage.setItem('umar_portfolio_theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    // Detect secret URL hash #admin or #apoxyl-admin to trigger secure portal
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#apoxyl-admin') {
        setIsAdminOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Lock body scroll when full-screen immersive modes or admin modal are open
  useEffect(() => {
    if (isSpaceOpen || isAdminOpen || showWelcomePage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSpaceOpen, isAdminOpen, showWelcomePage]);

  // Global Escape key handler for open full-screen overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showWelcomePage) setShowWelcomePage(false);
        if (isSpaceOpen) setIsSpaceOpen(false);
        if (isAdminOpen) handleCloseAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWelcomePage, isSpaceOpen, isAdminOpen]);

  const handleSaveData = (newData) => {
    setCurrentData(newData);
    localStorage.setItem('umar_portfolio_data', JSON.stringify(newData));
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Accessibility: Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-cyan-500 focus:text-slate-950 focus:font-bold focus:font-mono focus:text-xs focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        Skip to main content
      </a>

      {/* Global Animated Wireframe Technology Motion Background */}
      <WireframeBackground />

      {/* Optional Full-Screen Motion Gateway Welcome Page */}
      {showWelcomePage && (
        <WelcomePage onEnter={() => setShowWelcomePage(false)} />
      )}

      {/* 3D Deep Space Navigator Simulator */}
      <SpaceExplorer isOpen={isSpaceOpen} onClose={() => setIsSpaceOpen(false)} />

      <Navbar
        data={currentData}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        onShowWelcome={() => setShowWelcomePage(true)}
        onOpenSpace={() => setIsSpaceOpen(true)}
      />

      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <HeroSection data={currentData} />
        <AboutSection data={currentData} />
        <ExperienceSection data={currentData} />
        <ProjectsSection data={currentData} />
        <CertificationsSection data={currentData} />
        <SkillsSection data={currentData} />
        <AchievementsSection data={currentData} />
        <ContactSection data={currentData} />
      </main>

      <Footer data={currentData} />

      {/* Floating Apoxyl AI Assistant — hidden when Space Explorer or Welcome page is active */}
      {!isSpaceOpen && !showWelcomePage && (
        <AiAssistant
          data={currentData}
          onSelectTheme={setCurrentTheme}
        />
      )}

      {/* Secret URL-only Admin Portal (#admin) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        currentData={currentData}
        onSaveData={handleSaveData}
      />
    </div>
  );
}
