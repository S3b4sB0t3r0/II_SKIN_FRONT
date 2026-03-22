import React, { useState, useEffect } from 'react';
import Header from '../components/NavBar';
import Footer from '../components/Fotter';
import API_URL from '../config/config';

// ─── II SKIN Isotipo ───
const IISkinLogo = ({ size = 44, mainColor = '#FFFFFF', accentColor = '#24CEA6' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="50" y1="8"  x2="50" y2="52" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
    <line x1="50" y1="52" x2="12" y2="88" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
    <line x1="50" y1="52" x2="88" y2="88" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
    <line x1="42" y1="16" x2="42" y2="57" stroke={mainColor}  strokeWidth="7" strokeLinecap="round"/>
    <line x1="42" y1="57" x2="6"  y2="91" stroke={mainColor}  strokeWidth="7" strokeLinecap="round"/>
    <line x1="42" y1="57" x2="78" y2="91" stroke={mainColor}  strokeWidth="7" strokeLinecap="round"/>
  </svg>
);

// ─── Avatar initials circle ───
const Avatar = ({ nombre, apellido }) => {
  const initials = `${nombre?.[0] || '?'}${apellido?.[0] || ''}`.toUpperCase();
  return (
    <div style={{
      width: 88, height: 88, borderRadius: '50%',
      background: 'linear-gradient(135deg, #1D1D1B 0%, #24CEA6 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 30, fontWeight: 900, color: '#fff',
      fontFamily: "'Courier New', monospace",
      border: '3px solid rgba(36,206,166,0.4)',
      boxShadow: '0 0 0 6px rgba(36,206,166,0.08)',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

// ─── Styled input ───
const Field = ({ label, required, children, hint }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
    <label style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 3,
      textTransform: 'uppercase', color: '#626161',
    }}>
      {label}{required && <span style={{ color: '#E73538', marginLeft: 3 }}>*</span>}
    </label>
    {children}
    {hint && <p style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{hint}</p>}
  </div>
);

const Input = ({ style, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: '100%', padding: '13px 16px',
        border: `1.5px solid ${focused ? '#24CEA6' : '#e0e0dc'}`,
        borderRadius: 4, background: focused ? '#fafffe' : '#fff',
        fontSize: 14, color: '#1D1D1B', outline: 'none',
        fontFamily: "'Segoe UI', sans-serif",
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        boxShadow: focused ? '0 0 0 3px rgba(36,206,166,0.12)' : 'none',
        boxSizing: 'border-box',
        ...style,
      }}
    />
  );
};

// ─── Password strength bar ───
const PasswordStrength = ({ password }) => {
  const getStrength = (p) => {
    if (!p) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (p.length >= 8)  score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const map = [
      { label: 'Muy débil', color: '#E73538' },
      { label: 'Débil',     color: '#E73538' },
      { label: 'Regular',   color: '#EBE43C' },
      { label: 'Buena',     color: '#4F8DCB' },
      { label: 'Fuerte',    color: '#24CEA6' },
    ];
    return { score, ...map[score] };
  };
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= score ? color : '#e8e8e6',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      <p style={{ fontSize: 10, color, fontWeight: 700, letterSpacing: 1 }}>{label}</p>
    </div>
  );
};

// ─── Toast notification ───
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  const isError = type === 'error';
  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 999,
      background: isError ? '#E73538' : '#1D1D1B',
      color: '#fff', padding: '14px 22px',
      borderRadius: 4, display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      borderLeft: `4px solid ${isError ? '#b82022' : '#24CEA6'}`,
      maxWidth: 380, animation: 'slideInRight 0.3s ease',
    }}>
      <span style={{ fontSize: 18 }}>{isError ? '⚠️' : '✅'}</span>
      <p style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{message}</p>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
        fontSize: 18, cursor: 'pointer', padding: 0, lineHeight: 1,
      }}>×</button>
    </div>
  );
};

