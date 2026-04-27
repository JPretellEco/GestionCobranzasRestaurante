import { useState } from "react";
import Icon from "../Icon";
import { COLORS } from "../../styles/theme";
import { formatSoles, formatDate } from "../../utils/helpers";

export default function SendPopup({ cuenta, onClose }) {
  const [phone, setPhone] = useState("");
  const [sent, setSent]   = useState(false);

  const handleSend = () => {
    if (phone.length < 9) return;
    const msg = encodeURIComponent(
      `Hola! Tu cuenta al ${formatDate(cuenta.fecha)}:\n` +
      `Cliente: ${cuenta.cliente}\n` +
      `Pedidos: ${cuenta.pedidos}\n` +
      `Total: ${formatSoles(cuenta.total)}\n` +
      `Efectivo: ${formatSoles(cuenta.efectivo)}\n` +
      `Deuda: ${formatSoles(cuenta.deuda)}\n` +
      (cuenta.observacion ? `Obs: ${cuenta.observacion}` : "")
    );
    window.open(`https://wa.me/51${phone}?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:100,
      display:"flex", alignItems:"flex-end", justifyContent:"center", padding:16 }}>
      <div style={{ width:"100%", maxWidth:440, background: COLORS.surface, borderRadius:20,
        padding:24, border:`1px solid ${COLORS.border}` }}>
        {sent ? (
          <div style={{ textAlign:"center", padding:24 }}>
            <div style={{ width:56, height:56, borderRadius:"50%", background: COLORS.greenBg,
              display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
              <Icon name="check" size={28} color={COLORS.green} />
            </div>
            <div style={{ color: COLORS.green, fontWeight:700 }}>¡Enviado!</div>
          </div>
        ) : (
          <>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color: COLORS.text }}>Enviar cuenta</div>
                <div style={{ fontSize:11, color: COLORS.textMuted }}>{cuenta.cliente}</div>
              </div>
              <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}>
                <Icon name="close" size={20} color={COLORS.textMuted} />
              </button>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, background: COLORS.bg,
              borderRadius:10, padding:"4px 12px", marginBottom:16, border:`1px solid ${COLORS.border}` }}>
              <span style={{ color: COLORS.textMuted, fontSize:12 }}>+51</span>
              <input value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g,"").slice(0,9))}
                placeholder="Nº celular del cliente"
                style={{ flex:1, background:"none", border:"none", outline:"none",
                  color: COLORS.text, fontSize:15, padding:"10px 0", letterSpacing:"0.05em", fontFamily:"inherit" }}
              />
              <Icon name="phone" size={16} color={COLORS.textMuted} />
            </div>
            <button onClick={handleSend} style={{
              width:"100%", padding:14, borderRadius:12,
              background: phone.length >= 9 ? "linear-gradient(135deg,#25D366,#128C7E)" : COLORS.border,
              border:"none", color:"#fff", fontWeight:700, fontSize:14,
              cursor: phone.length >= 9 ? "pointer" : "default",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              <Icon name="whatsapp" size={18} color="#fff" />
              Enviar por WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}
