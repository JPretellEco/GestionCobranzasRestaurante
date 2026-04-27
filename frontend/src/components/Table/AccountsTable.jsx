import { useState, useMemo } from "react";
import Icon from "../Icon";
import { COLORS } from "../../styles/theme";
import { formatSoles, formatDate } from "../../utils/helpers";

function RowActions({ cuenta, onEdit, onDelete, onSend }) {
  return (
    <div style={{ display:"flex", gap:4, justifyContent:"flex-end" }}>
      <button onClick={() => onEdit(cuenta)}
        style={{ background: COLORS.accentGlow, border:`1px solid ${COLORS.accent}22`, borderRadius:8, padding:"6px 8px", cursor:"pointer" }}>
        <Icon name="edit" size={14} color={COLORS.accent} />
      </button>
      <button onClick={() => onDelete(cuenta.id)}
        style={{ background: COLORS.redBg, border:`1px solid ${COLORS.red}22`, borderRadius:8, padding:"6px 8px", cursor:"pointer" }}>
        <Icon name="trash" size={14} color={COLORS.red} />
      </button>
      <button onClick={() => onSend(cuenta)}
        style={{ background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.2)", borderRadius:8, padding:"6px 8px", cursor:"pointer" }}>
        <Icon name="send" size={14} color="#25D366" />
      </button>
    </div>
  );
}

export default function AccountsTable({ cuentas, onEdit, onDelete, onSend }) {
  const [search, setSearch]     = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return cuentas;
    const q = search.toLowerCase();
    return cuentas.filter(c =>
      c.cliente?.toLowerCase().includes(q) ||
      c.observacion?.toLowerCase().includes(q) ||
      String(c.pedidos).includes(q)
    );
  }, [cuentas, search]);

  return (
    <div style={{ background: COLORS.card, borderRadius:16, border:`1px solid ${COLORS.border}`, overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"14px 16px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:13, fontWeight:700, color: COLORS.text }}>
          Cuentas <span style={{ color: COLORS.textMuted, fontWeight:400, fontSize:11 }}>({filtered.length})</span>
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {showSearch && (
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              style={{ background: COLORS.bg, border:`1px solid ${COLORS.border}`, borderRadius:8,
                padding:"6px 10px", color: COLORS.text, fontSize:12, outline:"none", width:130 }} />
          )}
          <button onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearch(""); }}
            style={{ background: showSearch ? COLORS.accentGlow : "none",
              border:`1px solid ${showSearch ? COLORS.accent : COLORS.border}`,
              borderRadius:8, padding:"6px 8px", cursor:"pointer" }}>
            <Icon name="search" size={15} color={showSearch ? COLORS.accent : COLORS.textMuted} />
          </button>
        </div>
      </div>

      {/* Rows */}
      {filtered.length === 0 ? (
        <div style={{ padding:40, textAlign:"center", color: COLORS.textMuted, fontSize:13 }}>
          No hay cuentas registradas
        </div>
      ) : filtered.map((c, idx) => {
        const hasDebt = Number(c.deuda) > 0;
        return (
          <div key={c.id} style={{
            padding:"14px 16px",
            borderBottom: idx < filtered.length - 1 ? `1px solid ${COLORS.border}` : "none",
            background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color: COLORS.text, marginBottom:2 }}>{c.cliente}</div>
                <div style={{ fontSize:10, color: COLORS.textMuted }}>
                  {formatDate(c.fecha)} · {c.pedidos} pedido{c.pedidos !== 1 ? "s" : ""}
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:14, fontWeight:800, color: COLORS.text }}>{formatSoles(c.total)}</div>
                <div style={{ fontSize:11, fontWeight:700, color: hasDebt ? COLORS.red : COLORS.green }}>
                  {hasDebt ? `Debe ${formatSoles(c.deuda)}` : "✓ Pagado"}
                </div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontSize:11, color: COLORS.textMuted, fontStyle: c.observacion ? "italic" : "normal",
                maxWidth:"55%", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {c.observacion || <span style={{ color: COLORS.textDim }}>Sin observación</span>}
              </div>
              <RowActions cuenta={c} onEdit={onEdit} onDelete={onDelete} onSend={onSend} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
