import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../utils/translations';
import defaultHeroWebp from '../assets/images/hero-background-v2.webp';
import defaultHeroJpg from '../assets/images/hero-background-v2.jpg';

interface HeroProps {
  onScrollToProducts: () => void;
  onScrollToStory: () => void;
  customBackground?: string;
}

export function Hero({ onScrollToProducts, onScrollToStory, customBackground }: HeroProps) {
  const { language, t } = useLanguage();
  
  // Resolve background source: if custom background is provided and valid, use it; otherwise use bundled default
  const activeBg = (customBackground && customBackground.trim() !== '') ? customBackground : defaultHeroWebp;
  const isDefaultBg = !customBackground || 
    customBackground === defaultHeroWebp || 
    customBackground === defaultHeroJpg ||
    customBackground === '/images/hero-background-v2.webp' || 
    customBackground === '/images/hero-background-v2.jpg' ||
    customBackground === '/images/hero-background.webp' || 
    customBackground === '/images/hero-background.jpg';

  return (
    <section 
      id="hero" 
      className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center bg-brand-dark overflow-hidden py-16"
    >
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0 bg-brand-dark">
        <img
          src={isDefaultBg ? (defaultHeroWebp || defaultHeroJpg) : activeBg}
          alt="Authentic Moroccan Souss landscape with Argan trees and mountains"
          className="w-full h-full object-cover object-center opacity-85 scale-100 select-none brightness-95 contrast-105"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultHeroJpg || '/images/hero-background-v2.jpg';
          }}
        />
        {/* Soft elegant gradient overlays to ensure text remains perfectly readable without washing out the mountain landscape */}
        <div className={`absolute inset-0 bg-linear-to-${language === 'ar' ? 'r' : 'l'} from-brand-dark/90 via-brand-dark/50 to-brand-dark/20`} />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/95 via-transparent to-brand-dark/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={`max-w-2xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {/* Subtle Berber Accent Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold px-4 py-2 rounded-full border border-brand-gold/30 mb-6 backdrop-blur-xs text-xs font-bold"
          >
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping" />
            <span>
              {language === 'ar' 
                ? 'منتجات طبيعية يدوية بأيدي نساء سوس ⵣ' 
                : language === 'fr' 
                ? 'Produits naturels faits main par les femmes de Souss ⵣ' 
                : 'Handmade natural products by the women of Souss ⵣ'}
            </span>
          </motion.div>

          {/* Majestic Hero Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-reem text-3xl sm:text-5xl lg:text-6xl text-brand-sand leading-[1.15] mb-6 font-extrabold"
          >
            {language === 'ar' ? (
              <>
                ذهب سوس الخالص <br />
                <span className="text-brand-gold">بين يديك وفي كل قطرة</span>
              </>
            ) : language === 'fr' ? (
              <>
                L'or pur de Souss <br />
                <span className="text-brand-gold">dans chaque goutte précieuse</span>
              </>
            ) : (
              <>
                Pure Gold of Souss <br />
                <span className="text-brand-gold">in every precious drop</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg mb-10 leading-relaxed max-w-xl font-light"
          >
            {t.heroDesc}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`flex flex-wrap gap-4 ${language === 'ar' ? 'justify-start' : 'justify-start'}`}
          >
            <button
              onClick={onScrollToProducts}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-brown font-extrabold px-7 py-4 rounded-xl flex items-center gap-2.5 transition-all duration-300 shadow-lg shadow-brand-gold/15 hover:shadow-xl hover:shadow-brand-gold/20 transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
              id="hero-primary-cta"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t.heroShopBtn}</span>
            </button>
            
            <button
              onClick={onScrollToStory}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl border border-white/10 transition-colors cursor-pointer text-sm sm:text-base flex items-center gap-2"
            >
              <span>{t.heroStoryBtn}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </motion.div>

          {/* Quick trust metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-xs text-gray-400"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>
                {language === 'ar' ? '١٠٠٪ طبيعي وخالٍ من المضافات' : language === 'fr' ? '100% naturel sans additifs' : '100% natural & additive-free'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>
                {language === 'ar' ? 'إنتاج يدوي تقليدي بالرحى الحجرية' : language === 'fr' ? 'Production artisanale traditionnelle' : 'Traditional hand-crafted production'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>
                {language === 'ar' ? 'دعم اقتصادي مباشر ومستدام للقرى' : language === 'fr' ? 'Soutien économique direct des villages' : 'Direct sustainable support for villages'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
