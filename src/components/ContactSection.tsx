import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('protocol');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const randomId = 'HF-REQ-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section className="w-full bg-[#0e0e10] py-16 md:py-24" id="contact">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 bg-[#121318] border border-[#282a36] p-8 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ff5a1f]/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Left Column: Info & Lab Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold block mb-2">
                Connect with Hummingbird Lab
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#e5e1e4] tracking-tight mb-4">
                We Love Hearing From You!
              </h2>
              <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/80 mb-8 leading-relaxed">
                Have questions regarding custom microdose protocols, enterprise athletic wholesale, or scientific research partnerships? Our bio-optimization engineers respond within 24 hours.
              </p>

              <div className="flex flex-col gap-4 font-['JetBrains_Mono'] text-sm text-[#e5e1e4] mb-10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ffb59e] text-[20px] shrink-0">mail</span>
                  <a href="mailto:lab@hummingbirdfuel.com" className="hover:text-[#ff5a1f] transition-colors">
                    lab@hummingbirdfuel.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ffb77f] text-[20px] shrink-0">location_on</span>
                  <span>Neuro-Formulation Labs • Austin, TX &amp; Zurich, CH</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ffb95a] text-[20px] shrink-0">verified_user</span>
                  <span>30-Day Full Efficacy Guarantee on All First Orders</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#201f21] border border-[#282a36] flex items-center gap-4">
              <span className="material-symbols-outlined text-[#ffb77f] text-[28px] shrink-0">shield</span>
              <span className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed">
                Every formula is 3rd-party lab tested for heavy metals, potency, microbial safety, and active bioavailability.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-6">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-[#1c1b1d] border border-[#ff5a1f]/30 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#ff5a1f]/20 border border-[#ff5a1f] flex items-center justify-center text-[#ff5a1f] mb-4">
                  <span className="material-symbols-outlined text-[32px]">check</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#e5e1e4] mb-2">
                  Message Transmitted
                </h3>
                <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 max-w-sm mb-4">
                  Your inquiry has been encrypted and routed directly to our chief neuro-formulation team.
                </p>
                <div className="p-3 rounded-lg bg-[#121318] border border-[#282a36] font-['JetBrains_Mono'] text-xs text-[#ffb77f] mb-6">
                  DISPATCH REF: {ticketId}
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-[#2a2a2c] text-[#e5e1e4] hover:bg-[#353437] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="font-['JetBrains_Mono'] text-xs text-[#e4beb3]/80 uppercase tracking-wider block mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#201f21] border border-[#282a36] px-4 py-3 rounded-lg font-['Manrope'] text-sm text-[#e5e1e4] focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f] placeholder:text-[#8d90a5]/60 transition-all"
                    placeholder="e.g. Dr. Alex Mercer"
                    required
                    type="text"
                  />
                </div>

                <div>
                  <label className="font-['JetBrains_Mono'] text-xs text-[#e4beb3]/80 uppercase tracking-wider block mb-1.5 font-medium">
                    Email Endpoint
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#201f21] border border-[#282a36] px-4 py-3 rounded-lg font-['Manrope'] text-sm text-[#e5e1e4] focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f] placeholder:text-[#8d90a5]/60 transition-all"
                    placeholder="alex@performance.bio"
                    required
                    type="email"
                  />
                </div>

                <div>
                  <label className="font-['JetBrains_Mono'] text-xs text-[#e4beb3]/80 uppercase tracking-wider block mb-1.5 font-medium">
                    Subject / Inquiry Type
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[#201f21] border border-[#282a36] px-4 py-3 rounded-lg font-['Manrope'] text-sm text-[#e5e1e4] focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f] cursor-pointer"
                  >
                    <option value="protocol">Dosage &amp; Protocol Advice</option>
                    <option value="store">Order &amp; Shipping Support</option>
                    <option value="wholesale">Athletic Team / Wholesale</option>
                    <option value="press">Research &amp; Clinical Press</option>
                  </select>
                </div>

                <div>
                  <label className="font-['JetBrains_Mono'] text-xs text-[#e4beb3]/80 uppercase tracking-wider block mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#201f21] border border-[#282a36] px-4 py-3 rounded-lg font-['Manrope'] text-sm text-[#e5e1e4] focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f] placeholder:text-[#8d90a5]/60 transition-all"
                    placeholder="Describe your circadian schedule or partnership proposal..."
                    required
                    rows={4}
                  ></textarea>
                </div>

                <button
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
