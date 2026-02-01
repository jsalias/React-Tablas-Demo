// src/demos/ReactWindowDemo.jsx
import React, { useMemo, useState } from "react";
import { List } from "react-window";

const ROW_HEIGHT = 80;
const TOTAL_ROWS = 120;

const PRIORIDADES = ["Alta", "Media", "Baja"];
const ESTADOS = ["Pendiente", "En curso", "Completada"];
const PROYECTOS = ["Web", "Mobile", "Infraestructura", "Marketing", "Interno"];

// ---------- Datos simulados ----------
function generarData() {
  return Array.from({ length: TOTAL_ROWS }, (_, i) => {
    const id = i + 1;
    return {
      id,
      titulo: `Tarea #${id} - Funcionalidad ${id % 15}`,
      responsable: `Responsable ${((i % 8) + 1).toString().padStart(2, "0")}`,
      prioridad: PRIORIDADES[i % PRIORIDADES.length],
      estado: ESTADOS[i % ESTADOS.length],
      proyecto: PROYECTOS[i % PROYECTOS.length],
      fechaLimite: `2024-${String((i % 12) + 1).padStart(
        2,
        "0"
      )}-${String((i % 28) + 1).padStart(2, "0")}`,
      progreso: (i * 7) % 101, // 0–100
    };
  });
}

const DATA = generarData();

// ---------- Badge simple ----------
function Badge({ text, color, bg }) {
  return (
    <span
      style={{
        padding: "3px 8px",
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

// ---------- Fila virtualizada (estilo card) ----------
function Row({ index, style, data }) {
  const item = data[index];

  const colorEstado =
    item.estado === "Completada"
      ? { color: "#1b5e20", bg: "#e8f5e9" }
      : item.estado === "En curso"
      ? { color: "#0d47a1", bg: "#e3f2fd" }
      : { color: "#bf360c", bg: "#fbe9e7" };

  const colorPrioridad =
    item.prioridad === "Alta"
      ? { color: "#b71c1c", bg: "#ffebee" }
      : item.prioridad === "Media"
      ? { color: "#f57f17", bg: "#fff8e1" }
      : { color: "#1b5e20", bg: "#e8f5e9" };

  return (
    <div
      style={{
        ...style,
        padding: "10px 16px",
        boxSizing: "border-box",
        borderBottom: "1px solid #eee",
        background: index % 2 === 0 ? "#fafafa" : "#ffffff",
        display: "flex",
        gap: 16,
        alignItems: "center",
      }}
    >
      {/* Columna izquierda: ID + progreso */}
      <div
        style={{
          width: 70,
          textAlign: "center",
          fontSize: 12,
        }}
      >
        <div style={{ fontWeight: "bold" }}>#{item.id}</div>
        <div style={{ fontSize: 11, color: "#666" }}>{item.progreso}%</div>
        <div
          style={{
            marginTop: 4,
            height: 6,
            borderRadius: 999,
            background: "#eee",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${item.progreso}%`,
              height: "100%",
              background: item.progreso === 100 ? "#2e7d32" : "#1976d2",
            }}
          />
        </div>
      </div>

      {/* Centro: título + secundaria */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            marginBottom: 4,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item.titulo}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>
          {item.proyecto} · Responsable: {item.responsable} · Límite:{" "}
          {item.fechaLimite}
        </div>
      </div>

      {/* Derecha: badges */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          minWidth: 160,
        }}
      >
        <Badge text={item.estado} color={colorEstado.color} bg={colorEstado.bg} />
        <Badge
          text={`Prioridad ${item.prioridad}`}
          color={colorPrioridad.color}
          bg={colorPrioridad.bg}
        />
      </div>
    </div>
  );
}

// ---------- Componente principal ----------
export function ReactWindowDemo() {
  const [texto, setTexto] = useState("");
  const [filtroPrioridad, setFiltroPrioridad] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const filteredData = useMemo(() => {
    return DATA.filter((row) => {
      const matchTexto =
        row.titulo.toLowerCase().includes(texto.toLowerCase()) ||
        row.responsable.toLowerCase().includes(texto.toLowerCase());

      const matchPrioridad = filtroPrioridad
        ? row.prioridad === filtroPrioridad
        : true;

      const matchEstado = filtroEstado ? row.estado === filtroEstado : true;

      return matchTexto && matchPrioridad && matchEstado;
    });
  }, [texto, filtroPrioridad, filtroEstado]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
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
          Lista de tareas virtualizada (React Window)
        </h2>

        <a
          href="https://react-window.vercel.app/"
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
          placeholder="Buscar por título o responsable"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          style={{ minWidth: 220 }}
        />

        <select
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value)}
        >
          <option value="">Todas las prioridades</option>
          {PRIORIDADES.map((p) => (
            <option key={p} value={p}>
              {p}
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

        <span style={{ marginLeft: "auto", fontSize: 12, color: "#555" }}>
          Mostrando {filteredData.length} de {TOTAL_ROWS} tareas
        </span>
      </div>

      {/* LISTA VIRTUALIZADA */}
      <List
        rowCount={filteredData.length}
        rowHeight={ROW_HEIGHT}
        rowComponent={Row}
        rowProps={{ data: filteredData }} // pasa los datos a cada fila
        overscanCount={5}
        style={{
          height: window.innerHeight - 210,
          width: "100%",
        }}
      />
    </div>
  );
}
