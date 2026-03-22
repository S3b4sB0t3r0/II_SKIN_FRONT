import { useState, useEffect } from "react";
import logo from '../image/logo2.png';
import API_URL from '../config/config';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Iniciar Sesión");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const container = document.querySelector(".login-container");
    if (container) {
      container.style.opacity = "0";
      container.style.transform = "translateY(30px)";
      setTimeout(() => {
        container.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      }, 100);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setButtonText("Iniciando sesión...");
    setAlert(null);
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en el inicio de sesión");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setButtonText("✅ ¡Sesión iniciada!");
      setAlert({
        type: "success",
        message: `¡Inicio exitoso! Bienvenido ${data.user.firstName} (${data.user.role})`,
      });
      setTimeout(() => { window.location.href = data.redirectTo || "/"; }, 1000);
    } catch (error) {
      setAlert({ type: "error", message: error.message });
      setButtonText("Iniciar Sesión");
    } finally {
      setLoading(false);
    }
  };

  // ─── Shared input style ───
  const inputBase = {
    width: '100%',
    padding: '13px 18px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 2,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
    letterSpacing: 0.3,
  };

  const focusIn = (e) => {
    e.target.style.borderColor = '#24CEA6';
    e.target.style.background = 'rgba(36,206,166,0.06)';
    e.target.style.boxShadow = '0 0 0 3px rgba(36,206,166,0.12)';
  };
  const focusOut = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.background = 'rgba(255,255,255,0.05)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1D1D1B',
      fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Isotipo pattern background ── */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cline x1='36' y1='6' x2='36' y2='38' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='10' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3Cline x1='36' y1='38' x2='62' y2='62' stroke='%2324CEA6' strokeWidth='5' strokeLinecap='round'/%3E%3C/svg%3E")`,
        backgroundSize: '72px 72px',
      }} />

      {/* ── Glow blobs ── */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-8%',
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(36,206,166,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'floatBlob 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-8%',
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(231,53,56,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'floatBlob 12s ease-in-out infinite 3s',
      }} />

      {/* ── Dot accents ── */}
      <div style={{ position: 'absolute', top: '28%', right: '22%', width: 6, height: 6, borderRadius: '50%', background: '#24CEA6', opacity: 0.5, animation: 'pulse 2s infinite' }} />
      <div style={{ position: 'absolute', bottom: '32%', left: '18%', width: 4, height: 4, borderRadius: '50%', background: '#E73538', opacity: 0.4, animation: 'pulse 2.5s infinite 1s' }} />
      <div style={{ position: 'absolute', top: '65%', right: '16%', width: 5, height: 5, borderRadius: '50%', background: '#EBE43C', opacity: 0.35, animation: 'pulse 3s infinite 2s' }} />

      {/* ── Left brand bar ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #E73538, #24CEA6)' }} />

      {/* ══════════════════════
          LOGIN CARD
      ══════════════════════ */}
      <div
        className="login-container"
        style={{
          position: 'relative', zIndex: 10,
          width: 460, maxWidth: '92vw',
        }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(36,206,166,0.18)',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}>

          {/* Top accent bar */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, #E73538 30%, #24CEA6)' }} />

          <div style={{ padding: '44px 40px' }}>

            {/* ── Brand header ── */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <img
                  src={logo}
                  alt="II SKIN Logo"
                  style={{ height: 68, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <h1 style={{
                color: '#fff', fontSize: 26, fontWeight: 900,
                fontFamily: "'Courier New', monospace",
                letterSpacing: 5, marginBottom: 6,
              }}>
                II SKIN
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>
                Tu Segunda Piel
              </p>
              <div style={{
                width: 48, height: 2,
                background: 'linear-gradient(90deg, transparent, #24CEA6, transparent)',
                margin: '14px auto 0',
              }} />
            </div>

            {/* ── Welcome text ── */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
                Bienvenido de vuelta
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, lineHeight: 1.6 }}>
                Inicia sesión para acceder a tu cuenta II SKIN
              </p>
            </div>

            {/* ── Alert ── */}
            {alert && (
              <div style={{
                padding: '12px 16px', borderRadius: 2, marginBottom: 24,
                display: 'flex', alignItems: 'center', gap: 10,
                background: alert.type === 'success'
                  ? 'rgba(36,206,166,0.1)' : 'rgba(231,53,56,0.1)',
                border: `1px solid ${alert.type === 'success' ? 'rgba(36,206,166,0.35)' : 'rgba(231,53,56,0.35)'}`,
                color: alert.type === 'success' ? '#24CEA6' : '#E73538',
                fontSize: 13, fontWeight: 600,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: alert.type === 'success' ? '#24CEA6' : '#E73538',
                }} />
                {alert.message}
              </div>
            )}

            {/* ── Form fields ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block', marginBottom: 8,
                  color: 'rgba(255,255,255,0.55)', fontSize: 10,
                  letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                }}>
                  Correo Electrónico
                </label>
                <input
                  type="email" name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputBase}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{
                  display: 'block', marginBottom: 8,
                  color: 'rgba(255,255,255,0.55)', fontSize: 10,
                  letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ ...inputBase, paddingRight: 48 }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    style={{
                      position: 'absolute', right: 14, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.3)', padding: 4,
                      display: 'flex', alignItems: 'center',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (
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
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  color: 'rgba(255,255,255,0.45)', fontSize: 13, cursor: 'pointer',
                }}>
                  <div style={{ position: 'relative', width: 18, height: 18 }}>
                    <input type="checkbox" id="remember" style={{
                      position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', margin: 0,
                    }} />
                    <div style={{
                      width: 18, height: 18,
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 2, background: 'rgba(255,255,255,0.04)',
                    }} />
                  </div>
                  <span>Recordarme</span>
                </label>
                <a
                  href="/recuperar"
                  style={{
                    color: '#24CEA6', fontSize: 12, fontWeight: 700,
                    textDecoration: 'none', letterSpacing: 0.5,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? 'rgba(36,206,166,0.5)' : '#24CEA6',
                  color: '#1D1D1B',
                  border: 'none', borderRadius: 2,
                  padding: '14px',
                  fontSize: 13, fontWeight: 800,
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
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    animation: 'shimmer 1.6s infinite',
                  }} />
                )}
                {loading && (
                  <div style={{
                    width: 16, height: 16,
                    border: '2px solid rgba(29,29,27,0.3)',
                    borderTopColor: '#1D1D1B',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    flexShrink: 0,
                  }} />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{buttonText}</span>
              </button>

              {/* Back to home */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => (window.location.href = "/")}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.35)', fontSize: 13,
                    fontWeight: 600, transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                >
                  ← Volver al inicio
                </button>
              </div>
            </div>

            {/* ── Register link ── */}
            <div style={{
              marginTop: 28, paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.07)',
              textAlign: 'center',
            }}>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14 }}>
                ¿No tienes una cuenta?{' '}
                <a
                  href="/register"
                  style={{
                    color: '#24CEA6', fontWeight: 800,
                    textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Regístrate aquí
                </a>
              </p>
            </div>

          </div>

          {/* ── Corner decoratives ── */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 100, height: 100,
            background: 'radial-gradient(circle at top right, rgba(36,206,166,0.08), transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: 120, height: 120,
            background: 'radial-gradient(circle at bottom left, rgba(231,53,56,0.06), transparent 70%)',
            pointerEvents: 'none',
          }} />

        </div>

        {/* ── Brand tag below card ── */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase' }}>
            TU SEGUNDA PIEL · WWW.IISKIN.COM
          </span>
        </div>
      </div>

      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-24px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}