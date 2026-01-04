'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Reviews } from '@/components/Reviews';
import { Calculator } from '@/components/Calculator';
import { DeliveryPath } from '@/components/DeliveryPath';
import { ShoppingGuides } from '@/components/ShoppingGuides';
import { Tracking } from '@/components/Tracking';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SeoBlock } from '@/components/SeoBlock';
import { Analytics } from '@/components/Analytics';
import { FloatingContact } from '@/components/FloatingContact';
import { Language, translations } from '@/utils/translations';
import { Loader2, X, Hammer } from 'lucide-react';

// Lazy load components
const Quiz = React.lazy(() => import('@/components/Quiz').then(module => ({ default: module.Quiz })));

export default function HomePage() {
  const [language] = useState<Language>('en');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const t = translations[language].devModal;

  // Handle body scroll locking
  useEffect(() => {
    if (isQuizOpen || isDevModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isQuizOpen, isDevModalOpen]);

  return (
    <div className="min-h-screen bg-cream font-sans text-brand-dark overflow-x-hidden pt-20">
      <Analytics />
      <Header 
        language={language} 
        onLoginClick={() => setIsDevModalOpen(true)}
        isDashboard={false}
      />
      
      <main>
        <Hero language={language} />
        <DeliveryPath language={language} />
        <div id="services" className="scroll-mt-28">
          <Services language={language} />
        </div>
        <div id="about" className="scroll-mt-28">
          <About language={language} />
        </div>
        <ShoppingGuides language={language} />
        <div id="reviews" className="scroll-mt-28">
          <Reviews language={language} />
        </div>
        <div id="cost" className="scroll-mt-28">
          <Calculator language={language} onOpenQuiz={() => setIsQuizOpen(true)} />
        </div>
        
        {isQuizOpen && (
          <Suspense fallback={
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          }>
            <Quiz 
              language={language} 
              isOpen={isQuizOpen} 
              onClose={() => setIsQuizOpen(false)} 
            />
          </Suspense>
        )}

        <div id="tracking" className="scroll-mt-28">
          <Tracking language={language} />
        </div>
        <div id="contacts" className="scroll-mt-28">
          <Contact language={language} />
        </div>
        <SeoBlock language={language} />
        <Footer language={language} />
        <FloatingContact />
      </main>

      {/* Under Development Modal */}
      {isDevModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md animate-fade-in"
          onClick={() => setIsDevModalOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background design element */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-light rounded-full blur-2xl opacity-50"></div>
            
            <button 
              onClick={() => setIsDevModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-dark transition-all"
            >
              <X size={20} />
            </button>

            <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-[25px] flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
              <Hammer size={40} />
            </div>

            <h2 className="text-3xl font-black text-brand-dark mb-4 tracking-tight">
              {t.title}
            </h2>
            
            <p className="text-gray-500 font-bold leading-relaxed mb-10">
              {t.message}
            </p>

            <button 
              onClick={() => setIsDevModalOpen(false)}
              className="w-full bg-brand-dark text-white py-4 rounded-2xl font-black text-lg hover:bg-brand-blue transition-all active:scale-95 shadow-xl shadow-gray-100"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
