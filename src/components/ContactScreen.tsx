import React, { useState } from 'react';

export const ContactScreen: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCoa, setSelectedCoa] = useState<string | null>(null);

  const faqs = [
    {
      q: 'How quickly does the sublingual mist absorb compared to coffee or pills?',
      a: 'Unlike swallowed pills or energy drinks that must transit the digestive tract and get metabolized by the liver over 45-60 minutes, Hummingbird Fuel nano-droplets absorb directly into the sublingual mucosa within 90 seconds. Clinical telemetry records initial cerebral bioavailability at 90 seconds, with zero digestive irritation.'
    },
    {
      q: 'Will the AM Day Fuel formula cause a rapid heart rate or jitters?',
      a: 'No. The AM formula combines micro-calibrated natural caffeine alkaloids with Lion\'s Mane hericenones and methylated B-complex. Because the dosage is strictly metered (0.12ml calibrated per spray), it eliminates the adrenergic heart spike typically triggered by 200mg+ energy drink megadoses.'
    },
    {
      q: 'Does Hummingbird Fuel break intermittent fasting?',
      a: 'No. Both the AM Day Fuel and PM Night Reset formulas contain zero grams of sugar, zero glycemic impact (Glycemic Index: 0.0), and negligible calories (<0.5 kcal per microdose). It does not disrupt autophagy, insulin sensitivity, or fasting windows.'
    },
    {
      q: 'Does the PM Night Reset spray contain synthetic melatonin?',
      a: 'No synthetic melatonin is included. Synthetic melatonin frequently causes morning grogginess, down-regulates endogenous pineal production, and leads to dependency. Instead, the PM formula uses high-purity L-Theanine, Chelated Magnesium Bisglycinate, and apigenin botanicals to stimulate natural GABAergic tone and vagal descent.'
    },
    {
      q: 'How many sprays are in each pocket canister and how long does it last?',
      a: 'Each aviation-grade aluminum flask contains 90 calibrated sprays. With standard daily dosing (2 sprays in the morning for Day Fuel, or 2 sprays before bed for Night Reset), a single canister provides a generous 45-day supply.'
    }
  ];

  return (
    <div className="w-full bg-[#0e0e10] py-12 md:py-20 text-[#e5e1e4]">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-widest mb-3 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            Hummingbird Laboratory Telemetry
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#e5e1e4] mb-4">
            Connect with Bio-Optimization <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1f] via-[#ffb77f] to-[#ffb95a]">
              Engineers &amp; Lab Specialists
            </span>
          </h1>
          <p className="font-['Manrope'] text-base md:text-lg text-[#e4beb3]/80 leading-relaxed">
            Reach out for bespoke dosing regimens, clinical data documentation, enterprise athletic team supplies, or scientific collaborations.
          </p>
        </div>

        {/* Form and Lab Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#121318] border border-[#282a36] p-8 md:p-12 rounded-3xl shadow-xl mb-16">
          {/* Left: Contact Info & Facilities */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#e5e1e4] mb-4">
                Laboratory Terminals
              </h2>
              <div className="space-y-4 font-['JetBrains_Mono'] text-xs text-[#e4beb3]/90 mb-8">
                <div className="p-4 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
                  <div className="font-bold text-[#ffb59e] uppercase mb-1">Central R&amp;D Cleanroom</div>
                  <div>Neuro-Formulation Facility 01</div>
                  <div className="text-[#8d90a5]">Austin, TX 78701 • USA</div>
                  <div className="text-[#ffb77f] mt-1">Status: Active Batch Bottling</div>
                </div>

                <div className="p-4 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
                  <div className="font-bold text-[#00f0ff] uppercase mb-1">European Pharmacokinetics Lab</div>
                  <div>Neuro-Metabolic Synthesis Unit</div>
                  <div className="text-[#8d90a5]">CH-8005 Zürich • Switzerland</div>
                  <div className="text-[#00f0ff] mt-1">Status: HPLC Quality Assurance</div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[#8d90a5]">
                  <span className="material-symbols-outlined text-[#ff5a1f] text-[18px]">mail</span>
                  <a href="mailto:lab@hummingbirdfuel.com" className="text-[#e5e1e4] hover:text-[#ff5a1f]">
                    lab@hummingbirdfuel.com
                  </a>
                </div>
              </div>
            </div>

            {/* CoA trigger button */}
            <div className="p-4 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] font-bold">
                  3rd-Party Lab Certificates (CoA)
                </span>
                <span className="text-[10px] font-['JetBrains_Mono'] text-[#ffb59e] uppercase">
                  Batch #HF-2025-04
                </span>
              </div>
              <p className="font-['Manrope'] text-xs text-[#8d90a5] mb-3">
                All batches verified for zero heavy metals, microbiological purity, and verified active peptide concentrations.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCoa('HF-2025-04')}
                className="w-full py-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#ffb77f] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>View Certificate of Analysis</span>
              </button>
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Transmission received by our bio-optimization engineers. Reference #HF-' + Math.floor(100000 + Math.random() * 900000));
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jordan Cole"
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-4 py-2.5 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Email Endpoint</label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@apex.bio"
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-4 py-2.5 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Inquiry Category</label>
                <select className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-4 py-2.5 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none cursor-pointer">
                  <option>Personalized Microdose Protocol Advice</option>
                  <option>Athletic Team &amp; High-Output Executive Wholesale</option>
                  <option>Clinical Research &amp; Pharmacokinetic Press</option>
                  <option>Order Inquiries &amp; International Priority Shipping</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Message Details</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Specify your circadian schedule, caffeine sensitivity, or research scope..."
                  className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-4 py-2.5 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none placeholder:text-[#8d90a5]/50"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Transmit Secure Inquiry</span>
              </button>
            </form>
          </div>
        </div>

        {/* Biohacker FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb77f] uppercase tracking-widest font-semibold block mb-2">
              Frequently Clarified Inquiries
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4]">
              Bio-Optimization Knowledge Base
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#121318] border border-[#282a36] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#1a1c24] transition-colors"
                  >
                    <span className="font-['Space_Grotesk'] text-sm md:text-base font-semibold text-[#e5e1e4] pr-4">
                      {faq.q}
                    </span>
                    <span className="material-symbols-outlined text-[#ff5a1f] text-[20px] shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm font-['Manrope'] text-[#e4beb3]/80 leading-relaxed border-t border-[#282a36]/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate of Analysis Modal */}
        {selectedCoa && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setSelectedCoa(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <div className="relative w-full max-w-lg bg-[#121318] border border-[#282a36] rounded-2xl shadow-2xl p-6 z-10">
              <div className="flex justify-between items-center pb-3 border-b border-[#282a36] mb-4">
                <div className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4]">
                  Certificate of Analysis: {selectedCoa}
                </div>
                <button
                  onClick={() => setSelectedCoa(null)}
                  className="text-[#8d90a5] hover:text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="space-y-3 text-xs font-['JetBrains_Mono'] mb-6">
                <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                  <span className="text-[#8d90a5]">Heavy Metals (Lead, Cadmium, Arsenic):</span>
                  <span className="text-[#ffb59e] font-bold">&lt;0.001 PPM (PASSED)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                  <span className="text-[#8d90a5]">HPLC Active Potency Calibration:</span>
                  <span className="text-[#ffb77f] font-bold">100.2% Target (PASSED)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                  <span className="text-[#8d90a5]">Microbial Aerobic Colony Count:</span>
                  <span className="text-[#00f0ff] font-bold">0 CFU/g (STERILE)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                  <span className="text-[#8d90a5]">Aerosol Droplet Mean Diameter:</span>
                  <span className="text-[#e5e1e4] font-bold">5.12 μm ±0.15 μm</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCoa(null)}
                className="w-full py-2.5 rounded-lg bg-[#ff5a1f] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-[#ff8a00] cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
