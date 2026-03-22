import React, { useState } from 'react';
import { Card, SectionTitle, Badge, SearchInput, FilterBtn } from '../components/UI';

const FAKE_ORDERS = [
  { id: '#ORD-1041', cliente: 'Laura Gómez',      producto: 'Chaqueta Rompevientos Pro',  talla: 'M',      color: '#24CEA6', colorNom: 'Teal',  cant: 2,  total: '$370.000', estado: 'Enviado',    fecha: '20 Feb 2026' },
  { id: '#ORD-1040', cliente: 'Carlos Ríos',       producto: 'Leggings Compresión Max',    talla: 'L',      color: '#1D1D1B', colorNom: 'Negro', cant: 3,  total: '$375.000', estado: 'Pendiente',  fecha: '19 Feb 2026' },
  { id: '#ORD-1039', cliente: 'Distribuidora DK',  producto: 'Camiseta Dry-Fit x12',       talla: 'Varios', color: '#E73538', colorNom: 'Rojo',  cant: 12, total: '$660.000', estado: 'Procesando', fecha: '18 Feb 2026' },
  { id: '#ORD-1038', cliente: 'Marcela Torres',    producto: 'Gorra II SKIN Signature',    talla: 'Única',  color: '#1D1D1B', colorNom: 'Negro', cant: 1,  total: '$55.000',  estado: 'Enviado',    fecha: '17 Feb 2026' },
  { id: '#ORD-1037', cliente: 'Sport Zone Cali',   producto: 'Leggings Running Sport x6',  talla: 'Varios', color: '#4F8DCB', colorNom: 'Azul',  cant: 6,  total: '$492.000', estado: 'Entregado',  fecha: '16 Feb 2026' },
  { id: '#ORD-1036', cliente: 'Andrea Molina',     producto: 'Top Deportivo Pro',           talla: 'S',      color: '#F731B5', colorNom: 'Rosa',  cant: 2,  total: '$170.000', estado: 'Pendiente',  fecha: '15 Feb 2026' },
  { id: '#ORD-1035', cliente: 'Tienda Atlética BG',producto: 'Pack Medias x3 (x10 packs)', talla: '39-42',  color: '#24CEA6', colorNom: 'Teal',  cant: 10, total: '$280.000', estado: 'Entregado',  fecha: '14 Feb 2026' },
];

const ESTADOS = ['Todos', 'Pendiente', 'Procesando', 'Enviado', 'Entregado'];

const PedidosView = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');

  const filtered = FAKE_ORDERS.filter(o => {
    const matchF = filter === 'Todos' || o.estado === filter;
    const matchS = o.cliente.toLowerCase().includes(search.toLowerCase()) ||
                   o.id.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <SectionTitle label="Gestión de Ventas" title="PEDIDOS" />
        <span style={{
          fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700,
          color: '#b8aa00', background: 'rgba(235,228,60,0.1)', padding: '5px 12px', borderRadius: 2,
          border: '1px solid rgba(235,228,60,0.2)',
        }}>
          🚧 Datos demo — backend próximamente
        </span>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar pedido o cliente..." />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ESTADOS.map(e => (
            <FilterBtn key={e} label={e} active={filter === e} onClick={() => setFilter(e)} />
          ))}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginLeft: 'auto' }}>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <Card style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Pedido', 'Cliente', 'Producto', 'Color', 'Cant.', 'Total', 'Estado', 'Fecha'].map(h => (
                  <th key={h} style={{
                    padding: '14px 16px', textAlign: 'left', fontSize: 9,
                    letterSpacing: 2, color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '13px 16px', fontSize: 11, color: '#24CEA6', fontFamily: 'monospace', fontWeight: 700 }}>{o.id}</td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#fff', fontWeight: 600 }}>{o.cliente}</td>
                  <td style={{ padding: '13px 16px', maxWidth: 180 }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{o.producto}</span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>Talla: {o.talla}</span>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: o.color, border: '1.5px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{o.colorNom}</span>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>{o.cant}</td>
                  <td style={{ padding: '13px 16px', fontSize: 13, color: '#fff', fontFamily: 'monospace', fontWeight: 800 }}>{o.total}</td>
                  <td style={{ padding: '13px 16px' }}><Badge estado={o.estado} /></td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>{o.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PedidosView;