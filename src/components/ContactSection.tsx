import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Shield } from 'lucide-react';
import { YazLogo } from './YazLogo';
import { useLanguage } from '../utils/translations';

export function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const errs: Partial<typeof formData> = {};
    if (!formData.name.trim()) {
      errs.name = language === 'ar' ? 'يرجى كتابة الاسم' : language === 'fr' ? 'Veuillez entrer votre nom' : 'Please enter your name';
    }
    if (!formData.message.trim()) {
      errs.message = language === 'ar' ? 'يرجى كتابة رسالتك' : language === 'fr' ? 'Veuillez entrer votre message' : 'Please enter your message';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = language === 'ar' ? 'عنوان بريد غير صالح' : language === 'fr' ? 'E-mail non valide' : 'Invalid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-olive/10 text-brand-olive px-3.5 py-1 rounded-full text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>
              {language === 'ar' ? 'نحن دائماً في الخدمة' : language === 'fr' ? 'À votre service' : 'At your service'}
            </span>
          </div>
          <h2 className="font-reem text-3xl sm:text-4xl text-brand-brown font-extrabold">
            {language === 'ar' ? 'تواصل مع Coopérative Tadmamte' : language === 'fr' ? 'Contactez la Coopérative Tadmamte' : 'Contact Coopérative Tadmamte'}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {language === 'ar' 
              ? 'لديك سؤال حول منتجاتنا، رغبة في طلب كميات خاصة للشركات والمناسبات؟ تواصل معنا فوراً.' 
              : language === 'fr' 
              ? 'Une question sur nos produits ou des demandes spéciales ? Écrivez-nous directement.' 
              : 'Have questions about our products, or custom wholesale/gift inquiries? Reach out to us.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-brand-sand/30 rounded-3xl p-6 sm:p-10 border border-brand-brown/5 relative overflow-hidden">
          
          {/* Decorative watermark ⵣ */}
          <div className="absolute -bottom-16 -left-16 text-brand-gold/5 w-64 h-64 pointer-events-none">
            <YazLogo className="w-full h-full" />
          </div>

          {/* Contact Details */}
          <div className={`lg:col-span-5 space-y-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="font-reem text-xl sm:text-2xl text-brand-brown font-bold mb-4">
              {language === 'ar' ? 'قنوات التواصل المباشر' : language === 'fr' ? 'Canaux de communication directs' : 'Direct Channels'}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {language === 'ar' 
                ? 'يسعد فريق التعاونية استقبال استفساراتك هاتفياً أو عبر البريد الإلكتروني طيلة أيام الأسبوع من الساعة التاسعة صباحاً وحتى الثامنة مساءً.' 
                : language === 'fr' 
                ? 'Notre équipe est ravie de recevoir vos demandes par téléphone ou e-mail toute la semaine de 9h à 20h.' 
                : 'Our team is delighted to receive your inquiries via phone or email all week long, from 9:00 AM to 8:00 PM.'}
            </p>

            <div className="space-y-6">
              <div className={`flex items-start gap-4 ${language === 'ar' ? 'justify-start' : 'justify-start'}`}>
                <div className="p-3 bg-brand-brown text-brand-gold rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-brown mb-0.5">
                    {language === 'ar' ? 'اتصل بنا مباشرة / واتساب:' : language === 'fr' ? 'Appelez-nous / WhatsApp :' : 'Call / WhatsApp:'}
                  </h4>
                  <p className="text-sm text-gray-700 font-mono" dir="ltr">0622943590</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 ${language === 'ar' ? 'justify-start' : 'justify-start'}`}>
                <div className="p-3 bg-brand-brown text-brand-gold rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-brown mb-0.5">
                    {language === 'ar' ? 'راسلنا إلكترونياً:' : language === 'fr' ? 'E-mail professionnel :' : 'Email:'}
                  </h4>
                  <p className="text-sm text-gray-700">cooperative.agricole.tadmamte@gmail.com</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 ${language === 'ar' ? 'justify-start' : 'justify-start'}`}>
                <div className="p-3 bg-brand-brown text-brand-gold rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-brown mb-0.5">
                    {language === 'ar' ? 'مقر ومنحل التعاونية:' : language === 'fr' ? 'Siège de la Coopérative :' : 'Cooperative HQ:'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700">
                    {language === 'ar' ? 'Dr Ibourin, CR Ait Milk, Chtouka Ait Baha، المغرب.' : language === 'fr' ? 'Dr Ibourin, CR Ait Milk, Chtouka Ait Baha, Maroc.' : 'Dr Ibourin, CR Ait Milk, Chtouka Ait Baha, Morocco.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick trust seal */}
            <div className="p-4 bg-brand-olive/5 border border-brand-olive/15 rounded-2xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-brand-olive shrink-0 mt-0.5" />
              <p className="text-xs text-brand-olive font-bold leading-normal">
                {language === 'ar' 
                  ? 'جميع المراسلات تقع تحت سرية تامة والتزام تام بحماية بياناتك الشخصية، ونلتزم بالرد على طلبات البريد في أقل من ٢٤ ساعة.' 
                  : language === 'fr' 
                  ? 'Toutes vos communications restent confidentielles. Réponse sous 24h garantie.' 
                  : 'All communications are highly confidential. We commit to responding in less than 24 hours.'}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-brand-brown/5 shadow-xs relative z-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-brand-olive/10 text-brand-olive rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-reem text-2xl text-brand-brown mb-2 font-bold">
                  {language === 'ar' ? 'شكراً لرسالتك الكريمة!' : language === 'fr' ? 'Merci pour votre message !' : 'Thank you for your message!'}
                </h4>
                <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
                  {language === 'ar' 
                    ? 'تم استلام رسالتك بنجاح من قِبل إدارة Coopérative Tadmamte. سنقوم بالرد عليك وإجابتك هاتفياً أو عبر البريد الإلكتروني في أقرب فرصة ممكنة.' 
                    : language === 'fr' 
                    ? 'Votre message a été reçu par la Coopérative Tadmamte. Nous vous répondrons dès que possible par e-mail ou par téléphone.' 
                    : 'Your message has been received by Coopérative Tadmamte. We will get back to you via phone or email as soon as possible.'}
                </p>
                <button
                  onClick={() => {
                    setFormData({ name: '', email: '', phone: '', message: '' });
                    setSubmitted(false);
                  }}
                  className="bg-brand-brown hover:bg-brand-earth text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'إرسال رسالة جديدة' : language === 'fr' ? 'Envoyer un nouveau message' : 'Send a new message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`space-y-5 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h3 className="font-reem text-xl text-brand-brown font-bold mb-4">
                  {language === 'ar' ? 'أرسل لنا استفساراً سريعاً' : language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-brand-brown mb-1.5">
                    {language === 'ar' ? 'الاسم الكريم:' : language === 'fr' ? 'Votre Nom :' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'ar' ? 'مثال: سارة أيت حدو' : language === 'fr' ? 'Ex: Sarah Ait Haddou' : 'e.g. Sarah Ait Haddou'}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-brand-brown/10'} focus:outline-hidden focus:ring-2 focus:ring-brand-gold bg-brand-sand/20`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-1.5">
                      {language === 'ar' ? 'البريد الإلكتروني (اختياري):' : language === 'fr' ? 'E-mail (Optionnel) :' : 'Email (Optional):'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-brand-brown/10'} focus:outline-hidden focus:ring-2 focus:ring-brand-gold bg-brand-sand/20 text-left`}
                      dir="ltr"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-1.5">
                      {language === 'ar' ? 'رقم الهاتف (اختياري):' : language === 'fr' ? 'Numéro de Téléphone (Optionnel) :' : 'Phone Number (Optional):'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0612345678"
                      className="w-full px-4 py-3 rounded-xl border border-brand-brown/10 focus:outline-hidden focus:ring-2 focus:ring-brand-gold bg-brand-sand/20 text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-brand-brown mb-1.5">
                    {language === 'ar' ? 'نص رسالتك الكريمة:' : language === 'fr' ? 'Votre Message :' : 'Your Message:'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === 'ar' ? 'اكتب هنا استفسارك أو طلبك الخاص بالتفصيل...' : language === 'fr' ? 'Écrivez votre message en détail ici...' : 'Write your message or inquiry in detail here...'}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-brand-brown/10'} focus:outline-hidden focus:ring-2 focus:ring-brand-gold bg-brand-sand/20`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-brown font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-brand-gold/10 hover:shadow-lg"
                >
                  <Send className={`w-4 h-4 ${language === 'ar' ? 'transform rotate-180' : ''}`} />
                  <span>
                    {language === 'ar' ? 'إرسال الرسالة لإدارة التعاونية' : language === 'fr' ? 'Envoyer le message' : 'Send Message'}
                  </span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
