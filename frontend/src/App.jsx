import { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Icon from "./components/Icon";
import SendPopup from "./components/Modals/SendPopup";
import ConfirmDelete from "./components/Modals/ConfirmDelete";
import HomePage from "./pages/HomePage";
import CrearCuentaPage from "./pages/CrearCuentaPage";
import EditarCuentaPage from "./pages/EditarCuentaPage";
import { useCuentas } from "./hooks/useCuentas";
import { COLORS } from "./styles/theme";

export default function App() {
  const { cuentas, addCuenta, editCuenta, removeCuenta } = useCuentas();
  const [page, setPage]           = useState("home");
  const [editTarget, setEditTarget] = useState(null);
  const [sendTarget, setSendTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sortedCuentas = useMemo(() =>
    [...cuentas].sort((a, b) => (b.fecha || "").localeCompare(a.fecha || "")),
    [cuentas]
  );

  const handleSave = async (data) => {
    await addCuenta(data);
    setPage("home");
  };

  const handleUpdate = async (data) => {
    await editCuenta(data);
    setPage("home");
    setEditTarget(null);
  };

  const handleEdit = (cuenta) => {
    setEditTarget(cuenta);
    setPage("editar");
  };

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background: COLORS.bg, minHeight:"100vh", color: COLORS.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        input,textarea,button { font-family:'DM Sans',sans-serif; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${COLORS.border}; border-radius:2px; }
      `}</style>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCreateCuenta={() => setPage("crear")}
        filterDate={filterDate}
        onFilterDate={setFilterDate}
      />

      {page === "home" && (
        <>
          <header style={{
            position:"sticky", top:0, zIndex:30,
            background:`${COLORS.surface}EE`, backdropFilter:"blur(12px)",
            borderBottom:`1px solid ${COLORS.border}`,
            padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <button onClick={() => setSidebarOpen(true)}
              style={{ background:"none", border:`1px solid ${COLORS.border}`, borderRadius:10, padding:"8px 10px", cursor:"pointer" }}>
              <Icon name="menu" size={18} color={COLORS.text} />
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Icon name="logo" size={22} />
              <span style={{ fontSize:16, fontWeight:800, color: COLORS.text, letterSpacing:"-0.03em" }}>CobranzasCarretaRestaurant</span>
            </div>
            <button onClick={() => setPage("crear")} style={{
              background:`linear-gradient(135deg,${COLORS.accent},#6B5FE4)`,
              border:"none", borderRadius:10, padding:"8px 12px", cursor:"pointer",
              display:"flex", alignItems:"center", gap:5,
              color:"#fff", fontWeight:700, fontSize:12,
              boxShadow:`0 2px 12px rgba(79,142,247,0.3)`,
            }}>
              <Icon name="plus" size={14} color="#fff" /> Nueva
            </button>
          </header>

          <HomePage
            cuentas={sortedCuentas}
            onEdit={handleEdit}
            onDelete={id => setDeleteTarget(id)}
            onSend={setSendTarget}
            filterDate={filterDate}
          />
        </>
      )}

      {page === "crear" && (
        <CrearCuentaPage onBack={() => setPage("home")} onSave={handleSave} />
      )}

      {page === "editar" && editTarget && (
        <EditarCuentaPage
          cuenta={editTarget}
          onBack={() => { setPage("home"); setEditTarget(null); }}
          onSave={handleUpdate}
        />
      )}

      {sendTarget   && <SendPopup cuenta={sendTarget} onClose={() => setSendTarget(null)} />}
      {deleteTarget && <ConfirmDelete onConfirm={() => { removeCuenta(deleteTarget); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />}
    </div>
  );
}
