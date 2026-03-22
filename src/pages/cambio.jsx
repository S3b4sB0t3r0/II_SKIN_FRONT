import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../image/logo2.png';
import API_URL from '../config/config';

export default function CambiarContrasena() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Cambiar contraseña");
  const [showPasswords, setShowPasswords] = useState({ newPassword: false, confirmPassword: false });

  useEffect(() => {
    const container = document.querySelector(".cambiar-container");
    if (container) {
      container.style.opacity = "0";
      container.style.transform = "translateY(30px)";
      setTimeout(() => {
        container.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      }, 100);
    }
    if (!token) setAlert({ type: "error", message: "Token inválido o no proporcionado." });
  }, [token]);

  const showAlert = (message, type = "error") => setAlert({ message, type });
  const clearAlert = () => setAlert(null);

  const togglePasswordVisibility = (field) =>
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleInputChange = (field, value) =>
    setPasswords((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!token) { showAlert("Token no válido o expirado."); return; }
    if (passwords.newPassword.length < 6) { showAlert("La contraseña debe tener al menos 6 caracteres."); return; }
    if (passwords.newPassword !== passwords.confirmPassword) { showAlert("Las contraseñas no coinciden."); return; }

    setLoading(true);
    setButtonText("Cambiando contraseña...");
    clearAlert();

    try {
      const response = await fetch(`${API_URL}/api/user/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: passwords.newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error al cambiar la contraseña.");

      setButtonText("✅ ¡Contraseña actualizada!");
      showAlert("¡Contraseña cambiada exitosamente! Redirigiendo...", "success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      showAlert(error.message || "Error desconocido al cambiar la contraseña.");
      setButtonText("Cambiar contraseña");
    } finally {
      setLoading(false);
    }
  };

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

  const passwordsMatch =
    passwords.newPassword && passwords.confirmPassword &&
    passwords.newPassword === passwords.confirmPassword;
  const passwordsMismatch =
    passwords.newPassword && passwords.confirmPassword &&
    passwords.newPassword !== passwords.confirmPassword;

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
          CARD
      ══════════════════════ */}
      <div
        className="cambiar-container"
        style={{ position: 'relative', zIndex: 10, width: 460, maxWidth: '92vw' }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(36,206,166,0.18)',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          position: 'relative',
        }}>

          {/* Top accent bar */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, #E73538 30%, #24CEA6)' }} />

          <div style={{ padding: '44px 40px' }}>

            {/* ── Brand header ── */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
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

            {/* ── Section title ── */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
                Nueva contraseña
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, lineHeight: 1.6 }}>
                Ingresa y confirma tu nueva contraseña para recuperar el acceso a tu cuenta.
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
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: alert.type === 'success' ? '#24CEA6' : '#E73538',
                }} />
                {alert.message}
              </div>
            )}

            {/* ── Form fields ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Nueva contraseña */}
              <div>
                <label style={{
                  display: 'block', marginBottom: 8,
                  color: 'rgba(255,255,255,0.55)', fontSize: 10,
                  letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                }}>
                  Nueva contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={passwords.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    required
                    style={{ ...inputBase, paddingRight: 48 }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    aria-label="Mostrar/ocultar contraseña"
                    style={{
                      position: 'absolute', right: 14, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.3)', padding: 4,
                      display: 'flex', alignItems: 'center', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPasswords.newPassword ? (
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
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 6, paddingLeft: 2 }}>
                  Debe contener al menos 6 caracteres
                </p>
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label style={{
                  display: 'block', marginBottom: 8,
                  color: 'rgba(255,255,255,0.55)', fontSize: 10,
                  letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                }}>
                  Confirmar contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    placeholder="Repite la contraseña"
                    value={passwords.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    style={{
                      ...inputBase,
                      paddingRight: 48,
                      borderColor: passwordsMismatch
                        ? 'rgba(231,53,56,0.5)'
                        : passwordsMatch
                          ? 'rgba(36,206,166,0.5)'
                          : 'rgba(255,255,255,0.1)',
                    }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    aria-label="Mostrar/ocultar contraseña"
                    style={{
                      position: 'absolute', right: 14, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.3)', padding: 4,
                      display: 'flex', alignItems: 'center', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPasswords.confirmPassword ? (
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

                {/* Match indicator */}
                {(passwordsMatch || passwordsMismatch) && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    marginTop: 8, paddingLeft: 2,
                    color: passwordsMatch ? '#24CEA6' : '#E73538',
                    fontSize: 12, fontWeight: 600,
                    animation: 'fadeIn 0.2s ease-out',
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {passwordsMatch ? (
                        <polyline points="20 6 9 17 4 12"/>
                      ) : (
                        <>
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </>
                      )}
                    </svg>
                    {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !token}
                style={{
                  width: '100%',
                  background: loading || !token ? 'rgba(36,206,166,0.5)' : '#24CEA6',
                  color: '#1D1D1B',
                  border: 'none', borderRadius: 2,
                  padding: '14px',
                  fontSize: 13, fontWeight: 800,
                  letterSpacing: 3, textTransform: 'uppercase',
                  cursor: loading || !token ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  position: 'relative', overflow: 'hidden',
                  marginTop: 4,
                }}
                onMouseEnter={e => { if (!loading && token) { e.currentTarget.style.background = '#1ab892'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(36,206,166,0.35)'; }}}
                onMouseLeave={e => { e.currentTarget.style.background = loading || !token ? 'rgba(36,206,166,0.5)' : '#24CEA6'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
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

              {/* Back to login */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.35)', fontSize: 13,
                    fontWeight: 600, transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#24CEA6'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                >
                  ← Volver al inicio de sesión
                </button>
              </div>
            </div>

            {/* ── Security tips ── */}
            <div style={{
              marginTop: 28, paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 2, padding: '14px 16px',
              }}>
                <p style={{
                  color: 'rgba(255,255,255,0.55)', fontSize: 10,
                  letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                  marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                    viewBox="0 0 24 24" fill="none" stroke="#24CEA6"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Consejos de seguridad
                </p>
                <ul style={{
                  color: 'rgba(255,255,255,0.3)', fontSize: 12, lineHeight: 1.8,
                  listStyle: 'none', padding: 0, margin: 0,
                }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#24CEA6', fontSize: 10 }}>▸</span>
                    Usa al menos 8 caracteres con mayúsculas y números
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#24CEA6', fontSize: 10 }}>▸</span>
                    Evita usar información personal como fechas o nombres
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#24CEA6', fontSize: 10 }}>▸</span>
                    No compartas tu contraseña con nadie
                  </li>
                </ul>
              </div>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}