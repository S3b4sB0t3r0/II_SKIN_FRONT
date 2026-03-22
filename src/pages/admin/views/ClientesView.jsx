import React, { useState, useEffect } from 'react';
import { Card, SectionTitle, SearchInput, FilterBtn } from '../components/UI';
import API_URL from '../../../config/config';

// ─── Service (inline) ────────────────────────────────────────────────────────

const getUsers   = async ()      => { const r = await fetch(API_URL);                                                                                                      if (!r.ok) throw new Error("Error al obtener clientes");    return r.json(); };
const updateUser = async (id, d) => { const r = await fetch(`${API_URL}/${id}`, { method: "PUT",    headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }); if (!r.ok) throw new Error("Error al actualizar cliente"); return r.json(); };
const deleteUser = async (id)    => { const r = await fetch(`${API_URL}/${id}`, { method: "DELETE" });                                                                     if (!r.ok) throw new Error("Error al eliminar cliente");    return r.json(); };

// ─── Modal Edición ────────────────────────────────────────────────────────────
const EditModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    firstName: user.firstName || '',
    lastName:  user.lastName  || '',
    email:     user.email     || '',
    phone:     user.phone     || '',
    role:      user.role      || 'Detal',
  });
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState(null);

  const inp = (label, key, type = 'text') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 700 }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none' }}
        onFocus={e => e.target.style.borderColor = '#24CEA6'}
        onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  );

  const handleSave = async () => {
    setSaving(true); setError(null);
    try {
      const response = await updateUser(user._id, form);
      onSave(response.user);
    }
    catch (err) { setError(err.message); }
    finally     { setSaving(false); }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#16161A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 32, width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: 3, color: '#24CEA6', textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>Editar cliente</p>
            <h3 style={{ margin: '4px 0 0', fontSize: 18, color: '#fff', fontWeight: 800 }}>{user.firstName} {user.lastName}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 20, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {inp('Nombre',   'firstName')}
          {inp('Apellido', 'lastName')}
          {inp('Email',    'email', 'email')}
          {inp('Teléfono', 'phone', 'tel')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 700 }}>Tipo</label>
            <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none' }}>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
            <option value="Detal">Detal</option>
            <option value="Mayorista">Mayorista</option>
          </select>
          </div>
        </div>

        {error && <p style={{ margin: 0, fontSize: 11, color: '#FF6B6B', background: 'rgba(255,107,107,0.1)', padding: '8px 12px', borderRadius: 4 }}>⚠️ {error}</p>}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Cancelar</button>
          <button onClick={handleSave} disabled={saving} style={{ padding: '10px 24px', borderRadius: 4, border: 'none', background: saving ? 'rgba(36,206,166,0.4)' : '#24CEA6', color: '#0D0D0D', fontSize: 12, cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 800 }}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Modal Confirmación ───────────────────────────────────────────────────────
