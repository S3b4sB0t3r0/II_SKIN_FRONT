// ─── Shared UI Components — II SKIN Admin ───

export const IISkinLogo = ({ size = 36, mainColor = '#FFFFFF', accentColor = '#24CEA6' }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="8"  x2="50" y2="52" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
      <line x1="50" y1="52" x2="12" y2="88" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
      <line x1="50" y1="52" x2="88" y2="88" stroke={accentColor} strokeWidth="8" strokeLinecap="round"/>
      <line x1="42" y1="16" x2="42" y2="57" stroke={mainColor}  strokeWidth="7" strokeLinecap="round"/>
      <line x1="42" y1="57" x2="6"  y2="91" stroke={mainColor}  strokeWidth="7" strokeLinecap="round"/>
      <line x1="42" y1="57" x2="78" y2="91" stroke={mainColor}  strokeWidth="7" strokeLinecap="round"/>
    </svg>
  );
  
  export const Card = ({ children, style }) => (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 4,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, #24CEA6, #E73538)',
      }} />
      {children}
    </div>
  );
  
  export const Badge = ({ estado }) => {
    const map = {
      Enviado:    { bg: 'rgba(36,206,166,0.12)',  color: '#24CEA6',  dot: '#24CEA6' },
      Pendiente:  { bg: 'rgba(235,228,60,0.15)',  color: '#b8aa00',  dot: '#EBE43C' },
      Procesando: { bg: 'rgba(79,141,203,0.12)',  color: '#4F8DCB',  dot: '#4F8DCB' },
      Entregado:  { bg: 'rgba(98,97,97,0.10)',    color: '#626161',  dot: '#626161' },
      Cancelado:  { bg: 'rgba(231,53,56,0.12)',   color: '#E73538',  dot: '#E73538' },
    };
    const s = map[estado] || map['Pendiente'];
    return (
      <span style={{
        background: s.bg, color: s.color,
        padding: '3px 10px', borderRadius: 2,
        fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
        textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
        {estado}
      </span>
    );
  };
  
  export const SectionTitle = ({ label, title }) => (
    <div style={{ marginBottom: 28 }}>
      <p style={{
        color: '#E73538', fontSize: 10, letterSpacing: 4,
        fontWeight: 700, textTransform: 'uppercase', marginBottom: 6,
      }}>— {label}</p>
      <h2 style={{
        fontSize: 22, fontWeight: 900,
        fontFamily: "'Courier New', monospace", color: '#fff',
      }}>{title}</h2>
    </div>
  );
  
  export const SearchInput = ({ value, onChange, placeholder }) => (
    <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
      <span style={{
        position: 'absolute', left: 12, top: '50%',
        transform: 'translateY(-50%)', fontSize: 13,
        color: 'rgba(255,255,255,0.3)',
      }}>🔍</span>
      <input
        placeholder={placeholder || 'Buscar...'}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px 10px 36px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 4, color: '#fff', fontSize: 12,
          outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
        }}
      />
    </div>
  );
  
  export const FilterBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 2, border: 'none', cursor: 'pointer',
      background: active ? '#24CEA6' : 'rgba(255,255,255,0.06)',
      color: active ? '#1D1D1B' : 'rgba(255,255,255,0.5)',
      fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
      textTransform: 'uppercase', transition: 'all 0.15s',
    }}>{label}</button>
  );
  
  export const ActionBtn = ({ label, onClick, variant = 'primary', icon, small }) => {
    const styles = {
      primary:   { background: '#24CEA6', color: '#1D1D1B', border: 'none' },
      danger:    { background: 'rgba(231,53,56,0.12)', color: '#E73538', border: '1px solid rgba(231,53,56,0.3)' },
      secondary: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' },
    };
    const s = styles[variant] || styles.primary;
    return (
      <button onClick={onClick} style={{
        ...s, padding: small ? '6px 12px' : '10px 18px',
        borderRadius: 2, cursor: 'pointer', fontSize: small ? 10 : 11,
        fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        transition: 'all 0.15s', fontFamily: 'inherit',
      }}>
        {icon && <span>{icon}</span>}
        {label}
      </button>
    );
  };
  
  export const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 4,
    color: '#fff',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };
  
  export const labelStyle = {
    display: 'block',
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 6,
  };