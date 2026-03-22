import React, { useState, useEffect } from 'react';
import Header from '../components/NavBar';
import Footer from '../components/Fotter';
import API_URL from '../config/config';

// ─── Brand Colors ───
// #24CEA6  Teal  |  #E73538  Red  |  #EBE43C  Yellow
// #F731B5  Pink  |  #4F8DCB  Blue  |  #626161  Gray
// #1D1D1B  Black |  #FFFFFF  White

const IISkinLogo = ({ size = 40, mainColor = '#1D1D1B', accentColor = '#626161' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="50" y1="8"  x2="50" y2="52" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
    <line x1="50" y1="52" x2="12" y2="88" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
    <line x1="50" y1="52" x2="88" y2="88" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
    <line x1="42" y1="16" x2="42" y2="57" stroke={mainColor} strokeWidth="7" strokeLinecap="round"/>
    <line x1="42" y1="57" x2="6"  y2="91" stroke={mainColor} strokeWidth="7" strokeLinecap="round"/>
    <line x1="42" y1="57" x2="78" y2="91" stroke={mainColor} strokeWidth="7" strokeLinecap="round"/>
  </svg>
);

// ─── Placeholder product image rendered as SVG ───
const ProductImage = ({ category, colorHex, name, badge }) => {
  const safeHex = colorHex || '#1D1D1B';
  const shapes = {
    'Chaquetas': (
      <g>
        <path d="M30 45 L20 35 L10 40 L15 75 L35 75 L35 45 Z" fill={safeHex} opacity="0.9"/>
        <path d="M70 45 L80 35 L90 40 L85 75 L65 75 L65 45 Z" fill={safeHex} opacity="0.9"/>
        <path d="M30 45 L35 30 L50 25 L65 30 L70 45 L65 75 L35 75 Z" fill={safeHex}/>
        <path d="M35 30 L38 15 L50 12 L62 15 L65 30 L50 25 Z" fill={safeHex} opacity="0.85"/>
        <line x1="50" y1="25" x2="50" y2="75" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="18" y1="52" x2="28" y2="50" stroke="white" strokeWidth="1.5" opacity="0.5"/>
        <line x1="82" y1="52" x2="72" y2="50" stroke="white" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="50" cy="48" r="5" fill="white" opacity="0.3"/>
      </g>
    ),
    'Leggings': (
      <g>
        <rect x="28" y="22" width="44" height="10" rx="3" fill={safeHex} opacity="0.95"/>
        <path d="M28 32 L30 85 L45 85 L50 32 Z" fill={safeHex}/>
        <path d="M72 32 L70 85 L55 85 L50 32 Z" fill={safeHex}/>
        <line x1="38" y1="32" x2="36" y2="85" stroke="white" strokeWidth="1" opacity="0.3"/>
        <line x1="62" y1="32" x2="64" y2="85" stroke="white" strokeWidth="1" opacity="0.3"/>
        <path d="M28 32 L26 85 L30 85 L30 32 Z" fill="white" opacity="0.15"/>
        <path d="M72 32 L74 85 L70 85 L70 32 Z" fill="white" opacity="0.15"/>
      </g>
    ),
    'Camisetas': (
      <g>
        <path d="M25 40 L15 32 L25 28 L35 22 L50 26 L65 22 L75 28 L85 32 L75 40 L68 36 L68 80 L32 80 L32 36 Z" fill={safeHex}/>
        <path d="M35 22 L40 28 L50 26 L60 28 L65 22 L50 18 Z" fill={safeHex} opacity="0.7"/>
        <path d="M32 36 L28 80 L32 80 Z" fill="white" opacity="0.1"/>
        <path d="M68 36 L72 80 L68 80 Z" fill="white" opacity="0.1"/>
        <circle cx="50" cy="52" r="7" fill="white" opacity="0.2"/>
      </g>
    ),
    'Accesorios': (
      <g>
        <ellipse cx="50" cy="65" rx="38" ry="8" fill={safeHex} opacity="0.7"/>
        <path d="M15 62 Q15 25 50 20 Q85 25 85 62 Z" fill={safeHex}/>
        <circle cx="50" cy="21" r="4" fill={safeHex} opacity="0.8"/>
        <path d="M50 21 Q30 35 20 58" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
        <path d="M50 21 Q70 35 80 58" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
        <path d="M16 62 Q50 55 84 62" stroke="white" strokeWidth="2" fill="none" opacity="0.25"/>
      </g>
    ),
  };

  return (
    <div style={{ width: '100%', paddingTop: '118%', position: 'relative', background: `linear-gradient(145deg, ${safeHex}18, ${safeHex}08)` }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id={`grid-${safeHex.replace('#','')}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={safeHex} strokeWidth="0.2" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#grid-${safeHex.replace('#','')})`}/>
        {shapes[category] || shapes['Camisetas']}
        {badge && (
          <g>
            <circle cx="82" cy="18" r="12" fill="#E73538"/>
            <text x="82" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">{badge}</text>
            <text x="82" y="23" textAnchor="middle" fill="white" fontSize="5">OFF</text>
          </g>
        )}
      </svg>
      <div style={{ position: 'absolute', bottom: 10, right: 10, opacity: 0.07 }}>
        <IISkinLogo size={36} mainColor={safeHex} accentColor={safeHex} />
      </div>
    </div>
  );
};

// ─── CONSTANTS ───
const CATEGORIAS = ['Todos', 'Chaquetas', 'Leggings', 'Camisetas', 'Accesorios'];

const formatPrice = (price) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);

// ─── PRODUCT MODAL ───
const ProductModal = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product.colores[0]);
  const [selectedTalla, setSelectedTalla] = useState(product.tallas[0]);
  const [precioMode, setPrecioMode]       = useState('detal');
  const [tab, setTab]                     = useState('info');
  const [activeImg, setActiveImg]         = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const precio = precioMode === 'detal' ? product.precio_detal : product.precio_mayor;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px', animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 6, maxWidth: 960, width: '100%',
          maxHeight: '92vh', overflowY: 'auto',
          position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr',
          animation: 'slideUp 0.3s ease',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          width: 38, height: 38, borderRadius: '50%',
          background: '#1D1D1B', border: 'none', color: '#fff',
          fontSize: 18, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontWeight: 300, lineHeight: 1,
        }}>×</button>

        {/* LEFT — Image */}
        <div style={{ position: 'relative', background: `linear-gradient(145deg, ${selectedColor.hex}15, ${selectedColor.hex}05)` }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E73538, #24CEA6)' }} />
          {product.nuevo && (
            <div style={{
              position: 'absolute', top: 20, left: 20, zIndex: 2,
              background: '#24CEA6', color: '#1D1D1B',
              padding: '4px 12px', borderRadius: 2,
              fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
            }}>NUEVO</div>
          )}
          {product.badge && (
            <div style={{
              position: 'absolute', top: 20, left: product.nuevo ? 88 : 20, zIndex: 2,
              background: '#E73538', color: '#fff',
              padding: '4px 12px', borderRadius: 2,
              fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
            }}>{product.badge} OFF</div>
          )}

          {product.images && product.images.length > 0 ? (
            <div>
              <div style={{ width: '100%', paddingTop: '118%', position: 'relative', overflow: 'hidden' }}>
                <img src={product.images[activeImg]} alt={product.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
                />
              </div>
              {product.images.length > 1 && (
                <div style={{
                  display: 'flex', gap: 8, padding: '12px 16px',
                  background: 'rgba(255,255,255,0.95)', borderTop: '1px solid #f0f0ee', flexWrap: 'wrap',
                }}>
                  {product.images.map((src, idx) => (
                    <button key={idx} onClick={() => setActiveImg(idx)} style={{
                      width: 56, height: 56, padding: 0,
                      border: activeImg === idx ? '2px solid #24CEA6' : '2px solid transparent',
                      borderRadius: 4, overflow: 'hidden', cursor: 'pointer', background: 'none', flexShrink: 0,
                      outline: activeImg === idx ? '2px solid rgba(36,206,166,0.3)' : 'none',
                      outlineOffset: 2, transition: 'all 0.15s',
                    }}>
                      <img src={src} alt={`vista-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <ProductImage category={product.category} colorHex={selectedColor.hex} name={product.name} badge={product.badge} />
          )}

          <div style={{
            padding: '16px 20px', display: 'flex', gap: 8, flexWrap: 'wrap',
            background: 'rgba(255,255,255,0.9)', borderTop: '1px solid #f0f0ee',
          }}>
            {product.colores.map(c => (
              <button key={c.hex} onClick={() => setSelectedColor(c)} title={c.nombre} style={{
                width: 28, height: 28, borderRadius: '50%', background: c.hex,
                border: selectedColor.hex === c.hex ? '3px solid #1D1D1B' : '2px solid #e0e0e0',
                cursor: 'pointer', transition: 'all 0.15s ease',
                outline: selectedColor.hex === c.hex ? `2px solid ${c.hex}` : 'none',
                outlineOffset: 2,
                boxShadow: c.hex === '#F8F8F8' ? 'inset 0 0 0 1px #ccc' : 'none',
              }} />
            ))}
            <span style={{ color: '#626161', fontSize: 11, alignSelf: 'center', marginLeft: 6, letterSpacing: 1 }}>
              {selectedColor.nombre}
            </span>
          </div>
        </div>

        {/* RIGHT — Details */}
        <div style={{ padding: '36px 36px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <p style={{ color: '#E73538', fontSize: 10, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              {product.category} · {product.coleccion}
            </p>
            <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1.1, color: '#1D1D1B', marginBottom: 10 }}>
              {product.name}
            </h2>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {product.genero.map(g => (
                <span key={g} style={{
                  background: '#f5f5f3', border: '1px solid #e8e8e6',
                  color: '#626161', padding: '3px 10px', borderRadius: 2,
                  fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600,
                }}>{g}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: 0, marginBottom: 14, border: '1px solid #e8e8e6', borderRadius: 4, overflow: 'hidden', width: 'fit-content' }}>
              {['detal', 'mayor'].map(m => (
                <button key={m} onClick={() => setPrecioMode(m)} style={{
                  padding: '8px 18px', border: 'none', cursor: 'pointer',
                  background: precioMode === m ? '#1D1D1B' : '#fff',
                  color: precioMode === m ? '#24CEA6' : '#626161',
                  fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.2s',
                }}>
                  {m === 'detal' ? 'Al Detal' : 'Al Mayor'}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: '#1D1D1B', fontFamily: 'monospace' }}>
                {formatPrice(precio)}
              </span>
              {precioMode === 'mayor' && (
                <span style={{ fontSize: 12, color: '#24CEA6', fontWeight: 700 }}>Por unidad (min. 6 uds)</span>
              )}
            </div>
            {product.badge && (
              <p style={{ color: '#E73538', fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                ¡{product.badge} de descuento en saldos disponibles!
              </p>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #f0f0ee', marginBottom: 16 }}>
              {['info', 'tallas', 'material'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
                  color: tab === t ? '#1D1D1B' : '#999',
                  fontWeight: tab === t ? 800 : 500,
                  fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
                  borderBottom: tab === t ? '2px solid #24CEA6' : '2px solid transparent',
                  marginBottom: -2, transition: 'all 0.2s',
                }}>
                  {t === 'info' ? 'Descripción' : t === 'tallas' ? 'Tallas' : 'Material'}
                </button>
              ))}
            </div>

            {tab === 'info' && (
              <div>
                <p style={{ color: '#626161', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>{product.descripcion}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {product.caracteristicas.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#24CEA6', flexShrink: 0 }} />
                      <span style={{ color: '#1D1D1B', fontSize: 13 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'tallas' && (
              <div>
                <p style={{ color: '#626161', fontSize: 12, marginBottom: 14 }}>Selecciona tu talla:</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {product.tallas.map(t => (
                    <button key={t} onClick={() => setSelectedTalla(t)} style={{
                      padding: '8px 16px', borderRadius: 2, cursor: 'pointer',
                      border: selectedTalla === t ? '2px solid #1D1D1B' : '1px solid #e0e0e0',
                      background: selectedTalla === t ? '#1D1D1B' : '#fff',
                      color: selectedTalla === t ? '#24CEA6' : '#626161',
                      fontSize: 12, fontWeight: 700, letterSpacing: 1, transition: 'all 0.15s',
                    }}>{t}</button>
                  ))}
                </div>
                <div style={{ background: '#f5f5f3', padding: '12px 16px', borderRadius: 4, borderLeft: '3px solid #24CEA6' }}>
                  <p style={{ fontSize: 12, color: '#626161' }}>
                    ¿No sabes tu talla? Contáctanos por WhatsApp y te asesoramos personalmente.
                  </p>
                </div>
              </div>
            )}

            {tab === 'material' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Composición', value: product.material },
                  { label: 'Cuidado',     value: product.cuidado },
                  { label: 'Colección',   value: product.coleccion },
                ].map(({ label, value }) => (
                  <div key={label} style={{ borderBottom: '1px solid #f0f0ee', paddingBottom: 12 }}>
                    <p style={{ fontSize: 10, letterSpacing: 2, color: '#999', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                    <p style={{ fontSize: 14, color: '#1D1D1B', fontWeight: 500 }}>{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
            <a href="https://wa.me/573108104914" target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: '#1D1D1B', color: '#fff', padding: '14px 24px', borderRadius: 2,
              fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s',
            }}>📲 Pedir por WhatsApp</a>
            <a href="mailto:edithmayerliastudillorojas@gmail.com" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', color: '#1D1D1B',
              border: '1px solid #e0e0e0', padding: '12px 24px', borderRadius: 2,
              fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none',
            }}>Consultar por Email</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT CARD ───
const ProductCard = ({ product, onClick }) => {
  const [hovered, setHovered]     = useState(false);
  const [activeColor, setActiveColor] = useState(product.colores[0]);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 4, overflow: 'hidden',
        border: `1px solid ${hovered ? '#24CEA6' : '#ebebea'}`,
        cursor: 'pointer', position: 'relative',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 56px rgba(36,206,166,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 2,
        background: hovered ? 'linear-gradient(90deg, #24CEA6, #E73538)' : 'transparent',
        transition: 'background 0.3s',
      }} />

      <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 3, display: 'flex', gap: 6, flexDirection: 'column' }}>
        {product.nuevo && (
          <span style={{ background: '#24CEA6', color: '#1D1D1B', padding: '3px 8px', borderRadius: 2, fontSize: 8, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>NUEVO</span>
        )}
        {product.badge && (
          <span style={{ background: '#E73538', color: '#fff', padding: '3px 8px', borderRadius: 2, fontSize: 8, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>{product.badge} OFF</span>
        )}
        {product.destacado && (
          <span style={{ background: '#1D1D1B', color: '#24CEA6', padding: '3px 8px', borderRadius: 2, fontSize: 8, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>★ DESTACADO</span>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        {product.images && product.images.length > 0 ? (
          <div style={{ width: '100%', paddingTop: '118%', position: 'relative', overflow: 'hidden' }}>
            <img src={product.images[activeImg]} alt={product.name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
            />
            {product.images.length > 1 && (
              <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
                {product.images.map((_, idx) => (
                  <button key={idx} onClick={e => { e.stopPropagation(); setActiveImg(idx); }} style={{
                    width: activeImg === idx ? 20 : 7, height: 7, borderRadius: 4,
                    background: activeImg === idx ? '#24CEA6' : 'rgba(255,255,255,0.6)',
                    border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s ease',
                  }} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <ProductImage category={product.category} colorHex={activeColor?.hex} name={product.name} badge={product.badge} />
        )}

        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(29,29,27,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
        }}>
          <span style={{
            color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.6)', padding: '10px 20px', borderRadius: 2,
          }}>Ver Detalle →</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 6, alignItems: 'center' }}>
        {product.colores.map(c => (
          <button key={c.hex} title={c.nombre} onClick={e => { e.stopPropagation(); setActiveColor(c); }} style={{
            width: 16, height: 16, borderRadius: '50%', background: c.hex,
            border: activeColor.hex === c.hex ? '2px solid #1D1D1B' : '1px solid #e0e0e0',
            cursor: 'pointer', transition: 'all 0.15s',
            boxShadow: c.hex === '#F8F8F8' ? 'inset 0 0 0 1px #ccc' : 'none',
          }} />
        ))}
        {product.colores.length > 4 && (
          <span style={{ color: '#999', fontSize: 10, marginLeft: 2 }}>+{product.colores.length - 4}</span>
        )}
      </div>

      <div style={{ padding: '10px 16px 20px' }}>
        <p style={{ color: '#999', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
          {product.category}
        </p>
        <h3 style={{ fontWeight: 800, fontSize: 15, color: '#1D1D1B', marginBottom: 8, lineHeight: 1.2, fontFamily: 'monospace' }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontWeight: 900, fontSize: 17, color: '#1D1D1B', fontFamily: 'monospace' }}>
              {formatPrice(product.precio_detal)}
            </p>
            <p style={{ fontSize: 11, color: '#24CEA6', fontWeight: 600 }}>
              Mayor: {formatPrice(product.precio_mayor)}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {product.genero.slice(0, 2).map(g => (
              <span key={g} style={{
                background: '#f5f5f3', color: '#626161', padding: '2px 7px', borderRadius: 2,
                fontSize: 8, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
              }}>{g}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ───
const Coleccion = () => {
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery]   = useState('');
  const [sortBy, setSortBy]             = useState('destacado');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res  = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        if (!data.success) throw new Error();

        const mappedProducts = data.data.map(p => ({
          id:           p._id,
          name:         p.name,
          category:     (p.category || '').trim(),
          precio_detal: p.price?.retail    || 0,
          precio_mayor: p.price?.wholesale || 0,
          genero:       [p.gender || 'Unisex'],
          tallas:       [...new Set(p.variants?.map(v => v.size))],
          colores:      p.variants?.map(v => ({ nombre: v.color?.name, hex: v.color?.hex || '#1D1D1B' })) || [],
          descripcion:  p.description,
          caracteristicas: p.features || [],
          badge:        p.discountPercentage ? `${p.discountPercentage}%` : null,
          nuevo:        false,
          destacado:    false,
          material:     p.material,
          cuidado:      'Consultar etiqueta',
          coleccion:    p.collection,
          images:       p.images || [],
        }));

        setProducts(mappedProducts);
      } catch (err) {
        setError('Error conectando backend');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products
    .filter(p => {
      const matchCat    = activeCategory === 'Todos' ||
        p.category.trim().toLowerCase() === activeCategory.trim().toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'precio-asc')  return a.precio_detal - b.precio_detal;
      if (sortBy === 'precio-desc') return b.precio_detal - a.precio_detal;
      if (sortBy === 'nuevo')       return (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0);
      return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
    });

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif", color: '#1D1D1B', overflowX: 'hidden' }}>
      <Header />

      {/* ── HERO (sin barra de categorías) ── */}
      <section style={{ background: '#1D1D1B', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #24CEA6, #E73538)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 2rem 60px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(36,206,166,0.35)', borderRadius: 2,
                padding: '5px 14px', marginBottom: 20, background: 'rgba(36,206,166,0.08)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#24CEA6', display: 'inline-block', animation: 'blink 1.6s ease-in-out infinite' }} />
                <span style={{ color: '#24CEA6', fontSize: 11, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>
                  Colección 2025
                </span>
              </div>
              <h1 style={{
                fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 900, color: '#fff',
                lineHeight: 1.0, letterSpacing: '-0.03em', fontFamily: "'Courier New', monospace",
              }}>
                VISTE PARA<br />
                <span style={{ color: '#24CEA6' }}>CONQUISTAR</span>
              </h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                {products.length} productos disponibles
              </p>
              <p style={{ color: '#24CEA6', fontSize: 13, fontWeight: 600 }}>Precios detal y mayorista</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: '#24CEA6', overflow: 'hidden', padding: '10px 0' }}>
        <div style={{ display: 'flex', animation: 'ticker 22s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(6).fill(['⚡ Nueva Colección 2025', '🛒 Mayor y Detal', '🎽 Alta Calidad', '🇨🇴 Hecho en Colombia', '💪 Tu Segunda Piel', '🔥 Saldos 30% OFF']).flat().map((t, i) => (
            <span key={i} style={{ color: '#1D1D1B', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', paddingRight: 52 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── FILTROS + GRID ── */}
      <section style={{ padding: '48px 2rem 100px', background: '#f5f5f3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* ── Barra de filtros completa ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>

            {/* Fila 1: buscador + ordenar + contador */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 360 }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }}>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 16px 12px 40px',
                    border: '1px solid #e0e0e0', borderRadius: 4, background: '#fff',
                    fontSize: 13, color: '#1D1D1B', outline: 'none', fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#626161', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>Ordenar:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                  padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: 4,
                  background: '#fff', fontSize: 12, color: '#1D1D1B',
                  cursor: 'pointer', outline: 'none', fontFamily: 'inherit',
                }}>
                  <option value="destacado">Destacados</option>
                  <option value="nuevo">Más Nuevos</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                </select>
                <span style={{ color: '#999', fontSize: 12 }}>
                  {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Fila 2: botones de categoría */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIAS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '9px 20px',
                    border: activeCategory === cat ? '2px solid #1D1D1B' : '1px solid #e0e0e0',
                    borderRadius: 4,
                    background: activeCategory === cat ? '#1D1D1B' : '#fff',
                    color: activeCategory === cat ? '#24CEA6' : '#626161',
                    fontSize: 11, fontWeight: 700, letterSpacing: 2,
                    textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <p style={{ fontSize: 40, marginBottom: 16 }}>⏳</p>
              <h3 style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Cargando productos...</h3>
              <p style={{ color: '#626161' }}>Conectando con el servidor.</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <p style={{ fontSize: 40, marginBottom: 16 }}>⚠️</p>
              <h3 style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 900, marginBottom: 8, color: '#E73538' }}>{error}</h3>
              <p style={{ color: '#626161' }}>Verifica que el servidor esté corriendo en localhost:5000.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && (
            filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <p style={{ fontSize: 40, marginBottom: 16 }}>🔍</p>
                <h3 style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Sin resultados</h3>
                <p style={{ color: '#626161' }}>Intenta con otra categoría o término de búsqueda.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* ── MAYORISTAS BANNER ── */}
      <section style={{ padding: '72px 2rem', background: '#1D1D1B', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#24CEA6', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
                — Ventas al por Mayor
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#fff', fontFamily: 'monospace', lineHeight: 1.1, marginBottom: 12 }}>
                ¿ERES RETAILER?<br />
                <span style={{ color: '#24CEA6' }}>TENEMOS PRECIOS ESPECIALES</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.8, maxWidth: 520 }}>
                Vendemos al por mayor para tiendas deportivas, distribuidores y revendedores.
                Pedidos mínimos desde 6 unidades por referencia con descuentos exclusivos.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 220 }}>
              <a href="https://wa.me/573108104914" target="_blank" rel="noreferrer" style={{
                background: '#24CEA6', color: '#1D1D1B', padding: '14px 28px', borderRadius: 2,
                fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
                textDecoration: 'none', textAlign: 'center',
              }}>📲 WhatsApp</a>
              <a href="mailto:edithmayerliastudillorojas@gmail.com" style={{
                background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)', padding: '12px 28px', borderRadius: 2,
                fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase',
                textDecoration: 'none', textAlign: 'center',
              }}>Enviar Email</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{
        padding: '80px 2rem',
        background: 'linear-gradient(135deg, #E73538 0%, #b82022 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='white' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='white' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='white' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
          <IISkinLogo size={60} mainColor="#FFFFFF" accentColor="rgba(255,255,255,0.55)" />
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff',
            fontFamily: "'Courier New', monospace", lineHeight: 1.1, margin: '24px 0 14px',
          }}>
            VÍSTETE PARA<br />CONQUISTAR
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            Prendas de alto rendimiento que se convierten en tu segunda piel.
          </p>
          <a href="https://wa.me/573108104914" target="_blank" rel="noreferrer" style={{
            background: '#fff', color: '#E73538', padding: '15px 38px', borderRadius: 2,
            fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
            textDecoration: 'none', display: 'inline-block',
          }}>📲 Hacer mi Pedido</a>
        </div>
      </section>

      <Footer />

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #bbb; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0f0ee; }
        ::-webkit-scrollbar-thumb { background: #24CEA6; border-radius: 3px; }
      `}</style>
    </div>
  );
};

export default Coleccion;