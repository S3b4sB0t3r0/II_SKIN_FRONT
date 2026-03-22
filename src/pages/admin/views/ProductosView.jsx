import React, { useState, useEffect } from 'react';
import {
  Card, SectionTitle, SearchInput, FilterBtn, ActionBtn,
  inputStyle, labelStyle,
} from '../components/UI';
import API_URL from '../../../config/config';

// ─── Color palette helper ───
const COLORS_PRESET = [
  { nombre: 'Negro Élite',   hex: '#1D1D1B' },
  { nombre: 'Teal Sport',    hex: '#24CEA6' },
  { nombre: 'Rojo Fuego',    hex: '#E73538' },
  { nombre: 'Amarillo Neón', hex: '#EBE43C' },
  { nombre: 'Rosa Potencia', hex: '#F731B5' },
  { nombre: 'Azul Cielo',    hex: '#4F8DCB' },
  { nombre: 'Blanco Puro',   hex: '#F8F8F8' },
];

const CATEGORIAS = ['Chaquetas', 'Leggings', 'Camisetas', 'Accesorios'];
const TALLAS_PRESET = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const GENEROS = ['Hombre', 'Mujer', 'Unisex'];

// ─── Empty product template ───
const emptyProduct = () => ({
  name: '',
  category: 'Chaquetas',
  description: '',
  material: '',
  collection: '',
  gender: 'Unisex',
  price: { retail: 0, wholesale: 0 },
  discountPercentage: 0,
  features: [],
  variants: [],
});

