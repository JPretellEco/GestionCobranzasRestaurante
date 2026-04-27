import Icon from "../Icon";
import CalendarWidget from "./CalendarWidget";
import { COLORS } from "../../styles/theme";

export default function Sidebar({ isOpen, onClose, onCreateCuenta, filterDate, onFilterDate }) {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:40,
          backdropFilter:"blur(2px)",
        }} />
      )}
      <aside style={{
        position:"fixed", top:0, left:0, height:"100vh", width:210,
        background: COLORS.surface, borderRight:`1px solid ${COLORS.border}`,
        display:"flex", flexDirection:"column", padding:"20px 12px",
        gap:20, zIndex:50,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: isOpen ? "4px 0 40px rgba(0,0,0,0.5)" : "none",
      }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 4px 12px", borderBottom:`1px solid ${COLORS.border}` }}>
          <Icon name="logo" size={28} />
          <div>
            <div style={{ fontSize:13, fontWeight:800, color: COLORS.text, letterSpacing:"-0.02em", lineHeight:1 }}>CuentasPro</div>
            <div style={{ fontSize:9, color: COLORS.textMuted, letterSpacing:"0.08em", textTransform:"uppercase" }}>Gestión</div>
          </div>
          <button onClick={onClose} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer" }}>
            <Icon name="close" size={16} color={COLORS.textMuted} />
          </button>
        </div>

        {/* Calendar filter */}
        <div>
          <div style={{ fontSize:9, fontWeight:700, color: COLORS.textDim, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:4 }}>
            <Icon name="calendar" size={11} color={COLORS.textDim} /> Filtrar fecha
          </div>
          <CalendarWidget selectedDate={filterDate} onSelect={onFilterDate} />
        </div>

        {/* Create button */}
        <div style={{ marginTop:"auto" }}>
          <button onClick={() => { onCreateCuenta(); onClose(); }} style={{
            width:"100%", padding:"13px 0", borderRadius:10,
            background:`linear-gradient(135deg, ${COLORS.accent}, #6B5FE4)`,
            border:"none", cursor:"pointer", color:"#fff",
            fontSize:12, fontWeight:700, letterSpacing:"0.03em",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            boxShadow:`0 4px 20px rgba(79,142,247,0.3)`,
          }}>
            <Icon name="plus" size={14} color="#fff" />
            CREAR CUENTA
          </button>
        </div>
      </aside>
    </>
  );
}
