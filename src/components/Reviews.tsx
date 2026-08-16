import React from 'react';
import { testimonials } from '../data';
import { Star, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../utils/translations';

const getTestimonialTranslation = (id: string, lang: 'ar' | 'fr' | 'en') => {
  const data: Record<string, Record<'ar' | 'fr' | 'en', { name: string; role: string; location: string; content: string }>> = {
    't-1': {
      ar: {
        name: 'أمينة بن يوسف',
        role: 'خبيرة تغذية طبيعية',
        location: 'الدار البيضاء',
        content: 'أملو Coopérative Tadmamte هو الأفضل بلا منازع! جودة زيت الأركان واضحة وحلاوته نابعة من عسل حقيقي وليس سكر مستتر كالمتاجر التجارية. أنصح به كل مراجعي وعائلتي.'
      },
      fr: {
        name: 'Amina Benyoussef',
        role: 'Nutritionniste Naturelle',
        location: 'Casablanca',
        content: "L'Amlou de la Coopérative Tadmamte est incontestablement le meilleur ! La qualité de l'huile d'argan est évidente et sa douceur provient de vrai miel, pas de sucre caché. Je le recommande vivement à mes patients et ma famille."
      },
      en: {
        name: 'Amina Benyoussef',
        role: 'Natural Nutritionist',
        location: 'Casablanca',
        content: "Tadmamte Cooperative's Amlou is hands down the best! The quality of argan oil is highly clear, and its sweetness comes from real honey, not hidden sugars. I recommend it to all my patients and family."
      }
    },
    't-2': {
      ar: {
        name: 'رشيد أومولود',
        role: 'محب للمنتجات الطبيعية والأصيلة',
        location: 'أكادير',
        content: 'أشتري عسل السدر الجبلي والزعتر من Coopérative Tadmamte بانتظام. النقاء والذوق لا تشوبه شائبة، وتغليف المنتجات في قوارير زجاجية أنيقة يشعرك بالفخامة قبل تذوقه. الشحن سريع ومهذب جداً.'
      },
      fr: {
        name: 'Rachid Oumouloud',
        role: 'Amateur de Produits Naturels',
        location: 'Agadir',
        content: "J'achète régulièrement le miel de Jujubier (Sidr) et de Thym de la Coopérative Tadmamte. La pureté et le goût sont exceptionnels, et l'élégant emballage en verre apporte une vraie touche premium. Livraison rapide."
      },
      en: {
        name: 'Rachid Oumouloud',
        role: 'Natural Products Enthusiast',
        location: 'Agadir',
        content: "I regularly buy Sidr and Thym honey from the Tadmamte Cooperative. The purity and taste are immaculate, and the elegant glass packaging feels premium. Shipping is fast and very polite."
      }
    },
    't-3': {
      ar: {
        name: 'فاطمة الزهراء البهجة',
        role: 'مصممة أزياء تراثية المغرب',
        location: 'مراكش',
        content: 'أحببت قصة النساء وراء المشروع وتأثرت كثيراً بالجهد اليدوي والأمانة في الإنتاج. العسل برائحته يذكرني بطفولتي في قرى سوس. تصميم المتجر وتجربة الشراء ممتعة وتليق بالتراث الفاخر.'
      },
      fr: {
        name: 'Fatima-Zahra El Bahja',
        role: 'Styliste de Mode Patrimoniale',
        location: 'Marrakech',
        content: "J'adore l'histoire des femmes derrière ce projet, l'honnêteté de la production artisanale me touche beaucoup. Ce miel me rappelle mon enfance dans le Souss. La boutique en ligne est magnifique."
      },
      en: {
        name: 'Fatima-Zahra El Bahja',
        role: 'Heritage Fashion Designer',
        location: 'Marrakech',
        content: "I fell in love with the story of the women behind this project and was touched by the artisanal effort. The honey's aroma reminds me of my childhood in Souss. The shopping experience is beautiful."
      }
    },
    't-4': {
      ar: {
        name: 'فاضمة إيت باها',
        role: 'عضوة في Coopérative Tadmamte',
        location: 'تارودانت، سوس',
        content: 'التعاونية وفرت لنا نحن نساء القرية بيئة آمنة للعمل ودخلاً كريماً نصون به كرامة بيوتنا. كل قطرة عسل أو حبة أملو نصنعها بقلوبنا ودعائنا بالبركة لمن يتذوقها.'
      },
      fr: {
        name: 'Fadhma Ait Baha',
        role: 'Membre de la Coopérative',
        location: 'Taroudant, Souss',
        content: "La coopérative nous a offert, à nous femmes du village, un environnement de travail sécurisé et un revenu digne. Chaque goute de miel et pot d'amlou est fait avec le cœur et des prières pour vous."
      },
      en: {
        name: 'Fadhma Ait Baha',
        role: 'Member of the Cooperative',
        location: 'Taroudant, Souss',
        content: "The cooperative provided us, the village women, with a safe workspace and a dignified income to support our homes. Every drop of honey and jar of amlou is made with love and blessings."
      }
    }
  };
  return data[id]?.[lang] || data[id]?.['ar'];
};

export function Reviews() {
  const { language } = useLanguage();

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-brand-sand/50 relative overflow-hidden">
      {/* Decorative vector */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold-hover px-3.5 py-1 rounded-full text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>
              {language === 'ar' ? 'ثقة ومصداقية زبنائنا' : language === 'fr' ? 'La Confiance de nos Clients' : 'Trust of our Clients'}
            </span>
          </div>
          <h2 className="font-reem text-3xl sm:text-4xl text-brand-brown font-extrabold">
            {language === 'ar' ? 'ماذا يقول عملاؤنا وعضواتنا في سوس؟' : language === 'fr' ? 'Que disent nos clients et membres de Souss ?' : 'What do our clients & members of Souss say?'}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {language === 'ar' 
              ? 'كل شهادة نجاح هي دافع لنا للاستمرار في تقديم الأفضل، وصيانة كرامة الأسر المنتجة.' 
              : language === 'fr' 
              ? 'Chaque témoignage est un élan pour nous surpasser et préserver la dignité des familles productrices.' 
              : 'Every success story is our motivation to keep delivering excellence and protecting our local families.'}
          </p>
        </div>

        {/* Bento/Grid Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test, index) => {
            const translation = getTestimonialTranslation(test.id, language);
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-6 rounded-2xl border border-brand-brown/5 shadow-xs relative flex flex-col justify-between hover:shadow-md hover:border-brand-gold/15 transition-all group ${language === 'ar' ? 'text-right' : 'text-left'}`}
                id={`testimonial-${test.id}`}
              >
                {/* Quote Mark Decoration */}
                <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors`}>
                  <MessageSquareQuote className={`w-10 h-10 ${language === 'ar' ? 'transform scale-x-[-1]' : ''}`} />
                </div>

                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 italic relative z-10">
                    "{translation.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-brand-sand mt-auto">
                  <img
                    src={test.avatar}
                    alt={translation.name}
                    className="w-10 h-10 object-cover rounded-full border border-brand-gold/25"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/avatar_amina.webp';
                    }}
                  />
                  <div>
                    <h4 className="font-reem font-bold text-sm text-brand-brown">{translation.name}</h4>
                    <p className="text-[10px] text-brand-olive font-bold">
                      {translation.role} • <span className="font-normal text-gray-500">{translation.location}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Amazigh Wisdom Banner */}
        <div className="mt-16 bg-brand-brown text-brand-sand p-6 sm:p-8 rounded-3xl text-center max-w-3xl mx-auto border border-brand-gold/10 shadow-lg relative overflow-hidden">
          {/* Subtle Berber Pattern background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FAF6F0_1px,transparent_1px)] [background-size:16px_16px]" />
          <h3 className="font-reem text-xl sm:text-2xl text-brand-gold mb-2 font-bold">
            {language === 'ar' 
              ? '« ⵣ التضامن والأصالة تضيء طريق الجبال »' 
              : '« ⵣ Solidarité et authenticité éclairent les chemins montagnards »'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'حكمة أمازيغية قديمة تعكس روح عملنا الجماعي. من مائدة بسيطة في سهول سوس إلى بيوتكم الكريمة بشتى أنحاء المغرب، نحن عائلة واحدة تبني وطناً معطاءً.' 
              : language === 'fr' 
              ? 'Sagesse amazighe ancestrale illustrant notre esprit d’entraide. D’une simple table des plaines de Souss à vos demeures partout au Maroc, nous sommes une seule et même famille unie.' 
              : 'Ancient Amazigh wisdom reflecting our collective spirit. From a humble kitchen in the Souss plains to your beautiful homes all across Morocco, we are one family building a better future.'}
          </p>
        </div>

      </div>
    </section>
  );
}
