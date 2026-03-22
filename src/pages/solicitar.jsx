import { useState } from "react";
import logo from '../image/logo2.png';
import API_URL from '../config/config';

export default function RecuperacionContrasena() {
  const [email, setEmail]   = useState("");
  const [alert, setAlert]   = useState(null);
  const [loading, setLoading] = useState(false);

  const showAlert  = (msg, type = "error") => setAlert({ msg, type });
  const clearAlert = () => setAlert(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { showAlert("Por favor, ingresa un correo válido."); return; }

    setLoading(true);
    clearAlert();

    try {
      const response = await fetch(`${API_URL}/api/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al enviar el enlace.");
      showAlert(
        "Hemos enviado un enlace de recuperación a " + email.replace(/(.{2}).+(@.+)/, "$1***$2"),
        "success"
      );
    } catch (error) {
      showAlert(error.message || "Error desconocido al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '13px 48px 13px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 2, color: '#fff', fontSize: 14,
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1D1D1B',
      fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif",
      position: 'relative', overflow: 'hidden', padding: '32px 1rem',
    }}>

      {/* ── Isotipo pattern ── */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
        backgroundSize: '72px 72px',
      }} />

      {/* ── Glow blobs ── */}
      <div style={{ position: 'absolute', top: '-10%', left: '-6%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(36,206,166,0.09) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'floatBlob 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-6%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(231,53,56,0.07) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'floatBlob 12s ease-in-out infinite 3s' }} />
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(235,228,60,0.04) 0%, transparent 70%)', filter: 'blur(32px)', animation: 'floatBlob 7s ease-in-out infinite 1.5s' }} />

      {/* ── Dot accents ── */}
      <div style={{ position: 'absolute', top: '26%', right: '20%', width: 6, height: 6, borderRadius: '50%', background: '#24CEA6', opacity: 0.5, animation: 'blink 2s infinite' }} />
      <div style={{ position: 'absolute', bottom: '30%', left: '16%', width: 4, height: 4, borderRadius: '50%', background: '#E73538', opacity: 0.4, animation: 'blink 2.5s infinite 1s' }} />
      <div style={{ position: 'absolute', top: '68%', right: '15%', width: 5, height: 5, borderRadius: '50%', background: '#EBE43C', opacity: 0.3, animation: 'blink 3s infinite 2s' }} />

      {/* ── Left brand bar ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #E73538, #24CEA6)' }} />

      {/* ══════════════════════
          RECOVERY CARD
      ══════════════════════ */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 460 }}>
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
                  style={{ height: 60, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <h1 style={{
                color: '#fff', fontSize: 24, fontWeight: 900,
                fontFamily: "'Courier New', monospace",
                letterSpacing: 5, marginBottom: 4,
              }}>
                II SKIN
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
                Tu Segunda Piel
              </p>
              <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, transparent, #24CEA6, transparent)', margin: '12px auto 0' }} />
            </div>

            {/* ── Lock icon + title ── */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 60, height: 60, margin: '0 auto 18px',
                background: 'rgba(36,206,166,0.1)',
                border: '1px solid rgba(36,206,166,0.3)',
                borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#24CEA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }}>
                ¿Olvidaste tu <span style={{ color: '#24CEA6' }}>contraseña?</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.75, maxWidth: 340, margin: '0 auto' }}>
                No te preocupes. Ingresa tu correo y te enviaremos un enlace seguro para restablecerla.
              </p>
            </div>

            {/* ── Alert ── */}
            {alert && (
              <div style={{
                padding: '12px 16px', borderRadius: 2, marginBottom: 24,
                display: 'flex', alignItems: 'flex-start', gap: 10,
                background: alert.type === 'success' ? 'rgba(36,206,166,0.1)' : 'rgba(231,53,56,0.1)',
                border: `1px solid ${alert.type === 'success' ? 'rgba(36,206,166,0.35)' : 'rgba(231,53,56,0.35)'}`,
                color: alert.type === 'success' ? '#24CEA6' : '#E73538',
                fontSize: 13, fontWeight: 600, lineHeight: 1.5,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: alert.type === 'success' ? '#24CEA6' : '#E73538', flexShrink: 0, marginTop: 4 }} />
                <span>{alert.msg}</span>
              </div>
            )}

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              <div>
                <label style={{
                  display: 'block', marginBottom: 8,
                  color: 'rgba(255,255,255,0.45)', fontSize: 10,
                  letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                }}>
                  Correo Electrónico
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#24CEA6'; e.target.style.background = 'rgba(36,206,166,0.06)'; e.target.style.boxShadow = '0 0 0 3px rgba(36,206,166,0.12)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 7, letterSpacing: 0.3 }}>
                  Te enviaremos las instrucciones a este correo
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
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
                {loading && (
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 1.6s infinite' }} />
                )}
                {loading && (
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(29,29,27,0.3)', borderTopColor: '#1D1D1B', borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
                )}
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {loading ? "Enviando enlace..." : "Enviar Enlace de Recuperación"}
                </span>
              </button>
            </form>

            {/* ── Back to login ── */}
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginBottom: 12 }}>
                ¿Recordaste tu contraseña?
              </p>
              <a href="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: '#24CEA6', fontWeight: 800, fontSize: 13,
                textDecoration: 'none', letterSpacing: 1,
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Volver al inicio de sesión
              </a>
            </div>

            {/* ── Help box ── */}
            <div style={{
              marginTop: 20, padding: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 2,
              borderLeft: '3px solid #24CEA6',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#24CEA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>¿Necesitas ayuda?</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
                Si tienes problemas para recuperar tu cuenta, contacta a nuestro equipo en{' '}
                <span style={{ color: '#24CEA6' }}>edithmayerliastudillorojas@gmail.com</span>
              </p>
            </div>

          </div>

          {/* Corner decoratives */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'radial-gradient(circle at top right, rgba(36,206,166,0.07), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 120, height: 120, background: 'radial-gradient(circle at bottom left, rgba(231,53,56,0.06), transparent 70%)', pointerEvents: 'none' }} />
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