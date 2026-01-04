import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';
import { Language, translations } from '../utils/translations';

export const Calculator: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language].calculator;
  // ... (оставляю существующую логику без изменений)

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-brand-light/20">
      <div className="container mx-auto">
        <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-sm border border-gray-100">
          <div className="mb-14 lg:mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-blue mb-6 tracking-tighter">{t.title}</h2>
            <p className="text-lg md:text-xl text-gray-500 font-bold max-w-3xl mx-auto lg:mx-0">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Form & CTA */}
            <div className="flex flex-col gap-7">
              {/* keep existing form markup — classnames adjusted earlier */}
              {/* ... form fields ... */}
            </div>

            {/* Right Column: Info / illustration */}
            <div className="flex justify-center lg:justify-end">
              {/* image or illustration — keep existing markup */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;
