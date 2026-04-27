import { useState } from "react";
import Icon from "../Icon";
import { COLORS } from "../../styles/theme";
import { today } from "../../utils/helpers";

const MONTHS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const DAYS   = ["D","L","M","M","J","V","S"];

export default function CalendarWidget({ selectedDate, onSelect }) {
  const [viewDate, setViewDate] = useState(new Date());

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = today();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const toStr = (d) =>
    `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
          style={{ background:"none", border:"none", cursor:"pointer", color: COLORS.textMuted, padding:2 }}>
          <Icon name="chevronLeft" size={14} color={COLORS.textMuted} />
        </button>
        <span style={{ fontSize:11, fontWeight:600, color: COLORS.text, letterSpacing:"0.05em" }}>
          {MONTHS[month]} {year}
        </span>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
          style={{ background:"none", border:"none", cursor:"pointer", padding:2 }}>
          <Icon name="chevronRight" size={14} color={COLORS.textMuted} />
        </button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1 }}>
        {DAYS.map((d,i) => (
          <div key={i} style={{ textAlign:"center", fontSize:9, color: COLORS.textDim, fontWeight:700, padding:"2px 0" }}>{d}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const str   = toStr(d);
          const isSel = str === selectedDate;
          const isToday = str === todayStr;
          return (
            <button key={i} onClick={() => onSelect(isSel ? null : str)}
              style={{
                background: isSel ? COLORS.accent : isToday ? COLORS.accentGlow : "none",
                border:"none", borderRadius:4, cursor:"pointer",
                color: isSel ? "#fff" : isToday ? COLORS.accent : COLORS.text,
                fontSize:10, fontWeight: isSel||isToday ? 700 : 400,
                padding:"3px 0", transition:"all 0.15s",
              }}>
              {d}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <button onClick={() => onSelect(null)}
          style={{ marginTop:8, width:"100%", background:"none", border:`1px solid ${COLORS.border}`,
            borderRadius:6, color: COLORS.textMuted, fontSize:10, cursor:"pointer", padding:"4px 0" }}>
          Limpiar filtro
        </button>
      )}
    </div>
  );
}
