import React, { useMemo, useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import "react-virtualized/styles.css";

const ROW_HEIGHT = 44;
const TOTAL_ROWS = 120;

const ROLES = ["Admin", "Usuario", "Editor"];
const ESTADOS = ["Activo", "Inactivo"];
const DEPARTAMENTOS = ["Ventas", "IT", "RRHH", "Marketing"];

// Datos simulados
const DATA = Array.from({ length: TOTAL_ROWS }, (_, i) => ({
  id: i + 1,
  nombre: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@mail.com`,
  edad: 18 + (i % 50),
  ciudad: `Ciudad ${i % 10}`,
  rol: ROLES[i % ROLES.length],
  estado: i % 2 === 0 ? "Activo" : "Inactivo",
  departamento: DEPARTAMENTOS[i % DEPARTAMENTOS.length],
  fechaAlta: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String(
    (i % 28) + 1
  ).padStart(2, "0")}`,
}));

// Badge simple
function Badge({ text, color, bg }) {
  return (
    <span
      style={{
        padding: "2px 6px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 500,
        color,
        background: bg,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

export function ReactVirtualizedDemo() {
  // Filtros
  const [texto, setTexto] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroDepto, setFiltroDepto] = useState("");

  // Orden
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  // Filtrado + orden + resumen
  const { rows: filteredData, resumen } = useMemo(() => {
    let rows = DATA.filter((row) => {
      const matchTexto =
        row.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        row.email.toLowerCase().includes(texto.toLowerCase()) ||
        row.ciudad.toLowerCase().includes(texto.toLowerCase());

      const matchRol = filtroRol ? row.rol === filtroRol : true;
      const matchEstado = filtroEstado ? row.estado === filtroEstado : true;
      const matchDepto = filtroDepto ? row.departamento === filtroDepto : true;

      return matchTexto && matchRol && matchEstado && matchDepto;
    });

    rows = [...rows].sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];

      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    const total = rows.length;
    const activos = rows.filter((r) => r.estado === "Activo").length;
    const inactivos = rows.filter((r) => r.estado === "Inactivo").length;
    const edadProm =
      total > 0
        ? Math.round(rows.reduce((acc, r) => acc + r.edad, 0) / total)
        : 0;

    return {
      rows,
      resumen: { total, activos, inactivos, edadProm },
    };
  }, [texto, filtroRol, filtroEstado, filtroDepto, sortBy, sortDir]);

  // Render de fila
  const rowRenderer = ({ index, key, style }) => {
    const item = filteredData[index];

    const estadoColor =
      item.estado === "Activo"
        ? { color: "#1b5e20", bg: "#e8f5e9" }
        : { color: "#b71c1c", bg: "#ffebee" };

    const rolColor =
      item.rol === "Admin"
        ? { color: "#0d47a1", bg: "#e3f2fd" }
        : item.rol === "Editor"
        ? { color: "#4a148c", bg: "#f3e5f5" }
        : { color: "#424242", bg: "#eeeeee" };

    return (
      <div
        key={key}
        style={{
          ...style,
          display: "grid",
          gridTemplateColumns:
            "60px 160px 240px 60px 120px 120px 120px 140px 120px",
          padding: "8px 12px",
          borderBottom: "1px solid #eee",
          backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
          boxSizing: "border-box",
          fontSize: 13,
          alignItems: "center",
        }}
      >
        <div>{item.id}</div>
        <div style={{ fontWeight: 500 }}>{item.nombre}</div>
        <div>{item.email}</div>
        <div>{item.edad}</div>
        <div>{item.ciudad}</div>
        <div>
          <Badge text={item.rol} color={rolColor.color} bg={rolColor.bg} />
        </div>
        <div>
          <Badge
            text={item.estado}
            color={estadoColor.color}
            bg={estadoColor.bg}
          />
        </div>
        <div>{item.departamento}</div>
        <div>{item.fechaAlta}</div>
      </div>
    );
  };

  const sortIcon = (field) => {
    if (sortBy !== field) return "↕";
    return sortDir === "asc" ? "▲" : "▼";
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #ddd",
          background: "#0f172a",
          position: "relative",
        }}
      >
        <h2 style={{ margin: 0, color: "#fff" }}>
          Tabla virtualizada con React Virtualized
        </h2>

        <a
          href="https://bvaughn.github.io/react-virtualized/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            padding: "6px 12px",
            backgroundColor: "#1976d2",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          Web oficial
        </a>
      </header>

      {/* RESUMEN / KPI (texto blanco) */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "8px 16px",
          borderBottom: "1px solid #eee",
          fontSize: 13,
          color: "#fff",          // 👈 CLAVE
          background: "#0f172a",
        }}
      >
        <span>
          <strong>Total:</strong> {resumen.total} usuarios
        </span>
        <span>
          <strong>Activos:</strong> {resumen.activos}
        </span>
        <span>
          <strong>Inactivos:</strong> {resumen.inactivos}
        </span>
        <span>
          <strong>Edad promedio:</strong> {resumen.edadProm} años
        </span>
      </div>

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "12px 16px",
          borderBottom: "1px solid #ddd",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre, email o ciudad"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          style={{ minWidth: 240 }}
        />

        <select
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
        >
          <option value="">Todos los roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <select
          value={filtroDepto}
          onChange={(e) => setFiltroDepto(e.target.value)}
        >
          <option value="">Todos los departamentos</option>
          {DEPARTAMENTOS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* CABECERA DE TABLA */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "60px 160px 240px 60px 120px 120px 120px 140px 120px",
          background: "#f5f5f5",
          borderBottom: "1px solid #ccc",
          padding: "6px 12px",
          fontWeight: "bold",
          fontSize: 13,
          userSelect: "none",
        }}
      >
        <div onClick={() => toggleSort("id")} style={{ cursor: "pointer" }}>
          ID {sortIcon("id")}
        </div>
        <div onClick={() => toggleSort("nombre")} style={{ cursor: "pointer" }}>
          Nombre {sortIcon("nombre")}
        </div>
        <div onClick={() => toggleSort("email")} style={{ cursor: "pointer" }}>
          Email {sortIcon("email")}
        </div>
        <div onClick={() => toggleSort("edad")} style={{ cursor: "pointer" }}>
          Edad {sortIcon("edad")}
        </div>
        <div onClick={() => toggleSort("ciudad")} style={{ cursor: "pointer" }}>
          Ciudad {sortIcon("ciudad")}
        </div>
        <div>Rol</div>
        <div>Estado</div>
        <div
          onClick={() => toggleSort("departamento")}
          style={{ cursor: "pointer" }}
        >
          Departamento {sortIcon("departamento")}
        </div>
        <div
          onClick={() => toggleSort("fechaAlta")}
          style={{ cursor: "pointer" }}
        >
          Fecha Alta {sortIcon("fechaAlta")}
        </div>
      </div>

      {/* LISTA VIRTUALIZADA */}
      <div style={{ flex: 1 }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={filteredData.length}
              rowHeight={ROW_HEIGHT}
              rowRenderer={rowRenderer}
              overscanRowCount={5}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
