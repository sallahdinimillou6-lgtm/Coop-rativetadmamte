import React from 'react';
import { TadmamteLogo } from './TadmamteLogo';
import { Mail, Phone, MapPin, Truck, ShieldCheck, Heart, ArrowUp, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../utils/translations';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export function Footer({ onScrollTo }: FooterProps) {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-gray-300 pt-16 pb-8 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Selling Points / Badges */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-white/5 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 text-brand-gold rounded-2xl border border-white/5 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-reem font-bold text-white text-base mb-1">
                {language === 'ar' ? 'توصيل سريع مأمن' : language === 'fr' ? 'Livraison rapide & sécurisée' : 'Fast & Secured Delivery'}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {language === 'ar' 
                  ? 'نشحن لكافة مدن المغرب في قوارير زجاجية آمنة ومغلفة بعناية تامة لضمان سلامتها.' 
                  : language === 'fr' 
                  ? 'Nous expédions dans toutes les villes du Maroc dans des emballages en verre renforcés.' 
                  : 'We ship to all Moroccan cities in carefully padded glass jars to ensure perfect safety.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 text-brand-gold rounded-2xl border border-white/5 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-reem font-bold text-white text-base mb-1">
                {language === 'ar' ? 'الدفع نقداً عند الاستلام' : language === 'fr' ? 'Paiement à la livraison' : 'Cash on Delivery'}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {language === 'ar' 
                  ? 'لا مخاطرة تذكر! تصفح طردك وافحصه عند باب بيتك أولاً، ثم ادفع نقداً للموزع.' 
                  : language === 'fr' 
                  ? 'Aucun risque ! Vérifiez votre colis à la livraison, puis payez en espèces au livreur.' 
                  : 'Zero risk! Inspect your package at your doorstep, then pay in cash to the courier.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 text-brand-gold rounded-2xl border border-white/5 shrink-0">
              <Heart className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h4 className="font-reem font-bold text-white text-base mb-1">
                {language === 'ar' ? 'دعم رائدات سوس' : language === 'fr' ? 'Soutien aux femmes de Souss' : 'Supporting Souss Women'}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {language === 'ar' 
                  ? 'شرائك يساهم بشكل مباشر في تحسين معيشة عائلات نساء التعاونية وضمان استقرارهن المالي.' 
                  : language === 'fr' 
                  ? 'Votre achat soutient directement l’autonomie et les revenus des femmes artisanes.' 
                  : 'Your purchase directly improves the livelihoods and financial stability of local cooperative women.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Bio */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 py-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          
          {/* Cooperative Bio */}
          <div className="md:col-span-5 space-y-5">
            <div 
              onClick={() => onScrollTo('hero')}
              className="inline-block cursor-pointer"
            >
              <TadmamteLogo variant="dark" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {language === 'ar' 
                ? 'تعاونية تدمامت (Coopérative Tadmamte) هي تعاونية فلاحية رائدة في منطقة سوس لإنتاج وتعبئة العسل الطبيعي، أملو الأصيل، واستخلاص العسل بطرق صديقة للبيئة لتقديم منتجات طبيعية خالصة بأيدي ماهرة ومناحل موثوقة.' 
                : language === 'fr' 
                ? 'Coopérative Tadmamte est une coopérative agricole majeure produisant du miel naturel pur, de l’Amlou traditionnel et d’autres délices de Souss dans le respect de l’environnement.' 
                : 'Coopérative Tadmamte is a leading agricultural cooperative in the Souss region, crafting and bottling organic honey, authentic Amlou, and natural products.'}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 justify-start pt-2">
              <a 
                href="https://www.facebook.com/share/1DKAwNBmHA/" 
                target="_blank" 
                rel="noreferrer referrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-gold hover:text-brand-brown flex items-center justify-center transition-colors text-gray-400"
                title="تابعنا على فيسبوك"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/copirative.____.tadmamt" 
                target="_blank" 
                rel="noreferrer referrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-gold hover:text-brand-brown flex items-center justify-center transition-colors text-gray-400"
                title="تابعنا على إنستغرام"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/212622943590" 
                target="_blank" 
                rel="noreferrer referrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-gold hover:text-brand-brown flex items-center justify-center transition-colors text-gray-400"
                title="تواصل معنا عبر واتساب"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-reem font-bold text-white text-sm tracking-wider">
              {language === 'ar' ? 'روابط المتجر السريعة' : language === 'fr' ? 'Liens de la boutique' : 'Quick Shop Links'}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-brand-gold transition-colors cursor-pointer">
                  {language === 'ar' ? 'الرئيسية' : language === 'fr' ? 'Accueil' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('story')} className="hover:text-brand-gold transition-colors cursor-pointer">
                  {language === 'ar' ? 'قصتنا ومهمتنا' : language === 'fr' ? 'Notre Histoire' : 'Our Story'}
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('products')} className="hover:text-brand-gold transition-colors cursor-pointer">
                  {language === 'ar' ? 'منتجاتنا العضوية' : language === 'fr' ? 'Nos Produits' : 'Our Products'}
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('testimonials')} className="hover:text-brand-gold transition-colors cursor-pointer">
                  {language === 'ar' ? 'شهادات زبنائنا' : language === 'fr' ? 'Témoignages' : 'Testimonials'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-reem font-bold text-white text-sm tracking-wider">
              {language === 'ar' ? 'معلومات التواصل والمقر' : language === 'fr' ? 'Contact & Localisation' : 'Contact & Location'}
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex items-start gap-3 justify-start">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  {language === 'ar' ? 'المقر:' : language === 'fr' ? 'Siège :' : 'HQ:'} Dr Ibourin, CR Ait Milk, Chtouka Ait Baha
                </span>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span dir="ltr">0622943590</span>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>cooperative.agricole.tadmamte@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className={`border-t border-white/5 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center ${language === 'ar' ? 'sm:text-right sm:flex-row-reverse' : 'sm:text-left'}`}>
          <div>
            {language === 'ar' 
              ? `جميع الحقوق محفوظة © ${currentYear} لـ تعاونية تدمامت - Coopérative Tadmamte ⵣ.` 
              : `Tous droits réservés © ${currentYear} Coopérative Tadmamte ⵣ.`}
          </div>
          <div className="flex items-center gap-2">
            <span>
              {language === 'ar' 
                ? 'صُنع بحب وفخر بصناعتنا التقليدية المغربية' 
                : language === 'fr' 
                ? 'Fait avec amour et fierté du patrimoine marocain' 
                : 'Made with love & pride of Moroccan traditional heritage'}
            </span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
