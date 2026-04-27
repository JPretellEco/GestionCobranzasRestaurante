import { useState } from "react";
import Icon from "../components/Icon";
import { PageLayout, FormField, inputStyle, primaryBtnStyle } from "../components/Forms/FormShared";

export default function CrearCuentaPage({ onBack, onSave }) {
  const [form, setForm] = useState({ cliente:"", pedidos:"", total:"", observacion:"" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.cliente.trim()) e.cliente = "Requerido";
    if (!form.pedidos || isNaN(form.pedidos) || Number(form.pedidos) <= 0) e.pedidos = "Ingrese un número válido";
    if (!form.total || isNaN(form.total) || Number(form.total) <= 0) e.total = "Ingrese un monto válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      cliente:     form.cliente.trim(),
      pedidos:     Number(form.pedidos),
      total:       Number(form.total),
      observacion: form.observacion.trim(),
    });
  };

  return (
    <PageLayout title="Nueva Cuenta" onBack={onBack}>
      <FormField label="Cliente" error={errors.cliente}>
        <input value={form.cliente} onChange={e => setForm({...form, cliente: e.target.value})}
          placeholder="Nombre del cliente" style={inputStyle} />
      </FormField>
      <FormField label="Nº Pedidos" error={errors.pedidos}>
        <input type="number" inputMode="numeric" value={form.pedidos}
          onChange={e => setForm({...form, pedidos: e.target.value})}
          placeholder="0" style={inputStyle} />
      </FormField>
      <FormField label="Total (S/)" error={errors.total}>
        <input type="number" inputMode="decimal" value={form.total}
          onChange={e => setForm({...form, total: e.target.value})}
          placeholder="0.00" style={inputStyle} />
      </FormField>
      <FormField label="Observación">
        <textarea value={form.observacion} onChange={e => setForm({...form, observacion: e.target.value})}
          placeholder="Notas adicionales..." rows={3}
          style={{...inputStyle, resize:"none", lineHeight:1.5}} />
      </FormField>
      <button onClick={handleSubmit} style={primaryBtnStyle}>
        <Icon name="plus" size={16} color="#fff" /> CREAR CUENTA
      </button>
    </PageLayout>
  );
}
