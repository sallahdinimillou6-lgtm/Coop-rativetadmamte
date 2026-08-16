import React from 'react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, MessageSquare } from 'lucide-react';
import { useLanguage, getProductField } from '../utils/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const { language } = useLanguage();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = totalPrice >= 300 || totalPrice === 0 ? 0 : 35; // Free shipping over 300 MAD
  const finalTotal = totalPrice + shippingCost;

  const handleWhatsAppCheckout = () => {
    const phoneNumber = '212622943590';
    let text = '';

    const unit = language === 'ar' ? 'د.م' : language === 'fr' ? 'DH' : 'MAD';

    if (language === 'ar') {
      const itemsText = cartItems.map(item => {
        const name = getProductField(item.product, 'name', 'ar');
        return `- ${name} × ${item.quantity} = ${item.product.price * item.quantity} ${unit}`;
      }).join('\n');

      const shippingText = shippingCost === 0 ? 'مجاني' : `${shippingCost} ${unit}`;

      text = `🛍️ طلب جديد - Coopérative Tadmamte\n\n${itemsText}\n\nالشحن: ${shippingText}\nالمجموع: ${finalTotal} ${unit}\n\nشكراً لطلبكم، في انتظار تأكيدكم 🙏`;
    } else if (language === 'fr') {
      const itemsText = cartItems.map(item => {
        const name = getProductField(item.product, 'name', 'fr');
        return `- ${name} × ${item.quantity} = ${item.product.price * item.quantity} ${unit}`;
      }).join('\n');

      const shippingText = shippingCost === 0 ? 'Gratuit' : `${shippingCost} ${unit}`;

      text = `🛍️ Nouvelle commande - Coopérative Tadmamte\n\n${itemsText}\n\nLivraison : ${shippingText}\nTotal : ${finalTotal} ${unit}\n\nMerci pour votre commande, en attente de votre confirmation 🙏`;
    } else {
      const itemsText = cartItems.map(item => {
        const name = getProductField(item.product, 'name', 'en');
        return `- ${name} × ${item.quantity} = ${item.product.price * item.quantity} ${unit}`;
      }).join('\n');

      const shippingText = shippingCost === 0 ? 'Free' : `${shippingCost} ${unit}`;

      text = `🛍️ New Order - Coopérative Tadmamte\n\n${itemsText}\n\nShipping: ${shippingText}\nTotal: ${finalTotal} ${unit}\n\nThank you for your order, awaiting your confirmation 🙏`;
    }
    
    const fullText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${fullText}`, '_blank');
  };

  if (!isOpen) return null;

  const isAr = language === 'ar';
  const priceUnit = isAr ? 'د.م.' : language === 'fr' ? 'DH' : 'MAD';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/50 backdrop-blur-xs"
        />

        {/* Drawer container (slides from left/right depending on RTL) */}
        <div className={`absolute inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex`}>
          <motion.div
            initial={{ x: isAr ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-r border-brand-brown/5"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className={`px-6 py-5 border-b border-brand-sand flex items-center justify-between bg-brand-brown text-white ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                <h2 className="font-reem text-lg font-bold">
                  {isAr ? 'سلة المشتريات' : language === 'fr' ? 'Votre Panier' : 'Shopping Cart'}
                </h2>
                {cartItems.length > 0 && (
                  <span className="bg-brand-gold text-brand-brown text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                aria-label={isAr ? 'إغلاق السلة' : language === 'fr' ? 'Fermer' : 'Close'}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-y-auto p-6 ${isAr ? 'text-right' : 'text-left'}`}>
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-brand-sand rounded-full flex items-center justify-center text-brand-gold mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-reem text-xl text-brand-brown mb-2">
                    {isAr ? 'سلتك فارغة حالياً' : language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
                  </h3>
                  <p className="text-gray-500 text-xs max-w-xs mb-8">
                    {isAr 
                      ? 'تصفح منتجاتنا الطبيعية الفاخرة وأضف خياراتك المفضلة لدعم تعاونيتنا النسائية.' 
                      : language === 'fr' 
                      ? 'Découvrez nos produits naturels d’exception et soutenez notre coopérative de femmes.' 
                      : 'Browse our premium organic products and add your favorites to support our women-led cooperative.'}
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-brand-brown text-white font-semibold text-xs px-6 py-3 rounded-xl hover:bg-brand-earth transition-colors cursor-pointer"
                  >
                    {isAr ? 'ابدأ التسوق الآن' : language === 'fr' ? 'Commencer mes achats' : 'Start Shopping Now'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Clear cart action */}
                  <div className={`flex justify-between items-center pb-2 border-b border-brand-sand ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="text-xs text-gray-500 font-bold">
                      {isAr ? 'المنتجات المختارة' : language === 'fr' ? 'Articles sélectionnés' : 'Selected Items'}
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-red-500 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تفريغ السلة' : language === 'fr' ? 'Vider le panier' : 'Clear Cart'}</span>
                    </button>
                  </div>

                  {/* Products list */}
                  <div className="flex flex-col gap-4">
                    {cartItems.map(item => {
                      const name = getProductField(item.product, 'name', language);
                      const weight = getProductField(item.product, 'weight', language);

                      return (
                        <div
                          key={item.product.id}
                          className={`flex items-center gap-4 bg-brand-sand/40 p-3 rounded-2xl border border-brand-brown/5 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                          <img
                            src={item.product.image}
                            alt={name}
                            className="w-16 h-16 object-cover rounded-xl border border-brand-brown/5 shrink-0"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-brand-brown text-sm truncate">{name}</h4>
                            <p className="text-[11px] text-gray-500 mb-1.5">{weight}</p>
                            <div className={`flex items-center justify-between ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                              <div className="text-sm font-extrabold text-brand-earth">
                                {item.product.price * item.quantity} {priceUnit}
                              </div>
                              
                              {/* Quantity selector */}
                              <div className="flex items-center gap-1 bg-white border border-brand-brown/10 rounded-lg p-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 text-gray-500 hover:text-brand-brown transition-colors cursor-pointer"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-brand-dark">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 text-gray-500 hover:text-brand-brown transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer self-start"
                            title={isAr ? 'حذف المنتج' : language === 'fr' ? 'Supprimer' : 'Remove'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo or Free Shipping Notice */}
                  {totalPrice < 300 ? (
                    <div className="bg-brand-amber/10 text-brand-earth p-4 rounded-2xl flex items-start gap-3 border border-brand-amber/15">
                      <Truck className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed font-medium">
                        {isAr ? (
                          <>أضف <span className="font-bold text-brand-earth">{300 - totalPrice} د.م.</span> إضافية للتأهل للحصول على <span className="font-bold text-brand-olive">شحن مجاني لكل مدن المغرب!</span></>
                        ) : language === 'fr' ? (
                          <>Ajoutez <span className="font-bold text-brand-earth">{300 - totalPrice} DH</span> pour bénéficier de la <span className="font-bold text-brand-olive">livraison gratuite partout au Maroc !</span></>
                        ) : (
                          <>Add <span className="font-bold text-brand-earth">{300 - totalPrice} MAD</span> more to qualify for <span className="font-bold text-brand-olive">Free Shipping all over Morocco!</span></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-brand-olive/10 text-brand-olive p-4 rounded-2xl flex items-start gap-3 border border-brand-olive/15">
                      <Truck className="w-5 h-5 text-brand-olive shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed font-bold">
                        {isAr ? (
                          <>تهانينا! لقد حصلت على <span className="font-bold text-brand-olive">شحن مجاني بالكامل لطلبك!</span> نحن نغطي تكلفة التوصيل تقديراً لثقتك.</>
                        ) : language === 'fr' ? (
                          <>Félicitations ! Vous bénéficiez de la <span className="font-bold text-brand-olive">livraison gratuite sur votre commande !</span> Nous offrons les frais de transport.</>
                        ) : (
                          <>Congratulations! You have qualified for <span className="font-bold text-brand-olive">fully Free Shipping on your order!</span> We cover delivery costs.</>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Summary & Main Action */}
            {cartItems.length > 0 && (
              <div className={`px-6 py-5 bg-brand-sand border-t border-brand-brown/10 ${isAr ? 'text-right' : 'text-left'}`}>
                <div className="space-y-2.5 mb-5 text-xs sm:text-sm">
                  <div className={`flex justify-between text-gray-600 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span>{isAr ? 'مجموع السلة:' : language === 'fr' ? 'Sous-total :' : 'Subtotal:'}</span>
                    <span className="font-bold">{totalPrice} {priceUnit}</span>
                  </div>
                  <div className={`flex justify-between text-gray-600 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span>{isAr ? 'تكلفة التوصيل للمغرب:' : language === 'fr' ? 'Frais de livraison :' : 'Shipping Cost:'}</span>
                    <span className="font-bold">
                      {shippingCost === 0 ? (
                        <span className="text-brand-olive font-extrabold">{isAr ? 'شحن مجاني' : language === 'fr' ? 'Gratuit' : 'Free'}</span>
                      ) : (
                        `${shippingCost} ${priceUnit}`
                      )}
                    </span>
                  </div>
                  <div className={`flex justify-between text-brand-brown font-extrabold text-base pt-3 border-t border-brand-brown/10 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span>{isAr ? 'المجموع الإجمالي:' : language === 'fr' ? 'Total Général :' : 'Total Amount:'}</span>
                    <span className="text-brand-earth font-mono">{finalTotal} {priceUnit}</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-green-600/10 hover:shadow-lg text-sm sm:text-base"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{isAr ? 'أكمل الطلب عبر واتساب' : language === 'fr' ? 'Confirmer via WhatsApp' : 'Complete Order via WhatsApp'}</span>
                </button>
                <span className="block text-center text-[10px] text-gray-400 mt-2">
                  {isAr 
                    ? 'سيتم فتح تطبيق الواتساب لمراسلتنا بطلبك وتأكيده فوراً' 
                    : language === 'fr' 
                    ? 'L\'application WhatsApp s\'ouvrira pour nous envoyer votre commande et la confirmer' 
                    : 'WhatsApp will open to message us your order details and confirm it instantly'}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
