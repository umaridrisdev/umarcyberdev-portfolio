import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle, Code, Layers, ShieldCheck } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] space-y-6"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close Project Details Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
            {project.category}
          </span>
          <h3 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-white">
            {project.title}
          </h3>
        </div>

        {/* Gallery Carousel / Images */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.gallery.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video relative group">
                <img
                  src={img}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">Project Overview</h4>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{project.fullDesc || project.shortDesc}</p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">Key Features & Security Highlights</h4>
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">Technologies Applied</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs font-semibold hover:bg-slate-700 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Code on GitHub</span>
            </a>
          )}

          {project.demoUrl && project.demoUrl !== '#' ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Deployment</span>
            </a>
          ) : (
            <span className="text-[11px] font-mono text-slate-400 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Institutional / Lab Security Build</span>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
