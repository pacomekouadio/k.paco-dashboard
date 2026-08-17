import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Twitter, Facebook, Youtube, Linkedin } from './SocialIcons';
import { OceanCrownLogo } from './OceanCrownLogo';
import { useSiteContent } from '../content/SiteContentProvider';

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
  const { footer, brand } = useSiteContent();
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

  const servicesLinks = footer.servicesLinks;

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
            <OceanCrownLogo variant="white" size="md" name={brand.name} tagline={brand.tagline} />

            <p className="text-[11.5px] leading-relaxed text-white/60 font-poppins pt-2 max-w-sm">
              {footer.description}
            </p>

            {/* Social Icons matching mockup */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={footer.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077e6] text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={footer.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077e6] text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={footer.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077e6] text-white flex items-center justify-center transition-colors text-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href={footer.socials.linkedin}
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
              {footer.servicesTitle}
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
              {footer.outlookTitle}
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
              {footer.subscribeTitle}
            </h4>
            <p className="text-[11.5px] text-white/60 font-poppins leading-relaxed">
              {footer.subscribeText}
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
            &copy; {new Date().getFullYear()} {footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            {footer.legalLinks.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && <span>•</span>}
                <a href={link.href} className="hover:text-white/70 transition-colors">{link.label}</a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
