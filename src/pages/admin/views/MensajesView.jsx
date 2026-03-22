import React, { useState, useEffect } from 'react';
import { Card, SectionTitle, ActionBtn } from '../components/UI';
import API_URL from '../../../config/config';


const MensajesView = () => {
  const [mensajes, setMensajes]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [reply, setReply]         = useState('');
  const [sending, setSending]     = useState(false);
  const [error, setError]         = useState('');

  // ─── Cargar contactos reales ───────────────────────────
  useEffect(() => {
    fetchContactos();
  }, []);

  const fetchContactos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/contact`);
      const data = await res.json();
      setMensajes(data);
    } catch (err) {
      console.error('Error cargando contactos:', err);
      setError('No se pudieron cargar los mensajes');
    } finally {
      setLoading(false);
    }
  };

  // ─── Responder contacto ────────────────────────────────
  const handleReply = async () => {
    if (!reply.trim() || selected === null) return;
    const contacto = mensajes[selected];
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/contacto/responder/${contacto._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage: reply }),
      });
      if (!res.ok) throw new Error('Error al enviar respuesta');

      // Actualizar estado local sin recargar todo
      setMensajes(prev => prev.map((m, i) =>
        i === selected ? { ...m, replied: true, replyMessage: reply } : m
      ));
      setReply('');
    } catch (err) {
      setError('No se pudo enviar la respuesta');
    } finally {
      setSending(false);
    }
  };

  const unread = mensajes.filter(m => !m.replied).length;
  const selectedMsg = selected !== null ? mensajes[selected] : null;

  // ─── Helpers de display ───────────────────────────────
  const formatFecha = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <SectionTitle label="Comunicaciones" title="MENSAJES" />
          {unread > 0 && (
            <span style={{
              background: '#E73538', color: '#fff', width: 22, height: 22, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 900, marginBottom: 28,
            }}>{unread}</span>
          )}
        </div>
        <button onClick={fetchContactos} style={{
          fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700,
          color: '#24CEA6', background: 'transparent', border: '1px solid rgba(36,206,166,0.3)',
          padding: '5px 12px', borderRadius: 2, cursor: 'pointer',
        }}>↻ Actualizar</button>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', padding: 40 }}>
          Cargando mensajes...
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

          {/* Lista de mensajes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {mensajes.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, textAlign: 'center', padding: 40 }}>
                No hay mensajes aún
              </p>
            )}
            {mensajes.map((m, i) => (
              <div key={m._id} onClick={() => setSelected(i)} style={{
                background: selected === i
                  ? 'rgba(36,206,166,0.08)'
                  : m.replied ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${selected === i ? 'rgba(36,206,166,0.3)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 4, padding: '14px 16px', cursor: 'pointer',
                transition: 'all 0.15s', position: 'relative',
              }}>
                {/* Punto verde = sin responder */}
                {!m.replied && (
                  <div style={{ position: 'absolute', top: 14, right: 14, width: 7, height: 7, borderRadius: '50%', background: '#24CEA6' }} />
                )}
                {/* Check = ya respondido */}
                {m.replied && (
                  <div style={{ position: 'absolute', top: 12, right: 14, fontSize: 10, color: 'rgba(36,206,166,0.5)' }}>✓ respondido</div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <p style={{ fontSize: 12, fontWeight: m.replied ? 500 : 800, color: m.replied ? 'rgba(255,255,255,0.6)' : '#fff' }}>
                    {m.name}
                  </p>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{formatFecha(m.createdAt)}</p>
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{m.email}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.message}
                </p>
              </div>
            ))}
          </div>

          {/* Detalle del mensaje */}
          {selectedMsg ? (
            <Card style={{ padding: '28px 28px' }}>
              <p style={{ fontSize: 9, letterSpacing: 3, color: '#24CEA6', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Mensaje de</p>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: 'monospace', marginBottom: 4 }}>
                {selectedMsg.name}
              </h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{selectedMsg.email}</p>
              {selectedMsg.company && (
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>🏢 {selectedMsg.company}</p>
              )}
              {selectedMsg.phone && (
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>📞 {selectedMsg.phone}</p>
              )}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 28 }}>
                {selectedMsg.message}
              </p>

              {/* Si ya fue respondido, mostrar respuesta anterior */}
              {selectedMsg.replied && (
                <div style={{
                  background: 'rgba(36,206,166,0.05)', border: '1px solid rgba(36,206,166,0.15)',
                  borderRadius: 4, padding: '12px 14px', marginBottom: 16,
                }}>
                  <p style={{ fontSize: 9, color: '#24CEA6', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>✓ Tu respuesta anterior</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{selectedMsg.replyMessage}</p>
                </div>
              )}

              {error && <p style={{ color: '#E73538', fontSize: 11, marginBottom: 8 }}>{error}</p>}

              <textarea
                placeholder={selectedMsg.replied ? 'Enviar otra respuesta...' : 'Escribir respuesta...'}
                rows={3}
                value={reply}
                onChange={e => setReply(e.target.value)}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4,
                  color: '#fff', padding: '12px 14px', fontSize: 12,
                  outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                  boxSizing: 'border-box', marginBottom: 10,
                }}
              />
              <ActionBtn
                label={sending ? 'Enviando...' : 'Responder →'}
                onClick={handleReply}
                disabled={sending || !reply.trim()}
              />
            </Card>
          ) : (
            <Card style={{ padding: '60px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>✉️</span>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>Selecciona un mensaje</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default MensajesView;
