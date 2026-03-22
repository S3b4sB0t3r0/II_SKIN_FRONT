import React, { useState, useEffect } from 'react';
import Header from '../components/NavBar';
import Footer from '../components/Fotter';
import logo from '../image/logo2.png';
import API_URL from '../config/config';

const ContactPage = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('[data-fade-in]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFeedbackMessage({ type: 'error', text: 'Por favor completa los campos Nombre, Email y Mensaje.' });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/proyectos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setFeedbackMessage({ type: 'success', text: data.message || 'Formulario enviado con éxito' });
        setFormData({ name: '', email: '', company: '', phone: '', projectType: '', message: '' });
      } else {
        setFeedbackMessage({ type: 'error', text: data.error || 'Error al enviar el formulario' });
      }
    } catch (error) {
      setFeedbackMessage({ type: 'error', text: 'Error al enviar el formulario. Intenta más tarde.' });
      console.error(error);
    }
  };

  useEffect(() => {
    if (feedbackMessage) {
      const timeout = setTimeout(() => setFeedbackMessage(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [feedbackMessage]);

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 2,
    color: '#fff',
    fontSize: 13,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    boxSizing: 'border-box',
  };

  const fade = (id) => ({
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    opacity: visibleSections.has(id) ? 1 : 0,
    transform: visibleSections.has(id) ? 'translateY(0)' : 'translateY(32px)',
  });

  const contactMethods = [
    { icon: '📧', label: 'Email',     value: 'edithmayerliastudillorojas@gmail.com' },
    { icon: '📱', label: 'WhatsApp',  value: '+57 310 810 4914' },
    { icon: '📍', label: 'Ubicación', value: 'Colombia' },
    { icon: '🌐', label: 'Web',       value: 'www.iiskin.com' },
  ];

  const reasons = [
    { icon: '⚡', title: 'Calidad Garantizada',   desc: 'Cada prenda pasa por un riguroso control de calidad antes de llegar a tus manos.' },
    { icon: '🎨', title: 'Diseño Exclusivo',       desc: 'Colecciones únicas pensadas para destacar en cada entreno o competencia.' },
    { icon: '🤝', title: 'Atención Personalizada', desc: 'Te acompañamos en todo el proceso, desde la elección hasta la entrega.' },
  ];

  const responseTimes = [
    { time: '< 2 horas',  label: 'Consultas Generales',    icon: '💬' },
    { time: '< 30 min',   label: 'Soporte de Pedidos',     icon: '📦' },
    { time: '< 24 horas', label: 'Cotizaciones Mayoristas', icon: '📋' },
  ];

  const selectOptions = [
    { value: '',              label: 'Tipo de consulta' },
    { value: 'mayorista',     label: 'Venta Mayorista' },
    { value: 'detal',         label: 'Venta al Detal' },
    { value: 'personalizacion', label: 'Personalización' },
    { value: 'otro',          label: 'Otro' },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif", color: '#1D1D1B', overflowX: 'hidden', minHeight: '100vh' }}>
      <Header />

      {/* ══════════════════════════════════════
          HERO / CONTACT
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        background: '#1D1D1B',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}>
        {/* Isotipo pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />

        {/* Left brand bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #E73538, #24CEA6)' }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', right: '5%', top: '15%',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(36,206,166,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 2rem', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* LEFT — info */}
            <div>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(36,206,166,0.35)', borderRadius: 2,
                padding: '5px 14px', marginBottom: 32,
                background: 'rgba(36,206,166,0.08)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#24CEA6', display: 'inline-block' }} />
                <span style={{ color: '#24CEA6', fontSize: 11, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>
                  Hablemos
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                fontWeight: 900, color: '#fff',
                lineHeight: 1.0, letterSpacing: '-0.03em',
                marginBottom: 24,
                fontFamily: "'Courier New', monospace",
              }}>
                ¿LISTA PARA<br />
                <span style={{ color: '#24CEA6' }}>TU SEGUNDA</span><br />
                PIEL?
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.85, maxWidth: 420, marginBottom: 44 }}>
                Contáctanos y descubre nuestra colección de ropa deportiva de alto rendimiento.
                Vendemos al por mayor y al detal en todo Colombia.
              </p>

              {/* Contact methods */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {contactMethods.map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 46, height: 46, flexShrink: 0, borderRadius: 2,
                      background: 'rgba(36,206,166,0.1)',
                      border: '1px solid rgba(36,206,166,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ color: '#24CEA6', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>
                        {label}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social row */}
              <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
                {['📸', '📘', '🐦'].map((icon, i) => (
                  <div key={i} style={{
                    width: 38, height: 38, borderRadius: 2,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, cursor: 'pointer',
                  }}>{icon}</div>
                ))}
              </div>
            </div>

            {/* RIGHT — form */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(36,206,166,0.2)',
                borderRadius: 4,
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
              }}>
                {/* Form top bar */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, #E73538 30%, #24CEA6)' }} />

                <div style={{ padding: '36px 32px' }}>
                  {/* Form header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                    <img
                      src={logo}
                      alt="II SKIN Logo"
                      style={{ height: 36, width: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }}
                    />
                    <div>
                      <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 18, fontFamily: 'monospace', letterSpacing: 1 }}>
                        SOLICITAR INFORMACIÓN
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>
                        Te respondemos en menos de 2 horas
                      </p>
                    </div>
                  </div>

                  {/* Feedback message */}
                  {feedbackMessage && (
                    <div style={{
                      marginBottom: 20, padding: '12px 16px', borderRadius: 2,
                      background: feedbackMessage.type === 'success'
                        ? 'rgba(36,206,166,0.12)' : 'rgba(231,53,56,0.12)',
                      border: `1px solid ${feedbackMessage.type === 'success' ? 'rgba(36,206,166,0.4)' : 'rgba(231,53,56,0.4)'}`,
                      color: feedbackMessage.type === 'success' ? '#24CEA6' : '#E73538',
                      fontSize: 13, fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span>{feedbackMessage.type === 'success' ? '✅' : '⚠️'}</span>
                      {feedbackMessage.text}
                    </div>
                  )}

                  {/* Form fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                    {/* Row 1 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input
                        type="text" name="name" placeholder="Nombre completo"
                        value={formData.name} onChange={handleInputChange}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                      />
                      <input
                        type="email" name="email" placeholder="Email"
                        value={formData.email} onChange={handleInputChange}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                      />
                    </div>

                    {/* Row 2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input
                        type="text" name="company" placeholder="Empresa / Tienda"
                        value={formData.company} onChange={handleInputChange}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                      />
                      <input
                        type="tel" name="phone" placeholder="Teléfono / WhatsApp"
                        value={formData.phone} onChange={handleInputChange}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                      />
                    </div>

                    {/* Select */}
                    <select
                      name="projectType" value={formData.projectType} onChange={handleInputChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                    >
                      {selectOptions.map(opt => (
                        <option key={opt.value} value={opt.value} style={{ background: '#1D1D1B', color: '#fff' }}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {/* Textarea */}
                    <textarea
                      name="message" placeholder="Cuéntanos qué necesitas..." rows={4}
                      value={formData.message} onChange={handleInputChange}
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
                      onFocus={e => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                    />

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      style={{
                        width: '100%', background: '#24CEA6', color: '#1D1D1B',
                        border: 'none', padding: '14px', borderRadius: 2,
                        fontSize: 13, fontWeight: 800, letterSpacing: 3,
                        textTransform: 'uppercase', cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#1ab892'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#24CEA6'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      Enviar Mensaje →
                    </button>

                    <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, textAlign: 'center', letterSpacing: 0.5 }}>
                      Respondemos en menos de 2 horas · www.iiskin.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ¿POR QUÉ ELEGIRNOS?
      ══════════════════════════════════════ */}
      <section
        id="why-choose"
        data-fade-in
        style={{ padding: '100px 2rem', background: '#f5f5f3', ...fade('why-choose') }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>
              — Por Qué II SKIN
            </p>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 900,
              fontFamily: "'Courier New', monospace", color: '#1D1D1B',
            }}>
              LA DIFERENCIA <span style={{ color: '#24CEA6' }}>II SKIN</span>
            </h2>
            <p style={{ color: '#626161', fontSize: 16, maxWidth: 560, margin: '16px auto 0', lineHeight: 1.7 }}>
              Nos especializamos en prendas deportivas de calidad premium con diseño vanguardista y confección artesanal colombiana.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {reasons.map((r, i) => (
              <div
                key={i}
                style={{
                  background: '#fff', borderRadius: 4, padding: '44px 32px',
                  border: '1px solid #ebebea', position: 'relative', overflow: 'hidden',
                  textAlign: 'center', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 56px rgba(36,206,166,0.13)';
                  e.currentTarget.style.borderColor = '#24CEA6';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#ebebea';
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #24CEA6, #E73538)' }} />
                <div style={{
                  width: 70, height: 70, margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, rgba(36,206,166,0.1), rgba(36,206,166,0.05))',
                  border: '1px solid rgba(36,206,166,0.2)',
                  borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28,
                }}>
                  {r.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: '#1D1D1B', marginBottom: 12 }}>{r.title}</h3>
                <p style={{ color: '#626161', lineHeight: 1.75, fontSize: 14 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TIEMPOS DE RESPUESTA
      ══════════════════════════════════════ */}
      <section
        id="response-time"
        data-fade-in
        style={{
          padding: '88px 2rem',
          background: '#1D1D1B',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          ...fade('response-time'),
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>
            — Compromiso II SKIN
          </p>
          <h2 style={{
            color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900, fontFamily: "'Courier New', monospace",
            marginBottom: 14,
          }}>
            TIEMPO DE RESPUESTA <span style={{ color: '#24CEA6' }}>GARANTIZADO</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 56, lineHeight: 1.7 }}>
            Nos comprometemos a atender todas tus consultas con rapidez y dedicación.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {responseTimes.map(({ time, label, icon }, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(36,206,166,0.15)',
                  borderRadius: 4, padding: '36px 24px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(36,206,166,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(36,206,166,0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(36,206,166,0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 56, height: 56, margin: '0 auto 20px',
                  background: 'rgba(36,206,166,0.1)',
                  border: '1px solid rgba(36,206,166,0.25)',
                  borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {icon}
                </div>
                <div style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900,
                  color: '#24CEA6', fontFamily: 'monospace', marginBottom: 8,
                }}>
                  {time}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: 0.5 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
        select option { background: #1D1D1B; color: #fff; }
      `}</style>
    </div>
  );
};

export default ContactPage;