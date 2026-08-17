export type IconName = 'plane' | 'truck' | 'ship' | 'package' | 'anchor';

export interface NavLink {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: IconName;
  description: string;
}

export interface StepItem {
  id: string;
  title: string;
  description: string;
}

export interface DifferenceCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface HubItem {
  city: string;
  country: string;
  role: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    items: NavLink[];
    phone: string;
    phoneLabel: string;
    trackLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    ctaLabel: string;
    image: string;
    imageAlt: string;
  };
  services: ServiceItem[];
  why: {
    heading: string;
    steps: StepItem[];
  };
  about: {
    paragraph1: string;
    paragraph2: string;
    image: string;
    imageAlt: string;
    badgeTitle: string;
    badgeSubtitle: string;
    hubs: HubItem[];
  };
  difference: {
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    description: string;
    founderName: string;
    founderRole: string;
    ctaLabel: string;
    ctaHref: string;
    cards: DifferenceCardItem[];
  };
  unmatched: {
    title: string;
    note: string;
    services: ServiceItem[];
  };
  footer: {
    description: string;
    servicesTitle: string;
    servicesLinks: string[];
    outlookTitle: string;
    subscribeTitle: string;
    subscribeText: string;
    copyright: string;
    socials: { twitter: string; facebook: string; youtube: string; linkedin: string };
    legalLinks: LinkItem[];
  };
}

