import { useState, useEffect, useCallback } from "react";
import * as api from "../utils/api";

// Falls back to localStorage when backend is unavailable
const LS_KEY = "cuentaspro_data";
const loadLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; } };
const saveLocal = (d) => localStorage.setItem(LS_KEY, JSON.stringify(d));

export function useCuentas() {
  const [cuentas, setCuentas] = useState(loadLocal);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async (fecha) => {
    setLoading(true);
    try {
      const data = await api.getCuentas(fecha);
      setCuentas(data);
      saveLocal(data);
    } catch {
      setCuentas(loadLocal());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const addCuenta = async (data) => {
    try {
      const nueva = await api.createCuenta(data);
      setCuentas(prev => { const next = [nueva, ...prev]; saveLocal(next); return next; });
    } catch {
      const nueva = { ...data, id: Date.now(), fecha: new Date().toISOString().split("T")[0], efectivo:0, deuda: data.total };
      setCuentas(prev => { const next = [nueva, ...prev]; saveLocal(next); return next; });
    }
  };

  const editCuenta = async (updated) => {
    try {
      const result = await api.updateCuenta(updated.id, {
        efectivo: updated.efectivo, deuda: updated.deuda, observacion: updated.observacion
      });
      setCuentas(prev => { const next = prev.map(c => c.id === result.id ? result : c); saveLocal(next); return next; });
    } catch {
      setCuentas(prev => { const next = prev.map(c => c.id === updated.id ? updated : c); saveLocal(next); return next; });
    }
  };

  const removeCuenta = async (id) => {
    try { await api.deleteCuenta(id); } catch {}
    setCuentas(prev => { const next = prev.filter(c => c.id !== id); saveLocal(next); return next; });
  };

  return { cuentas, loading, fetchAll, addCuenta, editCuenta, removeCuenta };
}
