import React from 'react';
import { X, ExternalLink, Download, ShieldCheck, FileText } from 'lucide-react';

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[92vh] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Credential</span>
            </span>
            <span className="text-xs font-mono text-cyan-400">{cert.issuer}</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{cert.title}</h3>
          <p className="text-xs font-mono text-slate-400">Issued: {cert.date}</p>
        </div>

        {/* PDF Viewer Frame */}
        <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <iframe
            src={`${cert.pdfPath}#toolbar=0`}
            title={`${cert.title} Document`}
            className="w-full h-full border-none"
          />
        </div>

        {/* Certificate Description */}
        <p className="text-slate-300 text-sm leading-relaxed">{cert.description}</p>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <a
            href={cert.pdfPath}
            download
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF</span>
          </a>

          {cert.verificationUrl && (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Verify Digital Credential Online</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
