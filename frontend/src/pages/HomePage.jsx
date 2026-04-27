import { useMemo, useState } from "react";
import StatCards from "../components/Cards/StatCards";
import AccountsTable from "../components/Table/AccountsTable";
import { COLORS } from "../styles/theme";
import { formatDate } from "../utils/helpers";

export default function HomePage({ cuentas, onEdit, onDelete, onSend, filterDate }) {
  const [filter, setFilter] = useState(null);

  const filteredByDate = useMemo(() =>
    filterDate ? cuentas.filter(c => c.fecha === filterDate) : cuentas,
    [cuentas, filterDate]
  );

  const displayed = useMemo(() => {
    if (filter === "pagado") return filteredByDate.filter(c => Number(c.deuda) === 0);
    if (filter === "deuda")  return filteredByDate.filter(c => Number(c.deuda) > 0);
    return filteredByDate;
  }, [filteredByDate, filter]);

  const totals = useMemo(() => ({
    all:        filteredByDate.reduce((s, c) => s + Number(c.total), 0),
    pagado:     filteredByDate.filter(c => Number(c.deuda) === 0).reduce((s, c) => s + Number(c.total), 0),
    deuda:      filteredByDate.reduce((s, c) => s + Number(c.deuda), 0),
    countAll:   filteredByDate.length,
    countPagado: filteredByDate.filter(c => Number(c.deuda) === 0).length,
    countDeuda: filteredByDate.filter(c => Number(c.deuda) > 0).length,
  }), [filteredByDate]);

  return (
    <div style={{ padding:"20px 16px", display:"flex", flexDirection:"column", gap:16 }}>
      {filterDate && (
        <div style={{ fontSize:12, color: COLORS.accent, fontWeight:600 }}>
          📅 Mostrando: {formatDate(filterDate)}
        </div>
      )}
      <StatCards totals={totals} filter={filter} onFilter={setFilter} />
      <AccountsTable cuentas={displayed} onEdit={onEdit} onDelete={onDelete} onSend={onSend} />
    </div>
  );
}
