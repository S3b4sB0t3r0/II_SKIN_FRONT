import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../image/logo2.png';
import API_URL from '../config/config';

// ─── Eye icon ───
const EyeIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    )}
  </svg>
);

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", password: "", confirmPassword: "",
    terms: false, newsletter: false,
  });

  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength]       = useState(null);
  const [alert, setAlert]                             = useState(null);
  const [loading, setLoading]                         = useState(false);

  const checkPasswordStrength = (password) => {
    const minLength  = password.length >= 8;
    const hasUpper   = /[A-Z]/.test(password);
    const hasLower   = /[a-z]/.test(password);
    const hasNumber  = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const strength   = [minLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (strength < 3) return { level: "weak",   text: "Contraseña débil — Agrega mayúsculas, números y símbolos" };
    if (strength < 5) return { level: "medium", text: "Contraseña media — Considera agregar más caracteres especiales" };
    return { level: "strong", text: "Contraseña fuerte ✓" };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    if (name === "phone") {
      let val = newValue.replace(/\D/g, "");
      if (val.startsWith("57")) val = val.substring(2);
      if (val.length > 10) val = val.substring(0, 10);
      if (val.length >= 3) val = val.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
      newValue = val ? "+57 " + val : "";
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "password") {
      if (newValue.length > 0) setPasswordStrength(checkPasswordStrength(newValue));
      else setPasswordStrength(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) { setAlert({ type: "error", message: "Debes aceptar los términos y condiciones" }); return; }
    if (formData.password !== formData.confirmPassword) { setAlert({ type: "error", message: "Las contraseñas no coinciden" }); return; }
    if (passwordStrength?.level === "weak") { setAlert({ type: "error", message: "La contraseña es muy débil. Crea una más segura." }); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) { setAlert({ type: "error", message: "Por favor, ingresa un correo electrónico válido" }); return; }

    setLoading(true);
    setAlert(null);

    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName, lastName: formData.lastName,
          email: formData.email, phone: formData.phone, password: formData.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en el registro");
      setAlert({ type: "success", message: "¡Cuenta creada exitosamente!" });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "", terms: false, newsletter: false });
      setPasswordStrength(null);
      setTimeout(() => { navigate("/login"); }, 1500);
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // ─── Shared styles ───
  const inputBase = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 2, color: '#fff', fontSize: 13,
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
  };
  const focusIn  = (e) => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; e.target.style.boxShadow = '0 0 0 3px rgba(36,206,166,0.12)'; };
  const focusOut = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.boxShadow = 'none'; };

  const labelStyle = {
    display: 'block', marginBottom: 7,
    color: 'rgba(255,255,255,0.45)', fontSize: 10,
    letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
  };

  const pwPalette = {
    weak:   { bg: 'rgba(231,53,56,0.1)',  border: 'rgba(231,53,56,0.3)',  color: '#E73538' },
    medium: { bg: 'rgba(235,228,60,0.1)', border: 'rgba(235,228,60,0.3)', color: '#EBE43C' },
    strong: { bg: 'rgba(36,206,166,0.1)', border: 'rgba(36,206,166,0.3)', color: '#24CEA6' },
  };
  const pw = passwordStrength ? pwPalette[passwordStrength.level] : null;

  const Checkbox = ({ name, checked, label }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ position: 'relative', width: 18, height: 18, marginTop: 2, flexShrink: 0 }}>
        <input type="checkbox" name={name} checked={checked} onChange={handleChange}
          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', margin: 0 }} />
        <div style={{
          width: 18, height: 18, borderRadius: 2,
          border: `1px solid ${checked ? '#24CEA6' : 'rgba(255,255,255,0.15)'}`,
          background: checked ? 'rgba(36,206,166,0.15)' : 'rgba(255,255,255,0.04)',
          transition: 'all 0.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#24CEA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
      <label style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.7, cursor: 'pointer' }}>
        {label}
      </label>
    </div>
  );

  const PasswordField = ({ name, value, placeholder, show, onToggle, label }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type={show ? "text" : "password"} name={name} value={value}
          onChange={handleChange} placeholder={placeholder} required
          style={{ ...inputBase, paddingRight: 44 }}
          onFocus={focusIn} onBlur={focusOut} />
        <button type="button" onClick={onToggle}
          aria-label={show ? "Ocultar" : "Mostrar"}
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', padding: 0, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1D1D1B',
      fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif",
      position: 'relative', overflow: 'hidden', padding: '48px 1rem',
    }}>

      {/* ── Isotipo pattern ── */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
        backgroundSize: '72px 72px',
      }} />

      {/* ── Glow blobs ── */}
      <div style={{ position: 'absolute', top: '-8%', right: '-6%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(36,206,166,0.09) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'floatBlob 10s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-8%', left: '-6%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(231,53,56,0.07) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'floatBlob 13s ease-in-out infinite 2s' }} />
      <div style={{ position: 'absolute', top: '50%', left: '-4%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(235,228,60,0.05) 0%, transparent 70%)', filter: 'blur(32px)', animation: 'floatBlob 8s ease-in-out infinite 4s' }} />

      {/* ── Dot accents ── */}
      <div style={{ position: 'absolute', top: '22%', right: '18%', width: 6, height: 6, borderRadius: '50%', background: '#24CEA6', opacity: 0.5, animation: 'blink 2s infinite' }} />
      <div style={{ position: 'absolute', bottom: '28%', left: '15%', width: 4, height: 4, borderRadius: '50%', background: '#E73538', opacity: 0.4, animation: 'blink 2.5s infinite 1s' }} />
      <div style={{ position: 'absolute', top: '70%', right: '14%', width: 5, height: 5, borderRadius: '50%', background: '#EBE43C', opacity: 0.3, animation: 'blink 3s infinite 2s' }} />

      {/* ── Left brand bar ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #E73538, #24CEA6)' }} />

      {/* ══════════════════════
          REGISTER CARD
      ══════════════════════ */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 600 }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(36,206,166,0.18)',
          borderRadius: 4, overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}>

          {/* Top accent bar */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, #E73538 30%, #24CEA6)' }} />

          <div style={{ padding: '44px 40px' }}>

            {/* ── Brand header ── */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                <img
                  src={logo}
                  alt="II SKIN Logo"
                  style={{ height: 62, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 900, fontFamily: "'Courier New', monospace", letterSpacing: 5, marginBottom: 4 }}>
                II SKIN
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
                Tu Segunda Piel
              </p>
              <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, transparent, #24CEA6, transparent)', margin: '12px auto 0' }} />
            </div>

            {/* ── Title ── */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Únete a II SKIN</h2>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.7 }}>
                Crea tu cuenta y accede a nuestra colección de ropa deportiva premium.
              </p>
            </div>

            {/* ── Alert ── */}
            {alert && (
              <div style={{
                padding: '12px 16px', borderRadius: 2, marginBottom: 24,
                display: 'flex', alignItems: 'center', gap: 10,
                background: alert.type === 'success' ? 'rgba(36,206,166,0.1)' : 'rgba(231,53,56,0.1)',
                border: `1px solid ${alert.type === 'success' ? 'rgba(36,206,166,0.35)' : 'rgba(231,53,56,0.35)'}`,
                color: alert.type === 'success' ? '#24CEA6' : '#E73538',
                fontSize: 13, fontWeight: 600,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: alert.type === 'success' ? '#24CEA6' : '#E73538' }} />
                {alert.message}
              </div>
            )}

            {/* ── Form ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Nombre / Apellido */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                    placeholder="Tu nombre" required style={inputBase} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label style={labelStyle}>Apellido</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                    placeholder="Tu apellido" required style={inputBase} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="tu@email.com" required style={inputBase} onFocus={focusIn} onBlur={focusOut} />
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>Teléfono / WhatsApp</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="+57 300 123 4567" style={inputBase} onFocus={focusIn} onBlur={focusOut} />
              </div>

              {/* Passwords */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <PasswordField name="password" value={formData.password} placeholder="Contraseña segura"
                  show={showPassword} onToggle={() => setShowPassword(!showPassword)} label="Contraseña" />
                <PasswordField name="confirmPassword" value={formData.confirmPassword} placeholder="Repite la contraseña"
                  show={showConfirmPassword} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} label="Confirmar" />
              </div>

              {/* Password strength */}
              {passwordStrength && pw && (
                <div style={{ padding: '10px 14px', borderRadius: 2, background: pw.bg, border: `1px solid ${pw.border}`, display: 'flex', alignItems: 'center', gap: 10, color: pw.color, fontSize: 12, fontWeight: 600 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: pw.color, flexShrink: 0 }} />
                  {passwordStrength.text}
                </div>
              )}

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '2px 0' }} />

              {/* Checkboxes */}
              <Checkbox name="terms" checked={formData.terms}
                label={<>Acepto los <a href="#" style={{ color: '#24CEA6', fontWeight: 700, textDecoration: 'none' }}>términos y condiciones</a> y la <a href="#" style={{ color: '#24CEA6', fontWeight: 700, textDecoration: 'none' }}>política de privacidad</a> de II SKIN</>}
              />
              <Checkbox name="newsletter" checked={formData.newsletter}
                label="Quiero recibir novedades de colecciones y promociones por correo"
              />

              {/* Submit */}
              <button onClick={handleSubmit} disabled={loading}
                style={{
                  width: '100%', marginTop: 6,
                  background: loading ? 'rgba(36,206,166,0.5)' : '#24CEA6',
                  color: '#1D1D1B', border: 'none', borderRadius: 2,
                  padding: '14px', fontSize: 13, fontWeight: 800,
                  letterSpacing: 3, textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#1ab892'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(36,206,166,0.35)'; }}}
                onMouseLeave={e => { e.currentTarget.style.background = loading ? 'rgba(36,206,166,0.5)' : '#24CEA6'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {loading && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 1.6s infinite' }} />}
                {loading && <div style={{ width: 16, height: 16, border: '2px solid rgba(29,29,27,0.3)', borderTopColor: '#1D1D1B', borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />}
                <span style={{ position: 'relative', zIndex: 1 }}>{loading ? "Creando cuenta..." : "Crear Cuenta →"}</span>
              </button>

              {/* Back to home */}
              <div style={{ textAlign: 'center' }}>
                <button type="button" onClick={() => (window.location.href = "/")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
                  ← Volver al inicio
                </button>
              </div>
            </div>

            {/* Login link */}
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginBottom: 16 }}>¿Ya tienes una cuenta?</p>
              <a href="/login" style={{
                display: 'inline-block', padding: '11px 36px', borderRadius: 2,
                border: '1px solid rgba(36,206,166,0.4)',
                color: '#24CEA6', fontWeight: 800, fontSize: 12,
                letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#24CEA6'; e.currentTarget.style.color = '#1D1D1B'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#24CEA6'; }}
              >
                Iniciar Sesión
              </a>
            </div>

          </div>

          {/* Corner decoratives */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 110, height: 110, background: 'radial-gradient(circle at top right, rgba(36,206,166,0.07), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 130, height: 130, background: 'radial-gradient(circle at bottom left, rgba(231,53,56,0.06), transparent 70%)', pointerEvents: 'none' }} />
        </div>

        {/* Brand tag */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase' }}>
            TU SEGUNDA PIEL · WWW.IISKIN.COM
          </span>
        </div>
      </div>

      <style>{`
        @keyframes floatBlob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
        @keyframes blink     { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.9;transform:scale(1.5)} }
        @keyframes shimmer   { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        input::placeholder { color: rgba(255,255,255,0.22); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}