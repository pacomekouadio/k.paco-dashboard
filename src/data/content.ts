import { NavItem, ServiceCard, WhyChooseUsStep, DifferenceCard, TrackingData } from '../types';

export const navItems: NavItem[] = [
  { id: 'home', title: 'HOME', subtitle: 'Main Page', href: '#home' },
  { id: 'corporate', title: 'CORPORATE', subtitle: 'About Us', href: '#corporate' },
  { id: 'offer', title: 'M.I. OFFER', subtitle: 'Our Services', href: '#services' },
  { id: 'partners', title: 'PARTNERS', subtitle: 'Our Associates', href: '#difference' },
  { id: 'quote', title: 'QUOTE', subtitle: 'Get a quotation', href: '#quote' },
  { id: 'news', title: 'NEWS', subtitle: 'Certificates etc', href: '#difference' },
  { id: 'contact', title: 'CONTACT US', subtitle: 'Get in touch', href: '#contact' },
];

export const topServiceCards: ServiceCard[] = [
  {
    id: 'air-freight',
    title: 'AIR FREIGHT',
    subtitle: 'Shipping via Air',
    iconName: 'plane',
    description: 'Fast, secure and worldwide air cargo operations with reliable airline carriers.',
    isActive: false,
  },
  {
    id: 'land-freight',
    title: 'LAND FREIGHT',
    subtitle: 'Cargo Transport',
    iconName: 'truck',
    description: 'Extensive inland trucking networks connecting major regional commercial hubs.',
    isActive: false,
  },
  {
    id: 'sea-freight',
    title: 'SEA FREIGHT',
    subtitle: 'Container Shipping',
    iconName: 'ship',
    description: 'FCL & LCL maritime ocean transportation across global shipping lanes.',
    isActive: false,
  },
  {
    id: 'project-cargo',
    title: 'PROJECT CARGO',
    subtitle: 'Handling Service',
    iconName: 'package',
    description: 'Heavy-lift, out-of-gauge and specialized project logistics management.',
    isActive: true,
  },
  {
    id: 'shipping-agency',
    title: 'SHIPPING AGENCY',
    subtitle: 'Port/Harbor Operations',
    iconName: 'anchor',
    description: 'Full port agency, stevedoring, customs clearance, and vessel assistance.',
    isActive: false,
  },
];

export const whyChooseUsSteps: WhyChooseUsStep[] = [
  {
    id: 'knowledge',
    title: 'In-Depth\nKnowledge',
    description: 'Decades of deep maritime, customs, and global freight forwarding mastery across international trade corridors.',
    isActive: false,
  },
  {
    id: 'excellence',
    title: 'Excellence &\nLeadership',
    description: 'Industry-leading reliability, precise execution, and end-to-end shipment visibility with unwavering standards.',
    isActive: true,
  },
  {
    id: 'pricing',
    title: 'Competitive\nPricing',
    description: 'Cost-optimized routing, transparent freight rates, and tailored volume tiers to maximize client value.',
    isActive: false,
  },
];

export const differenceCards: DifferenceCard[] = [
  {
    id: 'who-we-are',
    title: 'WHO WE ARE',
    description: "Ocean Crown is one of the leader's groups in the global and logistics services as it continues to expand its horizons, by providing innovative solutions, supported by bold, resolute and decisive action.",
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', // stack of blue shipping containers
    alt: 'Stacked blue shipping containers at harbor port',
  },
  {
    id: 'logistics-redefined',
    title: 'LOGISTICS REDEFINED',
    description: "Ocean Crown is one of the leader's groups in the global and logistics services as it continues to expand its horizons, by delivering cutting-edge supply chain excellence worldwide.",
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80', // gantry crane lifting container
    alt: 'Harbor crane handling freight containers',
  },
];

