import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, Eye, Download, FileText, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import CertificateModal from './CertificateModal';

export default function CertificationsSection({ data }) {
  const certifications = data?.certifications || resumeData.certifications;
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" className="py-20 sm:py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIAL VERIFICATION CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Inspect official certificate documents directly or verify credentials online via accredited issuing bodies.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 group shadow-xl"
            >
              
              {/* Badge & Issuer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-semibold shadow-sm">
                    {cert.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{cert.issuer} &bull; {cert.date}</p>
                </div>

                {cert.pdfPath.match(/\.(png|jpg|jpeg|webp)$/i) && (
                  <div
                    onClick={() => setActiveCert(cert)}
                    className="w-full h-36 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/80 cursor-pointer relative group/thumb flex items-center justify-center p-1 hover:border-cyan-500/50 transition-colors"
                  >
                    <img
                      src={cert.pdfPath}
                      alt={cert.title}
                      className="w-full h-full object-contain rounded-xl group-hover/thumb:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-cyan-300 backdrop-blur-[2px] rounded-xl">
                      <Eye className="w-4 h-4" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                )}

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                  {cert.description}
                </p>
              </div>

              {/* Verification & Download Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-md cursor-pointer"
                  aria-label={`Inspect ${cert.title} PDF Document`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect PDF Document</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={cert.pdfPath}
                    download
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-mono text-[11px] transition-colors shadow-sm"
                    aria-label={`Download ${cert.title} PDF`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 font-mono text-[11px] transition-colors shadow-sm"
                      aria-label={`Verify ${cert.title} Online`}
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
