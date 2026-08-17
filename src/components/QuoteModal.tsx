import React, { useState } from 'react';
import { X, Send, Calculator, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'PROJECT CARGO',
}) => {
  const [service, setService] = useState(defaultService);
  const [origin, setOrigin] = useState('Dubai, UAE (DXB/Jebel Ali)');
  const [destination, setDestination] = useState('Antwerp, Belgium (ANR)');
  const [cargoType, setCargoType] = useState('Standard Container (FCL)');
  const [weight, setWeight] = useState('18000');
  const [volume, setVolume] = useState('33');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Realistic estimated tariff calculation
    const baseRates: Record<string, number> = {
      'AIR FREIGHT': 4.8,
      'LAND FREIGHT': 0.18,
      'SEA FREIGHT': 0.08,
      'PROJECT CARGO': 0.22,
      'SHIPPING AGENCY': 1500,
    };

    const multiplier = baseRates[service] || 0.15;
    const w = parseFloat(weight) || 1000;
    const v = parseFloat(volume) || 10;
    const calculated = Math.round(w * multiplier + v * 45 + 350);
    setEstimatedCost(calculated);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // keep confirmation visible
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Ocean Crown Navy styling */}
        <div className="bg-[#08172c] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              Instant Freight Estimate
            </div>
            <h3 className="text-xl font-bold font-montserrat tracking-tight mt-0.5">
              Request a Commercial Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold font-montserrat text-slate-900 mb-2">
                Quotation Request Received!
              </h4>
              <p className="text-slate-600 max-w-md text-sm leading-relaxed mb-6">
                Thank you, <strong>{fullName || 'valued client'}</strong>. Our specialized commercial desk at Ocean Crown Dubai has received your parameters and will issue a formal tariff breakdown within 2 hours.
              </p>
              {estimatedCost && (
                <div className="w-full max-w-sm p-4 bg-sky-50 border border-sky-200 rounded-xl mb-6 text-left">
                  <div className="text-xs text-sky-700 font-medium">Estimated Indication Range:</div>
                  <div className="text-2xl font-extrabold text-[#0077e6] font-montserrat">
                    ${(estimatedCost * 0.95).toFixed(0)} - ${(estimatedCost * 1.1).toFixed(0)} USD
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Route: {origin.split(',')[0]} → {destination.split(',')[0]} • {service}
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#0077e6] hover:bg-[#0066c7] text-white font-medium text-sm rounded-full transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Service Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Transportation Mode
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['AIR FREIGHT', 'LAND FREIGHT', 'SEA FREIGHT', 'PROJECT CARGO', 'SHIPPING AGENCY'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setService(s);
                        setEstimatedCost(null);
                      }}
                      className={`px-2.5 py-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                        service === s
                          ? 'bg-[#0077e6] text-white border-[#0077e6] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Origin (Port / City / Terminal)
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g. Dubai, UAE"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination (Port / City / Terminal)
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g. Antwerp, Belgium"
                  />
                </div>
              </div>

              {/* Cargo Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cargo Classification
                  </label>
                  <select
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  >
                    <option>Standard Container (FCL)</option>
                    <option>Less than Container (LCL)</option>
                    <option>Heavy-Lift / Out-of-Gauge</option>
                    <option>Temperature Controlled (Reefer)</option>
                    <option>Hazardous / IMO Class</option>
                    <option>Palletized Air Cargo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Volume (CBM / m³)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Estimate Preview */}
              {estimatedCost && (
                <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-sky-800">Indication Estimate</span>
                    <div className="text-xl font-bold font-montserrat text-[#0077e6]">
                      ${estimatedCost.toLocaleString()} USD
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    Includes freight linehaul, bunker surcharge & port handling
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Your Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Company Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone (+971 ...)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Direct rate guarantee • No hidden port fees
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    onClick={handleSubmitQuote}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#0077e6] hover:bg-[#0066c7] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    Submit Request
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