export const unmatchedServices: ServiceCard[] = [
  {
    id: 'land-freight-unmatched',
    title: 'LAND FREIGHT',
    subtitle: 'Overland Logistics',
    iconName: 'truck',
    description: 'Provides overland freight services to meet up with your transportation needs, professional services to deliver your cargo fast and safe to its final destination.',
  },
  {
    id: 'sea-freight-unmatched',
    title: 'SEA FREIGHT',
    subtitle: 'Ocean Freight',
    iconName: 'ship',
    description: 'Provides ocean freight services to meet up with your transportation needs, professional services to deliver your container cargo fast and safe to its final destination.',
  },
  {
    id: 'air-freight-unmatched',
    title: 'AIR FREIGHT',
    subtitle: 'Air Cargo Delivery',
    iconName: 'plane',
    description: 'Provides air freight services to meet up with your transportation needs, professional services to deliver your air freight fast and safe to its final destination.',
  },
  {
    id: 'project-cargo-unmatched',
    title: 'PROJECT CARGO',
    subtitle: 'Heavy Lift & Engineering',
    iconName: 'package',
    description: 'Provides project freight services to meet up with your transportation needs, professional services to deliver your heavy equipment fast and safe to its final destination.',
  },
  {
    id: 'shipping-agency-unmatched',
    title: 'SHIPPING AGENCY',
    subtitle: 'Port & Vessel Agency',
    iconName: 'anchor',
    description: 'Provides port agency services to meet up with your transportation needs, professional services to deliver your maritime vessel fast and safe to its final destination.',
  },
];

export const sampleTrackingRecords: Record<string, TrackingData> = {
  'OC-89472': {
    trackingNumber: 'OC-89472',
    origin: 'Jebel Ali Port, Dubai (AE)',
    destination: 'Port of Antwerp (BE)',
    carrier: 'Ocean Crown Shipping Line',
    vesselName: 'CROWN VOYAGER V-402',
    status: 'In Transit - On Schedule',
    eta: 'August 24, 2026',
    cargoType: '2x 40ft High Cube Containers (Industrial Equipment)',
    weight: '48,200 kg',
    milestones: [
      { step: 'Booking Confirmed & Export Clearance', date: 'Aug 10, 2026 - 09:30 AM', location: 'Dubai, UAE', status: 'completed' },
      { step: 'Loaded on Vessel & Departed Jebel Ali', date: 'Aug 12, 2026 - 04:15 PM', location: 'Jebel Ali Port, UAE', status: 'completed' },
      { step: 'Transit via Suez Canal Maritime Corridor', date: 'Aug 16, 2026 - 11:00 AM', location: 'Port Said, Egypt', status: 'completed' },
      { step: 'In Transit - Mediterranean Sea Route', date: 'Aug 17, 2026 - Current Position', location: 'Mediterranean Waters', status: 'current' },
      { step: 'Arrival & Customs Clearance at Antwerp', date: 'Aug 24, 2026 - Estimated', location: 'Antwerp Port, Belgium', status: 'upcoming' },
      { step: 'Final Delivery to Consignee Facility', date: 'Aug 26, 2026 - Estimated', location: 'Brussels Hub, Belgium', status: 'upcoming' },
    ],
  },
  'OC-55120': {
    trackingNumber: 'OC-55120',
    origin: 'Amman Logistics Hub (JO)',
    destination: 'Basra Free Zone (IQ)',
    carrier: 'Crown Overland Express',
    vesselName: 'Convoy Alpha-9',
    status: 'Out for Final Delivery',
    eta: 'August 18, 2026',
    cargoType: 'Overland Reefer Truckload (Pharmaceuticals)',
    weight: '19,500 kg',
    milestones: [
      { step: 'Cargo Receipt & Temperature Inspection', date: 'Aug 14, 2026 - 08:00 AM', location: 'Amman, Jordan', status: 'completed' },
      { step: 'Cross-Border Clearance & Escort Transfer', date: 'Aug 16, 2026 - 02:20 PM', location: 'Karameh Border Post', status: 'completed' },
      { step: 'In Transit to Regional Distribution Hub', date: 'Aug 17, 2026 - 06:45 AM', location: 'Basra Approach Highway', status: 'current' },
      { step: 'Final Delivery to Basra Logistics Gate', date: 'Aug 18, 2026 - 10:00 AM', location: 'Basra, Iraq', status: 'upcoming' },
    ],
  },
};
