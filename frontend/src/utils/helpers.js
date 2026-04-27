export const formatSoles = (n) =>
  `S/ ${Number(n || 0).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;

export const formatDate = (d) => {
  if (!d) return "";
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export const today = () => new Date().toISOString().split("T")[0];
