import React from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Plus, Eye, Award } from 'lucide-react';
import { useLanguage, getProductField } from '../utils/translations';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  key?: string;
}

export function ProductCard({ product, onAddToCart, onOpenDetails }: ProductCardProps) {
  const { language } = useLanguage();

  const name = getProductField(product, 'name', language);
  const description = getProductField(product, 'description', language);
  const weight = getProductField(product, 'weight', language);
  const categoryName = getProductField(product, 'categoryAr', language);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-brand-brown/5 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col h-full group"
      id={`product-card-${product.id}`}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-4/3 bg-[#F4EDE2]">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/honey_flowers.webp';
          }}
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="bg-brand-gold text-brand-brown text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              {language === 'ar' ? 'الأكثر طلباً' : language === 'fr' ? 'Meilleure vente' : 'Bestseller'}
            </span>
          )}
          <span className="bg-brand-brown/95 text-brand-sand text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-xs">
            {weight}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-brand-olive font-bold tracking-wider mb-1.5">
          {categoryName}
        </div>
        <h3 className="font-reem text-lg text-brand-brown mb-2 leading-snug group-hover:text-brand-gold transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {/* Price and Action */}
        <div className="mt-auto pt-4 border-t border-brand-sand flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-brand-earth">{product.price}</span>
            <span className="text-xs text-gray-500 mr-1 font-medium">
              {language === 'ar' ? 'د.م.' : language === 'fr' ? 'DH' : 'MAD'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onOpenDetails(product)}
              className="p-2.5 rounded-xl border border-brand-brown/10 text-brand-brown hover:bg-brand-sand transition-colors cursor-pointer"
              title={language === 'ar' ? 'عرض التفاصيل والفوائد' : language === 'fr' ? 'Voir les détails et bienfaits' : 'View details and benefits'}
              id={`view-details-${product.id}`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-brand-brown hover:bg-brand-earth text-white font-medium text-sm px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer"
              id={`add-to-cart-${product.id}`}
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'إضافة' : language === 'fr' ? 'Ajouter' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
