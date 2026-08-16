import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'fr' | 'en';

export interface TranslationDict {
  dir: 'rtl' | 'ltr';
  // Navbar
  navHome: string;
  navStory: string;
  navShop: string;
  navReviews: string;
  navContact: string;
  navCallOrder: string;
  navAdmin: string;
  cooperativeName: string;
  cooperativeSub: string;

  // Hero
  heroTagline: string;
  heroTitle: string;
  heroDesc: string;
  heroShopBtn: string;
  heroStoryBtn: string;

  // Story
  storyTitle: string;
  storySubtitle: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  storyCardTitle1: string;
  storyCardDesc1: string;
  storyCardTitle2: string;
  storyCardDesc2: string;
  storyCardTitle3: string;
  storyCardDesc3: string;

  // Products
  shopTitle: string;
  shopSubtitle: string;
  catAll: string;
  catAmlou: string;
  catArgan: string;
  catHoney: string;
  catCosmetics: string;
  bestSeller: string;
  addToCart: string;
  viewDetails: string;
  currency: string;
  itemsSelected: string;

  // Product detail modal
  weightSize: string;
  healthBenefits: string;
  fullDesc: string;
  shippingFee: string;
  freeShippingNotice: string;
  shippingProtected: string;
  quickCallOrder: string;

  // Reviews
  reviewsTitle: string;
  reviewsSubtitle: string;

  // Contact
  contactTag: string;
  contactTitle: string;
  contactDesc: string;
  contactChannels: string;
  contactChannelsDesc: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactAddressValue: string;
  contactFormTitle: string;
  formName: string;
  formPhone: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formSend: string;
  contactSuccessTitle: string;
  contactSuccessDesc: string;
  contactSendAnother: string;

  // Cart Drawer
  cartTitle: string;
  cartEmpty: string;
  cartEmptyDesc: string;
  cartStartShopping: string;
  clearCart: string;
  freeShippingProgress: string;
  freeShippingSuccess: string;
  cartSubtotal: string;
  cartShipping: string;
  cartShippingFree: string;
  cartTotal: string;
  cartCheckoutBtn: string;
  cartCheckoutDisclaimer: string;

  // Admin
  adminTitle: string;
  adminSub: string;
  logout: string;
  closeAdmin: string;
  adminLoginTitle: string;
  adminLoginDesc: string;
  adminPasswordLabel: string;
  adminLoginBtn: string;
  adminErrorPass: string;
  adminAddProduct: string;
  adminEditProduct: string;
  adminImage: string;
  adminImageUpload: string;
  adminImageRemove: string;
  adminProdTitle: string;
  adminProdCat: string;
  adminProdWeight: string;
  adminProdPrice: string;
  adminProdShipping: string;
  adminProdDesc: string;
  adminProdBenefits: string;
  adminProdBenefitsPlaceholder: string;
  adminProdBestSeller: string;
  adminCancel: string;
  adminSavePublish: string;
  adminSaveChanges: string;
  adminCurrentProducts: string;
  adminActions: string;
  adminEdit: string;
  adminDelete: string;
  adminConfirmDelete: string;
  adminSuccessDelete: string;
  adminSuccessUpdate: string;
  adminSuccessAdd: string;
}

