import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../..//image/logo2.png';


// ── Views ──
import DashboardView  from './views/DashboardView';
import ProductosView  from './views/ProductosView';
import PedidosView    from './views/PedidosView';
import ClientesView   from './views/ClientesView';
import MensajesView   from './views/MensajesView';

// ─── Nav config ───
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',  icon: '⬛', view: DashboardView },
  { id: 'productos', label: 'Productos',  icon: '🎽', view: ProductosView },
  { id: 'clientes',  label: 'Clientes',   icon: '👥', view: ClientesView  },
  { id: 'mensajes',  label: 'Mensajes',   icon: '✉️', view: MensajesView  },
];

const UNREAD_MSGS = 3; // static for now — will come from backend

// ══════════════════════════════════════
//  ADMIN DASHBOARD SHELL
// ══════════════════════════════════════
const AdminDashboard = () => {
  const navigate                            = useNavigate();
  const [active, setActive]                 = useState('dashboard');
  const [collapsed, setCollapsed]           = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const CurrentView = NAV_ITEMS.find(n => n.id === active)?.view || DashboardView;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0e',
      display: 'flex',
      fontFamily: "'Segoe UI', 'Myriad Pro', Arial, sans-serif",
    }}>

      {/* ══ SIDEBAR ══════════════════════════════ */}
      <aside style={{
        width: collapsed ? 68 : 220,
        background: '#1D1D1B',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 100,
        borderRight: '1px solid rgba(255,255,255,0.05)',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      }}>

        {/* Logo */}
        <div style={{
          padding: collapsed ? '24px 16px' : '24px 22px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
          <img src={logo} alt="II Skin" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
          {!collapsed && (
            <div>
              <p style={{ color: '#fff', fontFamily: 'monospace', fontWeight: 900, fontSize: 15, letterSpacing: 1, lineHeight: 1 }}>II SKIN</p>
              <p style={{ color: '#24CEA6', fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const isActive  = active === item.id;
            const hasBadge  = item.id === 'mensajes' && UNREAD_MSGS > 0;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                title={collapsed ? item.label : ''}
                style={{
                  width: '100%', border: 'none', cursor: 'pointer',
                  padding: collapsed ? '14px 0' : '12px 22px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  background: isActive ? 'rgba(36,206,166,0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid #24CEA6' : '3px solid transparent',
                  color: isActive ? '#24CEA6' : 'rgba(255,255,255,0.4)',
                  fontSize: 12, fontWeight: isActive ? 700 : 500,
                  letterSpacing: isActive ? 1.5 : 0,
                  textTransform: 'uppercase',
                  transition: 'all 0.15s',
                  textAlign: 'left',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}

                {/* Unread badge */}
                {hasBadge && !collapsed && (
                  <span style={{
                    marginLeft: 'auto', background: '#E73538', color: '#fff',
                    width: 18, height: 18, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 900,
                  }}>{UNREAD_MSGS}</span>
                )}
                {hasBadge && collapsed && (
                  <span style={{
                    position: 'absolute', top: 8, right: 10,
                    background: '#E73538', color: '#fff',
                    width: 14, height: 14, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 7, fontWeight: 900,
                  }}>{UNREAD_MSGS}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: collapse + logout */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: collapsed ? '14px 8px' : '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expandir' : 'Colapsar'}
            style={{
              width: '100%', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3,
              background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)',
              padding: '8px', cursor: 'pointer', fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
          >
            <span>{collapsed ? '→' : '←'}</span>
            {!collapsed && <span style={{ fontSize: 10, letterSpacing: 1 }}>Colapsar</span>}
          </button>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            style={{
              width: '100%', border: '1px solid rgba(231,53,56,0.2)', borderRadius: 3,
              background: 'rgba(231,53,56,0.05)', color: '#E73538',
              padding: '8px', cursor: 'pointer', fontSize: 10,
              fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(231,53,56,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(231,53,56,0.05)'}
          >
            <span>🚪</span>
            {!collapsed && <span>Salir</span>}
          </button>
        </div>
      </aside>

      {/* ══ MAIN ═════════════════════════════════ */}
      <main style={{
        marginLeft: collapsed ? 68 : 220,
        flex: 1,
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Top bar */}
        <div style={{
          background: 'rgba(29,29,27,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '0 32px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>II SKIN Admin</p>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
            <p style={{ color: '#24CEA6', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              {NAV_ITEMS.find(n => n.id === active)?.label}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#24CEA6', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>Sistema Activo</span>
            </div>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1D1D1B, #24CEA6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'monospace',
              border: '2px solid rgba(36,206,166,0.3)', cursor: 'pointer',
            }}>A</div>
          </div>
        </div>

        {/* View content */}
        <div style={{
          flex: 1,
          padding: '32px',
          background: `
            radial-gradient(ellipse at 80% 0%, rgba(36,206,166,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 80%, rgba(79,141,203,0.03) 0%, transparent 50%),
            #0f0f0e
          `,
        }}>
          <CurrentView />
        </div>

        {/* Footer strip */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '12px 32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {['#24CEA6','#E73538','#EBE43C','#F731B5','#4F8DCB'].map(c => (
              <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c, opacity: 0.6 }} />
            ))}
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginLeft: 6, letterSpacing: 2, textTransform: 'uppercase' }}>
              II SKIN SAS © 2026
            </span>
          </div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Panel Administrativo v1.0
          </span>
        </div>
      </main>

      {/* Global styles */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea::placeholder, input::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(36,206,166,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;