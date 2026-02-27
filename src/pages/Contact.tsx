import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

// ⚠️ REMPLACER CES 3 VALEURS PAR LES CLÉS EMAILJS
const EMAILJS_SERVICE_ID = 'service_230v0sl';
const EMAILJS_TEMPLATE_ID = 'template_8eb69bq';
const EMAILJS_PUBLIC_KEY = 'SloH41wxgblA_mVUn';

const projectOptions = [
  { value: 'vitrine', label: 'Site Vitrine 497€' },
  { value: 'ecommerce', label: 'Site E-commerce 747€' },
  { value: 'maintenance', label: 'Maintenance dès 39€/mois' },
  { value: 'refonte', label: 'Refonte' },
  { value: 'autre', label: 'Autre' },
];

const seededMessages: Record<string, string> = {
  vitrine: "Bonjour ALTÉRA, je souhaite créer un site vitrine premium pour mon activité.",
  ecommerce: 'Bonjour ALTÉRA, je souhaite lancer un site e-commerce complet avec paiement en ligne.',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', projectType: '', message: '' });

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'vitrine' || type === 'ecommerce') {
      setForm((prev) => ({ ...prev, projectType: type, message: seededMessages[type] }));
    }
  }, [searchParams]);

  const messageLength = form.message.length;
  const selectedProjectLabel = useMemo(
    () => projectOptions.find((option) => option.value === form.projectType)?.label || 'Non précisé',
    [form.projectType],
  );

  const validateField = (name: string, value: string) => {
    if ((name === 'firstName' || name === 'lastName') && !value.trim()) return 'Ce champ est obligatoire.';
    if (name === 'email') {
      if (!value.trim()) return 'Email obligatoire.';
      if (!emailRegex.test(value)) return 'Format email invalide.';
    }
    if (name === 'message') {
      if (value.trim().length < 20) return 'Le message doit contenir au moins 20 caractères.';
      if (value.length > 500) return 'Le message ne peut pas dépasser 500 caractères.';
    }
    return '';
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      const error = validateField(name, value);
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  };

  const validateAll = () => {
    const nextErrors: Record<string, string> = {};
    ['firstName', 'lastName', 'email', 'message'].forEach((name) => {
      const value = form[name as keyof typeof form];
      const error = validateField(name, value);
      if (error) nextErrors[name] = error;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateAll()) return;
    setStatus('loading');

    try {
      const templateParams = {
        from_name: `${form.firstName} ${form.lastName}`,
        from_email: form.email,
        phone: form.phone || 'Non renseigné',
        project_type: selectedProjectLabel,
        message: form.message,
        date: new Date().toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      });
      if (!response.ok) throw new Error('EmailJS request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const fieldStyle = (field: string) => ({
    background: '#060614',
    border: `1px solid ${errors[field] ? '#EF4444' : focusedField === field ? '#7B2FFF' : 'rgba(123,47,255,0.15)'}`,
    boxShadow: focusedField === field && !errors[field] ? '0 0 0 3px rgba(123,47,255,0.15)' : 'none',
    borderRadius: 10,
    padding: '14px 16px',
    color: '#FFF',
    width: '100%',
    outline: 'none',
  });

  return (
    <section className="relative z-10 px-4 pt-32 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="font-heading text-white text-4xl md:text-6xl font-extrabold leading-tight">
            Transformons votre <span className="bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF] bg-clip-text text-transparent">projet</span> en présence digitale premium.
          </h1>
          <p className="mt-5 text-white/60">Parlez-nous de votre objectif, nous revenons vers vous sous 24h.</p>
          <div className="mt-8 space-y-3 text-white/80">
            <p className="flex gap-3"><Mail className="text-[#00C2FF]" size={18} />contact@altera.fr</p>
            <p className="flex gap-3"><Phone className="text-[#00C2FF]" size={18} />+33 6 12 34 56 78</p>
            <p className="flex gap-3"><MapPin className="text-[#00C2FF]" size={18} />Paris, France</p>
          </div>
          <ul className="mt-8 space-y-2 text-white/65">
            <li>• Devis gratuit et sans engagement</li>
            <li>• Accompagnement de A à Z</li>
            <li>• Livraison rapide et support réactif</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[rgba(123,47,255,0.2)] bg-[rgba(7,7,20,0.9)] overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF]" />
          <div className="p-6 md:p-8">
            {status === 'success' ? (
              <div className="text-center py-10" style={{ animation: 'successPop 320ms ease-out both' }}>
                <CheckCircle2 className="mx-auto text-emerald-400" size={48} />
                <h2 className="mt-4 text-2xl font-heading font-bold text-white">Message envoyé avec succès</h2>
                <p className="mt-2 text-white/60">Merci, nous revenons vers vous très rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input placeholder="Prénom" value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField(null)} style={fieldStyle('firstName')} />
                    {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input placeholder="Nom" value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField(null)} style={fieldStyle('lastName')} />
                    {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <input placeholder="Email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} style={fieldStyle('email')} />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <input placeholder="Téléphone (optionnel)" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} style={fieldStyle('phone')} />

                <select value={form.projectType} onChange={(e) => handleChange('projectType', e.target.value)} onFocus={() => setFocusedField('projectType')} onBlur={() => setFocusedField(null)} style={fieldStyle('projectType')}>
                  <option value="">Type de projet</option>
                  {projectOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                <div>
                  <textarea
                    placeholder="Décrivez votre projet..."
                    value={form.message}
                    maxLength={500}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...fieldStyle('message'), minHeight: 150, resize: 'vertical' }}
                  />
                  <div className="mt-1 flex items-center justify-between">
                    {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : <span />}
                    <p className="text-xs text-white/40">{messageLength}/500</p>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-300">Envoi impossible. Contactez-nous directement : <a className="underline" href="mailto:contact@altera.fr">contact@altera.fr</a></p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-xl py-3.5 text-white font-semibold bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF] disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {status === 'loading' && <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: 'spin .7s linear infinite' }} />}
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes successPop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
