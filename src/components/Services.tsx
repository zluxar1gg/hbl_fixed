import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface ServicesProps {
  language: Language;
}

const ServiceItem: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="mb-6">
    <h4 className="font-semibold text-lg text-brand-dark mb-2">{title}</h4>
    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
  </div>
);

export const Services: React.FC<ServicesProps> = ({ language }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAmazonOpen, setIsAmazonOpen] = useState(false);
  const t = translations[language].services;

  const servicesRef = useRef<HTMLDivElement | null>(null);
  const amazonRef = useRef<HTMLDivElement | null>(null);

  // Ensure max-height is set dynamically and updated on resize
  useEffect(() => {
    const updateHeights = () => {
      if (servicesRef.current) {
        servicesRef.current.style.maxHeight = isServicesOpen ? `${servicesRef.current.scrollHeight}px` : '0px';
      }
      if (amazonRef.current) {
        amazonRef.current.style.maxHeight = isAmazonOpen ? `${amazonRef.current.scrollHeight}px` : '0px';
      }
    };

    // update immediately and on resize
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [isServicesOpen, isAmazonOpen]);

  // Toggle helpers
  const toggleServices = () => setIsServicesOpen((s) => !s);
  const toggleAmazon = () => setIsAmazonOpen((s) => !s);

  return (
    <section className="py-6 pb-10 bg-cream">
      {/* increased gap between blocks: space-y-8 */}
      <div className="container mx-auto space-y-8">

        {/* Services Block */}
        <div className="bg-white rounded-[30px] shadow-sm overflow-hidden transition-all duration-300">
          <button
            id="services-button"
            aria-controls="services-panel"
            aria-expanded={isServicesOpen}
            className="w-full p-8 lg:p-10 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors select-none text-left"
            onClick={toggleServices}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark tracking-tight">{t.title}</h3>
            <div className={`w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-blue transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={28} strokeWidth={2.5} />
            </div>
          </button>

          <div
            id="services-panel"
            ref={servicesRef}
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            aria-hidden={!isServicesOpen}
            style={{ maxHeight: '0px' }}
          >
            <div className="px-8 py-10 lg:px-12 lg:py-14 grid lg:grid-cols-2 gap-x-14 gap-y-10 border-t border-gray-100">
              <div>
                <ServiceItem title={t.items.reception.title} text={t.items.reception.text} />
                <ServiceItem title={t.items.storage.title} text={t.items.storage.text} />
                <ServiceItem title={t.items.consolidation.title} text={t.items.consolidation.text} />
                <ServiceItem title={t.items.purchasing.title} text={t.items.purchasing.text} />
              </div>

              <div>
                <ServiceItem title={t.items.photo.title} text={t.items.photo.text} />
                <ServiceItem title={t.items.splitting.title} text={t.items.splitting.text} />
                <ServiceItem title={t.items.packing.title} text={t.items.packing.text} />
                <ServiceItem title={t.items.insurance.title} text={t.items.insurance.text} />
                <ServiceItem title={t.items.returns.title} text={t.items.returns.text} />
              </div>
            </div>
          </div>
        </div>

        {/* Amazon Logistics Block */}
        <div className="bg-white rounded-[30px] shadow-sm overflow-hidden transition-all duration-300">
          <button
            id="amazon-button"
            aria-controls="amazon-panel"
            aria-expanded={isAmazonOpen}
            className="w-full p-8 lg:p-10 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors select-none text-left"
            onClick={toggleAmazon}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark tracking-tight">{t.amazonTitle}</h3>
            <div className={`w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-blue transition-transform duration-300 ${isAmazonOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={28} strokeWidth={2.5} />
            </div>
          </button>

          <div
            id="amazon-panel"
            ref={amazonRef}
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            aria-hidden={!isAmazonOpen}
            style={{ maxHeight: '0px' }}
          >
            <div className="px-8 py-10 lg:px-12 lg:py-14 border-t border-gray-100">
              {/* Use amazonItems from translations */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">{t.amazonItems.fba.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t.amazonItems.fba.text}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3">{t.amazonItems.direct.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t.amazonItems.direct.text}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3">{t.amazonItems.ddp.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t.amazonItems.ddp.text}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3">{t.amazonItems.inspection.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t.amazonItems.inspection.text}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3">{t.amazonItems.storage.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t.amazonItems.storage.text}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3">{t.amazonItems.samples.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t.amazonItems.samples.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