const ConfirmModal = ({ user, onClose, onConfirm }) => (
  <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div onClick={e => e.stopPropagation()} style={{ background: '#16161A', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 8, padding: 32, width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
      <div style={{ fontSize: 32, textAlign: 'center' }}>🗑️</div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 6px', color: '#fff', fontSize: 16, fontWeight: 800 }}>¿Eliminar cliente?</h3>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Esto eliminará a <strong style={{ color: '#fff' }}>{user.firstName} {user.lastName}</strong> de forma permanente.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onClose}   style={{ flex: 1, padding: '10px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Cancelar</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: 4, border: 'none', background: '#FF4444', color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 800 }}>Sí, eliminar</button>
      </div>
    </div>
  </div>
);

// ─── Vista Principal ──────────────────────────────────────────────────────────
const ClientesView = () => {
  const [clientes, setClientes] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('Todos');
  const [editUser, setEditUser] = useState(null);
  const [delUser,  setDelUser]  = useState(null);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true); setError(null);
    try   { setClientes(await getUsers()); }
    catch (err) { setError(err.message); }
    finally     { setLoading(false); }
  };

  const handleSave = (updated) => {
    setClientes(prev => prev.map(c => c._id === updated._id ? { ...c, ...updated } : c));
    setEditUser(null);
  };

  const handleDelete = async () => {
    const id = delUser._id;
    setClientes(prev => prev.filter(c => c._id !== id));
    setDelUser(null);
    try { await deleteUser(id); } catch { loadUsers(); }
  };

  const filtered = clientes.filter(c => {
    const tipo   = c.role || c.tipo || '';
    const matchT = filter === 'Todos' || tipo === filter;
    const nombre = `${c.firstName || ''} ${c.lastName || ''}`.toLowerCase();
    const ciudad = (c.ciudad || '').toLowerCase();
    return matchT && (nombre.includes(search.toLowerCase()) || ciudad.includes(search.toLowerCase()));
  });

  const getInitial = c => (c.firstName || '?')[0].toUpperCase();
  const getNombre  = c => `${c.firstName || ''} ${c.lastName || ''}`.trim();
  const getTipo    = c => c.role || c.tipo || '—';
  const badge = t => {
    if (t === 'admin')     return { color: '#FF6B6B', bg: 'rgba(255,107,107,0.1)' };
    if (t === 'Mayorista') return { color: '#24CEA6', bg: 'rgba(36,206,166,0.1)'  };
    if (t === 'Detal')     return { color: '#4F8DCB', bg: 'rgba(79,141,203,0.1)'  };
    return                        { color: '#aaa',    bg: 'rgba(255,255,255,0.07)' }; // cliente
  };

  return (
    <>
      {editUser && <EditModal    user={editUser} onClose={() => setEditUser(null)} onSave={handleSave} />}
      {delUser  && <ConfirmModal user={delUser}  onClose={() => setDelUser(null)}  onConfirm={handleDelete} />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <SectionTitle label="Base de Clientes" title="CLIENTES" />
          <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, color: '#24CEA6', background: 'rgba(36,206,166,0.1)', padding: '5px 12px', borderRadius: 2, border: '1px solid rgba(36,206,166,0.2)' }}>
            ✅ Conectado al backend
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Buscar cliente o ciudad..." />
          {['Todos', 'Detal', 'Mayorista'].map(f => (
            <FilterBtn key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Cargando clientes...</div>
        )}

        {error && !loading && (
          <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 6, padding: '12px 16px', fontSize: 12, color: '#FF6B6B' }}>
            ⚠️ {error} — <button onClick={loadUsers} style={{ background: 'none', border: 'none', color: '#24CEA6', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <Card style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Cliente', 'Tipo', 'Email', 'Teléfono', 'Acciones'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>Sin resultados</td></tr>
                )}
                {filtered.map(c => {
                  const tipo = getTipo(c);
                  const b    = badge(tipo);
                  return (
                    <tr key={c._id}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #1D1D1B, #24CEA6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'monospace', flexShrink: 0 }}>{getInitial(c)}</div>
                          <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{getNombre(c)}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: b.color, background: b.bg, padding: '3px 8px', borderRadius: 2 }}>{tipo}</span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{c.email || '—'}</td>
                      <td style={{ padding: '14px 16px', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{c.phone || '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setEditUser(c)}
                            style={{ padding: '6px 14px', borderRadius: 3, border: '1px solid rgba(36,206,166,0.3)', background: 'rgba(36,206,166,0.07)', color: '#24CEA6', fontSize: 10, fontWeight: 700, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase' }}
                            onMouseEnter={e => e.target.style.background = 'rgba(36,206,166,0.15)'}
                            onMouseLeave={e => e.target.style.background = 'rgba(36,206,166,0.07)'}
                          >Editar</button>
                          <button onClick={() => setDelUser(c)}
                            style={{ padding: '6px 14px', borderRadius: 3, border: '1px solid rgba(255,68,68,0.3)', background: 'rgba(255,68,68,0.07)', color: '#FF6B6B', fontSize: 10, fontWeight: 700, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase' }}
                            onMouseEnter={e => e.target.style.background = 'rgba(255,68,68,0.15)'}
                            onMouseLeave={e => e.target.style.background = 'rgba(255,68,68,0.07)'}
                          >Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{filtered.length} de {clientes.length} clientes</span>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default ClientesView;