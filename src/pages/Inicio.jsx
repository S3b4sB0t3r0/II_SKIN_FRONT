import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/NavBar';
import Footer from '../components/Fotter';
import logo from '../image/logo2.png';

const HomePage = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('[data-fade-in]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fade = (id) => ({
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    opacity: visibleSections.has(id) ? 1 : 0,
    transform: visibleSections.has(id) ? 'translateY(0)' : 'translateY(36px)',
  });

  const categories = [
    { label: 'Chaquetas Rompevientos', icon: '🧥', desc: 'Cortavientos técnicos de alto rendimiento — donde todo empezó.' },
    { label: 'Leggings & Mallas',       icon: '🩱', desc: 'Compresión y soporte para corredoras y atletas.' },
    { label: 'Camisetas & Tops',         icon: '👕', desc: 'Tejidos funcionales que respiran contigo.' },
    { label: 'Accesorios Deportivos',    icon: '🏃', desc: 'Gorras, medias y complementos de la marca.' },
  ];

  const features = [
    { icon: '⚡', title: 'Alto Rendimiento',   desc: 'Telas técnicas que se adaptan a cada movimiento y potencian tu desempeño.' },
    { icon: '🎨', title: 'Diseño Vanguardista', desc: 'Fuera de lo convencional. Prendas con identidad propia y estilo único.' },
    { icon: '🌿', title: 'Materiales Premium',  desc: 'Seleccionamos fibras de calidad que duran y se mantienen perfectas.' },
    { icon: '👥', title: 'Pensado para Todos',  desc: 'Colecciones para hombre y mujer. Tallas inclusivas y cortes funcionales.' },
    { icon: '📦', title: 'Mayor y Detal',       desc: 'Vendemos al por mayor para retail y también directamente al consumidor.' },
    { icon: '🤝', title: 'Hecho con Pasión',    desc: 'Cada costura lleva el sello de calidad y amor por el deporte colombiano.' },
  ];

  const stats = [
    { value: '2020', label: 'Año de nacimiento' },
    { value: '100%', label: 'Calidad garantizada' },
    { value: '500+', label: 'Clientes satisfechos' },
    { value: '2da',  label: 'Tu segunda piel' },
  ];

  const colorPalette = [
    { hex: '#24CEA6', name: 'Teal' },
    { hex: '#E73538', name: 'Rojo' },
    { hex: '#EBE43C', name: 'Amarillo' },
    { hex: '#F731B5', name: 'Rosa' },
    { hex: '#4F8DCB', name: 'Azul' },
    { hex: '#1D1D1B', name: 'Negro' },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif", color: '#1D1D1B', overflowX: 'hidden' }}>
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', background: '#1D1D1B',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 80,
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #E73538, #24CEA6)' }} />
        <div style={{
          position: 'absolute', right: '5%', top: '15%',
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(36,206,166,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* LEFT — copy */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(36,206,166,0.35)', borderRadius: 2,
                padding: '5px 14px', marginBottom: 32,
                background: 'rgba(36,206,166,0.08)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#24CEA6', display: 'inline-block', animation: 'blink 1.6s ease-in-out infinite' }} />
                <span style={{ color: '#24CEA6', fontSize: 11, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>
                  Nueva Colección 2025
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(3.2rem, 6vw, 5.8rem)', fontWeight: 900, color: '#fff',
                lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 28,
                fontFamily: "'Courier New', 'Red Thinker', monospace",
              }}>
                TU<br /><span style={{ color: '#24CEA6' }}>SEGUNDA</span><br />PIEL
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.8, maxWidth: 440, marginBottom: 40 }}>
                Ropa deportiva de alto rendimiento confeccionada con pasión.
                Diseñada para quienes viven en movimiento — sin límites.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
                <button onClick={() => navigate("/coleccion")} style={{
                  background: '#24CEA6', color: '#1D1D1B', border: 'none',
                  padding: '15px 34px', borderRadius: 2,
                  fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  Ver Colección
                </button>
                <button onClick={() => navigate("/Nosotros")} style={{
                  background: 'transparent', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.25)', padding: '15px 34px', borderRadius: 2,
                  fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  Nuestra Historia
                </button>
              </div>

              <div style={{ display: 'flex', gap: 36, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[['500+', 'Clientes'], ['100%', 'Calidad'], ['2020', 'Desde']].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ color: '#24CEA6', fontSize: 22, fontWeight: 900, fontFamily: 'monospace' }}>{n}</div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — product card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(36,206,166,0.06))',
                border: '1px solid rgba(36,206,166,0.2)',
                borderRadius: 6, padding: '44px 36px',
                backdropFilter: 'blur(20px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E73538 40%, #24CEA6)' }} />

                {/* ── Logo 1: Hero card ── */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
                  <img src={logo} alt="II SKIN Logo" style={{ height: 130, width: 'auto', objectFit: 'contain', display: 'block' }} />
                </div>

                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 6 }}>
                    Producto Destacado
                  </p>
                  <h3 style={{ color: '#fff', fontSize: 24, fontWeight: 900, fontFamily: 'monospace', letterSpacing: 2 }}>
                    CHAQUETA ROMPEVIENTOS
                  </h3>
                  <p style={{ color: '#24CEA6', fontSize: 13, marginTop: 6, opacity: 0.85 }}>Vivir al Máximo — Julio 2025</p>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
                  {['Hombre', 'Mujer', 'Unisex'].map(t => (
                    <span key={t} style={{
                      background: 'rgba(36,206,166,0.1)', border: '1px solid rgba(36,206,166,0.3)',
                      color: '#24CEA6', padding: '4px 12px', borderRadius: 2,
                      fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button style={{
                    background: '#E73538', color: '#fff', border: 'none',
                    padding: '11px 24px', borderRadius: 2,
                    fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
                  }}>
                    Pregunta por Saldos 30% OFF
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
                  {colorPalette.map(c => (
                    <div key={c.hex} style={{
                      width: 18, height: 18, borderRadius: '50%', background: c.hex,
                      border: '2px solid rgba(255,255,255,0.25)', cursor: 'pointer',
                    }} title={c.name} />
                  ))}
                </div>
              </div>

              <div style={{
                position: 'absolute', top: -18, right: -18,
                width: 76, height: 76, borderRadius: '50%', background: '#E73538',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 28px rgba(231,53,56,0.45)',
              }}>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>30%</span>
                <span style={{ color: '#fff', fontSize: 8, letterSpacing: 1, opacity: 0.85 }}>OFF</span>
              </div>
            </div>

          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Scroll</p>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #24CEA6, transparent)', margin: '0 auto', animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          TICKER
      ══════════════════════════════════════ */}
      <div style={{ background: '#24CEA6', overflow: 'hidden', padding: '11px 0' }}>
        <div style={{ display: 'flex', animation: 'ticker 22s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(6).fill(['⚡ Nueva Colección 2025', '🚀 Envíos a todo Colombia', '🎽 Ropa Deportiva Premium', '💪 Tu Segunda Piel', '🛒 Mayor y Detal', '🔥 Saldos 30% OFF']).flat().map((t, i) => (
            <span key={i} style={{ color: '#1D1D1B', fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', paddingRight: 56 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          CATEGORÍAS
      ══════════════════════════════════════ */}
      <section id="categories" data-fade-in style={{ padding: '100px 2rem', background: '#fff', ...fade('categories') }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            <div>
              <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>— Nuestras Categorías</p>
              <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, fontFamily: "'Courier New', monospace" }}>
                PRENDAS PARA<br /><span style={{ color: '#24CEA6' }}>CADA DEPORTE</span>
              </h2>
              <p style={{ color: '#626161', fontSize: 15, lineHeight: 1.8, maxWidth: 400, marginBottom: 36 }}>
                Desde chaquetas rompevientos hasta leggings de compresión — todo lo que necesitas para rendir al máximo.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {categories.map((cat, i) => (
                  <div key={i} onClick={() => setActiveCategory(i)} style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '15px 20px',
                    borderRadius: 4, cursor: 'pointer',
                    background: activeCategory === i ? '#1D1D1B' : '#f6f6f4',
                    border: `1px solid ${activeCategory === i ? '#1D1D1B' : '#e8e8e6'}`,
                    transition: 'all 0.25s ease',
                  }}>
                    <span style={{ fontSize: 22 }}>{cat.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: activeCategory === i ? '#24CEA6' : '#1D1D1B' }}>{cat.label}</div>
                      <div style={{ fontSize: 12, color: activeCategory === i ? 'rgba(255,255,255,0.5)' : '#626161', marginTop: 2 }}>{cat.desc}</div>
                    </div>
                    {activeCategory === i && <span style={{ color: '#24CEA6', fontSize: 18 }}>→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(135deg, #1D1D1B 55%, #24CEA6 100%)',
                borderRadius: 4, padding: '60px 40px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minHeight: 460, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.05,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cline x1='30' y1='5' x2='30' y2='30' stroke='white' strokeWidth='3' strokeLinecap='round'/%3E%3Cline x1='30' y1='30' x2='8' y2='50' stroke='white' strokeWidth='3' strokeLinecap='round'/%3E%3Cline x1='30' y1='30' x2='52' y2='50' stroke='white' strokeWidth='3' strokeLinecap='round'/%3E%3C/svg%3E")`,
                }} />

                {/* ── Logo 2: Categorías card ── */}
                <img src={logo} alt="II SKIN Logo" style={{ height: 100, width: 'auto', objectFit: 'contain', display: 'block' }} />

                <div style={{ textAlign: 'center', marginTop: 28 }}>
                  <p style={{ color: '#24CEA6', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 6 }}>
                    {categories[activeCategory].label}
                  </p>
                  <h3 style={{ color: '#fff', fontSize: 30, fontWeight: 900, fontFamily: 'monospace' }}>II SKIN</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 8 }}>{categories[activeCategory].desc}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
                  {colorPalette.map(c => (
                    <div key={c.hex} style={{ width: 22, height: 22, borderRadius: '50%', background: c.hex, border: '2px solid rgba(255,255,255,0.3)' }} />
                  ))}
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: -13, left: '50%', transform: 'translateX(-50%)',
                background: '#E73538', padding: '7px 20px', borderRadius: 2,
                color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 2, whiteSpace: 'nowrap',
              }}>
                WWW.IISKIN.COM
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════ */}
      <section id="features" data-fade-in style={{ padding: '100px 2rem', background: '#f5f5f3', ...fade('features') }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>— Por Qué Elegirnos</p>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 900, fontFamily: "'Courier New', monospace" }}>
              LA DIFERENCIA <span style={{ color: '#24CEA6' }}>II SKIN</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 4, padding: '36px 32px',
                border: '1px solid #ebebea', position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 56px rgba(36,206,166,0.14)'; e.currentTarget.style.borderColor = '#24CEA6'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#ebebea'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #24CEA6, #E73538)' }} />
                <div style={{ fontSize: 34, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 10, color: '#1D1D1B' }}>{f.title}</h3>
                <p style={{ color: '#626161', lineHeight: 1.7, fontSize: 14 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════ */}
      <section id="stats" data-fade-in style={{ padding: '80px 2rem', background: '#1D1D1B', position: 'relative', overflow: 'hidden', ...fade('stats') }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 900, color: '#24CEA6', fontFamily: 'monospace', lineHeight: 1 }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginTop: 10 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NUESTRA HISTORIA
      ══════════════════════════════════════ */}
      <section id="story" data-fade-in style={{ padding: '100px 2rem', background: '#fff', ...fade('story') }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ background: '#1D1D1B', borderRadius: 4, padding: '52px 44px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #24CEA6 50%, #E73538)' }} />
              <div style={{ position: 'absolute', bottom: -30, right: -10, color: 'rgba(36,206,166,0.05)', fontSize: 200, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1, userSelect: 'none' }}>II</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ color: '#24CEA6', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>Nuestra Historia</p>
                <div style={{ color: '#fff', fontSize: 42, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1, marginBottom: 24 }}>DESDE<br />2020</div>
                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 14, marginBottom: 28 }}>
                  Todo comenzó con una chaqueta rompevientos. Una historia de pasión, detalle y amor por la confección deportiva.
                </p>
                {['Emprendimiento nacido en pandemia', 'Enamorados del detalle y la calidad', 'Crecimiento en retail deportivo'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#24CEA6', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>— Quiénes Somos</p>
              <h2 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 22, fontFamily: "'Courier New', monospace" }}>
                NACIÓ DEL<br /><span style={{ color: '#24CEA6' }}>CORAZÓN</span>
              </h2>
              <p style={{ color: '#626161', lineHeight: 1.9, fontSize: 15, marginBottom: 18 }}>
                Somos <strong style={{ color: '#1D1D1B' }}>II SKIN SAS</strong>, una compañía que comenzó su emprendimiento en plena pandemia 2020. Esta historia inicia con un obsequio — una chaqueta que no sabíamos cuántas maravillas traía consigo.
              </p>
              <p style={{ color: '#626161', lineHeight: 1.9, fontSize: 15, marginBottom: 36 }}>
                Comenzamos con la confección de una chaqueta rompevientos buscando ingresos extras, pero nos enamoramos del detalle, la calidad y todo el proceso de confección. Desde ese instante nos enfocamos en el mercado retail de prendas deportivas al por mayor.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[{ t: 'Calidad', s: 'En cada costura' }, { t: 'Diseño', s: 'Vanguardista' }, { t: 'Pasión', s: 'Por el deporte' }, { t: 'Detalle', s: 'En todo momento' }].map((v) => (
                  <div key={v.t} style={{ padding: '18px', background: '#f5f5f3', borderRadius: 4, borderLeft: '3px solid #24CEA6' }}>
                    <div style={{ fontWeight: 800, color: '#1D1D1B', fontSize: 15 }}>{v.t}</div>
                    <div style={{ color: '#626161', fontSize: 12, marginTop: 3 }}>{v.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section style={{
        padding: '100px 2rem',
        background: 'linear-gradient(135deg, #E73538 0%, #b82022 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='white' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='white' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='white' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          {/* ── Logo 3: CTA ── */}
          <img src={logo} alt="II SKIN Logo" style={{ height: 72, width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 900, color: '#fff',
            fontFamily: "'Courier New', monospace", lineHeight: 1.1, margin: '28px 0 18px',
          }}>
            VÍSTETE PARA<br />CONQUISTAR
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            Sé parte de la familia II SKIN. Prendas que se convierten en tu segunda piel.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.iiskin.com" style={{
              background: '#fff', color: '#E73538', padding: '15px 38px', borderRadius: 2,
              fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none',
            }}>Ver Tienda</a>
            <a href="mailto:edithmayerliastudillorojas@gmail.com" style={{
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.55)', padding: '15px 38px', borderRadius: 2,
              fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none',
            }}>Contáctanos</a>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes blink  { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes pulse  { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; }
        a { text-decoration: none; }
      `}</style>
    </div>
  );
};

export default HomePage;