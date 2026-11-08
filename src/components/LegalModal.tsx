import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, RefreshCw, Truck, Printer, Scale } from 'lucide-react';

export type LegalTab = 'terms' | 'privacy' | 'refund' | 'shipping' | 'compliance';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
  onOpenCompliance?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms',
  onOpenCompliance,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Legal & Compliance Center
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                ECB Decision 2013/10 Section 2(3) Compliant European Supplier
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close legal modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 bg-slate-100/70 px-4 overflow-x-auto no-scrollbar gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'refund'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refund & Returns</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'shipping'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping & Delivery</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'compliance'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ECB Safe Harbor</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed max-h-[60vh]">
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">Terms and Conditions of Supply</h4>
              <p className="text-slate-500 font-mono text-[11px]">Last Updated: November 2026</p>
              
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-medium">
                <strong>CRITICAL LEGAL CONDITION:</strong> All banknotes supplied are prop replicas manufactured exclusively for motion pictures, theatrical productions, television broadcasts, photography, and AI virtual sets. They are NOT legal tender. Any attempt to negotiate, circulate, or spend prop banknotes constitutes a severe criminal offense under European and national counterfeit penal codes.
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">1. Production Authorization & Buyer Representation</h5>
                <p>
                  By placing an order via Bank Transfer or USDT, the purchaser certifies that all ordered materials are strictly procured for legitimate entertainment, artistic, promotional, or educational purposes. The purchaser agrees not to deface, remove, or conceal the indelible "FOR MOTION PICTURE USE ONLY" markings.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">2. Order Acceptance & Payment Settlement</h5>
                <p>
                  Orders placed through this WooCommerce storefront are registered immediately. Payment details (Bank Transfer IBAN/BIC or USDT deposit wallet address) are provided on the Order Received screen. Production dispatch occurs upon payment receipt.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">3. Customs & Border Transit Clearance</h5>
                <p>
                  Orders shipped across national boundaries within the European Economic Area or abroad include our official Certificate of Manufacture under ECB Decision 2013/10. Customers are responsible for local production notification where mandated by municipal authorities.
                </p>
              </div>

              <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <h5 className="font-bold text-slate-900">4. Company Identification &amp; Registered Address (Impressum)</h5>
                <p className="font-medium text-slate-800">
                  Euro Prop Money EU · European Motion Picture Supplier
                </p>
                <p className="text-slate-600 font-mono text-[11px]">
                  Stralauer Allee 7, 10245 Berlin-Bezirk Friedrichshain-Kreuzberg, Germany
                </p>
                <p className="text-slate-500 text-[11px]">
                  VAT ID: EU8392019482 · Hotline: +49 30 8492 1000 · PO Desk: dispatch@europropmoney.com
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">Privacy Policy (GDPR Compliant)</h4>
              <p className="text-slate-500 font-mono text-[11px]">Effective Date: November 2026</p>

              <p>
                Euro Prop Money EU is committed to safeguarding the privacy and confidentiality of film studio personnel, line producers, art departments, and independent creators in accordance with Regulation (EU) 2016/679 (GDPR).
              </p>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">1. Data We Collect</h5>
                <p>
                  We collect production titles, authorized prop master names, soundstage delivery addresses, billing email addresses, and phone numbers strictly for order fulfillment, dispatch tracking, and VAT accounting.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">2. Payment Confidentiality</h5>
                <p>
                  We do not store credit card credentials on our servers. Bank transfer and USDT settlement details are provided directly to the purchaser after order registration, maintaining total financial privacy and eliminating third-party card tracking.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">3. Studio NDA & Confidential Productions</h5>
                <p>
                  We regularly supply unannounced feature films, confidential streaming series, and closed sets. We never disclose client shoot schedules, prop inventory, or set locations to public registries.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">Refund & Returns Policy</h4>
              <p className="text-slate-500 font-mono text-[11px]">Art Department Guarantee</p>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">1. 14-Day Production Inspection Guarantee</h5>
                <p>
                  If your prop banknote stacks arrive with any defect, packaging rupture, or color deviation that fails camera testing on your soundstage, notify us within 14 days of delivery. We will issue immediate replacements or a full refund upon return of unopened stacks in their original security straps.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">2. Emergency Reshoot Exchanges</h5>
                <p>
                  Need to swap denominations (€50 to €100) or finishes (Crisp to Weathered) before principal photography starts? Contact our 24/7 call sheet support desk for priority courier exchange.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">3. Custom Flight Cases & Vault Builds</h5>
                <p>
                  Custom laser-cut foam cases (such as Director's Suitcases engraved with production insignias) are subject to inspection and material verification prior to return authorization.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">Shipping & Delivery Policy</h4>
              <p className="text-slate-500 font-mono text-[11px]">Priority Studio Logistics Across Europe</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block text-xs">Standard European Courier</span>
                  <span className="text-slate-500 text-[11px]">2–3 business days · Free on orders over €100</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="font-bold text-amber-900 block text-xs">Call Sheet 24-Hour Express</span>
                  <span className="text-amber-800 text-[11px]">Next-day morning delivery to stages & studios</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">1. Direct Soundstage & Location Delivery</h5>
                <p>
                  We deliver directly to studio guard gates and soundstages (e.g. Studio Babelsberg, Thames Screenworks, Cinecittà, Pinewood Studios, Bavaria Film) with clear production title manifests.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900">2. Packaging & Security</h5>
                <p>
                  All shipments are packed in heavy-duty tamper-evident kraft packaging without revealing currency graphics on the external courier box, ensuring discreet transit through domestic and international logistics hubs.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">European Central Bank Decision ECB/2013/10</h4>
              <p className="text-slate-500 font-mono text-[11px]">Article 2 Reproductions Framework</p>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% Certified Legal Reproduction</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Under Article 2, Paragraph 3 of Decision ECB/2013/10, reproductions of euro banknotes that do not risk confusion with genuine banknotes are deemed lawful throughout the European Union.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <h5 className="font-bold text-slate-900">Key Safety Specifications Built Into Every Bill:</h5>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Disproportionate Legal Scale:</strong> 125% length and width variance ratio compared to genuine legal tender.</li>
                  <li><strong>Mandatory Markings:</strong> Permanent "FOR MOTION PICTURE USE ONLY" and "PROP SPECIMEN" banners printed on both sides.</li>
                  <li><strong>Substrate Exclusions:</strong> Non-cotton, anti-glare 120gsm cellulose stock without fluorescent fibers, metallic security threads, or optical variable inks.</li>
                  <li><strong>Documentation:</strong> Each order includes a stamped Art Department Certificate of Authenticity for customs officers and police departments.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Legal Policy</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
