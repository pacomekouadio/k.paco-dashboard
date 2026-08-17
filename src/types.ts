export interface NavItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'plane' | 'truck' | 'ship' | 'package' | 'anchor' | 'crane';
  description?: string;
  isActive?: boolean;
}

export interface WhyChooseUsStep {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface DifferenceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface TrackingMilestone {
  step: string;
  date: string;
  location: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface TrackingData {
  trackingNumber: string;
  origin: string;
  destination: string;
  carrier: string;
  vesselName: string;
  status: string;
  eta: string;
  cargoType: string;
  weight: string;
  milestones: TrackingMilestone[];
}
