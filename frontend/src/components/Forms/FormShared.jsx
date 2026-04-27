import Icon from "../Icon";
import { COLORS, inputStyle, primaryBtnStyle } from "../../styles/theme";

export function PageLayout({ title, onBack, children }) {
  return (
    <div style={{ minHeight:"100vh", background: COLORS.bg, paddingBottom:32 }}>
      <div style={{ background: COLORS.surface, borderBottom:`1px solid ${COLORS.border}`,
        padding:"16px 20px", display:"flex", alignItems:"center", gap:12,
        position:"sticky", top:0, zIndex:10 }}>
        <button onClick={onBack} style={{ background:"none", border:`1px solid ${COLORS.border}`,
          borderRadius:10, padding:"8px 10px", cursor:"pointer" }}>
          <Icon name="back" size={18} color={COLORS.text} />
        </button>
        <h2 style={{ margin:0, fontSize:17, fontWeight:800, color: COLORS.text, letterSpacing:"-0.02em" }}>{title}</h2>
      </div>
      <div style={{ padding:"24px 20px", display:"flex", flexDirection:"column", gap:14, maxWidth:480, margin:"0 auto" }}>
        {children}
      </div>
    </div>
  );
}

export function FormField({ label, error, children }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:11, fontWeight:700,
        color: error ? COLORS.red : COLORS.textMuted,
        textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>
        {label}
      </label>
      {children}
      {error && <div style={{ fontSize:10, color: COLORS.red, marginTop:4 }}>{error}</div>}
    </div>
  );
}

export { inputStyle, primaryBtnStyle };
