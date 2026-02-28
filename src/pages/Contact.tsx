import { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Clock, Mail, MapPin } from 'lucide-react';

const emailjs = {
  send: async (serviceId: string, templateId: string, templateParams: Record<string, string>, publicKey: string) => {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      throw new Error('EmailJS request failed');
    }
  },
};

const EMAILJS_SERVICE_ID = 'service_230v0sl';
const EMAILJS_TEMPLATE_ID = 'template_8eb69bq';
const EMAILJS_PUBLIC_KEY = 'SloH41wxgblA_mVUn';

const PROJECT_TYPES = [
  { id: 'vitrine', label: 'Site Vitrine', price: '497€', emoji: '🌐' },
  { id: 'ecommerce', label: 'Site E-commerce', price: '747€', emoji: '🛒' },
  { id: 'maintenance', label: 'Maintenance', price: 'dès 39€/m', emoji: '🔧' },
  { id: 'refonte', label: 'Refonte', price: 'Sur devis', emoji: '✏️' },
];

const BUDGETS = ['< 500€', '500–800€', '800–1500€', '1500€+', 'À définir'];
const DELAIS = ['Le plus tôt', '1 mois', '2–3 mois', 'Flexible'];

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  projet: string;
  budget: string;
  delai: string;
  message: string;
}