// ─── MODAL: Create / Edit ───
const ProductModal = ({ product, onClose, onSaved }) => {
  const isNew = !product._id;
  const [form, setForm] = useState(product);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [existingImageUrls, setExistingImageUrls] = useState(
    product.images?.length > 0 ? product.images : []
  );
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(
    product.images?.length > 0 ? product.images : []
  );

  // helpers
  const set = (path, value) => {
    setForm(prev => {
      const copy = { ...prev };
      const keys = path.split('.');
      let ref = copy;
      keys.slice(0, -1).forEach(k => { ref[k] = { ...ref[k] }; ref = ref[k]; });
      ref[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    // Límite de 5 imágenes en total
    const available = 5 - images.length;
    const toAdd = files.slice(0, available);
  
    setImages(prev => [...prev, ...toAdd]);
  
    toAdd.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setImagePreviews(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (idx) => {
    if (idx < existingImageUrls.length) {
      setExistingImageUrls(prev => prev.filter((_, i) => i !== idx));
    } else {
      const newIdx = idx - existingImageUrls.length;
      setImages(prev => prev.filter((_, i) => i !== newIdx));
    }
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const toggleFeature = (feat) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter(f => f !== feat)
        : [...prev.features, feat],
    }));
  };

  const toggleVariantColor = (color) => {
    setForm(prev => {
      const exists = prev.variants.find(v => v.color?.hex === color.hex);
      if (exists) {
        return { ...prev, variants: prev.variants.filter(v => v.color?.hex !== color.hex) };
      }
      return {
        ...prev,
        variants: [...prev.variants, { color, size: 'M', stock: 0 }],
      };
    });
  };

  const updateVariant = (idx, field, value) => {
    setForm(prev => {
      const variants = [...prev.variants];
      variants[idx] = { ...variants[idx], [field]: field === 'stock' ? Number(value) : value };
      return { ...prev, variants };
    });
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('El nombre es obligatorio'); return; }
    setSaving(true);
    setError(null);
    try {
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? `${API_URL}/api/products` : `${API_URL}/api/products/${form._id}`;

      // Build FormData to support image upload
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('description', form.description || '');
      formData.append('material', form.material || '');
      formData.append('collection', form.collection || '');
      formData.append('gender', form.gender || 'Unisex');
      formData.append('price', JSON.stringify(form.price));
      formData.append('discountPercentage', form.discountPercentage);
      formData.append('features', JSON.stringify(form.features));
      formData.append('variants', JSON.stringify(form.variants));
      formData.append('existingImages', JSON.stringify(existingImageUrls));
      images.forEach(file => {
        formData.append('images', file);
      });

      const res = await fetch(url, {
        method,
        body: formData,
        // ⚠️ No Content-Type header — browser sets multipart/form-data boundary automatically
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Error al guardar');
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: '#1a1a19', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6, width: '100%', maxWidth: 780,
        maxHeight: '92vh', overflowY: 'auto',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>

        {/* Top accent */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #24CEA6, #E73538)', borderRadius: '6px 6px 0 0' }} />

        {/* Header */}
        <div style={{
          padding: '24px 28px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ color: '#E73538', fontSize: 9, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              {isNew ? 'Nuevo Producto' : 'Editar Producto'}
            </p>
            <h3 style={{ color: '#fff', fontFamily: 'monospace', fontSize: 20, fontWeight: 900 }}>
              {isNew ? 'CREAR REFERENCIA' : form.name || 'SIN NOMBRE'}
            </h3>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Form body */}
        <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          {error && (
            <div style={{
              background: 'rgba(231,53,56,0.1)', border: '1px solid rgba(231,53,56,0.3)',
              borderLeft: '3px solid #E73538', padding: '12px 16px', borderRadius: 3,
              color: '#E73538', fontSize: 12,
            }}>⚠️ {error}</div>
          )}

          {/* Row 1: name + category */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Nombre del Producto *</label>
              <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ej: Chaqueta Rompevientos Pro" />
            </div>
            <div>
              <label style={labelStyle}>Categoría</label>
              <select style={{ ...inputStyle }} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: description */}
          <div>
            <label style={labelStyle}>Descripción</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe el producto..."
            />
          </div>

          {/* Row 3: prices + discount */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Precio Detal (COP)</label>
              <input style={inputStyle} type="number" value={form.price.retail} onChange={e => set('price.retail', Number(e.target.value))} />
            </div>
            <div>
              <label style={labelStyle}>Precio Mayorista (COP)</label>
              <input style={inputStyle} type="number" value={form.price.wholesale} onChange={e => set('price.wholesale', Number(e.target.value))} />
            </div>
            <div>
              <label style={labelStyle}>Descuento %</label>
              <input style={inputStyle} type="number" min="0" max="100" value={form.discountPercentage} onChange={e => set('discountPercentage', Number(e.target.value))} />
            </div>
          </div>

          {/* Row 4: material + collection + gender */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Material / Composición</label>
              <input style={inputStyle} value={form.material || ''} onChange={e => set('material', e.target.value)} placeholder="Ej: Poliéster 100% — 160g/m²" />
            </div>
            <div>
              <label style={labelStyle}>Colección</label>
              <input style={inputStyle} value={form.collection || ''} onChange={e => set('collection', e.target.value)} placeholder="Ej: Julio 2025" />
            </div>
            <div>
              <label style={labelStyle}>Género</label>
              <select style={{ ...inputStyle }} value={form.gender || 'Unisex'} onChange={e => set('gender', e.target.value)}>
                {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          {/* Row 5: imágenes del producto */}
          <div>
            <label style={labelStyle}>
              Imágenes del Producto{' '}
              <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
                ({imagePreviews.length}/5)
              </span>
            </label>

            {/* Grid de previews */}
            {imagePreviews.length > 0 && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                {imagePreviews.map((src, idx) => (
                  <div key={idx} style={{ position: 'relative', width: 80, height: 80 }}>
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      style={{
                        position: 'absolute', top: -6, right: -6,
                        width: 20, height: 20, borderRadius: '50%',
                        background: '#E73538', border: 'none', cursor: 'pointer',
                        color: '#fff', fontSize: 12, fontWeight: 900,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        lineHeight: 1,
                      }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Botón seleccionar */}
            {imagePreviews.length < 5 && (
              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 16px', borderRadius: 3, cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.6)', fontSize: 11,
                fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
              }}>
                📁 {imagePreviews.length === 0 ? 'Seleccionar imágenes' : 'Agregar más'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}

            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 8, letterSpacing: 0.5 }}>
              PNG, JPG o WEBP · Máx 5MB por imagen · Hasta 5 imágenes
            </p>
          </div>

          {/* Row 6: features */}
          <div>
            <label style={labelStyle}>Características Clave</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {['Dry-Fit', 'Compresión', 'Cortavientos', 'Anti-olor', 'Reflectivos', 'Capucha ajustable', 'Bolsillos con cremallera', '4-way stretch', 'UPF 50+', 'Transpirable'].map(feat => {
                const active = form.features?.includes(feat);
                return (
                  <button key={feat} onClick={() => toggleFeature(feat)} style={{
                    padding: '5px 12px', borderRadius: 2, cursor: 'pointer',
                    fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    border: `1px solid ${active ? '#24CEA6' : 'rgba(255,255,255,0.1)'}`,
                    background: active ? 'rgba(36,206,166,0.12)' : 'transparent',
                    color: active ? '#24CEA6' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.15s',
                  }}>{feat}</button>
                );
              })}
            </div>
            {/* Custom feature input */}
            <FeatureInput features={form.features || []} onChange={f => setForm(p => ({ ...p, features: f }))} />
          </div>

          {/* Row 7: variants (color + talla + stock) */}
          <div>
            <label style={labelStyle}>Colores disponibles</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {COLORS_PRESET.map(c => {
                const active = form.variants?.find(v => v.color?.hex === c.hex);
                return (
                  <button key={c.hex} onClick={() => toggleVariantColor(c)} title={c.nombre} style={{
                    width: 30, height: 30, borderRadius: '50%', background: c.hex,
                    border: active ? '3px solid #24CEA6' : '2px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer', outline: active ? '2px solid rgba(36,206,166,0.4)' : 'none',
                    outlineOffset: 2, transition: 'all 0.15s',
                    boxShadow: c.hex === '#F8F8F8' ? 'inset 0 0 0 1px #ccc' : 'none',
                  }} />
                );
              })}
            </div>

            {form.variants?.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr', gap: 10, alignItems: 'center' }}>
                  <div />
                  {['Color', 'Talla', 'Stock'].map(h => (
                    <p key={h} style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 700 }}>{h}</p>
                  ))}
                </div>
                {form.variants.map((v, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr', gap: 10, alignItems: 'center' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', background: v.color?.hex,
                      border: '2px solid rgba(255,255,255,0.2)',
                      boxShadow: v.color?.hex === '#F8F8F8' ? 'inset 0 0 0 1px #ccc' : 'none',
                    }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{v.color?.nombre}</span>
                    <select
                      style={{ ...inputStyle, padding: '8px 10px', fontSize: 12 }}
                      value={v.size || 'M'}
                      onChange={e => updateVariant(idx, 'size', e.target.value)}
                    >
                      {TALLAS_PRESET.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input
                      type="number" min="0"
                      style={{ ...inputStyle, padding: '8px 10px', fontSize: 12 }}
                      value={v.stock ?? 0}
                      onChange={e => updateVariant(idx, 'stock', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <ActionBtn label="Cancelar" variant="secondary" onClick={onClose} />
            <ActionBtn
              label={saving ? 'Guardando...' : isNew ? 'Crear Producto' : 'Guardar Cambios'}
              icon={isNew ? '✚' : '✓'}
              onClick={handleSave}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Small helper: add custom feature tag
const FeatureInput = ({ features, onChange }) => {
  const [val, setVal] = useState('');
  const add = () => {
    const t = val.trim();
    if (t && !features.includes(t)) onChange([...features, t]);
    setVal('');
  };
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        style={{ ...inputStyle, maxWidth: 220, padding: '8px 12px', fontSize: 11 }}
        placeholder="Agregar característica personalizada..."
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && add()}
      />
      <ActionBtn label="Agregar" small onClick={add} variant="secondary" />
    </div>
  );
};

// ─── Delete confirm modal ───
const DeleteConfirm = ({ product, onConfirm, onClose }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 300,
    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }} onClick={onClose}>
    <div style={{
      background: '#1a1a19', border: '1px solid rgba(231,53,56,0.3)',
      borderTop: '3px solid #E73538', borderRadius: 6,
      padding: '32px 36px', maxWidth: 400, width: '100%', textAlign: 'center',
    }} onClick={e => e.stopPropagation()}>
      <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>🗑️</span>
      <h3 style={{ color: '#fff', fontFamily: 'monospace', fontWeight: 900, fontSize: 18, marginBottom: 8 }}>
        ¿ELIMINAR PRODUCTO?
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 6 }}>
        Esta acción no se puede deshacer.
      </p>
      <p style={{ color: '#E73538', fontWeight: 700, fontSize: 14, marginBottom: 28 }}>
        "{product.name}"
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <ActionBtn label="Cancelar" variant="secondary" onClick={onClose} />
        <ActionBtn label="Sí, eliminar" variant="danger" icon="🗑️" onClick={onConfirm} />
      </div>
    </div>
  </div>
);

// ─── STOCK badge ───
const StockBadge = ({ variants }) => {
  const total = (variants || []).reduce((s, v) => s + (v.stock || 0), 0);
  const color = total === 0 ? '#E73538' : total <= 5 ? '#EBE43C' : '#24CEA6';
  const label = total === 0 ? 'AGOTADO' : total <= 5 ? 'CRÍTICO' : `${total} uds`;
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
      color, background: `${color}18`, padding: '3px 8px', borderRadius: 2,
    }}>{label}</span>
  );
};

// ══════════════════════════════════════
//  MAIN VIEW
// ══════════════════════════════════════
const ProductosView = () => {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState('');
  const [catFilter, setCatFilter]   = useState('Todos');
  const [modal, setModal]           = useState(null);   // null | { mode:'create'|'edit', data }
  const [toDelete, setToDelete]     = useState(null);   // product to delete
  const [toast, setToast]           = useState(null);   // { msg, type }

  // ── Fetch ──
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Error del servidor');
      setProducts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Toast helper ──
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Delete ──
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/${form._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Error al eliminar');
      showToast(`"${toDelete.name}" eliminado`);
      setToDelete(null);
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'error');
      setToDelete(null);
    }
  };

  // ── Filtered list ──
  const filtered = products.filter(p => {
    const matchCat = catFilter === 'Todos' || 
    (p.category || '').trim().toLowerCase() === catFilter.trim().toLowerCase();
    const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (p.category || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const formatCOP = n =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <SectionTitle label="Control de Catálogo" title="PRODUCTOS" />
        <ActionBtn
          label="Nuevo Producto"
          icon="✚"
          onClick={() => setModal({ mode: 'create', data: emptyProduct() })}
        />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar producto..." />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Todos', ...CATEGORIAS].map(c => (
            <FilterBtn key={c} label={c} active={catFilter === c} onClick={() => setCatFilter(c)} />
          ))}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginLeft: 'auto' }}>
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* States: loading / error / empty */}
      {loading && (
        <Card style={{ padding: '60px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 36, marginBottom: 12 }}>⏳</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>
            Cargando productos...
          </p>
        </Card>
      )}

      {!loading && error && (
        <Card style={{ padding: '40px 24px' }}>
          <div style={{
            background: 'rgba(231,53,56,0.08)', border: '1px solid rgba(231,53,56,0.25)',
            borderLeft: '4px solid #E73538', borderRadius: 4, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ fontSize: 28 }}>⚠️</span>
            <div>
              <p style={{ color: '#E73538', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>
                Error al cargar productos
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{error}</p>
            </div>
            <ActionBtn label="Reintentar" variant="secondary" onClick={fetchProducts} style={{ marginLeft: 'auto' }} />
          </div>
        </Card>
      )}

      {/* Product table */}
      {!loading && !error && (
        filtered.length === 0 ? (
          <Card style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: 36, marginBottom: 12 }}>🔍</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>
              Sin resultados
            </p>
          </Card>
        ) : (
          <Card style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Imagen', 'Producto', 'Categoría', 'Precio Detal', 'Precio Mayor', 'Descuento', 'Stock', 'Colores', 'Acciones'].map(h => (
                      <th key={h} style={{
                        padding: '13px 16px', textAlign: 'left',
                        fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.3)',
                        textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p._id || i} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Imagen */}
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 4,
                          overflow: 'hidden', background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ fontSize: 18, opacity: 0.25 }}>🖼️</span>
                          )}
                        </div>
                      </td>
                      {/* Nombre */}
                      <td style={{ padding: '14px 16px', maxWidth: 200 }}>
                        <p style={{ fontSize: 13, color: '#fff', fontWeight: 700, fontFamily: 'monospace', lineHeight: 1.3 }}>{p.name}</p>
                        {p.collection && (
                          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 3, letterSpacing: 1 }}>{p.collection}</p>
                        )}
                      </td>
                      {/* Categoría */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                          color: '#24CEA6', background: 'rgba(36,206,166,0.1)', padding: '3px 8px', borderRadius: 2,
                        }}>{p.category}</span>
                      </td>
                      {/* Precio detal */}
                      <td style={{ padding: '14px 16px', fontSize: 13, color: '#fff', fontFamily: 'monospace', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {formatCOP(p.price?.retail)}
                      </td>
                      {/* Precio mayor */}
                      <td style={{ padding: '14px 16px', fontSize: 12, color: '#4F8DCB', fontFamily: 'monospace', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {formatCOP(p.price?.wholesale)}
                      </td>
                      {/* Descuento */}
                      <td style={{ padding: '14px 16px' }}>
                        {p.discountPercentage > 0 ? (
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#E73538', background: 'rgba(231,53,56,0.1)', padding: '3px 8px', borderRadius: 2 }}>
                            {p.discountPercentage}% OFF
                          </span>
                        ) : (
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>—</span>
                        )}
                      </td>
                      {/* Stock */}
                      <td style={{ padding: '14px 16px' }}>
                        <StockBadge variants={p.variants} />
                      </td>
                      {/* Colores */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {(p.variants || []).slice(0, 5).map((v, ci) => (
                            <div key={ci} title={v.color?.nombre} style={{
                              width: 16, height: 16, borderRadius: '50%',
                              background: v.color?.hex || '#666',
                              border: '1.5px solid rgba(255,255,255,0.15)',
                              boxShadow: v.color?.hex === '#F8F8F8' ? 'inset 0 0 0 1px #ccc' : 'none',
                            }} />
                          ))}
                          {(p.variants || []).length > 5 && (
                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>
                              +{p.variants.length - 5}
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <ActionBtn
                            label="Editar"
                            icon="✏️"
                            small
                            variant="secondary"
                            onClick={() => setModal({ mode: 'edit', data: { ...p } })}
                          />
                          <ActionBtn
                            label="Eliminar"
                            icon="🗑️"
                            small
                            variant="danger"
                            onClick={() => setToDelete(p)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )
      )}

      {/* Modals */}
      {modal && (
        <ProductModal
          product={modal.data}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            showToast(modal.mode === 'create' ? 'Producto creado ✓' : 'Producto actualizado ✓');
            fetchProducts();
          }}
        />
      )}

      {toDelete && (
        <DeleteConfirm
          product={toDelete}
          onClose={() => setToDelete(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 400,
          background: toast.type === 'error' ? '#E73538' : '#24CEA6',
          color: toast.type === 'error' ? '#fff' : '#1D1D1B',
          padding: '12px 22px', borderRadius: 4,
          fontSize: 12, fontWeight: 800, letterSpacing: 1.5,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          animation: 'slideUpToast 0.3s ease',
        }}>
          {toast.type === 'error' ? '⚠️' : '✓'} {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes slideUpToast {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        select option { background: #1a1a19; color: #fff; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  );
};

export default ProductosView;