export const translations: Record<Language, TranslationDict> = {
  ar: {
    dir: 'rtl',
    navHome: 'الرئيسية',
    navStory: 'قصتنا',
    navShop: 'متجرنا',
    navReviews: 'تجارب الزبناء',
    navContact: 'اتصل بنا',
    navCallOrder: 'طلب هاتفياً',
    navAdmin: 'لوحة التحكم',
    cooperativeName: 'Coopérative Tadmamte',
    cooperativeSub: 'تعاونية فلاحية سوسية ⵣ',

    heroTagline: 'تعاونية فلاحية أمازيغية من منطقة سوس المعطاء',
    heroTitle: 'عسل حر، أملو أصيل، هدايا الطبيعة',
    heroDesc: 'عسل طبيعي وأملو أركان فاخر بأيدي أسر منطقة سوس العريقة، نوفر لكم منتجات طبيعية نقية وموثوقة بنسبة 100٪.',
    heroShopBtn: 'تسوق منتجاتنا',
    heroStoryBtn: 'تعرف على قصتنا',

    storyTitle: 'قصة Coopérative Tadmamte',
    storySubtitle: 'أصالة وعراقة في الإنتاج من قلب منطقة سوس الأصيلة',
    storyP1: 'تعاونية Coopérative Tadmamte ليست مجرد مشروع تجاري، بل هي حلم جماعي للأسر والنساء في قرى منطقة سوس العريقة. هنا، حيث تلتقي أصالة الأرض بجمالها، تجتمع نساؤنا وعضواتنا لنقل المعرفة المتوارثة جيلاً بعد جيل في إنتاج أنقى هدايا الأرض الطبيعية واحتراف عصر زيت الأركان وصناعة أملو الأصيل.',
    storyP2: 'مهمتنا واضحة وعميقة: إنتاج أفضل أنواع العسل البري وأملو الأركان الأصيل بأساليب طبيعية خالية تماماً من الإضافات الكيميائية، وفي الوقت ذاته، توفير مصدر رزق كريم ومستدام للأسر القروية يحقق لهم الاستقلالية الاقتصادية ويدعم صمودهم وتشبثهم بقرى سوس المعطاء.',
    storyP3: 'كل منتج تشترونه منا هو مساهمة حقيقية ومباشرة في استمرار هذا الحلم، وضمان لتعليم أطفال القرى وتطوير البنية التحتية المحلية للتعاونية فلاحية تصنع الأمل من العسل.',
    storyCardTitle1: '100% طبيعي',
    storyCardDesc1: 'منتجات عضوية نقية خالية من السكر المضاف والمواد الحافظة.',
    storyCardTitle2: 'دعم نسائي وأسري',
    storyCardDesc2: 'نعمل بروح التضامن لدعم الأسر والنساء القرويات في منطقة سوس.',
    storyCardTitle3: 'جودة مضمونة',
    storyCardDesc3: 'فحص صارم وتعبئة في قوارير زجاجية معقمة لحفظ الفائدة.',

    shopTitle: 'متجرنا الطبيعي',
    shopSubtitle: 'منتجات من ربوع سوس إليك مباشرة بمناحل ومزارع عضوية نقية',
    catAll: 'الكل',
    catAmlou: 'أملو',
    catArgan: 'زيت أركان',
    catHoney: 'العسل',
    catCosmetics: 'منتجات التجميل',
    bestSeller: 'الأكثر طلباً',
    addToCart: 'أضف إلى السلة',
    viewDetails: 'عرض التفاصيل',
    currency: 'د.م.',
    itemsSelected: 'المنتجات المختارة',

    weightSize: 'الوزن / الحجم',
    healthBenefits: 'الفوائد الصحية',
    fullDesc: 'الوصف الكامل',
    shippingFee: 'مصاريف الشحن',
    freeShippingNotice: 'شحن مجاني لكل مدن المغرب',
    shippingProtected: 'شحن مخصص ومحمي',
    quickCallOrder: 'طلب سريع عبر الهاتف',

    reviewsTitle: 'آراء زبنائنا',
    reviewsSubtitle: 'شهادات حية من أشخاص وثقوا بمنتجاتنا الطبيعية وشاركونا تجاربهم بكل صدق',

    contactTag: 'نحن دائماً في الخدمة',
    contactTitle: 'تواصل مع Coopérative Tadmamte',
    contactDesc: 'لديك سؤال حول منتجاتنا، رغبة في طلب كميات خاصة للشركات والمناسبات؟ تواصل معنا فوراً.',
    contactChannels: 'قنوات التواصل المباشر',
    contactChannelsDesc: 'يسعد فريق التعاونية استقبال استفساراتك هاتفياً أو عبر البريد الإلكتروني طيلة أيام الأسبوع من الساعة التاسعة صباحاً وحتى الثامنة مساءً.',
    contactPhone: 'اتصل بنا مباشرة / واتساب:',
    contactEmail: 'راسلنا إلكترونياً:',
    contactAddress: 'مقر ومنحل التعاونية:',
    contactAddressValue: 'Dr Ibourin, CR Ait Milk, Chtouka Ait Baha، المغرب.',
    contactFormTitle: 'أرسل لنا رسالة سريعة',
    formName: 'الاسم الكامل',
    formPhone: 'رقم الهاتف',
    formEmail: 'البريد الإلكتروني',
    formSubject: 'موضوع الرسالة',
    formMessage: 'نص الرسالة...',
    formSend: 'إرسال الرسالة',
    contactSuccessTitle: 'شكراً لرسالتك الكريمة!',
    contactSuccessDesc: 'تم استلام رسالتك بنجاح من قِبل إدارة Coopérative Tadmamte. سنقوم بالرد عليك في أقرب فرصة ممكنة.',
    contactSendAnother: 'إرسال رسالة أخرى',

    cartTitle: 'سلة المشتريات',
    cartEmpty: 'سلتك فارغة حالياً',
    cartEmptyDesc: 'تصفح منتجاتنا الطبيعية الفاخرة وأضف خياراتك المفضلة لدعم تعاونيتنا.',
    cartStartShopping: 'ابدأ التسوق الآن',
    clearCart: 'تفريغ السلة',
    freeShippingProgress: 'أضف {diff} د.م. إضافية للحصول على شحن مجاني لكل مدن المغرب!',
    freeShippingSuccess: 'تهانينا! لقد حصلت على شحن مجاني بالكامل لطلبك!',
    cartSubtotal: 'مجموع السلة:',
    cartShipping: 'تكلفة التوصيل للمغرب:',
    cartShippingFree: 'شحن مجاني',
    cartTotal: 'المجموع الإجمالي:',
    cartCheckoutBtn: 'أكمل الطلب عبر واتساب',
    cartCheckoutDisclaimer: 'سيتم فتح تطبيق الواتساب لمراسلتنا بطلبك وتأكيده فوراً',

    adminTitle: 'لوحة التحكم وتدبير المنتجات',
    adminSub: 'إدارة مخزون متجر Tadmamte وتحديث محتويات الصفحة ومبيعات التعاونية',
    logout: 'تسجيل الخروج',
    closeAdmin: 'إغلاق لوحة التحكم',
    adminLoginTitle: 'تسجيل دخول الإدارة',
    adminLoginDesc: 'هذه المنطقة مخصصة لأعضاء إدارة التعاونية لتعديل محتوى المتجر وتدبير المخزون.',
    adminPasswordLabel: 'كلمة مرور المدير',
    adminLoginBtn: 'دخول للوحة التحكم',
    adminErrorPass: 'كلمة المرور غير صحيحة، يرجى المحاولة مجدداً.',
    adminAddProduct: 'إضافة منتج جديد',
    adminEditProduct: 'تعديل بيانات المنتج الحالي',
    adminImage: 'صورة المنتج',
    adminImageUpload: 'اضغط لتحميل صورة من جهازك',
    adminImageRemove: 'إزالة الصورة',
    adminProdTitle: 'عنوان المنتج',
    adminProdCat: 'فئة التصنيف',
    adminProdWeight: 'الوزن / الحجم',
    adminProdPrice: 'ثمن المنتج (بالدرهم)',
    adminProdShipping: 'تكاليف الشحن الخاصة (بالدرهم - اختياري)',
    adminProdDesc: 'وصف المنتج',
    adminProdBenefits: 'الفوائد (benefit واحد في كل سطر)',
    adminProdBenefitsPlaceholder: 'منشط طبيعي\nمفيد للهضم\nغني بالفيتامينات',
    adminProdBestSeller: 'تمييز كـ الأكثر طلباً (Best Seller)',
    adminCancel: 'إلغاء وتفريغ الحقول',
    adminSavePublish: 'حفظ ونشر المنتج الجديد',
    adminSaveChanges: 'حفظ التعديلات الحالية',
    adminCurrentProducts: 'المنتجات المعروضة حالياً بالمتجر',
    adminActions: 'خيارات التحكم',
    adminEdit: 'تعديل',
    adminDelete: 'حذف',
    adminConfirmDelete: 'هل أنت متأكد من رغبتك في حذف المنتج {name}؟ لا يمكن التراجع عن هذا الإجراء.',
    adminSuccessDelete: 'تم حذف المنتج بنجاح',
    adminSuccessUpdate: 'تم تعديل المنتج بنجاح',
    adminSuccessAdd: 'تمت إضافة المنتج الجديد بنجاح'
  },
  fr: {
    dir: 'ltr',
    navHome: 'Accueil',
    navStory: 'Notre Histoire',
    navShop: 'Boutique',
    navReviews: 'Témoignages',
    navContact: 'Contactez-nous',
    navCallOrder: 'Commander par Tel',
    navAdmin: 'Administration',
    cooperativeName: 'Coopérative Tadmamte',
    cooperativeSub: 'Coopérative Agricole Amazighe ⵣ',

    heroTagline: 'Coopérative Agricole Amazighe de la région de Souss',
    heroTitle: 'Miel Pur, Amlou Authentique, Cadeaux de la Nature',
    heroDesc: 'Miel naturel et amlou d’argan premium façonnés par les familles de la région historique de Souss. Nous offrons des produits 100% purs et authentiques.',
    heroShopBtn: 'Acheter nos produits',
    heroStoryBtn: 'Découvrez notre histoire',

    storyTitle: 'L’Histoire de la Coopérative Tadmamte',
    storySubtitle: 'Authenticité et savoir-faire traditionnel au cœur de la région de Souss',
    storyP1: 'La Coopérative Tadmamte n’est pas qu’un simple projet commercial, c’est un rêve collectif porté par les familles et les femmes des villages de Souss. Là où l’authenticité de la terre s’allie à sa générosité, nos membres se rassemblent pour perpétuer un savoir-faire ancestral de production de miel et de produits naturels.',
    storyP2: 'Notre mission est claire : produire le meilleur miel sauvage et l’amlou d’argan authentique selon des méthodes naturelles sans aucun additif chimique, tout en garantissant un revenu stable et digne aux familles rurales, favorisant leur autonomie et leur attachement au terroir.',
    storyP3: 'Chaque produit acheté est une contribution directe à la pérennité de ce rêve, garantissant l’éducation des enfants des villages et le développement des infrastructures locales de notre coopérative.',
    storyCardTitle1: '100% Naturel',
    storyCardDesc1: 'Produits bio sans sucre ajouté ni conservateurs artificiels.',
    storyCardTitle2: 'Soutien aux Familles',
    storyCardDesc2: 'Nous travaillons de manière solidaire pour autonomiser les familles de Souss.',
    storyCardTitle3: 'Qualité Garantie',
    storyCardDesc3: 'Contrôle rigoureux et conditionnement en pots en verre stérilisés.',

    shopTitle: 'Notre Boutique Naturelle',
    shopSubtitle: 'Des produits de Souss directement chez vous depuis des ruchers bio',
    catAll: 'Tout',
    catAmlou: 'Amlou',
    catArgan: "Huile d'Argan",
    catHoney: 'Miel',
    catCosmetics: 'Produits Cosmétiques',
    bestSeller: 'Plus Vendu',
    addToCart: 'Ajouter au Panier',
    viewDetails: 'Détails',
    currency: 'DH',
    itemsSelected: 'Produits sélectionnés',

    weightSize: 'Poids / Volume',
    healthBenefits: 'Bienfaits pour la santé',
    fullDesc: 'Description complète',
    shippingFee: 'Frais de livraison',
    freeShippingNotice: 'Livraison gratuite partout au Maroc',
    shippingProtected: 'Livraison sécurisée',
    quickCallOrder: 'Commande rapide par téléphone',

    reviewsTitle: 'Les avis de nos clients',
    reviewsSubtitle: 'Découvrez les témoignages honnêtes de ceux qui nous font confiance pour leurs produits naturels',

    contactTag: 'À votre service',
    contactTitle: 'Contacter la Coopérative Tadmamte',
    contactDesc: 'Une question sur nos produits, besoin d’un lot pour votre entreprise ou un événement ? Contactez-nous.',
    contactChannels: 'Canaux directs',
    contactChannelsDesc: 'Notre équipe est ravie de recevoir vos questions par téléphone ou email du lundi au dimanche, de 09h00 à 20h00.',
    contactPhone: 'Téléphone / WhatsApp :',
    contactEmail: 'Email professionnel :',
    contactAddress: 'Siège de la Coopérative :',
    contactAddressValue: 'Dr Ibourin, CR Ait Milk, Chtouka Ait Baha, Maroc.',
    contactFormTitle: 'Envoyez-nous un message',
    formName: 'Nom complet',
    formPhone: 'Numéro de téléphone',
    formEmail: 'Adresse email',
    formSubject: 'Sujet',
    formMessage: 'Votre message...',
    formSend: 'Envoyer le message',
    contactSuccessTitle: 'Merci pour votre message !',
    contactSuccessDesc: 'Reçu avec succès par la direction de la Coopérative Tadmamte. Nous vous répondrons dans les plus brefs délais.',
    contactSendAnother: 'Envoyer un autre message',

    cartTitle: 'Votre Panier',
    cartEmpty: 'Votre panier est vide',
    cartEmptyDesc: 'Parcourez nos produits naturels d’exception et ajoutez-les pour soutenir notre coopérative.',
    cartStartShopping: 'Commencer mes achats',
    clearCart: 'Vider le panier',
    freeShippingProgress: 'Ajoutez {diff} DH de plus pour bénéficier de la livraison gratuite partout au Maroc !',
    freeShippingSuccess: 'Félicitations ! Vous bénéficiez de la livraison gratuite !',
    cartSubtotal: 'Sous-total du panier :',
    cartShipping: 'Frais de livraison :',
    cartShippingFree: 'Gratuit',
    cartTotal: 'Total général :',
    cartCheckoutBtn: 'Commander via WhatsApp',
    cartCheckoutDisclaimer: 'L’application WhatsApp va s’ouvrir pour valider et confirmer votre commande',

    adminTitle: 'Espace Administration & Produits',
    adminSub: 'Gérer les stocks du magasin Tadmamte, mettre à jour le catalogue et suivre les ventes',
    logout: 'Déconnexion',
    closeAdmin: 'Fermer',
    adminLoginTitle: 'Connexion Administrateur',
    adminLoginDesc: 'Cet espace est réservé aux gérants de la coopérative pour modifier la boutique.',
    adminPasswordLabel: 'Mot de passe administrateur',
    adminLoginBtn: 'Se connecter',
    adminErrorPass: 'Mot de passe incorrect. Veuillez réessayer.',
    adminAddProduct: 'Ajouter un nouveau produit',
    adminEditProduct: 'Modifier le produit',
    adminImage: 'Image du produit',
    adminImageUpload: 'Cliquez pour charger une image depuis votre appareil',
    adminImageRemove: 'Supprimer l’image',
    adminProdTitle: 'Titre du produit',
    adminProdCat: 'Catégorie',
    adminProdWeight: 'Poids / Volume',
    adminProdPrice: 'Prix (en DH)',
    adminProdShipping: 'Frais de livraison spécifiques (en DH - facultatif)',
    adminProdDesc: 'Description du produit',
    adminProdBenefits: 'Bienfaits (un bienfait par ligne)',
    adminProdBenefitsPlaceholder: 'Tonifiant naturel\nFacilite la digestion\nRiche en vitamines',
    adminProdBestSeller: 'Mettre en avant comme "Plus vendu"',
    adminCancel: 'Annuler',
    adminSavePublish: 'Enregistrer & Publier',
    adminSaveChanges: 'Enregistrer les modifications',
    adminCurrentProducts: 'Produits actuellement en vente',
    adminActions: 'Actions',
    adminEdit: 'Modifier',
    adminDelete: 'Supprimer',
    adminConfirmDelete: 'Êtes-vous sûr de vouloir supprimer le produit {name} ? Cette action est irréversible.',
    adminSuccessDelete: 'Produit supprimé avec succès',
    adminSuccessUpdate: 'Produit mis à jour avec succès',
    adminSuccessAdd: 'Nouveau produit ajouté avec succès'
  },
  en: {
    dir: 'ltr',
    navHome: 'Home',
    navStory: 'Our Story',
    navShop: 'Shop',
    navReviews: 'Reviews',
    navContact: 'Contact Us',
    navCallOrder: 'Call to Order',
    navAdmin: 'Admin Panel',
    cooperativeName: 'Coopérative Tadmamte',
    cooperativeSub: 'Amazigh Agricultural Cooperative ⵣ',

    heroTagline: 'Amazigh Agricultural Cooperative from the Souss Region',
    heroTitle: 'Pure Honey, Authentic Amlou, Gifts of Nature',
    heroDesc: 'Natural honey and premium argan amlou crafted by families of the historic Souss region. We offer 100% pure and authentic natural products.',
    heroShopBtn: 'Shop Our Products',
    heroStoryBtn: 'Learn Our Story',

    storyTitle: 'The Story of Coopérative Tadmamte',
    storySubtitle: 'Authenticity and traditional craftsmanship in the Souss Region',
    storyP1: 'The Tadmamte Cooperative is more than just a business; it is a collective dream of families and women in the rural villages of Souss. Where the rich soil meets the shade of argan trees, our members join hands to keep alive the ancestral wisdom of harvesting pure honey and crafting natural products.',
    storyP2: 'Our mission is deep and clear: producing the finest wild honey and authentic argan amlou using natural chemical-free methods, while securing a dignified and sustainable source of income for rural families, promoting economic independence and community resilience.',
    storyP3: 'Every product you purchase directly sustains this dream, funding local children’s education and enhancing the cooperative’s local infrastructure.',
    storyCardTitle1: '100% Natural',
    storyCardDesc1: 'Organic pure products with zero added sugar or artificial preservatives.',
    storyCardTitle2: 'Empowering Families',
    storyCardDesc2: 'We work together to support and empower rural Souss families.',
    storyCardTitle3: 'Guaranteed Quality',
    storyCardDesc3: 'Rigorous testing and vacuum-sealed glass packaging for maximum health benefit.',

    shopTitle: 'Our Natural Shop',
    shopSubtitle: 'Products directly from the Souss Region to your door from pure bio apiaries',
    catAll: 'All',
    catAmlou: 'Amlou',
    catArgan: 'Argan Oil',
    catHoney: 'Honey',
    catCosmetics: 'Cosmetics',
    bestSeller: 'Best Seller',
    addToCart: 'Add to Cart',
    viewDetails: 'Details',
    currency: 'MAD',
    itemsSelected: 'Selected products',

    weightSize: 'Weight / Volume',
    healthBenefits: 'Health Benefits',
    fullDesc: 'Full Description',
    shippingFee: 'Shipping Fee',
    freeShippingNotice: 'Free shipping to all cities in Morocco',
    shippingProtected: 'Secured Shipping',
    quickCallOrder: 'Quick Call Order',

    reviewsTitle: 'Customer Testimonials',
    reviewsSubtitle: 'Genuine feedback from people who trusted our natural products and shared their honest experiences',

    contactTag: 'Always At Your Service',
    contactTitle: 'Contact Coopérative Tadmamte',
    contactDesc: 'Have a question about our products, or looking to place bulk orders for corporate events? Contact us.',
    contactChannels: 'Direct Contact Channels',
    contactChannelsDesc: 'Our team is happy to answer your inquiries by phone or email Monday through Sunday, from 9:00 AM to 8:00 PM.',
    contactPhone: 'Phone / WhatsApp:',
    contactEmail: 'Email Address:',
    contactAddress: 'Cooperative Headquarters:',
    contactAddressValue: 'Dr Ibourin, CR Ait Milk, Chtouka Ait Baha, Morocco.',
    contactFormTitle: 'Send Us a Quick Message',
    formName: 'Full Name',
    formPhone: 'Phone Number',
    formEmail: 'Email Address',
    formSubject: 'Subject',
    formMessage: 'Your message...',
    formSend: 'Send Message',
    contactSuccessTitle: 'Thank you for your message!',
    contactSuccessDesc: 'Successfully received by the management of Coopérative Tadmamte. We will get back to you as soon as possible.',
    contactSendAnother: 'Send another message',

    cartTitle: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    cartEmptyDesc: 'Browse our luxurious natural products and add your favorites to support our cooperative.',
    cartStartShopping: 'Start Shopping Now',
    clearCart: 'Clear Cart',
    freeShippingProgress: 'Add {diff} MAD more to enjoy free shipping all across Morocco!',
    freeShippingSuccess: 'Congratulations! You unlocked free shipping for your order!',
    cartSubtotal: 'Cart Subtotal:',
    cartShipping: 'Morocco Delivery Fee:',
    cartShippingFree: 'Free Shipping',
    cartTotal: 'Grand Total:',
    cartCheckoutBtn: 'Complete Order on WhatsApp',
    cartCheckoutDisclaimer: 'WhatsApp will open to instantly send and confirm your order',

    adminTitle: 'Admin & Product Dashboard',
    adminSub: 'Manage Tadmamte shop inventory, update catalog items, and view sales performance',
    logout: 'Log Out',
    closeAdmin: 'Close Dashboard',
    adminLoginTitle: 'Administrator Login',
    adminLoginDesc: 'This section is restricted to cooperative management members to update products.',
    adminPasswordLabel: 'Admin Password',
    adminLoginBtn: 'Log In to Panel',
    adminErrorPass: 'Incorrect password. Please try again.',
    adminAddProduct: 'Add New Product',
    adminEditProduct: 'Edit Product details',
    adminImage: 'Product Image',
    adminImageUpload: 'Click to upload an image from your device',
    adminImageRemove: 'Remove Image',
    adminProdTitle: 'Product Title',
    adminProdCat: 'Category',
    adminProdWeight: 'Weight / Volume',
    adminProdPrice: 'Product Price (MAD)',
    adminProdShipping: 'Custom Shipping Cost (MAD - optional)',
    adminProdDesc: 'Product Description',
    adminProdBenefits: 'Benefits (one benefit per line)',
    adminProdBenefitsPlaceholder: 'Natural energizer\nSupports digestion\nRich in vitamins',
    adminProdBestSeller: 'Highlight as "Best Seller"',
    adminCancel: 'Cancel & Clear Fields',
    adminSavePublish: 'Save & Publish Product',
    adminSaveChanges: 'Save Changes',
    adminCurrentProducts: 'Products Currently in Shop',
    adminActions: 'Actions',
    adminEdit: 'Edit',
    adminDelete: 'Delete',
    adminConfirmDelete: 'Are you sure you want to delete {name}? This action cannot be undone.',
    adminSuccessDelete: 'Product deleted successfully',
    adminSuccessUpdate: 'Product updated successfully',
    adminSuccessAdd: 'New product added successfully'
  }
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
} | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tadmamte_language');
    if (saved === 'ar' || saved === 'fr' || saved === 'en') {
      return saved as Language;
    }
    return 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tadmamte_language', lang);
  };

  useEffect(() => {
    // Dynamically adjust the document dir and lang attributes
    document.documentElement.dir = translations[language].dir;
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to resolve multilingual fields of a product
export function getProductField(
  product: any,
  field: 'name' | 'description' | 'longDescription' | 'weight' | 'benefits' | 'categoryAr',
  lang: Language
): any {
  if (lang === 'fr') {
    if (field === 'name' && product.nameFr) return product.nameFr;
    if (field === 'description' && product.descriptionFr) return product.descriptionFr;
    if (field === 'longDescription' && product.longDescriptionFr) return product.longDescriptionFr;
    if (field === 'weight' && product.weightFr) return product.weightFr;
    if (field === 'benefits' && product.benefitsFr) return product.benefitsFr;
    if (field === 'categoryAr') {
      if (product.category === 'honey') return 'Miel';
      if (product.category === 'amlou') return 'Amlou';
      if (product.category === 'argan') return 'Huile d\'Argan';
      if (product.category === 'cosmetics') return 'Produits Cosmétiques';
    }
  } else if (lang === 'en') {
    if (field === 'name' && product.nameEn) return product.nameEn;
    if (field === 'description' && product.descriptionEn) return product.descriptionEn;
    if (field === 'longDescription' && product.longDescriptionEn) return product.longDescriptionEn;
    if (field === 'weight' && product.weightEn) return product.weightEn;
    if (field === 'benefits' && product.benefitsEn) return product.benefitsEn;
    if (field === 'categoryAr') {
      if (product.category === 'honey') return 'Honey';
      if (product.category === 'amlou') return 'Amlou';
      if (product.category === 'argan') return 'Argan Oil';
      if (product.category === 'cosmetics') return 'Cosmetics';
    }
  }

  // Fallback to standard Arabic fields
  if (field === 'categoryAr') {
    if (product.category === 'honey') return 'العسل';
    if (product.category === 'amlou') return 'أملو';
    if (product.category === 'argan') return 'زيت أركان';
    if (product.category === 'cosmetics') return 'منتجات التجميل';
    return product.categoryAr;
  }
  if (field === 'longDescription') return product.longDescription || product.description;
  return product[field];
}