export const defaultContent: SiteContent = {
  brand: {
    name: 'OCEAN CROWN',
    tagline: 'SHIPPING SERVICES L.L.C',
  },
  nav: {
    items: [
      { id: 'home', title: 'HOME', subtitle: 'Main Page', href: '#home' },
      { id: 'corporate', title: 'CORPORATE', subtitle: 'About Us', href: '#corporate' },
      { id: 'offer', title: 'M.I. OFFER', subtitle: 'Our Services', href: '#services' },
      { id: 'partners', title: 'PARTNERS', subtitle: 'Our Associates', href: '#difference' },
      { id: 'quote', title: 'QUOTE', subtitle: 'Get a quotation', href: '#quote' },
      { id: 'news', title: 'NEWS', subtitle: 'Certificates etc', href: '#difference' },
      { id: 'contact', title: 'CONTACT US', subtitle: 'Get in touch', href: '#contact' },
    ],
    phone: '+971 56 152 2266',
    phoneLabel: '24x7 Helpline',
    trackLabel: 'TRACK SHIPMENT',
  },
  hero: {
    eyebrow: 'SHIPS ANYTHING',
    title: 'AROUND THE WORLD',
    ctaLabel: 'QUOTE?',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Ocean Cargo Container Ship',
  },
  services: [
    {
      id: 'air-freight',
      title: 'AIR FREIGHT',
      subtitle: 'Shipping via Air',
      iconName: 'plane',
      description: 'Fast, secure and worldwide air cargo operations with reliable airline carriers.',
    },
    {
      id: 'land-freight',
      title: 'LAND FREIGHT',
      subtitle: 'Cargo Transport',
      iconName: 'truck',
      description: 'Extensive inland trucking networks connecting major regional commercial hubs.',
    },
    {
      id: 'sea-freight',
      title: 'SEA FREIGHT',
      subtitle: 'Container Shipping',
      iconName: 'ship',
      description: 'FCL & LCL maritime ocean transportation across global shipping lanes.',
    },
    {
      id: 'project-cargo',
      title: 'PROJECT CARGO',
      subtitle: 'Handling Service',
      iconName: 'package',
      description: 'Heavy-lift, out-of-gauge and specialized project logistics management.',
    },
    {
      id: 'shipping-agency',
      title: 'SHIPPING AGENCY',
      subtitle: 'Port/Harbor Operations',
      iconName: 'anchor',
      description: 'Full port agency, stevedoring, customs clearance, and vessel assistance.',
    },
  ],
  why: {
    heading: 'Why Choose Us?',
    steps: [
      {
        id: 'knowledge',
        title: 'In-Depth\nKnowledge',
        description:
          'Decades of deep maritime, customs, and global freight forwarding mastery across international trade corridors.',
      },
      {
        id: 'excellence',
        title: 'Excellence &\nLeadership',
        description:
          'Industry-leading reliability, precise execution, and end-to-end shipment visibility with unwavering standards.',
      },
      {
        id: 'pricing',
        title: 'Competitive\nPricing',
        description:
          'Cost-optimized routing, transparent freight rates, and tailored volume tiers to maximize client value.',
      },
    ],
  },
  about: {
    paragraph1:
      'Ocean Crown Shipping Services LLC is positioned in Dubai, the United Arab Emirates which is Specialized in International Freight Forwarding business backed by professionals who have decades of global experience in the shipping industry. Experience in international freight forwarding by sea, air, and land.',
    paragraph2:
      'Where the headquarter Crown Logistics is located in (Amman & Aqaba), Jordan. And the other branches located respectively in (Basra), Iraq, (Antwerp), Belgium.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Ocean Crown Global Freight Forwarding Professionals',
    badgeTitle: '4 Global Hubs',
    badgeSubtitle: 'Dubai • Jordan • Iraq • Antwerp',
    hubs: [
      { city: 'Dubai', country: 'U.A.E.', role: 'Regional HQ' },
      { city: 'Amman & Aqaba', country: 'Jordan', role: 'Global HQ' },
      { city: 'Basra', country: 'Iraq', role: 'Corridor Hub' },
      { city: 'Antwerp', country: 'Belgium', role: 'European Gateway' },
    ],
  },
  difference: {
    titleLine1: 'Freight Company',
    titleLine2: 'With a Difference.',
    titleHighlight: 'Innovation.',
    description:
      "Crown Group is one of the leader's groups in the global and logistics services as it continues to expand its horizons, by providing innovative solutions, supported by bold, resolute and decisive action. We are aiming with confidence, to be the best global shipping & logistics Provider.",
    founderName: 'ANWAR TAHER',
    founderRole: 'Founder & Director',
    ctaLabel: 'ABOUT US',
    ctaHref: '#corporate',
    cards: [
      {
        id: 'who-we-are',
        title: 'WHO WE ARE',
        description:
          "Ocean Crown is one of the leader's groups in the global and logistics services as it continues to expand its horizons, by providing innovative solutions, supported by bold, resolute and decisive action.",
        image:
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        alt: 'Stacked blue shipping containers at harbor port',
      },
      {
        id: 'logistics-redefined',
        title: 'LOGISTICS REDEFINED',
        description:
          "Ocean Crown is one of the leader's groups in the global and logistics services as it continues to expand its horizons, by delivering cutting-edge supply chain excellence worldwide.",
        image:
          'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
        alt: 'Harbor crane handling freight containers',
      },
    ],
  },
  unmatched: {
    title: 'Unmatched\nServices.\nUnmatched\nExcellence.',
    note: 'Dedicated worldwide freight specialists with 24/7 proactive control tower monitoring.',
    services: [
      {
        id: 'land-freight-unmatched',
        title: 'LAND FREIGHT',
        subtitle: 'Overland Logistics',
        iconName: 'truck',
        description:
          'Provides overland freight services to meet up with your transportation needs, professional services to deliver your cargo fast and safe to its final destination.',
      },
      {
        id: 'sea-freight-unmatched',
        title: 'SEA FREIGHT',
        subtitle: 'Ocean Freight',
        iconName: 'ship',
        description:
          'Provides ocean freight services to meet up with your transportation needs, professional services to deliver your container cargo fast and safe to its final destination.',
      },
      {
        id: 'air-freight-unmatched',
        title: 'AIR FREIGHT',
        subtitle: 'Air Cargo Delivery',
        iconName: 'plane',
        description:
          'Provides air freight services to meet up with your transportation needs, professional services to deliver your air freight fast and safe to its final destination.',
      },
      {
        id: 'project-cargo-unmatched',
        title: 'PROJECT CARGO',
        subtitle: 'Heavy Lift & Engineering',
        iconName: 'package',
        description:
          'Provides project freight services to meet up with your transportation needs, professional services to deliver your heavy equipment fast and safe to its final destination.',
      },
      {
        id: 'shipping-agency-unmatched',
        title: 'SHIPPING AGENCY',
        subtitle: 'Port & Vessel Agency',
        iconName: 'anchor',
        description:
          'Provides port agency services to meet up with your transportation needs, professional services to deliver your maritime vessel fast and safe to its final destination.',
      },
    ],
  },
  footer: {
    description:
      'Provides air freight services to meet up with your transportation needs, professional services to deliver your air freight fast and safe to its final destination.',
    servicesTitle: 'Services',
    servicesLinks: [
      'Project Cargo',
      'Shipping Agency',
      'Used Container',
      'Air Freight',
      'Land Freight',
      'Sea Freight',
    ],
    outlookTitle: 'Outlook',
    subscribeTitle: 'Subscribe',
    subscribeText: 'Get to know about Ocean Crown, our updates and all news, straight to your inbox.',
    copyright: 'Ocean Crown Shipping Services L.L.C. All rights reserved.',
    socials: {
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    },
    legalLinks: [
      { label: 'Privacy Policy', href: '#home' },
      { label: 'Terms of Carriage', href: '#home' },
      { label: 'Port Tariff Rules', href: '#home' },
    ],
  },
};

/** Deep-merges stored content over the defaults so new fields never break the site. */
export function mergeContent(stored: unknown): SiteContent {
  const merge = (base: any, override: any): any => {
    if (Array.isArray(base)) return Array.isArray(override) ? override : base;
    if (base && typeof base === 'object') {
      if (!override || typeof override !== 'object') return base;
      const out: any = { ...base };
      for (const key of Object.keys(base)) {
        out[key] = merge(base[key], override[key]);
      }
      return out;
    }
    return override === undefined || override === null ? base : override;
  };
  return merge(defaultContent, stored) as SiteContent;
}