export default function Contact() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    tel: '',
    projet: '',
    budget: '',
    delai: '',
    message: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type && PROJECT_TYPES.find((p) => p.id === type)) {
      setForm((f) => ({ ...f, projet: type }));
    }
  }, []);

  const inputStyle = (field: string): CSSProperties => ({
    width: '100%',
    background: '#060614',
    border: `1px solid ${focused === field ? '#7B2FFF' : 'rgba(123,47,255,0.15)'}`,
    borderRadius: '10px',
    padding: '13px 16px',
    color: 'white',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 200ms ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(123,47,255,0.12)' : 'none',
  });

  const labelStyle: CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '7px',
  };

  const pillBtnStyle = (selected: boolean): CSSProperties => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: selected ? '#7B2FFF' : 'rgba(255,255,255,0.1)',
    background: selected ? 'rgba(123,47,255,0.2)' : 'transparent',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '13px',
    color: selected ? 'white' : 'rgba(255,255,255,0.55)',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: selected ? '0 0 0 1px rgba(123,47,255,0.25)' : 'none',
  });

  const isStep1Valid = form.prenom && form.nom && form.email && form.projet;
  const isStep2Valid = form.message.length >= 20;

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${form.prenom} ${form.nom}`,
          from_email: form.email,
          phone: form.tel || 'Non renseigné',
          project_type: PROJECT_TYPES.find((p) => p.id === form.projet)?.label ?? form.projet,
          budget: form.budget || 'Non renseigné',
          timeline: form.delai || 'Non renseigné',
          message: form.message,
          date: new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: 'clamp(48px,6vw,80px) 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              marginBottom: '18px',
              background: 'rgba(123,47,255,0.1)',
              border: '1px solid rgba(123,47,255,0.25)',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#7B2FFF',
                boxShadow: '0 0 6px #7B2FFF',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'DM Sans,sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9B5FFF',
              }}
            >
              CONTACT
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'var(--text-hero-h1)',
              color: 'white',
              margin: '0 0 14px',
              lineHeight: 1.05,
            }}
          >
            Parlons de votre{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7B2FFF, #00C2FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              projet
            </span>
          </h1>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(14px,1.6vw,16px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Réponse garantie sous 24h · Consultation 30 min offerte · Devis gratuit
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(260px,35%,340px) 1fr',
            gap: 'clamp(20px,3vw,40px)',
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                background: 'linear-gradient(145deg,rgba(123,47,255,0.1),rgba(0,194,255,0.05))',
                border: '1px solid rgba(123,47,255,0.25)',
                borderRadius: '20px',
                padding: '28px',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>📅</div>
              <h3
                style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '16px', color: 'white', margin: '0 0 8px' }}
              >
                Consultation offerte
              </h3>
              <p
                style={{
                  fontFamily: 'DM Sans,sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                30 minutes pour définir ensemble votre projet, vos objectifs et le meilleur chemin pour y arriver.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {[
                { icon: Mail, text: 'contact@altera.fr' },
                { icon: MapPin, text: 'Saint-Dizier, France (remote)' },
                { icon: Clock, text: 'Réponse sous 24h' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      flexShrink: 0,
                      background: 'rgba(123,47,255,0.12)',
                      border: '1px solid rgba(123,47,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={15} color="#7B2FFF" />
                  </div>
                  <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: 'rgba(123,47,255,0.06)',
                border: '1px solid rgba(123,47,255,0.15)',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <p
                style={{
                  fontFamily: 'DM Sans,sans-serif',
                  fontStyle: 'italic',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.55)',
                  margin: '0 0 10px',
                  lineHeight: 1.65,
                }}
              >
                "Votre investissement est récupéré en moyenne en 4 à 6 mois grâce aux nouveaux clients générés."
              </p>
              <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                — Résultat moyen · clients ALTÉRA
              </span>
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(145deg,#0A0A1E,#0D0D28)',
              border: '1px solid rgba(123,47,255,0.2)',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            <div style={{ height: '3px', background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)' }} />

            <div style={{ padding: 'clamp(24px,3vw,36px)' }}>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}
                >
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '30px',
                      boxShadow: '0 0 50px rgba(123,47,255,0.6)',
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '22px', color: 'white', margin: 0 }}>
                    Demande envoyée !
                  </h3>
                  <p
                    style={{
                      fontFamily: 'DM Sans,sans-serif',
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.5)',
                      margin: 0,
                      lineHeight: 1.65,
                      maxWidth: '300px',
                    }}
                  >
                    Bonjour <strong style={{ color: 'white' }}>{form.prenom}</strong>, nous revenons vers vous sous 24h avec
                    votre devis personnalisé.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['✓ Réponse sous 24h', '✓ Devis gratuit', '✓ Sans engagement'].map((t) => (
                      <span key={t} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <>
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      {[
                        { n: 1, label: 'Votre projet' },
                        { n: 2, label: 'Vos besoins' },
                        { n: 3, label: 'Confirmation' },
                      ].map(({ n, label }) => (
                        <div
                          key={n}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            flex: 1,
                            justifyContent: n === 1 ? 'flex-start' : n === 3 ? 'flex-end' : 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: step >= n ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'rgba(255,255,255,0.06)',
                              border: step >= n ? 'none' : '1px solid rgba(255,255,255,0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'Syne,sans-serif',
                              fontWeight: 700,
                              fontSize: '11px',
                              color: step >= n ? 'white' : 'rgba(255,255,255,0.25)',
                              transition: 'all 300ms ease',
                              boxShadow: step >= n ? '0 0 10px rgba(123,47,255,0.45)' : 'none',
                              flexShrink: 0,
                            }}
                          >
                            {step > n ? '✓' : n}
                          </div>
                          <span
                            style={{
                              fontFamily: 'DM Sans,sans-serif',
                              fontSize: '12px',
                              color: step >= n ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.2)',
                              transition: 'color 300ms',
                            }}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                      <motion.div
                        animate={{ width: `${((step - 1) / 2) * 100}%` }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          height: '100%',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)',
                          boxShadow: '0 0 8px rgba(123,47,255,0.6)',
                        }}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          {([
                            ['prenom', 'Prénom *', 'Jean'],
                            ['nom', 'Nom *', 'Dupont'],
                          ] as [string, string, string][]).map(([k, l, p]) => (
                            <div key={k}>
                              <label style={labelStyle}>{l}</label>
                              <input
                                value={form[k as keyof FormData]}
                                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                                onFocus={() => setFocused(k)}
                                onBlur={() => setFocused(null)}
                                style={inputStyle(k)}
                                placeholder={p}
                                required
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <label style={labelStyle}>Email *</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            style={inputStyle('email')}
                            placeholder="jean.dupont@email.fr"
                            required
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>
                            Téléphone{' '}
                            <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none', letterSpacing: 0 }}>
                              — optionnel
                            </span>
                          </label>
                          <input
                            value={form.tel}
                            onChange={(e) => setForm({ ...form, tel: e.target.value })}
                            onFocus={() => setFocused('tel')}
                            onBlur={() => setFocused(null)}
                            style={inputStyle('tel')}
                            placeholder="06 12 34 56 78"
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Type de projet *</label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {PROJECT_TYPES.map((pt) => (
                              <button
                                key={pt.id}
                                type="button"
                                onClick={() => setForm({ ...form, projet: pt.id })}
                                style={{
                                  padding: '12px 14px',
                                  borderRadius: '10px',
                                  border: '1px solid',
                                  borderColor: form.projet === pt.id ? '#7B2FFF' : 'rgba(255,255,255,0.08)',
                                  background: form.projet === pt.id ? 'rgba(123,47,255,0.18)' : 'rgba(255,255,255,0.02)',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'all 200ms ease',
                                  boxShadow: form.projet === pt.id ? '0 0 0 1px rgba(123,47,255,0.25)' : 'none',
                                }}
                              >
                                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{pt.emoji}</div>
                                <div style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '13px', color: 'white' }}>
                                  {pt.label}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'DM Sans,sans-serif',
                                    fontSize: '11px',
                                    color: 'rgba(255,255,255,0.35)',
                                    marginTop: '2px',
                                  }}
                                >
                                  {pt.price}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => isStep1Valid && setStep(2)}
                          style={{
                            height: '50px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: isStep1Valid ? 'pointer' : 'not-allowed',
                            background: isStep1Valid ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'rgba(255,255,255,0.06)',
                            fontFamily: 'DM Sans,sans-serif',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: 'white',
                            transition: 'all 250ms ease',
                            boxShadow: isStep1Valid ? '0 6px 24px rgba(123,47,255,0.3)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                          }}
                        >
                          Suivant <ArrowRight size={15} />
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                      >
                        <div>
                          <label style={labelStyle}>Budget approximatif</label>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {BUDGETS.map((b) => (
                              <button key={b} type="button" onClick={() => setForm({ ...form, budget: b })} style={pillBtnStyle(form.budget === b)}>
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Délai souhaité</label>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {DELAIS.map((d) => (
                              <button key={d} type="button" onClick={() => setForm({ ...form, delai: d })} style={pillBtnStyle(form.delai === d)}>
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Décrivez votre projet *</label>
                            <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
                              {form.message.length}/500
                            </span>
                          </div>
                          <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 500) })}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused(null)}
                            style={{ ...inputStyle('message'), resize: 'none', height: '110px' }}
                            placeholder="Parlez-nous de votre activité et de vos objectifs..."
                            required
                          />
                          {form.message.length > 0 && form.message.length < 20 && (
                            <span
                              style={{
                                fontFamily: 'DM Sans,sans-serif',
                                fontSize: '11px',
                                color: 'rgba(239,68,68,0.8)',
                                marginTop: '4px',
                                display: 'block',
                              }}
                            >
                              Minimum 20 caractères ({20 - form.message.length} restants)
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{
                              height: '50px',
                              borderRadius: '12px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'transparent',
                              cursor: 'pointer',
                              fontFamily: 'DM Sans,sans-serif',
                              fontWeight: 500,
                              fontSize: '14px',
                              color: 'rgba(255,255,255,0.45)',
                            }}
                          >
                            ← Retour
                          </button>
                          <button
                            type="button"
                            onClick={() => isStep2Valid && setStep(3)}
                            style={{
                              height: '50px',
                              borderRadius: '12px',
                              border: 'none',
                              cursor: isStep2Valid ? 'pointer' : 'not-allowed',
                              background: isStep2Valid ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'rgba(255,255,255,0.06)',
                              fontFamily: 'DM Sans,sans-serif',
                              fontWeight: 600,
                              fontSize: '14px',
                              color: 'white',
                              transition: 'all 250ms',
                              boxShadow: isStep2Valid ? '0 6px 24px rgba(123,47,255,0.3)' : 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                            }}
                          >
                            Voir le résumé <ArrowRight size={15} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                      >
                        <div
                          style={{
                            background: 'rgba(123,47,255,0.06)',
                            border: '1px solid rgba(123,47,255,0.18)',
                            borderRadius: '14px',
                            padding: '20px',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'Syne,sans-serif',
                              fontWeight: 700,
                              fontSize: '13px',
                              color: 'white',
                              margin: '0 0 14px',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                            }}
                          >
                            Récapitulatif
                          </p>
                          {[
                            ['Contact', `${form.prenom} ${form.nom} · ${form.email}`],
                            ['Projet', PROJECT_TYPES.find((p) => p.id === form.projet)?.label ?? form.projet],
                            ['Budget', form.budget || '—'],
                            ['Délai', form.delai || '—'],
                            ['Message', form.message.slice(0, 90) + (form.message.length > 90 ? '…' : '')],
                          ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'flex-start' }}>
                              <span
                                style={{
                                  fontFamily: 'DM Sans,sans-serif',
                                  fontSize: '12px',
                                  color: 'rgba(255,255,255,0.3)',
                                  minWidth: '60px',
                                  paddingTop: '1px',
                                }}
                              >
                                {k}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'DM Sans,sans-serif',
                                  fontSize: '13px',
                                  color: 'rgba(255,255,255,0.72)',
                                  lineHeight: 1.5,
                                }}
                              >
                                {v}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                          {['✓ Réponse sous 24h', '✓ Devis gratuit', '✓ Sans engagement'].map((t) => (
                            <span key={t} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        {status === 'error' && (
                          <div
                            style={{
                              background: 'rgba(239,68,68,0.08)',
                              border: '1px solid rgba(239,68,68,0.2)',
                              borderRadius: '10px',
                              padding: '12px 16px',
                              fontFamily: 'DM Sans,sans-serif',
                              fontSize: '13px',
                              color: 'rgba(239,68,68,0.8)',
                            }}
                          >
                            Une erreur s&apos;est produite. Contactez-nous directement à{' '}
                            <a href="mailto:contact@altera.fr" style={{ color: '#EF4444' }}>
                              contact@altera.fr
                            </a>
                          </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            style={{
                              height: '50px',
                              borderRadius: '12px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'transparent',
                              cursor: 'pointer',
                              fontFamily: 'DM Sans,sans-serif',
                              fontWeight: 500,
                              fontSize: '14px',
                              color: 'rgba(255,255,255,0.45)',
                            }}
                          >
                            ← Retour
                          </button>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={status === 'loading'}
                            style={{
                              height: '50px',
                              borderRadius: '12px',
                              border: 'none',
                              cursor: status === 'loading' ? 'wait' : 'pointer',
                              background:
                                status === 'loading' ? 'rgba(123,47,255,0.4)' : 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                              fontFamily: 'Syne,sans-serif',
                              fontWeight: 700,
                              fontSize: '15px',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              boxShadow: '0 8px 28px rgba(123,47,255,0.4)',
                              transition: 'all 250ms',
                            }}
                          >
                            {status === 'loading' ? (
                              <>
                                <span
                                  style={{
                                    width: '15px',
                                    height: '15px',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: 'white',
                                    animation: 'spin .7s linear infinite',
                                    display: 'inline-block',
                                  }}
                                />
                                Envoi...
                              </>
                            ) : (
                              'Envoyer ma demande ✓'
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          main > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
