import React, { useState } from 'react';
import { X, Search, Anchor, Navigation, MapPin, Calendar, CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';
import { sampleTrackingRecords } from '../data/content';
import { TrackingData } from '../types';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('OC-89472');
  const [result, setResult] = useState<TrackingData | null>((sampleTrackingRecords['OC-89472'] ?? null));
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    if (sampleTrackingRecords[clean]) {
      setResult(sampleTrackingRecords[clean] ?? null);
      setNotFound(false);
    } else {
      // Auto-generate realistic tracking if custom code entered
      if (clean.length >= 4) {
        setResult({
          trackingNumber: clean,
          origin: 'Jebel Ali Terminal 2, Dubai (AE)',
          destination: 'Rotterdam Port (NL)',
          carrier: 'Ocean Crown Global Line',
          vesselName: 'CROWN STAR IX',
          status: 'Customs Cleared & Loaded',
          eta: 'August 28, 2026',
          cargoType: 'General Maritime Freight Container',
          weight: '24,500 kg',
          milestones: [
            { step: 'Gate-in & Weight Verification', date: 'Aug 15, 2026 - 10:20 AM', location: 'Dubai, UAE', status: 'completed' },
            { step: 'Customs Release & Bill of Lading Issued', date: 'Aug 16, 2026 - 03:40 PM', location: 'Dubai Customs', status: 'completed' },
            { step: 'Vessel Departure from Port', date: 'Aug 17, 2026 - 08:00 AM', location: 'Jebel Ali Port', status: 'current' },
            { step: 'Sea Transit Crossing', date: 'Aug 22, 2026 - Estimated', location: 'Red Sea / Suez', status: 'upcoming' },
            { step: 'Final Discharge at Destination', date: 'Aug 28, 2026 - Estimated', location: 'Rotterdam Hub', status: 'upcoming' },
          ],
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#08172c] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <Navigation className="w-4 h-4" />
              Live Cargo Tracking System
            </div>
            <h3 className="text-xl font-bold font-montserrat tracking-tight mt-0.5">
              Track Your Shipment / Container / B/L
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter B/L number, Booking ID or Container No. (e.g. OC-89472, OC-55120)"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0077e6] hover:bg-[#0066c7] text-white font-semibold text-sm rounded-xl shadow transition-colors flex items-center gap-2 shrink-0"
            >
              Track Now
            </button>
          </form>

          {/* Quick Demo links */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Try sample B/L:</span>
            <button
              type="button"
              onClick={() => {
                setQuery('OC-89472');
                setResult((sampleTrackingRecords['OC-89472'] ?? null));
                setNotFound(false);
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-sky-100 hover:text-sky-700 rounded text-slate-700 font-mono font-medium transition-colors"
            >
              OC-89472 (Sea Freight)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery('OC-55120');
                setResult((sampleTrackingRecords['OC-55120'] ?? null));
                setNotFound(false);
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-sky-100 hover:text-sky-700 rounded text-slate-700 font-mono font-medium transition-colors"
            >
              OC-55120 (Land Freight)
            </button>
          </div>

          {notFound && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>
                Tracking number not found. Please verify your Bill of Lading or booking reference number.
              </span>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              {/* Summary Banner */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Tracking Ref
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-800">{result.trackingNumber}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </div>
                  <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {result.status}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Est. Arrival (ETA)
                  </div>
                  <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    {result.eta}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Vessel / Unit
                  </div>
                  <div className="text-sm font-bold text-slate-800 flex items-center gap-1 truncate">
                    <Anchor className="w-3.5 h-3.5 text-[#0077e6]" />
                    {result.vesselName}
                  </div>
                </div>
              </div>

              {/* Origin to Destination Route card */}
              <div className="p-4 bg-[#08172c] text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sky-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Origin</div>
                    <div className="text-sm font-semibold">{result.origin}</div>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-center px-4">
                  <span className="text-[10px] text-sky-300 font-mono tracking-widest uppercase">
                    Direct Ocean Transit
                  </span>
                  <div className="w-32 h-0.5 bg-gradient-to-r from-sky-400 via-white to-sky-400 relative my-1">
                    <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 bg-sky-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left sm:text-right">
                  <div className="sm:order-2 w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="sm:order-1">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Destination</div>
                    <div className="text-sm font-semibold">{result.destination}</div>
                  </div>
                </div>
              </div>

              {/* Milestone Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                  Shipment Event Log & Milestones
                </h4>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {result.milestones.map((m, idx) => (
                    <div key={idx} className="relative flex items-start justify-between gap-4 text-xs">
                      {/* Step Indicator Pin */}
                      <div
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 bg-white ${
                          m.status === 'completed'
                            ? 'border-emerald-600 text-emerald-600'
                            : m.status === 'current'
                            ? 'border-[#0077e6] text-[#0077e6] ring-4 ring-sky-100'
                            : 'border-slate-300 text-slate-300'
                        }`}
                      >
                        {m.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {m.status === 'current' && <Clock className="w-2.5 h-2.5 animate-spin" />}
                      </div>

                      <div>
                        <div
                          className={`font-semibold text-sm ${
                            m.status === 'completed'
                              ? 'text-slate-900'
                              : m.status === 'current'
                              ? 'text-[#0077e6]'
                              : 'text-slate-400'
                          }`}
                        >
                          {m.step}
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">{m.location}</div>
                      </div>

                      <div className="text-right text-[11px] text-slate-400 shrink-0 font-mono">
                        {m.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
