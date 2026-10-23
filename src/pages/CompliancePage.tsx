import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Download, Printer, ArrowRight } from 'lucide-react';

interface CompliancePageProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onOpenQuote: () => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onOpenQuote,
}) => {
  return (
    <div className="w-full bg-zinc-950 min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-300 font-semibold">ECB Legal Compliance</span>
        </nav>

        {/* Title */}
        <div className="max-w-3xl mb-12 pb-8 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Official European Regulatory Framework</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Decision ECB/2013/10</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            European Central Bank (ECB) Legal Compliance Guide
          </h1>
          <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
            Every prop banknote engineered and supplied by Euro Prop Money complies strictly with European Central Bank rules governing the reproduction of euro currency for motion picture, theatrical, and artistic media.
          </p>
        </div>

        {/* Safe Harbor Directive Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8 space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Article 2 of European Central Bank Decision ECB/2013/10
              </span>
              <p>
                Under EU legislation, reproducing images of euro banknotes without authorization is unlawful unless the reproduction cannot be mistaken by the general public for genuine notes. Article 2 establishes strict &ldquo;safe harbor&rdquo; criteria that classify a physical item as a non-counterfeit artistic specimen.
              </p>
              <p className="text-zinc-400 text-xs">
                Euro Prop Money operates under full compliance with these statutes, protecting production companies, executive producers, and line coordinators from criminal liability.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                The 4 Legally Mandated Specifications Applied to All Stacks
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">1. Dimensional Scaling Variance (&gt;125% / &lt;75%)</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      All double-sided prop currency differs from official European Central Bank banknote dimensions by at least 125% in length and width, or less than 75% of both dimensions. This prevents mechanical validation in ATMs, cash deposit machines, or vending bill acceptors while reading 100% authentic on camera monitors.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">2. Prominent Indelible Markings</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Every note is manufactured with permanent, high-contrast text stating: <code className="text-amber-400">FOR MOTION PICTURE USE ONLY</code> and <code className="text-amber-400">PROP SPECIMEN</code>. Secondary signature lines and central logos are intentionally altered to distinguish them from valid legal tender.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">3. Non-Cotton Optical Matte Paper Substrate</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Authentic euro banknotes are made from 100% cotton fiber rags with embedded security threads and fluorescent fibers. Our prop currency uses 120gsm wood-pulp cellulose bond paper with anti-reflective coating. Under UV currency scanners, our notes exhibit zero luminescence and lack magnetic ink.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">4. Exclusion of Foil Holograms and Watermarks</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      We never utilize genuine metallic foil patches, optical variable inks, or light-transmission watermarks. Visual depth is achieved purely through high-definition camera-calibrated offset printing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Set Security Protocols */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>On-Set Prop Master & Line Producer Responsibilities:</span>
              </div>
              <ul className="list-disc pl-5 text-zinc-400 text-xs space-y-1.5">
                <li>Keep all prop cash in lockable equipment flight cases when cameras are not actively rolling.</li>
                <li>Store the physical Certificate of Manufacture inside the camera truck or art department binder at all times.</li>
                <li>Inform municipal police and local film commission offices when staging outdoor robbery scenes in public locations.</li>
                <li>Never attempt to circulate, spend, or exchange prop money in commercial businesses (strictly prohibited under penal code).</li>
              </ul>
            </div>
          </div>

          {/* Certificate Download & Requisition Sidebar */}
          <div className="lg:col-span-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 sm:p-7 space-y-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase">Official Studio Document</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Download Studio Clearance Pass
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Attach this official dual-language certificate to your ATA Carnet or location permit binder for airport security and customs officers.
              </p>
              <button
                onClick={() => window.print()}
                className="w-full py-3 px-4 bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Clearance Pass</span>
              </button>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 mb-2">
                Need Formal Purchase Order?
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Generate an itemized studio requisition with production title and European VAT number for your production accounting team.
              </p>
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Generate Production PO</span>
              </button>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-400 space-y-1">
              <div className="text-white font-bold">LEGAL REFERENCE:</div>
              <div>• Decision ECB/2013/10</div>
              <div>• OJ L 118, 30.4.2013, p. 37</div>
              <div>• Registered Studio Clearance ID: CE-2013-10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
