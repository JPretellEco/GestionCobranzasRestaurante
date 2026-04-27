import Icon from "../Icon";
import { COLORS } from "../../styles/theme";

export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:100,
      display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:320, background: COLORS.surface, borderRadius:20,
        padding:28, border:`1px solid ${COLORS.border}`, textAlign:"center" }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background: COLORS.redBg,
          display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <Icon name="trash" size={24} color={COLORS.red} />
        </div>
        <div style={{ fontSize:16, fontWeight:800, color: COLORS.text, marginBottom:8 }}>¿Eliminar cuenta?</div>
        <div style={{ fontSize:13, color: COLORS.textMuted, marginBottom:24 }}>Esta acción no se puede deshacer.</div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onCancel} style={{ flex:1, padding:12, borderRadius:12, background:"none",
            border:`1px solid ${COLORS.border}`, color: COLORS.text, cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={{ flex:1, padding:12, borderRadius:12, background: COLORS.red,
            border:"none", color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