// ══════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════
const Perfil = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', email: '', telefono: '', empresa: '', cargo: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState({ message: null, type: 'success' });
  const [showPass, setShowPass] = useState({ cur: false, new: false, con: false });

  const showToast = (message, type = 'success') => setToast({ message, type });
  const hideToast = () => setToast({ message: null, type: 'success' });

  // ── Fetch profile ──────────────────────
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/api/user/me`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Error al obtener perfil');
        const data = await response.json();
        setFormData({
          nombre:   data.firstName || '',
          apellido: data.lastName  || '',
          email:    data.email     || '',
          telefono: data.phone     || '',
          empresa:  data.company   || '',
          cargo:    data.role      || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'info') setFormData(prev => ({ ...prev, [name]: value }));
    else setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // ── Submit info ────────────────────────
  const handleSubmitInfo = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) { showToast('No autenticado', 'error'); setLoading(false); return; }
    try {
      const response = await fetch(`${API_URL}/api/user/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          firstName: formData.nombre,
          lastName:  formData.apellido,
          email:     formData.email,
          phone:     formData.telefono,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Error al actualizar la información');
      }
      const updatedUser = await response.json();
      showToast('Información actualizada correctamente ✓');
      setFormData(prev => ({
        ...prev,
        nombre:   updatedUser.user.firstName || prev.nombre,
        apellido: updatedUser.user.lastName  || prev.apellido,
        email:    updatedUser.user.email     || prev.email,
        telefono: updatedUser.user.phone     || prev.telefono,
      }));
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── Submit password ────────────────────
  const handleSubmitPassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error'); return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) { showToast('No autenticado', 'error'); setLoading(false); return; }
    try {
      const response = await fetch(`${API_URL}/api/user/me/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword:     passwordData.newPassword,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Error al cambiar la contraseña');
      }
      showToast('Contraseña cambiada correctamente ✓');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'info',     label: 'Información', icon: '👤' },
    { id: 'password', label: 'Seguridad',   icon: '🔐' },
  ];

  return (
    <div style={{
      fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif",
      color: '#1D1D1B', overflowX: 'hidden', minHeight: '100vh',
      background: '#f5f5f3',
    }}>
      <Header />

      {/* ══════════ HERO ══════════ */}
      <section style={{
        background: '#1D1D1B', paddingTop: 80,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Isotipo pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #24CEA6, #E73538)' }} />
        <div style={{
          position: 'absolute', right: '6%', top: '10%',
          width: 340, height: 340, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(36,206,166,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 2rem 0', position: 'relative', zIndex: 2 }}>
          {/* Profile summary strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 48 }}>
            <Avatar nombre={formData.nombre} apellido={formData.apellido} />
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(36,206,166,0.35)', borderRadius: 2,
                padding: '4px 12px', marginBottom: 10,
                background: 'rgba(36,206,166,0.08)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#24CEA6', display: 'inline-block', animation: 'blink 1.6s ease-in-out infinite' }} />
                <span style={{ color: '#24CEA6', fontSize: 10, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>
                  Cuenta Activa
                </span>
              </div>
              <h1 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#fff',
                fontFamily: "'Courier New', monospace", lineHeight: 1.05, marginBottom: 6,
              }}>
                {formData.nombre || 'MI'}&nbsp;
                <span style={{ color: '#24CEA6' }}>{formData.apellido || 'PERFIL'}</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, letterSpacing: 1 }}>
                {formData.email || 'Cargando información...'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <IISkinLogo size={52} mainColor="#FFFFFF" accentColor="#24CEA6" />
            </div>
          </div>

          {/* Tabs inside hero bottom */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); }}
                style={{
                  padding: '16px 28px', border: 'none', background: 'none', cursor: 'pointer',
                  color: activeTab === tab.id ? '#24CEA6' : 'rgba(255,255,255,0.4)',
                  fontWeight: activeTab === tab.id ? 800 : 500,
                  fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                  borderBottom: activeTab === tab.id ? '2px solid #24CEA6' : '2px solid transparent',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.2s',
                }}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTENT ══════════ */}
      <section style={{ padding: '52px 2rem 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 28, alignItems: 'start' }}>

          {/* ── LEFT SIDEBAR ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Mini profile card */}
            <div style={{
              background: '#1D1D1B', borderRadius: 4, padding: '28px 24px',
              position: 'relative', overflow: 'hidden',
              border: '1px solid rgba(36,206,166,0.12)',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #24CEA6, #E73538)' }} />
              <div style={{ position: 'absolute', bottom: -20, right: -8, opacity: 0.04, fontSize: 130, fontWeight: 900, fontFamily: 'monospace', color: '#24CEA6', userSelect: 'none' }}>II</div>

              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                  <Avatar nombre={formData.nombre} apellido={formData.apellido} />
                </div>
                <h3 style={{ color: '#fff', fontFamily: 'monospace', fontWeight: 900, fontSize: 16, marginBottom: 4 }}>
                  {formData.nombre} {formData.apellido}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 1, marginBottom: 16 }}>
                  {formData.email}
                </p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 16 }} />
                {[
                  { label: 'Teléfono', value: formData.telefono || '—' },
                  { label: 'Empresa',  value: formData.empresa  || '—' },
                  { label: 'Cargo',    value: formData.cargo    || '—' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: 'left', marginBottom: 10 }}>
                    <p style={{ fontSize: 9, letterSpacing: 2, color: '#626161', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', wordBreak: 'break-all' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div style={{ background: '#fff', borderRadius: 4, border: '1px solid #ebebea', overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid #f0f0ee' }}>
                <p style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase', color: '#999' }}>Accesos Rápidos</p>
              </div>
              {[
                { icon: '🎽', label: 'Ver Colección',  href: '/coleccion' },
                { icon: '📖', label: 'Nuestra Historia', href: '/nosotros' },
                { icon: '📲', label: 'Contacto WhatsApp', href: 'https://wa.me/573108104914' },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 18px', textDecoration: 'none',
                    borderBottom: '1px solid #f5f5f3',
                    color: '#1D1D1B', fontSize: 13, fontWeight: 500,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f5f5f3'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span>{icon}</span> {label}
                  <span style={{ marginLeft: 'auto', color: '#ccc', fontSize: 12 }}>→</span>
                </a>
              ))}
            </div>

            {/* Brand colors strip */}
            <div style={{ background: '#fff', borderRadius: 4, border: '1px solid #ebebea', padding: '14px 18px' }}>
              <p style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase', color: '#999', marginBottom: 10 }}>Paleta II SKIN</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#24CEA6','#E73538','#EBE43C','#F731B5','#4F8DCB','#1D1D1B'].map(c => (
                  <div key={c} style={{ flex: 1, height: 8, borderRadius: 99, background: c, border: c === '#FFFFFF' ? '1px solid #eee' : 'none' }} />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT MAIN PANEL ── */}
          <div style={{ background: '#fff', borderRadius: 4, border: '1px solid #ebebea', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #24CEA6, #E73538)' }} />

            {/* ─── TAB: INFO ─── */}
            {activeTab === 'info' && (
              <div style={{ padding: '40px 44px' }}>
                <div style={{ marginBottom: 36 }}>
                  <p style={{ color: '#E73538', fontSize: 10, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                    — Datos Personales
                  </p>
                  <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", color: '#1D1D1B' }}>
                    ACTUALIZAR <span style={{ color: '#24CEA6' }}>INFORMACIÓN</span>
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <Field label="Nombre" required>
                    <Input
                      type="text" name="nombre"
                      value={formData.nombre}
                      onChange={e => handleInputChange(e, 'info')}
                      placeholder="Tu nombre"
                    />
                  </Field>
                  <Field label="Apellido" required>
                    <Input
                      type="text" name="apellido"
                      value={formData.apellido}
                      onChange={e => handleInputChange(e, 'info')}
                      placeholder="Tu apellido"
                    />
                  </Field>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <Field label="Correo Electrónico" required>
                    <Input
                      type="email" name="email"
                      value={formData.email}
                      onChange={e => handleInputChange(e, 'info')}
                      placeholder="tu@email.com"
                    />
                  </Field>
                  <Field label="Teléfono" hint="Incluye indicativo del país">
                    <Input
                      type="tel" name="telefono"
                      value={formData.telefono}
                      onChange={e => handleInputChange(e, 'info')}
                      placeholder="+57 300 123 4567"
                    />
                  </Field>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: '#f0f0ee', margin: '28px 0' }} />
                <p style={{ fontSize: 10, letterSpacing: 3, color: '#999', fontWeight: 700, textTransform: 'uppercase', marginBottom: 20 }}>
                  Información de Empresa (opcional)
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                  <Field label="Empresa">
                    <Input
                      type="text" name="empresa"
                      value={formData.empresa}
                      onChange={e => handleInputChange(e, 'info')}
                      placeholder="Nombre de tu empresa"
                    />
                  </Field>
                  <Field label="Cargo">
                    <Input
                      type="text" name="cargo"
                      value={formData.cargo}
                      onChange={e => handleInputChange(e, 'info')}
                      placeholder="Tu cargo o rol"
                    />
                  </Field>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <button
                    onClick={handleSubmitInfo}
                    disabled={loading}
                    style={{
                      background: loading ? '#626161' : '#1D1D1B',
                      color: '#fff', border: 'none',
                      padding: '14px 32px', borderRadius: 2,
                      fontSize: 12, fontWeight: 800, letterSpacing: 3,
                      textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: 10,
                      transition: 'background 0.2s, transform 0.15s',
                      position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#24CEA6'; if (!loading) e.currentTarget.style.color = '#1D1D1B'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = loading ? '#626161' : '#1D1D1B'; e.currentTarget.style.color = '#fff'; }}
                  >
                    {loading ? (
                      <>
                        <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                        Guardando...
                      </>
                    ) : 'Guardar Cambios'}
                  </button>
                  <p style={{ fontSize: 11, color: '#999' }}>
                    Los campos marcados con <span style={{ color: '#E73538' }}>*</span> son obligatorios
                  </p>
                </div>
              </div>
            )}

            {/* ─── TAB: SEGURIDAD ─── */}
            {activeTab === 'password' && (
              <div style={{ padding: '40px 44px' }}>
                <div style={{ marginBottom: 36 }}>
                  <p style={{ color: '#E73538', fontSize: 10, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                    — Seguridad de Cuenta
                  </p>
                  <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", color: '#1D1D1B' }}>
                    CAMBIAR <span style={{ color: '#24CEA6' }}>CONTRASEÑA</span>
                  </h2>
                </div>

                {/* Security tip */}
                <div style={{
                  background: 'rgba(36,206,166,0.06)', border: '1px solid rgba(36,206,166,0.2)',
                  borderLeft: '4px solid #24CEA6', borderRadius: 4, padding: '14px 18px',
                  marginBottom: 32, display: 'flex', alignItems: 'flex-start', gap: 12,
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
                  <p style={{ fontSize: 12, color: '#626161', lineHeight: 1.7 }}>
                    Usa mínimo <strong style={{ color: '#1D1D1B' }}>8 caracteres</strong>, combina letras mayúsculas, números y símbolos para una contraseña segura.
                  </p>
                </div>

                <div style={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <Field label="Contraseña Actual" required>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type={showPass.cur ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={e => handleInputChange(e, 'password')}
                        placeholder="Tu contraseña actual"
                        style={{ paddingRight: 46 }}
                      />
                      <button
                        onClick={() => setShowPass(p => ({ ...p, cur: !p.cur }))}
                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#999' }}
                      >
                        {showPass.cur ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </Field>

                  <div style={{ height: 1, background: '#f0f0ee' }} />

                  <Field label="Nueva Contraseña" required>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type={showPass.new ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={e => handleInputChange(e, 'password')}
                        placeholder="Mínimo 8 caracteres"
                        style={{ paddingRight: 46 }}
                      />
                      <button
                        onClick={() => setShowPass(p => ({ ...p, new: !p.new }))}
                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#999' }}
                      >
                        {showPass.new ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <PasswordStrength password={passwordData.newPassword} />
                  </Field>

                  <Field label="Confirmar Nueva Contraseña" required>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type={showPass.con ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={e => handleInputChange(e, 'password')}
                        placeholder="Repite la nueva contraseña"
                        style={{
                          paddingRight: 46,
                          borderColor: passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword ? '#E73538' : undefined,
                        }}
                      />
                      <button
                        onClick={() => setShowPass(p => ({ ...p, con: !p.con }))}
                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#999' }}
                      >
                        {showPass.con ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                      <p style={{ fontSize: 11, color: '#E73538', fontWeight: 600, marginTop: 4 }}>⚠ Las contraseñas no coinciden</p>
                    )}
                    {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                      <p style={{ fontSize: 11, color: '#24CEA6', fontWeight: 600, marginTop: 4 }}>✓ Las contraseñas coinciden</p>
                    )}
                  </Field>

                  <button
                    onClick={handleSubmitPassword}
                    disabled={loading || (passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword)}
                    style={{
                      background: loading ? '#626161' : '#1D1D1B',
                      color: '#fff', border: 'none',
                      padding: '14px 32px', borderRadius: 2,
                      fontSize: 12, fontWeight: 800, letterSpacing: 3,
                      textTransform: 'uppercase',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: 10,
                      width: 'fit-content', transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#24CEA6'; if (!loading) e.currentTarget.style.color = '#1D1D1B'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = loading ? '#626161' : '#1D1D1B'; e.currentTarget.style.color = '#fff'; }}
                  >
                    {loading ? (
                      <>
                        <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                        Cambiando...
                      </>
                    ) : '🔐 Cambiar Contraseña'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #bbb; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #24CEA6; border-radius: 3px; }
      `}</style>
    </div>
  );
};

export default Perfil;