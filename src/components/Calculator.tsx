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
