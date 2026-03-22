import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../image/logo2.png';

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);   // ← menú hamburger
  const [isUserOpen,   setIsUserOpen]   = useState(false);   // ← dropdown usuario
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [isLoggedIn,   setIsLoggedIn]   = useState(false);
  const [userName,     setUserName]     = useState('');
  const [userEmail,    setUserEmail]    = useState('');
  const [userRole,     setUserRole]     = useState('');

  const navigate  = useNavigate();
  const location  = useLocation();

  const toggleMobile = () => { setIsMobileOpen(p => !p); setIsUserOpen(false); };
  const closeMobile  = () => setIsMobileOpen(false);
  const toggleUser   = () => { setIsUserOpen(p => !p); setIsMobileOpen(false); };
  const closeUser    = () => setIsUserOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar-container')) {
        setIsMobileOpen(false);
        setIsUserOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    const token = localStorage.getItem('token');
    const user  = localStorage.getItem('user');

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.firstName || 'Usuario');
      setUserEmail(parsedUser.email    || '');
      setUserRole(parsedUser.role      || '');
      setIsLoggedIn(true);
    } else {
      setUserName(''); setUserEmail(''); setUserRole('');
      setIsLoggedIn(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSmoothScroll = (e, to) => {
    if (to.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      const target = document.querySelector(to);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    } else {
      e.preventDefault();
      navigate(to);
    }
    closeMobile();
    closeUser();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName(''); setUserEmail(''); setUserRole('');
    setIsUserOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/',          label: 'Inicio'    },
    { to: '/Nosotros',  label: 'Nosotros'  },
    { to: '/Coleccion', label: 'Colección' },
    { to: '/Contacto',  label: 'Contacto'  },
  ];

  // ─── Styles ───
  const S = {
    nav: {
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      transition: 'all 0.35s ease',
      background: isScrolled ? 'rgba(29,29,27,0.97)' : 'rgba(29,29,27,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: isScrolled
        ? '1px solid rgba(36,206,166,0.2)'
        : '1px solid rgba(255,255,255,0.06)',
    },
    inner: {
      maxWidth: 1280, margin: '0 auto', padding: '0 2rem', height: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    logoWrap: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' },
    logoImg:  { height: 40, width: 'auto', objectFit: 'contain', display: 'block' },
    logoText: { color: '#FFFFFF', fontFamily: "'Courier New', monospace", fontWeight: 900, fontSize: 20, letterSpacing: 4 },
    navList:  { display: 'flex', listStyle: 'none', gap: 36, alignItems: 'center' },
    navLink:  {
      color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
      fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
      padding: '4px 0', position: 'relative', transition: 'color 0.2s ease',
    },
    loginBtn: {
      background: '#24CEA6', color: '#1D1D1B', padding: '9px 22px', borderRadius: 2,
      textDecoration: 'none', fontSize: 12, fontWeight: 800, letterSpacing: 2,
      textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background 0.2s ease',
    },
    userBtn: {
      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
      background: 'rgba(36,206,166,0.12)', border: '1px solid rgba(36,206,166,0.35)',
      borderRadius: 2, color: '#fff', fontSize: 13, fontWeight: 600,
      cursor: 'pointer', transition: 'all 0.2s ease',
    },
    avatarCircle: {
      width: 28, height: 28, borderRadius: '50%',
      background: 'linear-gradient(135deg,#24CEA6,#1ab892)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#1D1D1B', fontSize: 13, fontWeight: 900, flexShrink: 0,
    },
    dropdown: {
      position: 'absolute', top: 'calc(100% + 10px)', right: 0, width: 288,
      background: 'rgba(29,29,27,0.98)', backdropFilter: 'blur(24px)',
      border: '1px solid rgba(36,206,166,0.2)', borderRadius: 4, overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(0,0,0,0.6)', zIndex: 99,
    },
    dropdownHeader: {
      padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(36,206,166,0.05)',
    },
    dropdownItem: {
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
      color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
      fontSize: 13, fontWeight: 500, transition: 'all 0.18s ease',
      cursor: 'pointer', background: 'transparent', border: 'none', width: '100%', textAlign: 'left',
    },
    hamburgerLine: {
      width: 22, height: 2, background: '#fff', borderRadius: 2,
      transition: 'all 0.3s ease', display: 'block',
    },
    mobileMenu: {
      position: 'absolute', top: '100%', left: 0, width: '100%',
      background: 'rgba(29,29,27,0.98)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(36,206,166,0.15)',
      boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
      transition: 'all 0.3s ease', overflow: 'hidden',
    },
  };

  return (
    <>
      <nav style={S.nav} className="navbar-container">
        <div style={S.inner}>

          {/* ── Logo ── */}
          <Link to="/" style={S.logoWrap} onClick={(e) => handleSmoothScroll(e, '/')}>
            <img src={logo} alt="II SKIN Logo" style={S.logoImg} />
            <span style={S.logoText}>II SKIN</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <ul style={{ ...S.navList, display: 'none' }} className="desktop-nav">
            {navLinks.map((item) => (
              <li key={item.to}>
                <a
                  href={item.to}
                  onClick={(e) => handleSmoothScroll(e, item.to)}
                  style={S.navLink}
                  onMouseEnter={e => { e.currentTarget.style.color = '#24CEA6'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                >
                  {item.label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
                    background: '#24CEA6', transform: 'scaleX(0)',
                    transformOrigin: 'left', transition: 'transform 0.25s ease',
                  }} className="nav-underline" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* Login o Usuario */}
            {!isLoggedIn ? (
              <Link
                to="/login" style={S.loginBtn}
                onMouseEnter={e => e.currentTarget.style.background = '#1ab892'}
                onMouseLeave={e => e.currentTarget.style.background = '#24CEA6'}
              >
                Iniciar Sesión
              </Link>
            ) : (
              /* Contenedor relativo propio del dropdown */
              <div style={{ position: 'relative' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleUser(); }}
                  style={S.userBtn}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = 'rgba(36,206,166,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(36,206,166,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'rgba(36,206,166,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(36,206,166,0.35)';
                  }}
                  aria-label="User menu"
                >
                  <div style={S.avatarCircle}>{userName.charAt(0).toUpperCase()}</div>
                  <span style={{ maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13 }}>
                    {userName}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="#24CEA6" strokeWidth="2.5"
                    style={{ transition: 'transform 0.3s ease', transform: isUserOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserOpen && (
                  <div style={S.dropdown}>
                    <div style={S.dropdownHeader}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg,#24CEA6,#1ab892)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#1D1D1B', fontSize: 18, fontWeight: 900,
                        }}>
                          {userName.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {userName}
                          </div>
                          <div style={{
                            color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 1.4,
                            wordBreak: 'break-all', overflowWrap: 'break-word',
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          }}>
                            {userEmail}
                          </div>
                          <div style={{ display: 'inline-block', marginTop: 6, padding: '3px 8px', borderRadius: 2, background: 'rgba(36,206,166,0.12)', border: '1px solid rgba(36,206,166,0.3)' }}>
                            <span style={{ color: '#24CEA6', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{userRole}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#24CEA6,transparent)' }} />

                      {[{ to: '/perfil', icon: '👤', label: 'Mi Perfil' }].map((item) => (
                        <Link
                          key={item.to} to={item.to} onClick={closeUser}
                          style={S.dropdownItem}
                          onMouseEnter={e => {
                            e.currentTarget.style.background  = 'rgba(36,206,166,0.1)';
                            e.currentTarget.style.color       = '#24CEA6';
                            e.currentTarget.style.paddingLeft = '24px';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background  = 'transparent';
                            e.currentTarget.style.color       = 'rgba(255,255,255,0.8)';
                            e.currentTarget.style.paddingLeft = '20px';
                          }}
                        >
                          <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}

                      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

                      <button
                        onClick={handleLogout}
                        style={{ ...S.dropdownItem, color: 'rgba(255,100,100,0.75)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background  = 'rgba(231,53,56,0.1)';
                          e.currentTarget.style.color       = '#E73538';
                          e.currentTarget.style.paddingLeft = '24px';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background  = 'transparent';
                          e.currentTarget.style.color       = 'rgba(255,100,100,0.75)';
                          e.currentTarget.style.paddingLeft = '20px';
                        }}
                      >
                        <span style={{ fontSize: 16, flexShrink: 0 }}>🚪</span>
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Hamburger — solo en móvil ── */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleMobile(); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }}
              aria-label="Toggle menu"
              className="mobile-toggle"
            >
              <span style={{ ...S.hamburgerLine, transform: isMobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ ...S.hamburgerLine, opacity: isMobileOpen ? 0 : 1, transform: isMobileOpen ? 'scaleX(0)' : 'none' }} />
              <span style={{ ...S.hamburgerLine, transform: isMobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div style={{
          ...S.mobileMenu,
          opacity:    isMobileOpen ? 1 : 0,
          visibility: isMobileOpen ? 'visible' : 'hidden',
          transform:  isMobileOpen ? 'translateY(0)' : 'translateY(-8px)',
        }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(to bottom,#E73538,#24CEA6)' }} />

          <ul style={{ listStyle: 'none', padding: '24px 2rem 24px 2.5rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((item) => (
              <li key={item.to}>
                <a
                  href={item.to}
                  onClick={(e) => handleSmoothScroll(e, item.to)}
                  style={{
                    display: 'block', color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                    padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#24CEA6'; e.currentTarget.style.paddingLeft = '8px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  {item.label}
                </a>
              </li>
            ))}

            {!isLoggedIn && (
              <li style={{ marginTop: 16 }}>
                <Link
                  to="/login"
                  style={{
                    display: 'inline-block', background: '#24CEA6', color: '#1D1D1B',
                    padding: '12px 28px', borderRadius: 2,
                    fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none',
                  }}
                >
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav   { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
        .desktop-nav a:hover .nav-underline { transform: scaleX(1) !important; }
      `}</style>
    </>
  );
};

export default Header;