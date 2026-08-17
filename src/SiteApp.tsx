import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCardsRow } from './components/ServiceCardsRow';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { DifferenceSection } from './components/DifferenceSection';
import { UnmatchedServicesSection } from './components/UnmatchedServicesSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { TrackingModal } from './components/TrackingModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('PROJECT CARGO');

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsQuoteModalOpen(true);
  };

  const handleOpenTracking = () => {
    setIsTrackingModalOpen(true);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-sky-500 selection:text-white font-poppins antialiased">
      {/* Fixed/Sticky Top Navigation Header */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenTracking={handleOpenTracking}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section with Ships Anything / Around The World */}
        <Hero onOpenQuote={() => handleOpenQuote()} />

        {/* 2. 5 Floating Services Cards overlapping Hero bottom */}
        <ServiceCardsRow onSelectService={handleServiceSelect} />

        {/* 3. Why Choose Us Section with 3-step interactive timeline */}
        <WhyChooseUs />

        {/* 4. About Ocean Crown Section with Layered depth photo */}
        <AboutSection />

        {/* 5. Freight Company with a Difference (Who We Are / Logistics Redefined) */}
        <DifferenceSection
          onLearnMore={(cardId) => {
            handleOpenQuote(cardId === 'who-we-are' ? 'PROJECT CARGO' : 'SEA FREIGHT');
          }}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* 6. Deep Dark Navy "Unmatched Services. Unmatched Excellence." */}
        <UnmatchedServicesSection onSelectService={handleServiceSelect} />
      </main>

      {/* 7. Dark Footer with services, outlook, subscribe & contact info */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        onOpenTracking={handleOpenTracking}
        onSelectService={handleServiceSelect}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={selectedService}
      />

      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />
    </div>
  );
}

