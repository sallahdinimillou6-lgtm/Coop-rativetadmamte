import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Reviews } from './components/Reviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminPanel } from './components/AdminPanel';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Filter, Star, Info, ShoppingCart, Check, ArrowDown, Leaf, Loader2, Plus } from 'lucide-react';
import { useLanguage, getProductField } from './utils/translations';
import { 
  isFirebaseConfigured, 
  fetchProductsFromFirestore, 
  subscribeToProductsFromFirestore,
  fetchHeroBackgroundFromFirestore,
  saveHeroBackgroundToFirestore,
  deleteProductFromFirestore,
  purgeDummyProductsFromFirestore,
  BANNED_DUMMY_PRODUCT_IDS
} from './utils/firebase';
import {
  fetchServerProducts,
  fetchServerHeroBackground,
  saveServerHeroBackground,
  syncAllProductsToServer
} from './utils/api';

export default function App() {
  const { language, t } = useLanguage();

  // Start with empty catalog and fetch strictly and live from Firestore & Server API
  // No hardcoded items or localStorage caching to guarantee clean, real live data across all devices
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tifawin_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [heroBackground, setHeroBackground] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('tadmamte_hero_bg');
      if (saved && saved !== '/images/hero-background.webp' && saved !== '/images/hero-background.jpg') {
        return saved;
      }
      return '/images/hero-background-v2.webp';
    } catch {
      return '/images/hero-background-v2.webp';
    }
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'amlou' | 'argan' | 'honey' | 'cosmetics'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    let unsubscribeProducts: (() => void) | undefined;
    let pollInterval: any = null;

    // Purge legacy storage on mount
    try {
      localStorage.removeItem('tifawin_products');
    } catch {}

    async function loadData() {
      setIsLoadingProducts(true);

      // 1. Primary Live Sync: If Firebase is configured, listen to Firestore in real-time
      if (isFirebaseConfigured) {
        try {
          // Permanently purge all dummy/banned product IDs from Firestore
          await purgeDummyProductsFromFirestore().catch(() => {});

          unsubscribeProducts = subscribeToProductsFromFirestore(
            (dbProducts) => {
              const clean = (dbProducts || []).filter(p => !BANNED_DUMMY_PRODUCT_IDS.includes(p.id));
              setAllProducts(clean);
              if (clean.length > 0) {
                syncAllProductsToServer(clean);
              }
              setIsLoadingProducts(false);
            },
            (error) => {
              console.warn("Firestore live stream warning:", error);
              setIsLoadingProducts(false);
            }
          );

          const globalHeroBg = await fetchHeroBackgroundFromFirestore();
          if (globalHeroBg) {
            setHeroBackground(globalHeroBg);
            localStorage.setItem('tadmamte_hero_bg', globalHeroBg);
          }
        } catch (error) {
          console.warn("Firebase initialization warning:", error);
        }
      }

      // 2. Fetch from central server API (guarantees universal persistence across all devices)
      try {
        const serverProds = await fetchServerProducts();
        if (serverProds && serverProds.length > 0) {
          const cleanServer = serverProds.filter((p: Product) => !BANNED_DUMMY_PRODUCT_IDS.includes(p.id));
          setAllProducts(cleanServer);
        }

        const serverHero = await fetchServerHeroBackground();
        if (serverHero) {
          setHeroBackground(serverHero);
          localStorage.setItem('tadmamte_hero_bg', serverHero);
        }
      } catch (err) {
        console.warn("Server API sync warning:", err);
      }

      setIsLoadingProducts(false);
    }

    loadData();

    // 3. Periodic real-time background sync every 4 seconds to guarantee all visitor phones see changes immediately
    pollInterval = setInterval(async () => {
      try {
        const latestProds = await fetchServerProducts();
        if (latestProds && latestProds.length > 0) {
          const cleanServer = latestProds.filter((p: Product) => !BANNED_DUMMY_PRODUCT_IDS.includes(p.id));
          if (cleanServer.length > 0) {
            setAllProducts((current) => {
              // Only update if JSON content differs
              if (JSON.stringify(current) !== JSON.stringify(cleanServer)) {
                return cleanServer;
              }
              return current;
            });
          }
        }

        const latestHero = await fetchServerHeroBackground();
        if (latestHero) {
          setHeroBackground((curr) => (curr !== latestHero ? latestHero : curr));
        }
      } catch (e) {
        // Silently continue
      }
    }, 4000);

    return () => {
      if (unsubscribeProducts) unsubscribeProducts();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('tifawin_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddProduct = (newProduct: Product) => {
    setAllProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setAllProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setCartItems(prev => prev.map(item => 
      item.product.id === updatedProduct.id 
        ? { ...item, product: updatedProduct } 
        : item
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setAllProducts(prev => prev.filter(p => p.id !== productId));
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Trigger elegant toast notice
    const name = getProductField(product, 'name', language);
    let msg = `تمت إضافة "${name}" إلى السلة بنجاح!`;
    if (language === 'fr') {
      msg = `"${name}" a été ajouté au panier !`;
    } else if (language === 'en') {
      msg = `"${name}" has been added to your cart!`;
    }
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-gold selection:text-brand-brown">
      
      {/* Dynamic Floating Toast Notice */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-brand-brown text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-brand-gold/20 max-w-sm w-[90vw]"
          >
            <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center text-brand-brown shrink-0">
              <Check className="w-4 h-4" strokeWidth={3} />
            </div>
            <div className="flex-1 text-xs sm:text-sm font-medium">
              {toastMessage}
            </div>
            <button
              onClick={() => {
                setIsCartOpen(true);
                setToastMessage(null);
              }}
              className="text-brand-gold hover:text-white text-xs font-bold underline shrink-0 cursor-pointer"
            >
              {language === 'ar' ? 'عرض السلة' : language === 'fr' ? 'Voir le Panier' : 'View Cart'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={handleScrollTo}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Dashboard Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={allProducts}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onSetAllProducts={setAllProducts}
        heroBackground={heroBackground}
        onUpdateHeroBackground={async (newBg) => {
          setHeroBackground(newBg);
          try {
            localStorage.setItem('tadmamte_hero_bg', newBg);
            if (isFirebaseConfigured) {
              await saveHeroBackgroundToFirestore(newBg);
            }
          } catch (err) {
            console.error('Failed to save hero bg', err);
          }
        }}
      />

      {/* Hero Header Section */}
      <Hero
        onScrollToProducts={() => handleScrollTo('products')}
        onScrollToStory={() => handleScrollTo('story')}
        customBackground={heroBackground}
      />

      {/* Trust Badges Bar */}
      <section className="bg-white border-y border-brand-brown/5 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <span className="block text-xl sm:text-2xl font-bold text-brand-gold">
                {language === 'ar' ? '١٠٠٪' : '100%'}
              </span>
              <span className="block text-xs text-gray-500 font-medium">
                {language === 'ar' ? 'منتجات طبيعية خالصة ومعقمة' : language === 'fr' ? 'Produits 100% naturels et purs stérilisés' : '100% pure and natural sterilized products'}
              </span>
            </div>

            <div className="space-y-1 border-r border-brand-brown/5">
              <span className="block text-xl sm:text-2xl font-bold text-brand-gold">
                {language === 'ar' ? '٣٥+' : '35+'}
              </span>
              <span className="block text-xs text-gray-500 font-medium">
                {language === 'ar' ? 'امرأة سوسية مستقلة اقتصادياً' : language === 'fr' ? 'Femmes de Souss autonomes' : 'Economically independent Souss women'}
              </span>
            </div>

            <div className="space-y-1 border-r border-brand-brown/5">
              <span className="block text-xl sm:text-2xl font-bold text-brand-gold">
                {language === 'ar' ? '٤٨س' : '48h'}
              </span>
              <span className="block text-xs text-gray-500 font-medium">
                {language === 'ar' ? 'أقصى مدة شحن لكافة مدن المغرب' : language === 'fr' ? 'Livraison rapide max 48h au Maroc' : 'Max 48h shipping across Morocco'}
              </span>
            </div>

            <div className="space-y-1 border-r border-brand-brown/5">
              <span className="block text-xl sm:text-2xl font-bold text-brand-gold">
                {language === 'ar' ? 'مجاني' : language === 'fr' ? 'Gratuit' : 'Free'}
              </span>
              <span className="block text-xs text-gray-500 font-medium">
                {language === 'ar' ? 'التوصيل مجاني للطلبات فوق ٣٠٠ د.م.' : language === 'fr' ? 'Livraison gratuite dès 300 DH' : 'Free shipping for orders over 300 MAD'}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Cooperative Authentic Story Section */}
      <Story />

      {/* Premium Products Catalog Section */}
      <section id="products" className="py-20 sm:py-24 bg-brand-sand/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold-hover px-3.5 py-1 rounded-full text-xs font-bold">
              <Leaf className="w-3.5 h-3.5" />
              <span>
                {language === 'ar' ? 'مقتطفات ومنتجات سوس الفاخرة' : language === 'fr' ? 'Sélection premium de Souss' : 'Premium Selection of Souss'}
              </span>
            </div>
            <h2 className="font-reem text-3xl sm:text-4xl text-brand-brown font-extrabold">
              {language === 'ar' ? 'تصفح مقتنياتنا وجني أيدينا' : language === 'fr' ? 'Découvrez nos produits faits main' : 'Browse our handpicked products'}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              {t.shopSubtitle}
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-xl mx-auto bg-white p-2.5 rounded-2xl border border-brand-brown/5 shadow-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-brand-brown text-white shadow-xs'
                  : 'text-brand-brown hover:bg-brand-sand/50'
              }`}
            >
              {t.catAll} ({allProducts.length})
            </button>
            <button
              onClick={() => setActiveCategory('amlou')}
              className={`px-4.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === 'amlou'
                  ? 'bg-brand-brown text-white shadow-xs'
                  : 'text-brand-brown hover:bg-brand-sand/50'
              }`}
            >
              {t.catAmlou} ({allProducts.filter(p => p.category === 'amlou').length})
            </button>
            <button
              onClick={() => setActiveCategory('argan')}
              className={`px-4.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === 'argan'
                  ? 'bg-brand-brown text-white shadow-xs'
                  : 'text-brand-brown hover:bg-brand-sand/50'
              }`}
            >
              {t.catArgan} ({allProducts.filter(p => p.category === 'argan').length})
            </button>
            <button
              onClick={() => setActiveCategory('honey')}
              className={`px-4.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === 'honey'
                  ? 'bg-brand-brown text-white shadow-xs'
                  : 'text-brand-brown hover:bg-brand-sand/50'
              }`}
            >
              {t.catHoney} ({allProducts.filter(p => p.category === 'honey').length})
            </button>
            <button
              onClick={() => setActiveCategory('cosmetics')}
              className={`px-4.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === 'cosmetics'
                  ? 'bg-brand-brown text-white shadow-xs'
                  : 'text-brand-brown hover:bg-brand-sand/50'
              }`}
            >
              {t.catCosmetics} ({allProducts.filter(p => p.category === 'cosmetics').length})
            </button>
          </div>

          {/* Products Grid / Empty State */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-white rounded-3xl p-5 border border-brand-brown/5 shadow-xs space-y-4 animate-pulse">
                  <div className="bg-brand-sand/70 h-64 rounded-2xl w-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-brand-sand/70 rounded-sm w-1/3" />
                    <div className="h-6 bg-brand-sand/70 rounded-sm w-3/4" />
                    <div className="h-4 bg-brand-sand/70 rounded-sm w-full" />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-brand-sand/70 rounded-sm w-1/4" />
                    <div className="h-10 bg-brand-sand/70 rounded-xl w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white/80 backdrop-blur-xs rounded-3xl border border-brand-brown/10 max-w-xl mx-auto shadow-sm space-y-4">
              <div className="w-16 h-16 bg-brand-sand/50 text-brand-brown rounded-2xl flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="font-reem text-xl font-bold text-brand-brown">
                {language === 'ar' ? 'لا توجد منتجات معروضة حالياً' : language === 'fr' ? 'Aucun produit disponible pour le moment' : 'No products available at the moment'}
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                {language === 'ar'
                  ? 'تم إفراغ المنتجات الافتراضية. يمكنك الآن إضافة منتجات تعاونيتكم الحقيقية بسهولة عبر لوحة التحكم.'
                  : language === 'fr'
                  ? 'Les produits de démonstration ont été retirés. Vous pouvez ajouter les vrais produits de votre coopérative via le panneau d’administration.'
                  : 'Demonstration products have been cleared. You can now easily add your genuine cooperative products via the admin panel.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-brown hover:bg-brand-brown/90 text-brand-sand px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-brand-gold" />
                  <span>
                    {language === 'ar' ? 'إضافة منتجات حقيقية الآن' : language === 'fr' ? 'Ajouter des produits réels' : 'Add Real Products Now'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onOpenDetails={setSelectedProduct}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

      {/* Customer Testimonials & Wisdom Section */}
      <Reviews />

      {/* Support / Contact Form */}
      <ContactSection />

      {/* Footer Details */}
      <Footer onScrollTo={handleScrollTo} />

      {/* Product Detail Modal Overlay */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Cart Panel Slideout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
