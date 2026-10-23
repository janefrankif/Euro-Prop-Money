import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Send, Check, Clock, ShieldCheck, MessageCircle, Calendar } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isWhatsAppOnline, setIsWhatsAppOnline] = useState(true);
  const [form, setForm] = useState({
    name: '',
    production: '',
    email: '',
    phone: '',
    shootDate: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Euro Prop Money · 24/7 Studio Support Hub
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact modal"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-300">
          {/* Support Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Phone */}
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">24/7 Call Sheet Phone</span>
              <a href="tel:+493084921000" className="text-xs font-mono font-bold text-white hover:text-amber-400 block transition-colors">
                +49 30 8492 1000
              </a>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> Live Dispatch Desk
              </span>
            </div>

            {/* Email */}
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">Studio PO Desk</span>
              <a href="mailto:dispatch@europropmoney.com" className="text-xs font-mono font-bold text-white hover:text-amber-400 block transition-colors">
                dispatch@europropmoney.com
              </a>
              <span className="text-[10px] text-zinc-400">Response &lt; 20 mins</span>
            </div>

            {/* WhatsApp with Interactive Toggle Indicator */}
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">WhatsApp Live</span>
                  <button
                    type="button"
                    onClick={() => setIsWhatsAppOnline(!isWhatsAppOnline)}
                    className="text-[9px] font-mono text-zinc-500 hover:text-zinc-300 underline cursor-pointer"
                  >
                    Toggle Status
                  </button>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+44 7700 900842</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isWhatsAppOnline ? 'bg-emerald-400' : 'bg-zinc-600'
                  }`}
                />
                <span className={isWhatsAppOnline ? 'text-emerald-400' : 'text-zinc-500'}>
                  {isWhatsAppOnline ? 'Online · Instant Set Support' : 'Offline · Leave Voice Note'}
                </span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3 bg-zinc-950 rounded-xl border border-emerald-500/30 p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Production Inquiry Received</h4>
              <p className="text-zinc-400 max-w-sm mx-auto text-[11px]">
                Our studio prop liaison has received your details and target shoot date. We will send clearance forms and a formal requisition quotation within 20 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Your Name / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Weber (Prop Master)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Production Studio / Film Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Studio Babelsberg / Shadow Heist"
                    value={form.production}
                    onChange={(e) => setForm({ ...form, production: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Production Email</label>
                  <input
                    type="email"
                    required
                    placeholder="props@production.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Set Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+44 7700 900077"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-amber-400 font-mono mb-1 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3 h-3" />
                    <span>Target Shoot Date</span>
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

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Requisition or Scene Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify denominations required, quantity of stacks/cases, delivery soundstage address, or special requirements (e.g. distressed notes, stunt money, customs paperwork)."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 resize-none text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs uppercase tracking-wider"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Production Studio Inquiry</span>
              </button>
            </form>
          )}

          <div className="pt-2 text-[11px] text-zinc-500 flex items-center gap-1.5 border-t border-zinc-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Strict NDA confidentiality guaranteed. All inquiries handled by certified European film prop coordinators.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
