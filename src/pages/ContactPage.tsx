import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Check, Clock, ShieldCheck, MessageCircle, Calendar, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenCompliance: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome, onOpenCompliance }) => {
  const [isWhatsAppOnline, setIsWhatsAppOnline] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: '',
    role: 'Lead Prop Master',
    production: '',
    email: '',
    phone: '',
    shootDate: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How fast can prop money be dispatched for an emergency scene reshoot?',
      a: 'We offer same-day priority courier drop-off to major studio hubs in Berlin, London, and Paris for orders confirmed before 15:00 CET. For other European locations, priority overnight flight courier guarantees delivery by 07:00 AM call time.',
    },
    {
      q: 'Does Euro Prop Money include European Central Bank legal documentation?',
      a: 'Yes. Every order is packaged with a stamped, dual-language Certificate of Authenticity referencing ECB Decision 2013/10 (Article 2) criteria to satisfy airport customs, border police, and municipal film commissions.',
    },
    {
      q: 'Can we order with EU VAT 0% Reverse Charge for our production company?',
      a: 'Yes. If your production entity possesses a valid EU VAT identification number, input your VAT ID at checkout or via our PO generator for instantaneous 0% reverse-charge billing.',
    },
    {
      q: 'Do you create custom weathered or blood-splattered prop money?',
      a: 'Yes. Our prop workshop specializes in distressing, tumbling, smoke-aging, and non-permanent stunt staining for action thrillers. Specify this in the inquiry form below.',
    },
  ];

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
          <span className="text-zinc-300 font-semibold">Contact & Support</span>
        </nav>

        {/* Title */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <Phone className="w-4 h-4" />
            <span>24/7 Soundstage Dispatch Desk</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Live Prop Master Line</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Euro Prop Money Support
          </h1>
          <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
            Need urgent delivery before morning call time? Have a high-volume feature film requisition? Our dedicated film logistics coordinators and prop masters are available 24 hours a day, 7 days a week.
          </p>
        </div>

        {/* 3 Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500 uppercase">24/7 Hotline</span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <Clock className="w-3.5 h-3.5" /> 24H Live
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Set Emergency Phone</h3>
              <p className="text-xs text-zinc-400 mb-4">Direct connection to our on-call prop coordinator.</p>
              <a
                href="tel:+493084921000"
                className="text-base font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors block"
              >
                +49 30 8492 1000
              </a>
              <a
                href="tel:+442079460192"
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors block mt-1"
              >
                UK: +44 20 7946 0192
              </a>
            </div>
            <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] text-zinc-500">
              Immediate call answering for active sets
            </div>
          </div>

          {/* Email */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500 uppercase">Studio POs</span>
                <span className="text-[11px] font-mono text-zinc-400">&lt;20 min turnaround</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Production Requisitions</h3>
              <p className="text-xs text-zinc-400 mb-4">Send scripts, call sheets, and accounting purchase orders.</p>
              <a
                href="mailto:dispatch@europropmoney.com"
                className="text-base font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors block"
              >
                dispatch@europropmoney.com
              </a>
            </div>
            <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] text-zinc-500">
              Invoicing & VAT compliance team
            </div>
          </div>

          {/* WhatsApp Toggle Indicator */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500 uppercase">WhatsApp Live</span>
                <button
                  type="button"
                  onClick={() => setIsWhatsAppOnline(!isWhatsAppOnline)}
                  className="text-[10px] font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Toggle Status
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Instant Messaging</h3>
              <p className="text-xs text-zinc-400 mb-4">Send photos of scene setups or location references.</p>
              <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>+44 7700 900842</span>
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-zinc-800 flex items-center gap-2 text-[11px] font-mono">
              <span className={`w-2.5 h-2.5 rounded-full ${isWhatsAppOnline ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
              <span className={isWhatsAppOnline ? 'text-emerald-400' : 'text-zinc-500'}>
                {isWhatsAppOnline ? 'Live On-Set Dispatch Available' : 'Offline · Leave Voice Note'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Inquiry Form & European Fulfillment Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">
              Production Studio Requisition Form
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Complete the form below to receive a formal quotation, availability status, and customs affidavit for your production.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-zinc-950 rounded-xl border border-emerald-500/30 p-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">Requisition Received by Dispatch</h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Our lead prop coordinator has received your shoot details for <strong>{form.shootDate || 'your upcoming shoot'}</strong>. We are preparing your quotation and legal clearance documentation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-zinc-800 text-xs text-white rounded-lg hover:bg-zinc-700"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Weber"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1.5">Production Role</label>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs font-sans cursor-pointer"
                    >
                      <option>Lead Prop Master</option>
                      <option>Prop Master / Standby</option>
                      <option>Art Director</option>
                      <option>Line Producer / Production Manager</option>
                      <option>Director of Photography</option>
                      <option>Independent Creator / Producer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1.5">Production Company & Film Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Studio Babelsberg / Shadow Heist"
                      value={form.production}
                      onChange={(e) => setForm({ ...form, production: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-400 font-mono mb-1.5 flex items-center gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Target Shoot Date (Required)</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={form.shootDate}
                      onChange={(e) => setForm({ ...form, shootDate: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1.5">Studio Email</label>
                    <input
                      type="email"
                      required
                      placeholder="props@production-studio.de"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1.5">Set Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+49 170 8920194"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono mb-1.5">Requisition Details & Soundstage Delivery Address</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details: denominations required (€50, €100, €500), quantity of stacks, soundstage number/address, or special needs (e.g. aged stunt bills, custom bundles, customs clearance paperwork)."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-400 text-xs font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Production Studio Inquiry</span>
                </button>
              </form>
            )}

            <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Strict script NDA compliance guaranteed. All client specifications remain confidential.</span>
            </div>
          </div>

          {/* European Fulfillment Hubs & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hubs */}
            <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>European Fulfillment Hubs</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div className="font-bold text-white mb-0.5">Berlin Central Vault</div>
                  <div className="text-zinc-400 text-[11px]">August-Bebel-Str. 26-53, 14482 Potsdam (Studio Babelsberg Stage Gate)</div>
                  <div className="text-emerald-400 text-[10px] font-mono mt-1">Same-Day Stage Courier: 2-3 Hours</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div className="font-bold text-white mb-0.5">London Soundstage Facility</div>
                  <div className="text-zinc-400 text-[11px]">Pinewood Road, Iver Heath, SL0 0NH, United Kingdom</div>
                  <div className="text-emerald-400 text-[10px] font-mono mt-1">Same-Day London Stages Dispatch</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div className="font-bold text-white mb-0.5">Paris Studio Liaison Depot</div>
                  <div className="text-zinc-400 text-[11px]">Rue de la Plaine, 93210 Saint-Denis, France</div>
                  <div className="text-emerald-400 text-[10px] font-mono mt-1">Priority Île-de-France Messenger</div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Accordion */}
            <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800 p-6 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-zinc-800/80 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full p-3 text-left bg-zinc-950 text-xs font-semibold text-white flex items-center justify-between gap-2 cursor-pointer hover:bg-zinc-900"
                    >
                      <span>{faq.q}</span>
                      {activeFaq === i ? <ChevronUp className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />}
                    </button>
                    {activeFaq === i && (
                      <div className="p-3 bg-zinc-900/40 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
