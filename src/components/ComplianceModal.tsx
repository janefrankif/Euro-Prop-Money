import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Download } from 'lucide-react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              European Central Bank (ECB) Compliance Framework
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close compliance guide"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-zinc-300 text-xs leading-relaxed">
          {/* Executive Overview */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Legal Safe Harbor for Film & Television Producers
            </span>
            <p className="text-zinc-300">
              Under European Central Bank Decision <strong>ECB/2013/10 (Article 2)</strong>, reproducing images of euro banknotes without authorization is illegal unless the reproduction cannot be mistaken by the general public for genuine notes.
            </p>
            <p className="text-zinc-400 text-[11px]">
              Every prop bill manufactured by CINE EURO is engineered to strictly satisfy Section 2 criteria, ensuring film productions operate with 100% legal protection across all European Union member states.
            </p>
          </div>

          {/* Core Mandated Specifications */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
              The 4 ECB Non-Negotiable Rules Applied to CINE EURO Props
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>1. Dimensional Variance (&gt;125% / &lt;75%)</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  All two-sided prop bills differ from genuine dimensions by &gt;125% length/width or &lt;75% surface area, maintaining cinematic aspect ratio on lens while failing physical ATM/wallet specifications.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>2. Indelible Legal Markings</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Every note features high-contrast indelible text: <code className="text-amber-400">FOR MOTION PICTURE USE ONLY</code> and <code className="text-amber-400">PROP SPECIMEN</code>. The word &quot;EURO&quot; is modified in secondary lines to prevent confusion.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>3. Anti-Glare Non-Cotton Paper</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Genuine Euro bills use 100% cotton fiber substrate. CINE EURO utilizes custom wood-pulp cellulose bond paper with anti-reflective coating. UV scanners immediately reveal lack of ECB security fibers.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>4. Hologram & Watermark Exclusion</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Prop notes do NOT feature optical variable inks, genuine foil holograms, or genuine metallic thread strips. They rely on high-fidelity cinematic print textures that look authentic on camera monitors without counterfeiting technology.
                </p>
              </div>
            </div>
          </div>

          {/* On-Location Shoot Security Guidelines */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Prop Master On-Set Protocols:</span>
            </div>
            <ul className="list-disc pl-5 text-zinc-400 text-[11px] space-y-1">
              <li>Keep all prop currency in designated lockable equipment cases when not actively rolling cameras.</li>
              <li>Always keep the CINE EURO Certificate of Manufacture inside the camera truck or art department binder.</li>
              <li>Notify local municipal film liaison offices when shooting exterior public scenes involving large sums of prop cash.</li>
              <li>Never attempt to spend or circulate prop money in commercial establishments (carries severe criminal penalties under EU penal law).</li>
            </ul>
          </div>

          {/* Bottom Action */}
          <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
            <span className="text-[11px] text-zinc-500">Document Ref: ECB-DEC-2013-10-CINEPRO</span>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Studio Clearance Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
