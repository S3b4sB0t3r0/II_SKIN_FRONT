import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/NavBar';
import Footer from '../components/Fotter';
import logo from '../image/logo2.png';

const NosotrosPage = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeValue, setActiveValue] = useState(0);
  const navigate = useNavigate();

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

  const timeline = [
    { year: '2020', title: 'El Comienzo', desc: 'Todo inicia en plena pandemia con un obsequio: una chaqueta rompevientos que no sabíamos cuántas maravillas traía consigo.', color: '#24CEA6' },
    { year: '2021', title: 'Enamorados del Proceso', desc: 'Nos enamoramos del detalle, la calidad y todo el proceso de confección. Comenzamos a buscar clientes y oportunidades de crecimiento.', color: '#E73538' },
    { year: '2022', title: 'Mercado Retail', desc: 'Nos enfocamos en el sector de prendas deportivas al por mayor, consolidando nuestra presencia en el mercado retail colombiano.', color: '#F731B5' },
    { year: '2023', title: 'Nueva Colección', desc: 'Expandimos el catálogo con leggings, camisetas y accesorios. La marca II SKIN empieza a ser reconocida por su diseño vanguardista.', color: '#4F8DCB' },
    { year: '2025', title: 'Tu Segunda Piel', desc: 'Hoy somos una compañía consolidada que viste a cientos de deportistas. Nuestra misión: ser tu segunda piel, sin límites.', color: '#EBE43C' },
  ];

  const values = [
    { icon: '⚡', title: 'Calidad', desc: 'Cada costura, cada tela, cada detalle es revisado con rigurosidad. No entregamos prendas que no usaríamos nosotros mismos.', accent: '#24CEA6' },
    { icon: '🎨', title: 'Diseño', desc: 'Somos una marca diferencial y a la vanguardia. La tipografía llamativa y los colores atrevidos nos hacen inconfundibles.', accent: '#E73538' },
    { icon: '💪', title: 'Pasión', desc: 'Empezamos por amor al proceso de confección. Esa misma pasión se mantiene hoy en cada prenda que fabricamos.', accent: '#F731B5' },
    { icon: '🌿', title: 'Crecimiento', desc: 'Nacimos pequeños, pensamos en grande. Cada cliente satisfecho es el motor que nos impulsa a seguir mejorando.', accent: '#4F8DCB' },
  ];

  const team = [
    {
      name: 'Edith Mayerli', role: 'Gerente General',
      desc: 'Fundadora y alma de II SKIN. La chaqueta que recibió como regalo cambió su vida y la de muchos deportistas colombianos.',
      initial: 'E', color: '#24CEA6',
    },
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
          HERO NOSOTROS
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: '85vh', background: '#1D1D1B',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 80,
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #24CEA6, #E73538)' }} />
        <div style={{
          position: 'absolute', right: '8%', bottom: '10%',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(36,206,166,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* LEFT */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(36,206,166,0.35)', borderRadius: 2,
                padding: '5px 14px', marginBottom: 32,
                background: 'rgba(36,206,166,0.08)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#24CEA6', display: 'inline-block', animation: 'blink 1.6s ease-in-out infinite' }} />
                <span style={{ color: '#24CEA6', fontSize: 11, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>
                  Nuestra Historia
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(3rem, 5.5vw, 5.2rem)', fontWeight: 900, color: '#fff',
                lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 28,
                fontFamily: "'Courier New', 'Red Thinker', monospace",
              }}>
                SOMOS<br />
                <span style={{ color: '#24CEA6' }}>II SKIN</span><br />
                SAS
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.8, maxWidth: 440, marginBottom: 40 }}>
                Una compañía que nació en pandemia, de un regalo inesperado,
                y se convirtió en la segunda piel de cientos de deportistas colombianos.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#historia" style={{
                  background: '#24CEA6', color: '#1D1D1B',
                  border: 'none', padding: '15px 34px', borderRadius: 2,
                  fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
                  cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
                }}>
                  Ver Historia
                </a>
                <a href="/Contacto" style={{
                  background: 'transparent', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.25)', padding: '15px 34px', borderRadius: 2,
                  fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase',
                  cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
                }}>
                  Contáctanos
                </a>
              </div>
            </div>

            {/* RIGHT — logo card */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(36,206,166,0.08))',
                border: '1px solid rgba(36,206,166,0.2)',
                borderRadius: 6, padding: '60px 50px',
                backdropFilter: 'blur(20px)',
                position: 'relative', overflow: 'hidden',
                textAlign: 'center',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E73538 40%, #24CEA6)' }} />
                <div style={{
                  position: 'absolute', bottom: -20, right: 10,
                  color: 'rgba(36,206,166,0.04)', fontSize: 220, fontWeight: 900,
                  fontFamily: 'monospace', lineHeight: 1, userSelect: 'none',
                }}>II</div>

                {/* ── Logo imagen ── */}
                <img
                  src={logo}
                  alt="II SKIN Logo"
                  style={{ height: 120, width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                />

                <div style={{ marginTop: 28, position: 'relative', zIndex: 1 }}>
                  <p style={{ color: '#24CEA6', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 6 }}>
                    Tu Segunda Piel
                  </p>
                  <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 900, fontFamily: 'monospace', letterSpacing: 3 }}>
                    DESDE 2020
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 8, letterSpacing: 1 }}>
                    COLOMBIA · RETAIL · MAYORISTA
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 28 }}>
                  {colorPalette.map(c => (
                    <div key={c.hex} style={{
                      width: 18, height: 18, borderRadius: '50%', background: c.hex,
                      border: '2px solid rgba(255,255,255,0.25)',
                    }} title={c.name} />
                  ))}
                </div>
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
          {Array(6).fill(['⚡ Nacidos en pandemia', '🎽 Ropa Deportiva de Calidad', '💪 Tu Segunda Piel', '🇨🇴 Hecho en Colombia', '🤝 Pasión por el Deporte', '🚀 Desde 2020']).flat().map((t, i) => (
            <span key={i} style={{ color: '#1D1D1B', fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', paddingRight: 56 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ¿QUIÉNES SOMOS?
      ══════════════════════════════════════ */}
      <section id="quienes" data-fade-in style={{ padding: '100px 2rem', background: '#fff', ...fade('quienes') }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            <div style={{ background: '#1D1D1B', borderRadius: 4, padding: '52px 44px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #24CEA6 50%, #E73538)' }} />
              <div style={{
                position: 'absolute', bottom: -30, right: -10,
                color: 'rgba(36,206,166,0.05)', fontSize: 200, fontWeight: 900,
                fontFamily: 'monospace', lineHeight: 1, userSelect: 'none',
              }}>II</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ color: '#24CEA6', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>¿Quiénes somos?</p>
                <div style={{ color: '#fff', fontSize: 38, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1.1, marginBottom: 24 }}>
                  UNA MARCA<br /><span style={{ color: '#24CEA6' }}>QUE VISTE</span><br />CAMPEONES
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontSize: 14, marginBottom: 32 }}>
                  Somos II SKIN SAS, una compañía que comenzó su emprendimiento en plena pandemia 2020 y hoy viste a cientos de deportistas en Colombia.
                </p>
                <div style={{ display: 'flex', gap: 32, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  {[['500+', 'Clientes'], ['100%', 'Calidad'], ['2020', 'Fundación']].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ color: '#24CEA6', fontSize: 22, fontWeight: 900, fontFamily: 'monospace' }}>{n}</div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>— Nuestra Esencia</p>
              <h2 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 22, fontFamily: "'Courier New', monospace" }}>
                NACIÓ DEL<br /><span style={{ color: '#24CEA6' }}>CORAZÓN</span>
              </h2>
              <p style={{ color: '#626161', lineHeight: 1.9, fontSize: 15, marginBottom: 18 }}>
                Esta historia inicia con un obsequio — una chaqueta rompevientos que no sabíamos cuántas maravillas y oportunidades traía consigo. Lo que empezó como una búsqueda de ingresos extras, se convirtió en una pasión por el detalle y la calidad.
              </p>
              <p style={{ color: '#626161', lineHeight: 1.9, fontSize: 15, marginBottom: 36 }}>
                Desde ese instante nos enfocamos en el mercado retail de prendas deportivas al por mayor, construyendo una marca diferencial, llamativa y fuera de lo convencional.
                <strong style={{ color: '#1D1D1B' }}> II SKIN es tu segunda piel.</strong>
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
          TIMELINE
      ══════════════════════════════════════ */}
      <section id="historia" data-fade-in style={{ padding: '100px 2rem', background: '#f5f5f3', ...fade('historia') }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>— Línea de Tiempo</p>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 900, fontFamily: "'Courier New', monospace" }}>
              NUESTRA <span style={{ color: '#24CEA6' }}>HISTORIA</span>
            </h2>
          </div>

          <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 2, background: 'linear-gradient(to bottom, #24CEA6, #E73538, #F731B5, #4F8DCB, #EBE43C)',
              transform: 'translateX(-50%)',
            }} />

            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 0, marginBottom: 48, alignItems: 'center' }}>
                {i % 2 === 0 ? (
                  <>
                    <div style={{ background: '#fff', borderRadius: 4, padding: '28px 32px', border: `1px solid ${item.color}22`, borderLeft: `4px solid ${item.color}`, textAlign: 'right' }}>
                      <div style={{ color: item.color, fontSize: 11, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>{item.year}</div>
                      <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 10, fontFamily: 'monospace' }}>{item.title}</h3>
                      <p style={{ color: '#626161', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.color, border: '4px solid #f5f5f3', boxShadow: `0 0 0 2px ${item.color}`, zIndex: 1 }} />
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.color, border: '4px solid #f5f5f3', boxShadow: `0 0 0 2px ${item.color}`, zIndex: 1 }} />
                    </div>
                    <div style={{ background: '#fff', borderRadius: 4, padding: '28px 32px', border: `1px solid ${item.color}22`, borderRight: `4px solid ${item.color}` }}>
                      <div style={{ color: item.color, fontSize: 11, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>{item.year}</div>
                      <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 10, fontFamily: 'monospace' }}>{item.title}</h3>
                      <p style={{ color: '#626161', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VALORES
      ══════════════════════════════════════ */}
      <section id="valores" data-fade-in style={{ padding: '100px 2rem', background: '#fff', ...fade('valores') }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>— Lo Que Nos Define</p>
              <h2 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 36, fontFamily: "'Courier New', monospace" }}>
                NUESTROS<br /><span style={{ color: '#24CEA6' }}>VALORES</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {values.map((val, i) => (
                  <div key={i} onClick={() => setActiveValue(i)} style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px',
                    borderRadius: 4, cursor: 'pointer',
                    background: activeValue === i ? '#1D1D1B' : '#f6f6f4',
                    border: `1px solid ${activeValue === i ? '#1D1D1B' : '#e8e8e6'}`,
                    transition: 'all 0.25s ease',
                  }}>
                    <span style={{ fontSize: 24 }}>{val.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: activeValue === i ? val.accent : '#1D1D1B' }}>{val.title}</div>
                    </div>
                    {activeValue === i && <span style={{ color: val.accent, fontSize: 18 }}>→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: '#1D1D1B', borderRadius: 4, padding: '52px 44px',
              position: 'relative', overflow: 'hidden', minHeight: 340,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${values[activeValue].accent}, #1D1D1B)` }} />
              <div style={{
                position: 'absolute', bottom: -30, right: -10,
                color: `${values[activeValue].accent}08`, fontSize: 180, fontWeight: 900,
                fontFamily: 'monospace', lineHeight: 1, userSelect: 'none', transition: 'color 0.3s ease',
              }}>{values[activeValue].icon}</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>{values[activeValue].icon}</div>
                <h3 style={{ color: values[activeValue].accent, fontSize: 32, fontWeight: 900, fontFamily: 'monospace', letterSpacing: 2, marginBottom: 16, transition: 'color 0.3s ease' }}>
                  {values[activeValue].title.toUpperCase()}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: 15 }}>{values[activeValue].desc}</p>
              </div>
            </div>
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
            {[
              { value: '2020', label: 'Año de fundación' },
              { value: '500+', label: 'Clientes satisfechos' },
              { value: '100%', label: 'Calidad garantizada' },
              { value: '2da',  label: 'Tu segunda piel' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 900, color: '#24CEA6', fontFamily: 'monospace', lineHeight: 1 }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginTop: 10 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EQUIPO
      ══════════════════════════════════════ */}
      <section id="equipo" data-fade-in style={{ padding: '100px 2rem', background: '#f5f5f3', ...fade('equipo') }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#E73538', fontSize: 11, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>— Detrás de la Marca</p>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 900, fontFamily: "'Courier New', monospace" }}>
              NUESTRO <span style={{ color: '#24CEA6' }}>EQUIPO</span>
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {team.map((member, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 4, padding: '44px 48px',
                border: '1px solid #ebebea', position: 'relative', overflow: 'hidden',
                textAlign: 'center', maxWidth: 420, transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 56px rgba(36,206,166,0.14)'; e.currentTarget.style.borderColor = '#24CEA6'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#ebebea'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #24CEA6, #E73538)' }} />
                <div style={{
                  width: 90, height: 90, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1D1D1B, #24CEA6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: 34, fontWeight: 900, color: '#fff', fontFamily: 'monospace',
                }}>
                  {member.initial}
                </div>
                <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 6, fontFamily: 'monospace' }}>{member.name}</h3>
                <p style={{ color: '#24CEA6', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{member.role}</p>
                <p style={{ color: '#626161', fontSize: 14, lineHeight: 1.7 }}>{member.desc}</p>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f0f0ee' }}>
                  <a href="mailto:edithmayerliastudillorojas@gmail.com" style={{ color: '#1D1D1B', fontSize: 12, textDecoration: 'none', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                    edithmayerliastudillorojas@gmail.com
                  </a>
                  <a href="tel:+573108104914" style={{ color: '#626161', fontSize: 12, textDecoration: 'none' }}>+57 310 810 4914</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FINAL
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
          {/* ── Logo en CTA ── */}
          <img
            src={logo}
            alt="II SKIN Logo"
            style={{ height: 72, width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 900, color: '#fff',
            fontFamily: "'Courier New', monospace", lineHeight: 1.1, margin: '28px 0 18px',
          }}>
            ÚNETE A LA<br />FAMILIA II SKIN
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            Sé parte de nuestra historia. Prendas que se convierten en tu segunda piel.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.iiskin.com" style={{
              background: '#fff', color: '#E73538', padding: '15px 38px', borderRadius: 2,
              fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none',
            }}>Ver Colección</a>
            <a href="mailto:edithmayerliastudillorojas@gmail.com" style={{
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.55)', padding: '15px 38px', borderRadius: 2,
              fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none',
            }}>Escríbenos</a>
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

export default NosotrosPage;