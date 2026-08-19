import React from 'react';
import { X, ExternalLink, Github, CheckCircle, Code, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        </div>

        {/* Gallery Carousel / Images */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.gallery.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video">
                <img
                  src={img}
                  alt={`${project.title} preview ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="space-y-4">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Project Overview</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{project.fullDesc}</p>
        </div>

        {/* Highlights */}
        <div className="space-y-3">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Key Features & Architecture</h4>
          <div className="space-y-2">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Technologies Used</h4>
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
        <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Code on GitHub</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
