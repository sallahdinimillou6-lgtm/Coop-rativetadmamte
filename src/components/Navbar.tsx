import React from 'react';
import { TadmamteLogo } from './TadmamteLogo';
import { ShoppingBag, Menu, PhoneCall, Gift, Lock } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../utils/translations';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onScrollTo: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export function Navbar({ cartItems, onOpenCart, onScrollTo, onOpenAdmin }: NavbarProps) {
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      {/* Upper Announcement Bar */}
      <div className="bg-brand-brown text-brand-sand py-2 px-4 text-center text-xs font-medium border-b border-b-brand-gold/10 flex items-center justify-center gap-2">
        <Gift className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
        <span>
          {language === 'ar' 
            ? 'شحن مجاني لكافة مدن المغرب عند الشراء بـ ٣٠٠ د.م. أو أكثر!' 
            : language === 'fr' 
            ? 'Livraison gratuite partout au Maroc dès 300 DH d\'achat !' 
            : 'Free shipping all over Morocco on orders of 300 MAD or more!'}
        </span>
        <span className="hidden sm:inline-block text-brand-gold/70 mx-1">|</span>
        <span className="hidden sm:inline-block">
          {language === 'ar' 
            ? 'توصيل سريع والدفع بأمان عند الاستلام' 
            : language === 'fr' 
            ? 'Livraison rapide & paiement sécurisé à la livraison' 
            : 'Fast delivery & secure cash on delivery'}
        </span>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-brown/5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Name */}
            <div 
              onClick={() => onScrollTo('hero')} 
              className="flex items-center cursor-pointer"
              id="brand-logo-trigger"
            >
              <TadmamteLogo className="h-10 sm:h-12" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-brown/80">
              <button
                onClick={() => onScrollTo('hero')}
                className="hover:text-brand-gold hover:underline underline-offset-8 transition-all cursor-pointer"
              >
                {t.navHome}
              </button>
              <button
                onClick={() => onScrollTo('story')}
                className="hover:text-brand-gold hover:underline underline-offset-8 transition-all cursor-pointer"
              >
                {t.navStory}
              </button>
              <button
                onClick={() => onScrollTo('products')}
                className="hover:text-brand-gold hover:underline underline-offset-8 transition-all cursor-pointer"
              >
                {t.navShop}
              </button>
              <button
                onClick={() => onScrollTo('testimonials')}
                className="hover:text-brand-gold hover:underline underline-offset-8 transition-all cursor-pointer"
              >
                {t.navReviews}
              </button>
              <button
                onClick={() => onScrollTo('contact')}
                className="hover:text-brand-gold hover:underline underline-offset-8 transition-all cursor-pointer"
              >
                {t.navContact}
              </button>
            </nav>

            {/* Actions (Language Switcher, Cart & Quick Contact) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher */}
              <div className="flex bg-brand-sand p-1 rounded-xl border border-brand-brown/5 text-[10px] sm:text-xs font-bold font-sans">
                {(['ar', 'fr', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-1.5 py-1 sm:px-2.5 rounded-lg uppercase transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-brand-brown text-brand-gold shadow-xs font-black'
                        : 'text-brand-brown/60 hover:text-brand-brown'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Phone call icon hidden on very small displays */}
              <a
                href="tel:+212622943590"
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-brand-olive hover:text-brand-gold bg-brand-olive/5 hover:bg-brand-olive/10 px-3.5 py-2.5 rounded-xl transition-all"
                title={t.navCallOrder}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t.navCallOrder}</span>
              </a>

              {/* Admin Lock Button */}
              <button
                onClick={onOpenAdmin}
                className="bg-brand-sand hover:bg-brand-gold hover:text-brand-brown text-brand-brown p-3 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer border border-brand-brown/5 shadow-xs"
                id="admin-lock-trigger"
                aria-label={t.navAdmin}
                title={t.navAdmin}
              >
                <Lock className="w-4.5 h-4.5" />
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative bg-brand-sand hover:bg-brand-brown hover:text-white text-brand-brown p-3 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer border border-brand-brown/5 shadow-xs"
                id="cart-button-trigger"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 bg-brand-gold text-brand-brown text-[11px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white animate-scale shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
