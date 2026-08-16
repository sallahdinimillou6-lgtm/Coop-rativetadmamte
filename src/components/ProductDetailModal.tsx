import React from 'react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Leaf, Weight } from 'lucide-react';
import { useLanguage, getProductField } from '../utils/translations';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const { language } = useLanguage();

  if (!product) return null;

  const isAr = language === 'ar';
  const name = getProductField(product, 'name', language);
  const categoryName = getProductField(product, 'categoryAr', language);
  const description = getProductField(product, 'longDescription', language) || getProductField(product, 'description', language);
  const weight = getProductField(product, 'weight', language);
  const benefits: string[] = getProductField(product, 'benefits', language) || [];
  const priceUnit = isAr ? 'د.م.' : language === 'fr' ? 'DH' : 'MAD';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir={isAr ? 'rtl' : 'ltr'}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/60 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 relative border border-brand-brown/5"
          id="product-detail-modal"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20 p-2 rounded-full bg-white/80 hover:bg-white text-brand-dark shadow-sm hover:shadow transition-all cursor-pointer`}
            aria-label={isAr ? 'إغلاق النافذة' : language === 'fr' ? 'Fermer' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner / Image */}
          <div className="relative h-64 sm:h-80 bg-brand-sand/50">
            <img
              src={product.image}
              alt={name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/honey_flowers.webp';
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
            <div className={`absolute bottom-6 ${isAr ? 'right-6 left-6 text-right' : 'left-6 right-6 text-left'} text-white`}>
              <span className="bg-brand-gold text-brand-brown text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                {categoryName}
              </span>
              <h2 className="font-reem text-2xl sm:text-3xl text-white drop-shadow-xs">
                {name}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            <div className={`flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-brand-sand ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-brand-brown">{product.price}</span>
                <span className="text-sm text-gray-500 font-medium">{priceUnit}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-sand px-3 py-1.5 rounded-xl text-brand-earth text-sm font-medium">
                <Weight className="w-4 h-4 text-brand-gold" />
                <span>{isAr ? `الوزن صافي: ${weight}` : language === 'fr' ? `Poids net : ${weight}` : `Net weight: ${weight}`}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-reem text-lg text-brand-brown mb-2">
                {isAr ? 'الوصف والقصة:' : language === 'fr' ? 'Description et histoire :' : 'Description & Origin:'}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {description}
              </p>
            </div>

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="font-reem text-lg text-brand-brown mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-brand-olive" />
                  <span>{isAr ? 'الفوائد والمميزات الصحية:' : language === 'fr' ? 'Bienfaits pour la santé :' : 'Health Benefits:'}</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 bg-brand-sand/40 p-3 rounded-xl border border-brand-brown/5">
                      <span className="bg-brand-olive/10 text-brand-olive p-1 rounded-lg shrink-0 mt-0.5">
                        <Leaf className="w-3.5 h-3.5" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-sand">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 bg-brand-gold hover:bg-brand-gold-hover text-brand-brown font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-md shadow-brand-gold/10 cursor-pointer text-base"
                id="modal-add-to-cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isAr ? 'إضافة إلى سلة المشتريات' : language === 'fr' ? 'Ajouter au Panier' : 'Add to Shopping Cart'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-4 bg-brand-sand hover:bg-brand-brown/5 text-brand-brown font-semibold rounded-xl transition-colors cursor-pointer text-sm"
              >
                {isAr ? 'العودة للتصفح' : language === 'fr' ? 'Retour' : 'Back to Shop'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
