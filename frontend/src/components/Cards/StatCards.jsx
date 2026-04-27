import { COLORS } from "../../styles/theme";
import { formatSoles } from "../../utils/helpers";

function StatCard({ label, amount, color, bgColor, active, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      flex:1, minWidth:90, padding:"14px 10px", borderRadius:14,
      background: active ? bgColor : COLORS.card,
      border:`1.5px solid ${active ? color : COLORS.border}`,
      cursor:"pointer", textAlign:"left",
      boxShadow: active ? `0 0 20px ${bgColor}` : "none",
      transition:"all 0.2s", display:"flex", flexDirection:"column", gap:4,
    }}>
      <span style={{ fontSize:9, fontWeight:700, color: active ? color : COLORS.textMuted, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</span>
      <span style={{ fontSize:14, fontWeight:800, color: active ? color : COLORS.text, letterSpacing:"-0.02em" }}>{formatSoles(amount)}</span>
      {count !== undefined && (
        <span style={{ fontSize:9, color: active ? color : COLORS.textDim }}>{count} cuenta{count !== 1 ? "s" : ""}</span>
      )}
    </button>
  );
}

export default function StatCards({ totals, filter, onFilter }) {
  return (
    <div style={{ display:"flex", gap:8 }}>
      <StatCard
        label="Total" amount={totals.all} color={COLORS.accent} bgColor={COLORS.accentGlow}
        active={!filter} onClick={() => onFilter(null)} count={totals.countAll}
      />
      <StatCard
        label="Pagaron" amount={totals.pagado} color={COLORS.green} bgColor={COLORS.greenBg}
        active={filter === "pagado"} onClick={() => onFilter(filter === "pagado" ? null : "pagado")} count={totals.countPagado}
      />
      <StatCard
        label="Por cobrar" amount={totals.deuda} color={COLORS.red} bgColor={COLORS.redBg}
        active={filter === "deuda"} onClick={() => onFilter(filter === "deuda" ? null : "deuda")} count={totals.countDeuda}
      />
    </div>
  );
}
