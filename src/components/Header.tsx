'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLoginClick: () => void;
  isDashboard?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ language, onLoginClick, isDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = translations[language].nav;

  const navItems = [
    { name: t.services, href: '#services' },
    { name: t.reviews, href: '#reviews' },
    { name: t.cost, href: '#cost' },
    { name: t.tracking, href: '#tracking' },
    { name: t.contacts, href: '#contacts' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isDashboard) {
        window.location.href = href;
        return;
    }
    
    // Check if we're on the correct language page
    const currentLang = pathname.startsWith('/ru') ? 'ru' : 'en';
    if (currentLang !== language) {
      // Navigate to correct language page with anchor
      const newPath = language === 'ru' ? `/ru${href}` : `/${href}`;
      window.location.href = newPath;
      return;
    }
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => { 
    if (language === 'en') {
      router.push('/');
    } else {
      router.push('/ru');
    }
  };

  const toggleLanguage = () => { 
    if (language === 'en') {
      router.push('/ru');
    } else {
      router.push('/');
    }
  };

  return (
    <header className="py-5 bg-cream fixed top-0 left-0 w-full z-50 transition-all shadow-sm border-b border-gray-100/50 backdrop-blur-md bg-cream/90">
      <div className="container mx-auto flex justify-between items-center px-4 xl:px-0">
        <div 
          onClick={scrollToTop}
          className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight cursor-pointer"
        >
          HappyBox
        </div>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {!isDashboard && (
            <ul className="flex gap-6 xl:gap-8 list-none">
                {navItems.map((item) => (
                <li key={item.href}>
                    <a 
                    href={item.href} 
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-brand-dark font-semibold text-sm hover:text-brand-blue transition-colors cursor-pointer tracking-wide"
                    >
                    {item.name}
                    </a>
                </li>
                ))}
            </ul>
          )}
          
          <div className="flex items-center gap-6 border-l border-gray-200 pl-6 h-8">
            <button 
                onClick={toggleLanguage}
                aria-label={language === 'en' ? 'Switch to Russian' : 'Переключить на русский язык'}
                className="text-gray-500 font-bold text-sm cursor-pointer hover:text-brand-blue tracking-wide select-none outline-none"
            >
                {language.toUpperCase()} ▼
            </button>

            {!isDashboard && (
                <button 
                    onClick={onLoginClick}
                    aria-label={language === 'en' ? 'Sign In' : 'Войти в личный кабинет'}
                    className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-brand-blue transition-colors shadow-lg shadow-gray-200 active:scale-95"
                >
                    <User size={16} />
                    {language === 'en' ? 'Sign In' : 'Войти'}
                </button>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
            <button 
                onClick={toggleLanguage}
                aria-label={language === 'en' ? 'Switch to Russian' : 'Переключить на русский язык'}
                className="text-gray-500 font-bold text-sm cursor-pointer hover:text-brand-blue tracking-wide select-none outline-none"
            >
                {language.toUpperCase()} ▼
            </button>
            
            {!isDashboard && (
                <button 
                    onClick={onLoginClick}
                    aria-label={language === 'en' ? 'Sign In' : 'Войти в личный кабинет'}
                    className="w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center active:scale-95"
                >
                    <User size={20} />
                </button>
            )}

            {!isDashboard && (
                <button 
                className="text-brand-dark"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            )}
        </div>

        {isMenuOpen && !isDashboard && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-4 flex flex-col gap-4 lg:hidden border-t border-gray-100 animate-fade-in">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)} 
                className="text-lg font-bold py-3 border-b border-gray-100 last:border-0 text-center text-brand-dark"
              >
                {item.name}
              </a>
            ))}
             <button 
                onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-2 bg-brand-dark text-white px-5 py-4 rounded-xl font-bold text-lg mt-2 active:scale-95"
            >
                <User size={20} />
                {language === 'en' ? 'Sign In' : 'Личный кабинет'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};