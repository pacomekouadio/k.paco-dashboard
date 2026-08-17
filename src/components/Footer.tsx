import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Twitter, Facebook, Youtube, Linkedin } from './SocialIcons';
import { OceanCrownLogo } from './OceanCrownLogo';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenTracking: () => void;
  onSelectService: (service: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuote,
  onOpenTracking,
  onSelectService,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const servicesLinks = [
    'Project Cargo',
    'Shipping Agency',
    'Used Container',
    'Air Freight',
    'Land Freight',
    'Sea Freight',
  ];

  const outlookLinks = [
    { label: 'Shipment Tracking', action: onOpenTracking },
    { label: 'Get A Quote', action: onOpenQuote },
    { label: 'Offices Zone', href: '#corporate' },
    { label: 'Our Associates', href: '#difference' },
    { label: 'News & Events', href: '#difference' },
    { label: 'Careers', href: '#corporate' },
  ];

  return (
    <footer id="contact" className="bg-[#040c17] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <OceanCrownLogo variant="white" size="md" />

            <p className="text-[11.5px] leading-relaxed text-white/60 font-poppins pt-2 max-w-sm">
              Provides air freight services to meet up with your transportation needs, professional services to deliver your air freight fast and safe to its final destination.
            </p>

            {/* Social Icons matching mockup */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077e6] text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077e6] text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077e6] text-white flex items-center justify-center transition-colors text-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077e6] text-white flex items-center justify-center transition-colors text-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-montserrat text-xs font-bold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-[11.5px] text-white/60 font-poppins">
              {servicesLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onSelectService(item.toUpperCase())}
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-sky-500 font-bold">•</span>
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Outlook */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-montserrat text-xs font-bold text-white uppercase tracking-wider">
              Outlook
            </h4>
            <ul className="space-y-2 text-[11.5px] text-white/60 font-poppins">
              {outlookLinks.map((item) => (
                <li key={item.label}>
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="hover:text-sky-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                    >
                      <span className="text-sky-500 font-bold">•</span>
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-sky-500 font-bold">•</span>
                      <span>{item.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Subscribe Form */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-montserrat text-xs font-bold text-white uppercase tracking-wider">
              Subscribe
            </h4>
            <p className="text-[11.5px] text-white/60 font-poppins leading-relaxed">
              Get to know about Ocean Crown, our updates and all news, straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex items-stretch rounded-none overflow-hidden max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email ID"
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-xs focus:outline-none placeholder:text-slate-400 font-poppins"
                />
                <button
                  type="submit"
                  className="px-4 bg-[#0077e6] hover:bg-[#0066c7] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-300" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Successfully subscribed to Ocean Crown Dispatch!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/40 font-poppins">
          <div>
            &copy; {new Date().getFullYear()} Ocean Crown Shipping Services L.L.C. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#home" className="hover:text-white/70 transition-colors">Terms of Carriage</a>
            <span>•</span>
            <a href="#home" className="hover:text-white/70 transition-colors">Port Tariff Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
