import React, { useState, useEffect } from 'react';
import { Shield, Lock, X, Plus, Trash2, Edit3, Save, Download, Key, AlertTriangle, CheckCircle, Upload, Eye, Image as ImageIcon, FileText } from 'lucide-react';

const DEFAULT_PIN = "Apoxyl2026!"; // Umar's Admin Master Passcode

export default function AdminModal({ isOpen, onClose, currentData, onSaveData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('brand');

  // Local Editable Copy of resumeData
  const [editableData, setEditableData] = useState(JSON.parse(JSON.stringify(currentData)));

  // New item form states
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', badge: '🛡️ Certified', pdfPath: 'assets/awareness.pdf', verificationUrl: '', description: '' });
  const [newAch, setNewAch] = useState('');
  const [newProject, setNewProject] = useState({ title: '', category: 'AI & Full-Stack', shortDesc: '', fullDesc: '', technologies: '', gallery: 'assets/project1.png' });

  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setEditableData(JSON.parse(JSON.stringify(currentData)));
  }, [currentData]);

  if (!isOpen) return null;

  // Handle Login Verification with rate limiting
  const handleLogin = (e) => {
    e.preventDefault();
    if (isLockedOut) {
      setErrorMsg("Security Lockout: Too many failed attempts. Try again later.");
      return;
    }

    if (passwordInput === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setErrorMsg('');
      setPasswordInput('');
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      if (attempts >= 5) {
        setIsLockedOut(true);
        setErrorMsg("Security Lockout Activated! 5 failed attempts detected.");
      } else {
        setErrorMsg(`Invalid Passcode! ${5 - attempts} attempts remaining.`);
      }
    }
  };

  // Sanitization helper
  const sanitize = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  // Universal File Upload Handler (converts image/PDF files directly to Base64 Data URLs)
  const handleFileUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
      showNotification(`File "${file.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  // Handlers for Certifications
  const handleAddCert = (e) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;
    const certItem = {
      id: `cert-${Date.now()}`,
      title: sanitize(newCert.title),
      issuer: sanitize(newCert.issuer),
      date: sanitize(newCert.date || '2026'),
      badge: sanitize(newCert.badge),
      pdfPath: newCert.pdfPath, // supports Base64 Data URL or file path
      verificationUrl: sanitize(newCert.verificationUrl),
      description: sanitize(newCert.description),
      verified: true
    };
    const updated = { ...editableData, certifications: [certItem, ...editableData.certifications] };
    setEditableData(updated);
    onSaveData(updated);
    setNewCert({ title: '', issuer: '', date: '', badge: '🛡️ Certified', pdfPath: 'assets/awareness.pdf', verificationUrl: '', description: '' });
    showNotification("New Certification added successfully!");
  };

  const handleDeleteCert = (id) => {
    const updated = { ...editableData, certifications: editableData.certifications.filter(c => c.id !== id) };
    setEditableData(updated);
    onSaveData(updated);
    showNotification("Certification removed.");
  };

  // Handlers for Achievements
  const handleAddAch = (e) => {
    e.preventDefault();
    if (!newAch.trim()) return;
    const updated = { ...editableData, achievements: [sanitize(newAch.trim()), ...editableData.achievements] };
    setEditableData(updated);
    onSaveData(updated);
    setNewAch('');
    showNotification("New Achievement posted!");
  };

  const handleDeleteAch = (index) => {
    const updated = { ...editableData, achievements: editableData.achievements.filter((_, i) => i !== index) };
    setEditableData(updated);
    onSaveData(updated);
    showNotification("Achievement deleted.");
  };

  // Handlers for Projects
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    const projectItem = {
      id: `proj-${Date.now()}`,
      title: sanitize(newProject.title),
      category: sanitize(newProject.category),
      shortDesc: sanitize(newProject.shortDesc),
      fullDesc: sanitize(newProject.fullDesc),
      highlights: ["Secure application workflow", "Responsive UI"],
      technologies: newProject.technologies ? newProject.technologies.split(',').map(t => t.trim()) : ["React", "Node.js"],
      gallery: [newProject.gallery || 'assets/project1.png'],
      githubUrl: "https://github.com/umaridrisdev"
    };
    const updated = { ...editableData, projects: [projectItem, ...editableData.projects] };
    setEditableData(updated);
    onSaveData(updated);
    setNewProject({ title: '', category: 'AI & Full-Stack', shortDesc: '', fullDesc: '', technologies: '', gallery: 'assets/project1.png' });
    showNotification("New Project published!");
  };

  const handleDeleteProject = (id) => {
    const updated = { ...editableData, projects: editableData.projects.filter(p => p.id !== id) };
    setEditableData(updated);
    onSaveData(updated);
    showNotification("Project removed.");
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const exportDataJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editableData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "resumeData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[92vh] space-y-6">
        
        {/* Close Admin Portal */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="Close Admin Panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Portal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">SECURE ADMINISTRATIVE PORTAL</span>
            <h2 className="text-2xl font-bold text-white">Umar Portfolio CMS</h2>
          </div>
        </div>

        {/* Notification Toast */}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Authentication Required</h3>
              <p className="text-xs text-slate-400 font-mono">
                Enter your administrative security PIN to modify portfolio content.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter Passcode..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  disabled={isLockedOut}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLockedOut}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs hover:scale-[1.01] transition-transform shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                Authenticate Access
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED CMS DASHBOARD */
          <div className="space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
              <button
                onClick={() => setActiveTab('brand')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'brand' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🏷️ Photo & Brand Settings
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'certifications' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                📜 Certifications ({editableData.certifications.length})
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'achievements' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🏆 Achievements ({editableData.achievements.length})
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'projects' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🚀 Projects ({editableData.projects.length})
              </button>
              <button
                onClick={exportDataJSON}
                className="ml-auto px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Backup JSON</span>
              </button>
            </div>

            {/* TAB 0: BRAND & LOGO & PHOTO SETTINGS */}
            {activeTab === 'brand' && (
              <div className="space-y-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSaveData(editableData);
                    showNotification("Photo & Brand settings saved!");
                  }}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 font-mono text-xs"
                >
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Website Photo & Branding Settings
                  </h4>

                  {/* DIRECT FILE UPLOAD FOR PROFILE PHOTO */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <label className="text-white font-bold flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-cyan-400" />
                      <span>Upload New Profile Photo Directly</span>
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {editableData.personalInfo.profilePic && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-cyan-500/40 flex-shrink-0 bg-slate-950">
                          <img src={editableData.personalInfo.profilePic} alt="Profile preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="space-y-1.5 flex-1 w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (base64) => {
                            const updated = {
                              ...editableData,
                              personalInfo: { ...editableData.personalInfo, profilePic: base64 }
                            };
                            setEditableData(updated);
                            onSaveData(updated);
                          })}
                          className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 cursor-pointer font-mono"
                        />
                        <p className="text-[10px] text-slate-500">Pick any image file from your computer or phone. It uploads instantly!</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400">Logo Text / Brand Name</label>
                      <input
                        type="text"
                        value={editableData.personalInfo.brandName || "UMAR PORTFOLIO"}
                        onChange={(e) => setEditableData({
                          ...editableData,
                          personalInfo: { ...editableData.personalInfo, brandName: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-400">Logo Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={editableData.personalInfo.brandSubtitle || "Cybersecurity & AI"}
                        onChange={(e) => setEditableData({
                          ...editableData,
                          personalInfo: { ...editableData.personalInfo, brandSubtitle: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB 1: CERTIFICATIONS */}
            {activeTab === 'certifications' && (
              <div className="space-y-6">
                {/* Form to Add New Certification */}
                <form onSubmit={handleAddCert} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Upload & Add New Certification
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <input
                      type="text"
                      placeholder="Certificate Title (e.g. Certified Ethical Hacker)"
                      value={newCert.title}
                      onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      placeholder="Issuer (e.g. Cisco / CompTIA / EC-Council)"
                      value={newCert.issuer}
                      onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* DIRECT FILE UPLOAD FOR CERTIFICATE PDF */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
                    <label className="text-white font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>Upload Certificate File (PDF or Image)</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => handleFileUpload(e, (base64) => {
                        setNewCert({ ...newCert, pdfPath: base64 });
                      })}
                      className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 cursor-pointer font-mono"
                    />
                    {newCert.pdfPath && newCert.pdfPath.startsWith('data:') && (
                      <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle className="w-3 h-3" />
                        <span>File Loaded into memory!</span>
                      </p>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Online Digital Verification Link (optional)"
                    value={newCert.verificationUrl}
                    onChange={(e) => setNewCert({ ...newCert, verificationUrl: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />

                  <textarea
                    placeholder="Short certificate description..."
                    value={newCert.description}
                    onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    rows="2"
                  ></textarea>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Add Certificate to Live Site
                  </button>
                </form>

                {/* List of Existing Certifications */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-slate-400 uppercase">Existing Certificates</h4>
                  <div className="space-y-2">
                    {editableData.certifications.map((c) => (
                      <div key={c.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 font-mono text-xs">
                        <div>
                          <p className="font-bold text-white">{c.title}</p>
                          <p className="text-[11px] text-slate-400">{c.issuer} &bull; {c.date}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCert(c.id)}
                          className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete Certificate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ACHIEVEMENTS */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <form onSubmit={handleAddAch} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Post New Achievement
                  </h4>
                  <input
                    type="text"
                    placeholder="Type new achievement milestone..."
                    value={newAch}
                    onChange={(e) => setNewAch(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Post Achievement
                  </button>
                </form>

                <div className="space-y-2 font-mono text-xs">
                  {editableData.achievements.map((ach, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                      <span className="text-slate-200">{ach}</span>
                      <button
                        onClick={() => handleDeleteAch(idx)}
                        className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <form onSubmit={handleAddProject} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Publish New Project
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      placeholder="Technologies (e.g. React, Python, Node.js)"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* DIRECT FILE UPLOAD FOR PROJECT SCREENSHOT */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
                    <label className="text-white font-bold flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-cyan-400" />
                      <span>Upload Project Screenshot Image</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (base64) => {
                        setNewProject({ ...newProject, gallery: base64 });
                      })}
                      className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 cursor-pointer font-mono"
                    />
                  </div>

                  <textarea
                    placeholder="Short summary description..."
                    value={newProject.shortDesc}
                    onChange={(e) => setNewProject({ ...newProject, shortDesc: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    rows="2"
                  ></textarea>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Publish Project
                  </button>
                </form>

                <div className="space-y-2 font-mono text-xs">
                  {editableData.projects.map((p) => (
                    <div key={p.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-white">{p.title}</p>
                        <p className="text-[11px] text-slate-400">{p.category} &bull; {p.shortDesc}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
