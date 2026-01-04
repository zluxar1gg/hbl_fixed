import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface ServicesProps {
  language: Language;
}

export const Services: React.FC<ServicesProps> = ({ language }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAmazonOpen, setIsAmazonOpen] = useState(false);
  const t = translations[language].services;

  return (
    <section className="py-6 pb-10 bg-cream">
      <div className="container mx-auto space-y-6">
        
        {/* Services Block */}
        <div className="bg-white rounded-[30px] shadow-sm overflow-hidden transition-all duration-300">
          <button 
            className="w-full p-8 lg:p-10 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors select-none text-left"
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            aria-expanded={isServicesOpen}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark tracking-tight">{t.title}</h3>
            <div className={`w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-blue transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={28} strokeWidth={2.5} />
            </div>
          </button>

          <div className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isServicesOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
            <div className="px-8 py-10 lg:px-10 lg:py-12 pt-0 grid lg:grid-cols-2 gap-x-20 gap-y-12 border-t border-gray-100 mt-2">
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
            className="w-full p-8 lg:p-10 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors select-none text-left"
            onClick={() => setIsAmazonOpen(!isAmazonOpen)}
            aria-expanded={isAmazonOpen}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark tracking-tight">{t.amazonTitle}</h3>
            <div className={`w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-blue transition-transform duration-300 ${isAmazonOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={28} strokeWidth={2.5} />
            </div>
          </button>

          <div className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isAmazonOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
            <div className="px-8 py-10 lg:px-10 lg:py-12 pt-0 grid lg:grid-cols-2 gap-x-20 gap-y-12 border-t border-gray-100 mt-2">
              <div>
                <ServiceItem title={t.amazonItems.fba.title} text={t.amazonItems.fba.text} />
                <ServiceItem title={t.amazonItems.direct.title} text={t.amazonItems.direct.text} />
                <ServiceItem title={t.amazonItems.ddp.title} text={t.amazonItems.ddp.text} />
              </div>
              
              <div>
                <ServiceItem title={t.amazonItems.inspection.title} text={t.amazonItems.inspection.text} />
                <ServiceItem title={t.amazonItems.storage.title} text={t.amazonItems.storage.text} />
                <ServiceItem title={t.amazonItems.samples.title} text={t.amazonItems.samples.text} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const ServiceItem = ({ title, text }: { title: string; text: string }) => (
  <div className="mb-12 last:mb-0">
    <h4 className="font-bold text-brand-dark text-xl mb-4">{title}</h4>
    <p className="text-gray-600 leading-relaxed text-base font-medium">{text}</p>
  </div>
);