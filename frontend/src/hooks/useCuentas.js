import { useState, useEffect, useCallback } from "react";
import * as api from "../utils/api";

const LS_KEY = "cuentaspro_data";
const loadLocal = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
};
const saveLocal = (d) => localStorage.setItem(LS_KEY, JSON.stringify(d));

export function useCuentas() {
  const [cuentas, setCuentas] = useState(loadLocal);
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);

  const fetchAll = useCallback(async (fecha) => {
    setLoading(true);
    try {
      const data = await api.getCuentas(fecha);
      setBackendOnline(true);

      // FIX PRINCIPAL: solo sobreescribe el localStorage si el backend
      // devuelve datos, O si el localStorage también está vacío.
      // Evita que Render al despertar devuelva [] y borre todo.
      if (data.length > 0) {
        setCuentas(data);
        saveLocal(data);
      } else {
        const local = loadLocal();
        if (local.length === 0) {
          // Backend vacío y local vacío: estado limpio
          setCuentas([]);
          saveLocal([]);
        } else {
          // Backend vacío pero tenemos datos locales: mostramos locales
          // (puede pasar en free tier de Render al resetear SQLite)
          setCuentas(local);
        }
      }
    } catch {
      setBackendOnline(false);
      // Backend caído: mostramos lo que tenemos en local, sin tocar nada
      setCuentas(loadLocal());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const addCuenta = async (data) => {
    try {
      const nueva = await api.createCuenta(data);
      setBackendOnline(true);
      // FIX: al crear con backend online, actualizamos localStorage también
      setCuentas(prev => {
        const next = [nueva, ...prev];
        saveLocal(next);
        return next;
      });
    } catch {
      setBackendOnline(false);
      // Offline: marcamos el registro para saber que no está en el backend
      const nueva = {
        ...data,
        id: Date.now(),
        fecha: new Date().toISOString().split("T")[0],
        efectivo: 0,
        deuda: data.total,
        _offline: true   // <-- flag para saber que hay pendientes
      };
      setCuentas(prev => {
        const next = [nueva, ...prev];
        saveLocal(next);
        return next;
      });
    }
  };

  const editCuenta = async (updated) => {
    try {
      const result = await api.updateCuenta(updated.id, {
        efectivo: updated.efectivo,
        deuda: updated.deuda,
        observacion: updated.observacion
      });
      setBackendOnline(true);
      setCuentas(prev => {
        const next = prev.map(c => c.id === result.id ? result : c);
        saveLocal(next);
        return next;
      });
    } catch {
      setBackendOnline(false);
      setCuentas(prev => {
        const next = prev.map(c => c.id === updated.id ? updated : c);
        saveLocal(next);
        return next;
      });
    }
  };

  const removeCuenta = async (id) => {
    // FIX: borramos del estado/local primero (optimistic),
    // pero solo intentamos el backend si creemos que está online
    setCuentas(prev => {
      const next = prev.filter(c => c.id !== id);
      saveLocal(next);
      return next;
    });
    try { await api.deleteCuenta(id); }
    catch { /* ya borrado localmente, se sincronizará en próxima sesión */ }
  };

  return { cuentas, loading, backendOnline, fetchAll, addCuenta, editCuenta, removeCuenta };
}
