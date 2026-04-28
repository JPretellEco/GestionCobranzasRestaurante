import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api`
    : "/api", // fallback para local con proxy
});
  
export const getCuentas = (fecha) =>
  api.get("/cuentas/", { params: fecha ? { fecha } : {} }).then(r => r.data);

export const createCuenta = (data) =>
  api.post("/cuentas/", data).then(r => r.data);

export const updateCuenta = (id, data) =>
  api.put(`/cuentas/${id}`, data).then(r => r.data);

export const deleteCuenta = (id) =>
  api.delete(`/cuentas/${id}`);