import React, { useEffect, useState } from 'react';
import { Card } from '../components/UI';

/* ─── Static data ─── */
const FAKE_STATS = [
  { label: 'Ventas del Mes',     value: '$4.280.000', delta: '+18%', up: true,  icon: '💰', accent: '#24CEA6' },
  { label: 'Pedidos Activos',    value: '34',          delta: '+7',   up: true,  icon: '📦', accent: '#4F8DCB' },
  { label: 'Clientes Nuevos',    value: '21',          delta: '+5',   up: true,  icon: '👥', accent: '#F731B5' },
  { label: 'Productos Agotados', value: '3',            delta: '-1',   up: false, icon: '⚠️', accent: '#E73538' },
];

const MONTHLY_SALES = [
  { mes: 'Sep', valor: 1800000 },
  { mes: 'Oct', valor: 2400000 },
  { mes: 'Nov', valor: 3100000 },
  { mes: 'Dic', valor: 4800000 },
  { mes: 'Ene', valor: 3200000 },
  { mes: 'Feb', valor: 4280000 },
];

const CATEGORY_DATA = [
  { cat: 'Chaquetas',  pct: 38, color: '#24CEA6' },
  { cat: 'Leggings',   pct: 31, color: '#4F8DCB' },
  { cat: 'Camisetas',  pct: 21, color: '#F731B5' },
  { cat: 'Accesorios', pct: 10, color: '#EBE43C' },
];

const RECENT_ORDERS = [
  { id: '#ORD-1041', cliente: 'Laura Gómez',     producto: 'Chaqueta Rompevientos Pro', total: '$370.000', estado: 'Enviado',    fecha: '20 Feb 2026' },
  { id: '#ORD-1040', cliente: 'Carlos Ríos',      producto: 'Leggings Compresión Max',  total: '$375.000', estado: 'Pendiente',  fecha: '19 Feb 2026' },
  { id: '#ORD-1039', cliente: 'Distribuidora DK', producto: 'Camiseta Dry-Fit x12',     total: '$660.000', estado: 'Procesando', fecha: '18 Feb 2026' },
  { id: '#ORD-1038', cliente: 'Marcela Torres',   producto: 'Gorra II SKIN Signature',  total: '$55.000',  estado: 'Enviado',    fecha: '17 Feb 2026' },
];

const ESTADO_STYLE = {
  Enviado:    { bg: 'rgba(36,206,166,0.12)',  color: '#24CEA6' },
  Pendiente:  { bg: 'rgba(235,228,60,0.15)',  color: '#b8aa00' },
  Procesando: { bg: 'rgba(79,141,203,0.12)',  color: '#4F8DCB' },
  Entregado:  { bg: 'rgba(98,97,97,0.10)',    color: '#626161' },
};

