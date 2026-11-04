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
    <div className="w-full bg-white min-h-screen py-10 lg:py-16 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">ECB Legal Compliance</span>
        </nav>

        {/* Title */}
        <div className="max-w-3xl mb-12 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Official European Regulatory Framework</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Decision ECB/2013/10</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            European Central Bank (ECB) Legal Compliance Guide
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Every prop banknote engineered and supplied by Euro Prop Money complies strictly with European Central Bank rules governing the reproduction of euro currency for motion picture, theatrical, and artistic media.
          </p>
        </div>

        {/* Safe Harbor Directive Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8 space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
                Article 2 of European Central Bank Decision ECB/2013/10
              </span>
              <p>
                Under EU legislation, reproducing images of euro banknotes without authorization is unlawful unless the reproduction cannot be mistaken by the general public for genuine notes. Article 2 establishes strict &ldquo;safe harbor&rdquo; criteria that classify a physical item as a non-counterfeit artistic specimen.
              </p>
              <p className="text-slate-500 text-xs">
                Euro Prop Money operates under full compliance with these statutes, protecting production companies, executive producers, and line coordinators from criminal liability.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                The 4 Legally Mandated Specifications Applied to All Stacks
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">1. Dimensional Scaling Variance (&gt;125% / &lt;75%)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All double-sided prop currency differs from official European Central Bank banknote dimensions by at least 125% in length and width, or less than 75% of both dimensions. This prevents mechanical validation in ATMs, cash deposit machines, or vending bill acceptors while reading 100% authentic on camera monitors.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">2. Prominent Indelible Markings</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every note is manufactured with permanent, high-contrast text stating: <code className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">FOR MOTION PICTURE USE ONLY</code> and <code className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">PROP SPECIMEN</code>. Secondary signature lines and central logos are intentionally altered to distinguish them from valid legal tender.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">3. Non-Cotton Optical Matte Paper Substrate</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Authentic euro banknotes are made from 100% cotton fiber rags with embedded security threads and fluorescent fibers. Our prop currency uses 120gsm wood-pulp cellulose bond paper with anti-reflective coating. Under UV currency scanners, our notes exhibit zero luminescence and lack magnetic ink.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">4. Exclusion of Foil Holograms and Watermarks</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We never utilize genuine metallic foil patches, optical variable inks, or light-transmission watermarks. Visual depth is achieved purely through high-definition camera-calibrated offset printing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Set Security Protocols */}
            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>On-Set Prop Master & Line Producer Responsibilities:</span>
              </div>
              <ul className="list-disc pl-5 text-slate-600 text-xs space-y-1.5">
                <li>Keep all prop cash in lockable equipment flight cases when cameras are not actively rolling.</li>
                <li>Store the physical Certificate of Manufacture inside the camera truck or art department binder at all times.</li>
                <li>Inform municipal police and local film commission offices when staging outdoor robbery scenes in public locations.</li>
                <li>Never attempt to circulate, spend, or exchange prop money in commercial businesses (strictly prohibited under penal code).</li>
              </ul>
            </div>
          </div>

          {/* Certificate Download & Requisition Sidebar */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase">Official Studio Document</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Download Studio Clearance Pass
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Attach this official dual-language certificate to your ATA Carnet or location permit binder for airport security and customs officers.
              </p>
              <button
                onClick={() => window.print()}
                className="w-full py-3 px-4 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Clearance Pass</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-700 mb-2">
                Need Formal Purchase Order?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Generate an itemized studio requisition with production title and European VAT number for your production accounting team.
              </p>
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Generate Production PO</span>
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] font-mono text-slate-600 space-y-1">
              <div className="text-slate-900 font-bold">LEGAL REFERENCE:</div>
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
