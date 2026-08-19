import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, Eye, Download, FileText, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import CertificateModal from './CertificateModal';

export default function CertificationsSection({ data }) {
  const certifications = data?.certifications || resumeData.certifications;
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" className="py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIAL VERIFICATION CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Click any certificate card to inspect official PDF documents or verify credentials directly online.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-xl"
            >
              
              {/* Badge & Issuer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-300">
                    {cert.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{cert.issuer} • {cert.date}</p>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                  {cert.description}
                </p>
              </div>

              {/* Verification & Download Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect PDF Document</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={cert.pdfPath}
                    download
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-mono text-[11px] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 font-mono text-[11px] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Online</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Certificate Modal */}
      {activeCert && (
        <CertificateModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  );
}
