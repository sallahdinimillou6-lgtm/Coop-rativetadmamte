import React from 'react';
import { Award, Leaf, Heart } from 'lucide-react';
import { useLanguage } from '../utils/translations';

export function Story() {
  const { language, t } = useLanguage();

  return (
    <section id="story" className="py-20 sm:py-28 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sand rounded-full filter blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full filter blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className={`lg:col-span-7 space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 bg-brand-olive/10 text-brand-olive px-3.5 py-1.5 rounded-full text-xs font-bold">
              <Heart className="w-3.5 h-3.5" />
              <span>
                {language === 'ar' 
                  ? 'أثر مستدام وأصالة موروثة' 
                  : language === 'fr' 
                  ? 'Impact durable et héritage ancestral' 
                  : 'Sustainable impact and ancestral heritage'}
              </span>
            </div>

            <h2 className="font-reem text-3xl sm:text-4xl lg:text-5xl text-brand-brown leading-tight font-extrabold">
              {language === 'ar' ? (
                <>
                  من قلب منطقة سوس المعطاء، <br />
                  <span className="text-brand-gold">بأيدي نساء ينسجن الحياة بشرف</span>
                </>
              ) : language === 'fr' ? (
                <>
                  Du cœur de la région de Souss, <br />
                  <span className="text-brand-gold">par des femmes façonnant la vie avec dignité</span>
                </>
              ) : (
                <>
                  From the heart of Souss region, <br />
                  <span className="text-brand-gold">by women shaping life with dignity</span>
                </>
              )}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {language === 'ar' ? (
                <>
                  تعاونية <strong>Coopérative Tadmamte</strong> ليست مجرد مشروع تجاري، بل هي حلم جماعي للأسر والنساء في قرى سهول وواحات سوس المعطاء. هنا، حيث تلتقي قسوة الطبيعة بجمالها، تجتمع نساؤنا وعضواتنا لنقل المعرفة المتوارثة جيلاً بعد جيل في إنتاج أنقى هدايا الأرض الطبيعية.
                </>
              ) : language === 'fr' ? (
                <>
                  La <strong>Coopérative Tadmamte</strong> n'est pas qu'un simple projet commercial, c'est un rêve collectif pour les familles et les femmes de Souss. Ici, là où la rigueur de la nature côtoie sa beauté, nos membres s'unissent pour transmettre un savoir-faire ancestral dans la production des cadeaux les plus purs de la terre.
                </>
              ) : (
                <>
                  The <strong>Tadmamte Cooperative</strong> is not just a commercial project; it is a collective dream for families and women in Souss. Here, where nature's harshness meets its beauty, our women gather to pass down ancestral knowledge from generation to generation in producing the earth's purest natural gifts.
                </>
              )}
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {language === 'ar' ? (
                <>
                  كل قارورة عسل تقتنيها وكل علبة أملو توضع على مائدتك هي نتاج أيام طويلة من العمل الدؤوب والمحبة الفائقة. نحن لا نستخدم الآلات الحديثة لتسريع الإنتاج على حساب القيمة، بل نحافظ بكل فخر على طحن اللوز برحى الحجر اليدوية التقليدية وعصر الأركان على البارد واستخلاص العسل بطرق برية تحترم البيئة والنحل.
                </>
              ) : language === 'fr' ? (
                <>
                  Chaque pot de miel que vous achetez et chaque boîte d'amlou sur votre table est le fruit de longues journées de travail dévoué. Nous n'utilisons pas de machines industrielles au détriment de la qualité, mais nous perpétuons fièrement le moulin de pierre traditionnel, le pressage à froid de l'argan et l'extraction sauvage du miel.
                </>
              ) : (
                <>
                  Every jar of honey you purchase and every box of amlou on your table is the result of long days of dedicated labor and love. We do not use industrial machinery at the expense of value; we proudly preserve traditional stone-milling, cold-pressed argan extraction, and wild honey harvesting.
                </>
              )}
            </p>

            {/* Impact Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-sand">
              <div className="space-y-2 bg-brand-sand/30 p-4 rounded-2xl border border-brand-brown/5">
                <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-reem font-bold text-brand-brown text-sm">
                  {language === 'ar' ? '١٠٠٪ يدوي وأصيل' : language === 'fr' ? '100% Artisanal' : '100% Handcrafted'}
                </h4>
                <p className="text-xs text-gray-500 leading-normal">
                  {language === 'ar' 
                    ? 'نحضر منتجاتنا بالرحى الحجرية والقدور الطينية تماماً كأجدادنا.' 
                    : language === 'fr' 
                    ? 'Préparation au moulin en pierre traditionnelle comme nos ancêtres.' 
                    : 'We prepare our products with traditional stone-mills just like our ancestors.'}
                </p>
              </div>

              <div className="space-y-2 bg-brand-sand/30 p-4 rounded-2xl border border-brand-brown/5">
                <div className="w-10 h-10 bg-brand-olive/10 text-brand-olive rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="font-reem font-bold text-brand-brown text-sm">
                  {language === 'ar' ? 'أرض معقمة ونقية' : language === 'fr' ? 'Terre Pure & Préservée' : 'Pure & Sterilized Land'}
                </h4>
                <p className="text-xs text-gray-500 leading-normal">
                  {language === 'ar' 
                    ? 'مناحلنا تقع على ارتفاعات شاهقة بعيدة عن المدن والملوثات والمبيدات.' 
                    : language === 'fr' 
                    ? 'Nos ruchers se trouvent en haute altitude, loin de toute pollution.' 
                    : 'Our apiaries are in high altitudes, far from urban pollution and pesticides.'}
                </p>
              </div>

              <div className="space-y-2 bg-brand-sand/30 p-4 rounded-2xl border border-brand-brown/5">
                <div className="w-10 h-10 bg-brand-earth/10 text-brand-earth rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 animate-pulse" />
                </div>
                <h4 className="font-reem font-bold text-brand-brown text-sm">
                  {language === 'ar' ? 'استقلالية اقتصادية' : language === 'fr' ? 'Autonomie Financière' : 'Economic Independence'}
                </h4>
                <p className="text-xs text-gray-500 leading-normal">
                  {language === 'ar' 
                    ? 'توجيه مباشر لأرباح المبيعات لتحسين معيشة نساء سوس وعائلاتهن.' 
                    : language === 'fr' 
                    ? 'Soutien direct aux femmes de Souss pour améliorer leurs vies.' 
                    : 'Direct profits go to empowering Souss women and improving their families.'}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Presentation (Images & Amazigh Element) */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden aspect-4/3 shadow-2xl border-4 border-brand-sand bg-brand-sand/50">
              <picture>
                <source srcSet="/images/cooperative_hands_craft.webp" type="image/webp" />
                <img
                  src="/images/cooperative_hands_craft.jpg"
                  alt="Amazigh women traditional handwork"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 to-transparent" />
            </div>

            {/* Overlap Badge */}
            <div className={`absolute -bottom-6 sm:-bottom-8 ${language === 'ar' ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8'} bg-brand-brown text-brand-gold p-6 rounded-2xl shadow-xl max-w-[200px] z-20 border border-brand-gold/20 text-center`}>
              <span className="block font-reem text-3xl font-extrabold mb-1">
                {language === 'ar' ? '٣٥+' : '35+'}
              </span>
              <span className="block text-xs text-brand-sand leading-normal">
                {language === 'ar' 
                  ? 'عائلة أمازيغية تجد قوتها واستقلالها اليوم من خلال هذا المتجر' 
                  : language === 'fr' 
                  ? 'Familles berbères qui trouvent leur autonomie grâce à ce magasin' 
                  : 'Amazigh families finding their livelihood today through this store'}
              </span>
            </div>

            {/* Subtle Berber Symbol Backing */}
            <div className={`absolute -top-12 ${language === 'ar' ? '-left-12' : '-right-12'} text-brand-gold/10 w-44 h-44 -z-10 select-none`}>
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                <path d="M50,10 L50,90 M20,20 C35,30 40,40 40,50 C40,60 35,70 20,80 M80,20 C65,30 60,40 60,50 C60,60 65,70 80,80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