/* ─── SVG Clothing Icons ─── */
const TShirt = ({ style }) => (
  <svg viewBox="0 0 80 70" style={style} fill="none">
    <path d="M28 8 C28 8 32 14 40 14 C48 14 52 8 52 8 L66 18 L58 26 L58 58 L22 58 L22 26 L14 18 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

const Jacket = ({ style }) => (
  <svg viewBox="0 0 80 80" style={style} fill="none">
    <path d="M30 10 L16 22 L10 38 L20 40 L20 68 L60 68 L60 40 L70 38 L64 22 L50 10"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="M30 10 C30 10 33 18 40 18 C47 18 50 10 50 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M40 18 L40 68" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
    <path d="M20 40 L30 38 L30 68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M60 40 L50 38 L50 68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Leggings = ({ style }) => (
  <svg viewBox="0 0 60 90" style={style} fill="none">
    <path d="M12 10 L48 10 L48 18 L44 18 L36 60 L36 88 L24 88 L24 60 L16 18 L12 18 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M12 18 L48 18" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M30 18 L30 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const Cap = ({ style }) => (
  <svg viewBox="0 0 80 55" style={style} fill="none">
    <path d="M12 36 C12 20 26 10 40 10 C54 10 68 20 68 36 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M8 38 C8 36 10 34 12 36 L68 36 C70 34 72 36 72 38 C72 40 70 42 68 42 L12 42 C10 42 8 40 8 38Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="40" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M25 22 Q40 18 55 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Shorts = ({ style }) => (
  <svg viewBox="0 0 70 65" style={style} fill="none">
    <path d="M8 12 L62 12 L62 16 L56 56 L40 56 L35 30 L30 56 L14 56 L8 16 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M8 16 L62 16" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M35 16 L35 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const Tank = ({ style }) => (
  <svg viewBox="0 0 70 65" style={style} fill="none">
    <path d="M14 10 L8 24 L20 28 L20 58 L50 58 L50 28 L62 24 L56 10 C56 10 48 20 35 20 C22 20 14 10 14 10Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M14 10 C18 16 26 20 35 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M56 10 C52 16 44 20 35 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ICONS = [TShirt, Jacket, Leggings, Cap, Shorts, Tank];

/* ─── Floating item ─── */
const FloatingItem = ({ Icon, x, y, size, duration, delay, color, rotation, driftX, driftY }) => {
  const id = `fi${delay * 10}x${x}`;
  return (
    <>
      <style>{`
        @keyframes ${id} {
          0%   { transform: translate(0px,0px) rotate(${rotation}deg); opacity:.12; }
          25%  { transform: translate(${driftX*.4}px,${driftY*.3}px) rotate(${rotation+8}deg); opacity:.22; }
          50%  { transform: translate(${driftX}px,${driftY}px) rotate(${rotation+5}deg); opacity:.18; }
          75%  { transform: translate(${driftX*.6}px,${driftY*.7}px) rotate(${rotation-6}deg); opacity:.22; }
          100% { transform: translate(0px,0px) rotate(${rotation}deg); opacity:.12; }
        }
      `}</style>
      <div style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        width: size, height: size, color,
        animationName: id,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        pointerEvents: 'none',
      }}>
        <Icon style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  );
};

const ITEMS = [
  { i:0, x:5,  y:10, s:90,  d:9,  dl:0,   c:'#24CEA6', r:-15, dx:18,  dy:25  },
  { i:1, x:82, y:6,  s:110, d:11, dl:1.2, c:'#4F8DCB', r:12,  dx:-20, dy:30  },
  { i:2, x:3,  y:55, s:80,  d:8,  dl:0.7, c:'#F731B5', r:20,  dx:22,  dy:-18 },
  { i:3, x:88, y:50, s:75,  d:10, dl:2.1, c:'#EBE43C', r:-8,  dx:-15, dy:-22 },
  { i:4, x:18, y:72, s:95,  d:12, dl:0.3, c:'#24CEA6', r:5,   dx:14,  dy:-28 },
  { i:5, x:72, y:75, s:85,  d:9,  dl:1.8, c:'#4F8DCB', r:-18, dx:-18, dy:20  },
  { i:0, x:45, y:3,  s:65,  d:13, dl:3,   c:'#F731B5', r:25,  dx:12,  dy:22  },
  { i:2, x:60, y:85, s:70,  d:10, dl:1,   c:'#E73538', r:-10, dx:-16, dy:-14 },
  { i:1, x:30, y:88, s:60,  d:11, dl:2.5, c:'#24CEA6', r:15,  dx:10,  dy:-20 },
  { i:3, x:92, y:28, s:68,  d:8,  dl:0.5, c:'#EBE43C', r:-22, dx:-12, dy:18  },
  { i:5, x:10, y:35, s:55,  d:14, dl:4,   c:'#4F8DCB', r:8,   dx:16,  dy:26  },
  { i:4, x:55, y:55, s:50,  d:7,  dl:1.5, c:'#F731B5', r:-5,  dx:-8,  dy:-16 },
];

/* ─── Welcome Screen ─── */
const WelcomeScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {ITEMS.map((item, idx) => (
        <FloatingItem
          key={idx}
          Icon={ICONS[item.i]}
          x={item.x} y={item.y} size={item.s}
          duration={item.d} delay={item.dl}
          color={item.c} rotation={item.r}
          driftX={item.dx} driftY={item.dy}
        />
      ))}

      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(36,206,166,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 16,
          background: 'rgba(36,206,166,0.12)',
          border: '1px solid rgba(36,206,166,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
        }}>
          <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
            <path d="M10 8 C10 8 15 16 20 16 C25 16 30 8 30 8 L36 14 L32 18 L32 36 L8 36 L8 18 L4 14 Z"
              stroke="#24CEA6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
        </div>

        <p style={{ fontSize: 10, letterSpacing: 4, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>
          II SKIN ADMIN PANEL
        </p>

        <h1 style={{ fontSize: 52, fontWeight: 900, fontFamily: 'monospace', color: '#fff', lineHeight: 1.05, margin: '0 0 6px', letterSpacing: -1 }}>
          BIENVENIDO
        </h1>

        <h2 style={{
          fontSize: 52, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1.05, margin: 0, letterSpacing: -1,
          background: 'linear-gradient(90deg, #24CEA6, #4F8DCB)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          ADMINISTRADOR
        </h2>
      </div>
    </div>
  );
};

/* ─── Stats Dashboard (original) ─── */
const StatsDashboard = () => {
  const maxVal = Math.max(...MONTHLY_SALES.map(d => d.valor));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {FAKE_STATS.map((s, i) => (
          <Card key={i} style={{ padding: '22px 22px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <span style={{ fontSize: 26 }}>{s.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.up ? '#24CEA6' : '#E73538', background: s.up ? 'rgba(36,206,166,0.1)' : 'rgba(231,53,56,0.1)', padding: '2px 8px', borderRadius: 2 }}>{s.delta}</span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: 'monospace', lineHeight: 1, marginBottom: 6 }}>{s.value}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase' }}>{s.label}</p>
            <div style={{ marginTop: 14, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }}>
              <div style={{ width: '65%', height: '100%', background: s.accent, borderRadius: 1 }} />
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card style={{ padding: '26px 28px' }}>
          <p style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Ventas Mensuales</p>
          <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: 'monospace', marginBottom: 24 }}>ÚLTIMOS 6 MESES</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
            {MONTHLY_SALES.map((d, i) => {
              const h = (d.valor / maxVal) * 120;
              const isLast = i === MONTHLY_SALES.length - 1;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  {isLast && <span style={{ fontSize: 9, color: '#24CEA6', fontWeight: 700, letterSpacing: 1, whiteSpace: 'nowrap' }}>${(d.valor / 1000000).toFixed(1)}M</span>}
                  <div style={{ width: '100%', height: h, background: isLast ? 'linear-gradient(to top, #24CEA6, #4F8DCB)' : 'rgba(255,255,255,0.08)', borderRadius: '3px 3px 0 0', position: 'relative' }}>
                    {!isLast && <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>${(d.valor / 1000000).toFixed(1)}M</div>}
                  </div>
                  <span style={{ fontSize: 9, color: isLast ? '#24CEA6' : 'rgba(255,255,255,0.3)', fontWeight: isLast ? 800 : 500, letterSpacing: 1 }}>{d.mes}</span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card style={{ padding: '26px 24px' }}>
          <p style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Por Categoría</p>
          <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: 'monospace', marginBottom: 22 }}>VENTAS MIX</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CATEGORY_DATA.map((c, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{c.cat}</span>
                  <span style={{ fontSize: 11, color: c.color, fontWeight: 800, fontFamily: 'monospace' }}>{c.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Mejor Cat.</p>
              <p style={{ fontSize: 14, fontWeight: 900, color: '#24CEA6', fontFamily: 'monospace' }}>CHAQUETAS</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Unidades</p>
              <p style={{ fontSize: 14, fontWeight: 900, color: '#fff', fontFamily: 'monospace' }}>69 uds</p>
            </div>
          </div>
        </Card>
      </div>
      <Card style={{ padding: '26px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>Últimos Pedidos</p>
            <p style={{ fontSize: 16, fontWeight: 900, color: '#fff', fontFamily: 'monospace' }}>ACTIVIDAD RECIENTE</p>
          </div>
          <span style={{ fontSize: 10, color: '#24CEA6', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' }}>Ver todos →</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {RECENT_ORDERS.map((o, i) => {
            const est = ESTADO_STYLE[o.estado] || ESTADO_STYLE['Pendiente'];
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 80px 100px 100px', gap: 12, alignItems: 'center', padding: '11px 14px', borderRadius: 3, background: 'rgba(255,255,255,0.025)' }}>
                <span style={{ fontSize: 11, color: '#24CEA6', fontFamily: 'monospace', fontWeight: 700 }}>{o.id}</span>
                <div>
                  <p style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{o.cliente}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{o.producto}</p>
                </div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{o.fecha}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'monospace' }}>{o.total}</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: est.color, background: est.bg, padding: '3px 8px', borderRadius: 2, display: 'inline-block' }}>{o.estado}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

/* ─── Root ─── */
const DashboardView = () => {
  return <WelcomeScreen />;
};

export default DashboardView;