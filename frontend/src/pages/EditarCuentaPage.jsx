import { useState } from "react";
import Icon from "../components/Icon";
import { PageLayout, FormField, inputStyle, primaryBtnStyle } from "../components/Forms/FormShared";
import { COLORS } from "../styles/theme";
import { formatSoles, formatDate } from "../utils/helpers";

export default function EditarCuentaPage({ cuenta, onBack, onSave }) {
  const [form, setForm] = useState({
    efectivo:    String(cuenta.efectivo ?? 0),
    deuda:       String(cuenta.deuda ?? 0),
    observacion: cuenta.observacion || "",
  });

  const handleEfectivo = (val) => {
    const ef   = Number(val) || 0;
    const deuda = Math.max(0, Number(cuenta.total) - ef);
    setForm({...form, efectivo: val, deuda: String(deuda)});
  };

  const handleSubmit = () => {
    onSave({
      ...cuenta,
      efectivo:    Number(form.efectivo) || 0,
      deuda:       Number(form.deuda)    || 0,
      observacion: form.observacion.trim(),
    });
  };

  return (
    <PageLayout title="Editar Cuenta" onBack={onBack}>
      {/* Read-only info */}
      <div style={{ background: COLORS.bg, borderRadius:12, padding:16, border:`1px solid ${COLORS.border}` }}>
        <div style={{ fontSize:10, color: COLORS.textMuted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>
          Información de la cuenta
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[["Fecha", formatDate(cuenta.fecha)], ["Cliente", cuenta.cliente],
            ["Pedidos", cuenta.pedidos], ["Total", formatSoles(cuenta.total)]].map(([k,v]) => (
            <div key={k}>
              <div style={{ fontSize:9, color: COLORS.textDim }}>{k}</div>
              <div style={{ fontSize:13, fontWeight:700, color: COLORS.text }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <FormField label="Efectivo recibido (S/)">
        <input type="number" inputMode="decimal" value={form.efectivo}
          onChange={e => handleEfectivo(e.target.value)}
          placeholder="0.00" style={inputStyle} />
      </FormField>
      <FormField label="Deuda (S/)">
        <input type="number" inputMode="decimal" value={form.deuda}
          onChange={e => setForm({...form, deuda: e.target.value})}
          placeholder="0.00"
          style={{...inputStyle, color: Number(form.deuda) > 0 ? COLORS.red : COLORS.green}} />
      </FormField>
      <FormField label="Observación">
        <textarea value={form.observacion} onChange={e => setForm({...form, observacion: e.target.value})}
          placeholder="Notas adicionales..." rows={3}
          style={{...inputStyle, resize:"none", lineHeight:1.5}} />
      </FormField>
      <button onClick={handleSubmit} style={primaryBtnStyle}>
        <Icon name="check" size={16} color="#fff" /> REGISTRAR
      </button>
    </PageLayout>
  );
}
