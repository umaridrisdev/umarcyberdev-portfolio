import React, { useState } from 'react';
import { FolderGit2, Search, ArrowRight, Eye, Code, Cpu } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import ProjectModal from './ProjectModal';

export default function ProjectsSection({ data }) {
  const projects = data?.projects || resumeData.projects;
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI & Full-Stack', 'Secure Systems', 'Computer Vision & AI'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Practical AI-powered management platforms, document security solutions, and computer vision systems.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            No projects matching your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
              >
                {/* Image Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800">
                  <img
                    src={project.gallery[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-cyan-400 font-mono text-[11px]">
                    {project.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Details & Screenshots</span>
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal View */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
