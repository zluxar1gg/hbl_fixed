
import React, { useState, useMemo, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { Info, Truck, Plane, Anchor, AlertCircle, HelpCircle } from 'lucide-react';

const RATES: Record<string, number> = {
  'us': 19, 'ca': 15.5, 'au': 15, 'ae': 20, 'pl': 16, 'de': 16, 'fr': 16, 'es': 16, 'pt': 16,
  'eng': 16, 'it': 16, 'at': 16, 'be': 16, 'bg': 16, 'ro': 16, 'nl': 16,
};

const SEA_RATES: Record<string, number> = {
  'us': 5, 'ca': 6, 'pl': 5.5, 'de': 6.5, 'es': 7, 'pt': 7, 'au': 5.5
};

const RAIL_RATES: Record<string, number> = {
  'pl': 5, 'de': 5.5, 'fr': 6, 'ae': 12
};

const COUNTRY_CODES = [
  'us', 'ca', 'au', 'ae', 'pl', 'de', 'fr', 'es', 'pt',
  'eng', 'it', 'at', 'be', 'bg', 'ro', 'nl', 'other'
];

type ShippingMethod = 'air' | 'sea' | 'rail';

type CalculationResult = {
  isOther: boolean;
  price?: number;
  time?: string;
  weightKg?: number;
  method: ShippingMethod;
  warningNote?: string;
};

interface CalculatorProps {
  language: Language;
  onOpenQuiz: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ language, onOpenQuiz }) => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg'); 
  const [country, setCountry] = useState('');
  const [method, setMethod] = useState<ShippingMethod>('air');
  const [error, setError] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const t = translations[language].calculator;
  const qt = translations[language].quiz;

  const weightNum = parseFloat(weight) || 0;
  const currentWeightKg = unit === 'pound' ? weightNum * 0.453592 : weightNum;

  const isSeaAvailable = !!SEA_RATES[country];
  const isRailAvailable = !!RAIL_RATES[country];

  const canSelectSea = useMemo(() => {
    if (!isSeaAvailable) return false;
    return currentWeightKg >= 30;
  }, [country, isSeaAvailable, currentWeightKg]);

  const canSelectRail = useMemo(() => {
    if (!isRailAvailable) return false;
    return currentWeightKg >= 30;
  }, [isRailAvailable, currentWeightKg]);

  useEffect(() => {
    if (method === 'sea' && !canSelectSea) setMethod('air');
    if (method === 'rail' && !canSelectRail) setMethod('air');
  }, [canSelectSea, canSelectRail, method]);

  const sortedCountries = useMemo(() => {
    const list = COUNTRY_CODES.map(code => ({
      code,
      name: t.countries[code as keyof typeof t.countries]
    }));
    return list.sort((a, b) => {
      if (a.code === 'other') return 1;
      if (b.code === 'other') return -1;
      return a.name.localeCompare(b.name);
    });
  }, [t.countries]);

  const handleCalculate = () => {
    if (!weight || !country) {
      setError(true);
      return;
    }
    setError(false);
    
    if (country === 'other') {
        setResult({ isOther: true, method: 'air' });
        return;
    }

    let finalPrice = 0;
    let timeEstimate = "";
    let warning = "";

    if (method === 'air') {
      const rate = RATES[country] || 20;
      finalPrice = Math.ceil(currentWeightKg * rate);
      timeEstimate = `8-15 ${t.timeDays}`;
    } else if (method === 'sea' && isSeaAvailable) {
      finalPrice = Math.ceil(currentWeightKg * SEA_RATES[country]);
      timeEstimate = `35-50 ${t.timeDays}`;
      if (['pl', 'de', 'es', 'pt'].includes(country)) warning = t.euDisclaimer;
    } else if (method === 'rail' && isRailAvailable) {
      finalPrice = Math.ceil(currentWeightKg * RAIL_RATES[country]);
      timeEstimate = country === 'ae' ? `12-18 ${t.timeDays}` : `25-35 ${t.timeDays}`;
      if (['pl', 'de', 'fr'].includes(country)) warning = t.euDisclaimer;
    }

    setResult({
      isOther: false,
      price: Math.max(20, finalPrice),
      time: timeEstimate,
      weightKg: currentWeightKg,
      method: method,
      warningNote: warning
    });
  };

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-brand-light/20">
      <div className="container mx-auto">
        <div className="bg-white rounded-[40px] p-8 lg:p-16 max-w-[1150px] mx-auto shadow-sm border border-gray-100">
          <div className="mb-14 lg:mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-blue mb-6 tracking-tighter">{t.title}</h2>
            <p className="text-lg md:text-xl text-gray-500 font-bold max-w-3xl">{t.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left Column: Form & Quiz Inline CTA */}
            <div className="flex flex-col gap-7">
              <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                <button onClick={() => setMethod('air')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${method === 'air' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  <Plane size={18} /> {t.methodAir}
                </button>
                <button disabled={!isSeaAvailable || currentWeightKg < 30} onClick={() => setMethod('sea')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${(!isSeaAvailable || currentWeightKg < 30) ? 'opacity-20 cursor-not-allowed' : ''} ${method === 'sea' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  <Anchor size={18} /> {t.methodSea}
                </button>
                <button disabled={!isRailAvailable || currentWeightKg < 30} onClick={() => setMethod('rail')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${(!isRailAvailable || currentWeightKg < 30) ? 'opacity-20 cursor-not-allowed' : ''} ${method === 'rail' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  <Truck size={18} /> {t.methodRail}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="relative">
                  <input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                    placeholder={t.weightPlaceholder} 
                    className={`w-full p-4 border-2 border-gray-100 rounded-2xl text-lg font-bold outline-none bg-gray-50/50 text-brand-dark transition-all focus:border-brand-blue ${error && !weight ? 'border-red-200' : ''}`} 
                  />
                  <p className="text-[10px] text-gray-400 font-black ml-3 mt-2 uppercase tracking-widest">{t.minWeightHint}</p>
                </div>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} className="p-4 border-2 border-gray-100 rounded-2xl font-black outline-none bg-gray-50/50 h-[60px] cursor-pointer focus:border-brand-blue transition-all">
                  <option value="kg">{t.kg}</option>
                  <option value="pound">{t.lb}</option>
                </select>
              </div>

              <div className="relative">
                <select 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)} 
                  className={`w-full p-4 border-2 border-gray-100 rounded-2xl text-lg font-bold focus:border-brand-blue outline-none bg-gray-50/50 text-brand-dark cursor-pointer appearance-none transition-all ${error && !country ? 'border-red-200' : ''}`}
                >
                  <option value="">{t.selectCountry}</option>
                  {sortedCountries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <HelpCircle size={20} />
                </div>
              </div>

              <div className="space-y-6 pt-3">
                <button 
                  onClick={handleCalculate} 
                  className="w-full bg-brand-blue text-white font-black text-xl p-5 rounded-[25px] transition-all shadow-xl shadow-blue-100 hover:bg-blue-600 active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {t.button}
                </button>

                {/* INLINE QUIZ CTA */}
                <div className="flex flex-row items-center justify-center gap-4 py-2 animate-fade-in">
                  <p className="text-gray-500 font-bold text-sm leading-tight">
                    {qt.cta}
                  </p>
                  <button 
                    onClick={onOpenQuiz}
                    className="bg-brand-yellow text-brand-dark px-6 py-2.5 rounded-2xl font-black text-xs uppercase shadow-sm hover:scale-105 transition-transform active:scale-95 whitespace-nowrap"
                  >
                    {qt.button}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Results or Mascot */}
            <div className="h-full flex items-center justify-center min-h-[320px] lg:min-h-[450px]">
              {result ? (
                <div className="w-full text-center p-8 lg:p-12 bg-gradient-to-br from-brand-blue to-blue-400 rounded-[40px] text-white shadow-2xl animate-fade-in flex flex-col justify-center min-h-[400px] lg:min-h-[450px] relative overflow-hidden group">
                  {result.isOther ? (
                    <div className="space-y-6 relative z-10">
                      <h3 className="text-3xl font-black tracking-tight">{t.contactQuote}</h3>
                      <p className="text-blue-50 font-medium opacity-80">{t.contactDesc}</p>
                      <button onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-brand-blue px-10 py-4 rounded-2xl font-black text-lg shadow-lg hover:scale-105 transition-transform active:scale-95">{t.contactBtn}</button>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <p className="text-blue-100 font-black mb-3 text-xs uppercase tracking-[0.2em] bg-white/10 py-2 px-6 rounded-full inline-block">
                        {result.method === 'air' ? t.methodAir : result.method === 'sea' ? t.methodSea : t.methodRail}
                      </p>
                      <h3 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter drop-shadow-lg">${result.price}</h3>
                      <p className="text-xl md:text-2xl font-bold mb-8 flex items-center justify-center gap-2">
                        {t.time}: <span className="text-brand-yellow">{result.time}</span>
                      </p>
                      {result.warningNote && (
                        <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 mb-8 text-xs text-left border border-white/10 flex items-start gap-3">
                           <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-brand-yellow" /> 
                           <p className="font-bold leading-relaxed">{result.warningNote}</p>
                        </div>
                      )}
                      <button onClick={() => setResult(null)} className="mt-4 text-xs font-black uppercase tracking-widest border-2 border-white/30 px-8 py-3 rounded-2xl hover:bg-white/10 transition-all">
                        {t.recalculate}
                      </button>
                    </div>
                  )}
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full -ml-24 -mb-24 blur-3xl"></div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-[40px] w-full flex flex-col items-center justify-center min-h-[320px] lg:min-h-[450px] border border-gray-100 p-6 lg:p-12 shadow-inner overflow-hidden">
                   <img 
                    src="https://i.ibb.co/Fqyggpqt/happyboxcalc.webp" 
                    alt="Happy Box Calculator Mascot" 
                    className="w-full max-w-[240px] md:max-w-[300px] lg:max-w-[400px] h-auto object-contain drop-shadow-xl animate-float"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
