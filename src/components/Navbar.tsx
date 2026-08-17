import React, { useState, useEffect } from 'react';
import { Phone, Compass, Menu, X, ArrowUpRight } from 'lucide-react';
import { OceanCrownLogo } from './OceanCrownLogo';
import { useSiteContent } from '../content/SiteContentProvider';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenTracking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const { nav, brand } = useSiteContent();
  const navItems = nav.items;
  const telHref = `tel:${nav.phone.replace(/[^+0-9]/g, '')}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, href: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    if (id === 'quote') {
      onOpenQuote();
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08172c]/95 backdrop-blur-md py-3 shadow-lg border-b border-white/10'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo Left */}
          <a
            href="#home"
            className="flex items-center group transition-transform hover:opacity-95"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <OceanCrownLogo variant="white" size="md" name={brand.name} tagline={brand.tagline} />
          </a>

          {/* Desktop Navigation Links with Subtitles matching mockup */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className="group flex flex-col items-center text-center cursor-pointer transition-all duration-200"
              >
                <span
                  className={`text-[12.5px] font-montserrat font-bold tracking-wider uppercase transition-colors ${
                    activeNav === item.id
                      ? 'text-white border-b-2 border-sky-400 pb-0.5'
                      : 'text-white/90 group-hover:text-white'
                  }`}
                >
                  {item.title}
                </span>
                <span className="text-[9.5px] font-poppins text-white/50 group-hover:text-sky-300 font-light tracking-tight transition-colors">
                  {item.subtitle}
                </span>
              </button>
            ))}
          </nav>

          {/* Right Action Items (Helpline + Track Shipment) */}
          <div className="hidden lg:flex items-center gap-6 text-white text-right">
            {/* 24x7 Helpline */}
            <a
              href={telHref}
              className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-sky-400 group-hover:text-sky-400 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[12px] font-montserrat font-bold tracking-wider text-white">
                  {nav.phone}
                </span>
                <span className="text-[9.5px] text-white/50 tracking-tight font-poppins mt-0.5">
                  {nav.phoneLabel}
                </span>
              </div>
            </a>

            {/* Track Shipment Link */}
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-sky-400 group-hover:text-sky-400 transition-colors">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[11.5px] font-montserrat font-bold tracking-wider text-white uppercase group-hover:text-sky-300 transition-colors">
                  {nav.trackLabel}
                </span>
                <span className="text-[9.5px] text-white/50 tracking-tight font-poppins mt-0.5">
                  Track your cargo
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={onOpenTracking}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Track</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#08172c] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="grid grid-cols-1 gap-2 divide-y divide-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className="flex items-center justify-between py-3 text-left w-full group"
              >
                <div>
                  <div className="text-sm font-bold font-montserrat tracking-wider text-white group-hover:text-sky-400 uppercase">
                    {item.title}
                  </div>
                  <div className="text-xs text-white/50 font-poppins">
                    {item.subtitle}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-sky-400" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href={telHref}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-white text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <div>
                <div>{nav.phone}</div>
                <div className="text-xs text-white/50 font-normal">{nav.phoneLabel}</div>
              </div>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 bg-[#0077e6] hover:bg-[#0066c7] text-white font-bold font-montserrat text-sm rounded-xl tracking-wider uppercase transition-colors shadow-lg"
            >
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
