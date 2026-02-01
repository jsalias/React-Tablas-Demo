import React, { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const ROW_HEIGHT = 46;
const TOTAL_ROWS = 100;

// Datos base
const DATA = Array.from({ length: TOTAL_ROWS }, (_, i) => ({
  id: i + 1,
  nombre: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@mail.com`,
  edad: 18 + (i % 50),
  ciudad: `Ciudad ${i % 10}`,
  rol: ["Admin", "Usuario", "Editor"][i % 3],
  estado: i % 2 === 0 ? "Activo" : "Inactivo",
  departamento: ["Ventas", "IT", "RRHH", "Marketing"][i % 4],
  fechaAlta: `2024-${String((i % 12) + 1).padStart(2, "0")}`,
}));

export function TanStackTableDemo() {
  const parentRef = useRef(null);

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  // Datos filtrados
  const filteredData = useMemo(() => {
    return DATA.filter((row) => {
      return (
        row.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
        (filtroRol ? row.rol === filtroRol : true) &&
        (filtroEstado ? row.estado === filtroEstado : true)
      );
    });
  }, [filtroNombre, filtroRol, filtroEstado]);

  // Virtualizador
  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
  });

  return (
    <div style={{ padding: 16 }}>
      {/* HEADER */}
      <header
        style={{
          paddingBottom: 8,
          borderBottom: "1px solid #ddd",
          marginBottom: 8,
          position: "relative",
        }}
      >
        <h2 style={{ margin: 0 }}>Demo TanStack Virtual</h2>

        <a
          href="https://tanstack.com/virtual/latest"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            right: 0,
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

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "8px 0",
          borderBottom: "1px solid #ddd",
          marginBottom: 8,
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />

        <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
          <option value="">Todos los roles</option>
          <option value="Admin">Admin</option>
          <option value="Usuario">Usuario</option>
          <option value="Editor">Editor</option>
        </select>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* TABLE HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "60px 160px 240px 80px 120px 120px 120px 140px 120px",
          background: "#f5f5f5",
          borderBottom: "1px solid #ccc",
          padding: "10px 12px",
          fontWeight: "bold",
        }}
      >
        <div>ID</div>
        <div>Nombre</div>
        <div>Email</div>
        <div>Edad</div>
        <div>Ciudad</div>
        <div>Rol</div>
        <div>Estado</div>
        <div>Departamento</div>
        <div>Fecha Alta</div>
      </div>

      {/* SCROLL VIRTUALIZADO */}
      <div
        ref={parentRef}
        style={{
          height: 300, // 👈 altura fija del body
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((row) => {
            const item = filteredData[row.index];

            return (
              <div
                key={row.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: ROW_HEIGHT,
                  transform: `translateY(${row.start}px)`,
                  display: "grid",
                  gridTemplateColumns:
                    "60px 160px 240px 80px 120px 120px 120px 140px 120px",
                  padding: "10px 12px",
                  borderBottom: "1px solid #eee",
                  background:
                    row.index % 2 === 0 ? "#fafafa" : "#ffffff",
                  boxSizing: "border-box",
                }}
              >
                <div>{item.id}</div>
                <div>{item.nombre}</div>
                <div>{item.email}</div>
                <div>{item.edad}</div>
                <div>{item.ciudad}</div>
                <div>{item.rol}</div>
                <div>{item.estado}</div>
                <div>{item.departamento}</div>
                <div>{item.fechaAlta}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER FIJO */}
      <footer
        style={{
          padding: "8px 12px",
          borderTop: "1px solid #ddd",
          background: "#fafafa",
          fontSize: 14,
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <span>
          Mostrando {filteredData.length} de {TOTAL_ROWS} registros
        </span>
        <span>TanStack Virtual</span>
      </footer>
    </div>
  );
}
