import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionLabel } from '@/components/SectionLabel';
import { useReveal } from '@/hooks/useReveal';
import { Mail, Phone, Clock, Check, Loader2, Shield, Zap, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const typeOptions = [
  { value: '', label: 'Sélectionnez un type de projet' },
  { value: 'vitrine', label: 'Site Vitrine — 497€' },
  { value: 'ecommerce', label: 'Site E-commerce — 747€' },
  { value: 'maintenance', label: 'Maintenance & SEO — dès 39€/mois' },
  { value: 'autre', label: 'Autre projet' },
];

const defaultMessages: Record<string, string> = {
  vitrine: 'Bonjour, je souhaite créer un site vitrine pour mon activité.',
  ecommerce: 'Bonjour, je souhaite créer une boutique en ligne.',
  maintenance: 'Bonjour, je suis intéressé(e) par vos offres de maintenance et SEO.',
};

const reassurance = [
  { icon: Shield, text: 'Devis gratuit et sans engagement' },
  { icon: Zap, text: 'Réponse sous 24h' },
  { icon: Headphones, text: 'Accompagnement personnalisé' },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });

  const formReveal = useReveal(0.1);

  useEffect(() => {
    const type = searchParams.get('type') || '';
    if (type && typeOptions.some(o => o.value === type)) {
      setForm(f => ({
        ...f,
        type,
        message: defaultMessages[type] || '',
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1500);
  };

  const inputClasses = 'w-full bg-bg-card border border-glow rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet transition-colors font-body';

  return (
    <div className="relative">
      <section className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12" ref={formReveal.ref} style={formReveal.style}>
            {/* Left */}
            <div className="md:w-[40%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <SectionLabel>Contact</SectionLabel>
                <h1 className="font-heading font-extrabold text-[40px] md:text-[52px] leading-[1.05] text-foreground mt-4">
                  Parlons de votre <span className="text-gradient">projet</span>
                </h1>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Décrivez-nous votre projet et recevez un devis personnalisé sous 24h.
                </p>
              </motion.div>

              <div className="mt-10 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail size={16} className="text-violet" /> contact@altera.fr
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock size={16} className="text-violet" /> Lun-Ven · 9h-18h
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                {reassurance.map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-dark flex items-center justify-center">
                      <r.icon size={14} className="text-violet" />
                    </div>
                    <span className="text-sm text-muted-foreground">{r.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div className="md:w-[60%]">
              <div className="bg-gradient-card border border-glow rounded-2xl p-8">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
                      <Check size={32} className="text-success" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Message envoyé !</h3>
                    <p className="text-sm text-muted-foreground">Nous vous répondrons sous 24h.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text" placeholder="Prénom" required
                        className={inputClasses}
                        value={form.firstName}
                        onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                      />
                      <input
                        type="text" placeholder="Nom" required
                        className={inputClasses}
                        value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                      />
                    </div>
                    <input
                      type="email" placeholder="Email" required
                      className={inputClasses}
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    <input
                      type="tel" placeholder="Téléphone"
                      className={inputClasses}
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                    <select
                      className={`${inputClasses} appearance-none`}
                      value={form.type}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    >
                      {typeOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Décrivez votre projet..." rows={5} required
                      className={`${inputClasses} resize-none`}
                      style={{ minHeight: 180 }}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full py-4 rounded-xl bg-gradient-primary font-body font-semibold text-foreground hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {formState === 'loading' ? (
                        <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
                      ) : (
                        'Envoyer ma demande →'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
