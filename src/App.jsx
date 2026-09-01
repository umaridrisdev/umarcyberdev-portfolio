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
  const [currentData, setCurrentData] = useState(() => {
    const saved = localStorage.getItem('umar_portfolio_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialData;
      }
    }
    return initialData;
  });

  const [showWelcomePage, setShowWelcomePage] = useState(true);
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
      
      {/* Global Animated Blue Wireframe Technology Motion Background with Interactive Star Touch Bursts */}
      <WireframeBackground />

      {/* Full-Screen Motion Gateway Welcome Page */}
      {showWelcomePage && (
        <WelcomePage onEnter={() => setShowWelcomePage(false)} />
      )}

      {/* Realistic Deep Space Navigator */}
      <SpaceExplorer isOpen={isSpaceOpen} onClose={() => setIsSpaceOpen(false)} />

      <Navbar
        data={currentData}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        onShowWelcome={() => setShowWelcomePage(true)}
        onOpenSpace={() => setIsSpaceOpen(true)}
      />

      <main className="relative z-10">
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

      {/* Floating Apoxyl AI Assistant — hidden when Space Explorer is active */}
      {!isSpaceOpen && (
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
