import React, { useState } from 'react';
import logo from '../image/logo2.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    if (email) {
      alert('¡Gracias por suscribirte! Te contactaremos pronto.');
      setEmail('');
    }
  };

  const contactInfo = [
    { icon: '📧', text: 'edithmayerliastudillorojas@gmail.com' },
    { icon: '📞', text: '+57 310 810 4914' },
    { icon: '📍', text: 'Colombia' },
    { icon: '🌐', text: 'www.iiskin.com' },
  ];

  const legalLinks = ['Términos de Servicio', 'Política de Privacidad', 'Cookies', 'Seguridad'];

  const quickLinks = [
    { label: 'Inicio',    to: '/' },
    { label: 'Colección', to: '/Servicios' },
    { label: 'Nosotros',  to: '/Proyectos' },
    { label: 'Contacto',  to: '/Contacto' },
  ];

  const socialLinks = [
    { icon: '📸', label: 'Instagram' },
    { icon: '📘', label: 'Facebook' },
    { icon: '🐦', label: 'Twitter' },
  ];

  return (
    <footer style={{
      position: 'relative',
      background: '#111110',
      color: '#fff',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif",
    }}>

      {/* ── Brand color top border ── */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #E73538 0%, #24CEA6 50%, #E73538 100%)' }} />

      {/* ── Background pattern ── */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='footergrid' width='20' height='20' patternUnits='userSpaceOnUse'><path d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(255,255,255,0.015)' stroke-width='1'/></pattern></defs><rect width='100' height='100' fill='url(%23footergrid)'/></svg>")`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '72px 2rem 0' }}>

        {/* ══ Main grid ══ */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.4fr', gap: '4rem', marginBottom: 56 }}>

          {/* ── Brand column ── */}
          <div style={{ maxWidth: 360 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img
                src={logo}
                alt="II SKIN Logo"
                style={{ height: 46, width: 'auto', objectFit: 'contain', display: 'block' }}
              />
              <span style={{
                color: '#fff', fontSize: 22, fontWeight: 900,
                fontFamily: "'Courier New', monospace", letterSpacing: 4,
              }}>II SKIN</span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.85, marginBottom: 28 }}>
              Tu segunda piel. Ropa deportiva de alto rendimiento confeccionada con pasión y detalle en Colombia.
              Diseñada para quienes viven en movimiento, sin límites.
            </p>

            {/* Slogan badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(36,206,166,0.3)',
              borderRadius: 2, padding: '7px 14px',
              background: 'rgba(36,206,166,0.07)',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#24CEA6' }} />
              <span style={{ color: '#24CEA6', fontSize: 10, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>
                Tu Segunda Piel
              </span>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
              {socialLinks.map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  style={{
                    width: 38, height: 38,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 2, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(36,206,166,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(36,206,166,0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── Quick links column ── */}
          <div>
            <h4 style={{
              color: '#24CEA6', fontSize: 10, letterSpacing: 3,
              fontWeight: 700, textTransform: 'uppercase', marginBottom: 22,
            }}>
              — Navegación
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <a
                    href={to}
                    style={{
                      color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                      fontSize: 13, fontWeight: 500, letterSpacing: 0.5,
                      transition: 'all 0.2s ease', display: 'inline-block',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.paddingLeft = '6px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h4 style={{
              color: '#24CEA6', fontSize: 10, letterSpacing: 3,
              fontWeight: 700, textTransform: 'uppercase', marginBottom: 22,
            }}>
              — Contacto
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {contactInfo.map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, flexShrink: 0, borderRadius: 2,
                    background: 'rgba(36,206,166,0.1)',
                    border: '1px solid rgba(36,206,166,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14,
                  }}>
                    {icon}
                  </div>
                  <span style={{
                    color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.5,
                    paddingTop: 8, wordBreak: 'break-word',
                  }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{
              background: 'rgba(36,206,166,0.06)',
              border: '1px solid rgba(36,206,166,0.15)',
              borderRadius: 4, padding: '18px',
            }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 12, letterSpacing: 0.5 }}>
                Suscríbete a nuestras novedades
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
                  placeholder="tu@email.com"
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 2, padding: '9px 12px',
                    color: '#fff', fontSize: 12, outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={handleNewsletterSubmit}
                  style={{
                    background: '#24CEA6', color: '#1D1D1B',
                    border: 'none', borderRadius: 2,
                    padding: '9px 14px', fontSize: 12,
                    fontWeight: 800, cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    letterSpacing: 1,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1ab892'}
                  onMouseLeave={e => e.currentTarget.style.background = '#24CEA6'}
                >
                  OK
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ══ Divider ══ */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

        {/* ══ Bottom bar ══ */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16, paddingBottom: 28,
        }}>
          <div style={{ color: 'rgba(255,255,255,0.22)', fontSize: 12 }}>
            © 2025 <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>II SKIN SAS</span>. Todos los derechos reservados.
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.22)', fontSize: 11,
                  textDecoration: 'none', letterSpacing: 0.5,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.22)'}
              >
                {item}
              </a>
            ))}
          </div>

          <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
            TU SEGUNDA PIEL
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;