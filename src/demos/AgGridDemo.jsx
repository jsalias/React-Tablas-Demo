// src/demos/AgGridDemo.jsx
import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Función para generar datos de ejemplo (80 registros)
function generateMenuData() {
  const categorias = ["Hamburguesas", "Pizzas", "Bebidas", "Postres", "Ensaladas"];
  const nombresBase = [
    "Clásica",
    "Doble Queso",
    "BBQ",
    "Veggie",
    "Napolitana",
    "Cuatro Quesos",
    "Pepperoni",
    "Margarita",
    "Cola",
    "Limonada",
    "Cerveza Artesanal",
    "Brownie",
    "Tiramisú",
    "Ensalada César",
    "Ensalada Mixta",
  ];

  const rows = [];

  for (let i = 1; i <= 80; i++) {
    // --- Datos base ---
    const categoriaBase = categorias[i % categorias.length];
    const baseName = nombresBase[i % nombresBase.length];
    let nombre = `${categoriaBase.slice(0, -1)} ${baseName} #${i}`;
    let categoria = categoriaBase;

    // Para los últimos 20 registros (61–80), los hacemos "especiales"
    if (i > 60) {
      nombre = `Especial del día #${i}`;
      categoria = ["Hamburguesas", "Pizzas", "Postres"][i % 3];
    }

    let precioBase =
      categoria === "Bebidas"
        ? 2 + (i % 5) * 0.5
        : categoria === "Postres"
        ? 3 + (i % 4)
        : categoria === "Ensaladas"
        ? 6 + (i % 3)
        : 8 + (i % 6); // Hamburguesas / Pizzas

    // Un poco más caro para los especiales
    if (i > 60) {
      precioBase = 9 + (i % 6);
    }

    const stock = 5 + ((i * 3) % 40);
    const enOferta = i % 4 === 0 || i > 60; // los especiales casi siempre en oferta
    const rating = 3 + (i % 3); // 3,4,5

    const calorias =
      categoria === "Ensaladas"
        ? 200 + (i % 80)
        : categoria === "Bebidas"
        ? 80 + (i % 60)
        : 450 + (i % 250);

    // --- 15 campos extra ---
    const descripcion =
      i > 60
        ? `Producto especial agregado manualmente`
        : `Deliciosa ${nombre} con ingredientes frescos.`;
    const tamanoPorcion = ["Individual", "Mediana", "Familiar"][i % 3];
    const tiempoPreparacion = 10 + (i % 25); // minutos
    const esVegano = categoria === "Ensaladas" && i % 2 === 0;
    const esSinGluten = categoria === "Ensaladas" || categoria === "Bebidas";
    const nivelPicante = ["Nulo", "Suave", "Medio", "Fuerte"][i % 4];
    const servidoFrio =
      categoria === "Bebidas" ||
      categoria === "Ensaladas" ||
      categoria === "Postres";
    const proteinas = 5 + (i % 15);
    const grasas = 3 + (i % 20);
    const carbohidratos = 10 + (i % 40);
    const azucar =
      categoria === "Bebidas" || categoria === "Postres"
        ? 15 + (i % 20)
        : 5 + (i % 10);
    const sodio = 200 + (i % 300);
    const popularidad = i > 60 ? 5 : 1 + (i % 5); // los especiales con 5
    const codigoSKU = i > 60 ? `SKU-EX-${i}` : `SKU-${String(i).padStart(4, "0")}`;
    const disponibleDelivery = i % 3 !== 0 || i > 60;

    rows.push({
      id: i,
      nombre,
      categoria,
      precio: Number(precioBase.toFixed(2)),
      stock,
      enOferta,
      rating,
      calorias,
      descripcion,
      tamanoPorcion,
      tiempoPreparacion,
      esVegano,
      esSinGluten,
      nivelPicante,
      servidoFrio,
      proteinas,
      grasas,
      carbohidratos,
      azucar,
      sodio,
      popularidad,
      codigoSKU,
      disponibleDelivery,
    });
  }

  return rows;
}

export function AgGridDemo() {
  const [rowData] = useState(() => generateMenuData());

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      filter: "agNumberColumnFilter",
      maxWidth: 90,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      filter: "agTextColumnFilter",
      minWidth: 180,
    },
    {
      field: "categoria",
      headerName: "Categoría",
      filter: "agSetColumnFilter",
      minWidth: 140,
    },
    {
      field: "precio",
      headerName: "Precio (€)",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.value != null ? params.value.toFixed(2) + " €" : "",
      minWidth: 120,
    },
    {
      field: "stock",
      headerName: "Stock",
      filter: "agNumberColumnFilter",
      minWidth: 100,
    },
    {
      field: "enOferta",
      headerName: "Oferta",
      filter: "agSetColumnFilter",
      valueFormatter: (params) => (params.value ? "Sí" : "No"),
      minWidth: 110,
    },
    {
      field: "rating",
      headerName: "Rating",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => {
        const value = params.value || 0;
        const stars = "★".repeat(Math.round(value));
        const empty = "☆".repeat(5 - Math.round(value));
        return `${stars}${empty} (${value.toFixed(1)})`;
      },
      minWidth: 150,
    },
    {
      field: "calorias",
      headerName: "Calorías",
      filter: "agNumberColumnFilter",
      minWidth: 120,
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      filter: "agTextColumnFilter",
      minWidth: 220,
    },
    {
      field: "tamanoPorcion",
      headerName: "Tamaño porción",
      filter: "agSetColumnFilter",
      minWidth: 160,
    },
    {
      field: "tiempoPreparacion",
      headerName: "Tiempo prep (min)",
      filter: "agNumberColumnFilter",
      minWidth: 160,
    },
    {
      field: "esVegano",
      headerName: "Vegano",
      filter: "agSetColumnFilter",
      valueFormatter: (params) => (params.value ? "Sí" : "No"),
      minWidth: 110,
    },
    {
      field: "esSinGluten",
      headerName: "Sin gluten",
      filter: "agSetColumnFilter",
      valueFormatter: (params) => (params.value ? "Sí" : "No"),
      minWidth: 120,
    },
    {
      field: "nivelPicante",
      headerName: "Picante",
      filter: "agSetColumnFilter",
      minWidth: 120,
    },
    {
      field: "servidoFrio",
      headerName: "Servido frío",
      filter: "agSetColumnFilter",
      valueFormatter: (params) => (params.value ? "Sí" : "No"),
      minWidth: 130,
    },
    {
      field: "proteinas",
      headerName: "Proteínas (g)",
      filter: "agNumberColumnFilter",
      minWidth: 140,
    },
    {
      field: "grasas",
      headerName: "Grasas (g)",
      filter: "agNumberColumnFilter",
      minWidth: 130,
    },
    {
      field: "carbohidratos",
      headerName: "Carbohidratos (g)",
      filter: "agNumberColumnFilter",
      minWidth: 170,
    },
    {
      field: "azucar",
      headerName: "Azúcar (g)",
      filter: "agNumberColumnFilter",
      minWidth: 130,
    },
    {
      field: "sodio",
      headerName: "Sodio (mg)",
      filter: "agNumberColumnFilter",
      minWidth: 130,
    },
    {
      field: "popularidad",
      headerName: "Popularidad",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => {
        const value = params.value || 0;
        const stars = "★".repeat(value);
        const empty = "☆".repeat(5 - value);
        return `${stars}${empty} (${value}/5)`;
      },
      minWidth: 160,
    },
    {
      field: "codigoSKU",
      headerName: "Código SKU",
      filter: "agTextColumnFilter",
      minWidth: 140,
    },
    {
      field: "disponibleDelivery",
      headerName: "Delivery",
      filter: "agSetColumnFilter",
      valueFormatter: (params) => (params.value ? "Sí" : "No"),
      minWidth: 120,
    },
  ]);

  // Configuración por defecto para todas las columnas
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
      flex: 1,
      minWidth: 120,
    }),
    []
  );

  const [quickFilterText, setQuickFilterText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      {/* Título + botón alineado a la derecha */}
      <div style={{ position: "relative", marginBottom: 8 }}>
        <h2 style={{ margin: 0 }}>Demo AG Grid dentro de la web</h2>

        <a
          href="https://www.ag-grid.com/"
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
      </div>

      <p>
        Este ejemplo muestra un menú de restaurante con filtros, ordenamiento,
        buscador global y paginación.
      </p>

      {/* Buscador global */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontWeight: "bold", marginRight: 8 }}>Buscar:</label>
        <input
          type="text"
          placeholder="Escribí para filtrar por cualquier columna..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
          style={{
            padding: "4px 8px",
            minWidth: 260,
            borderRadius: 4,
            border: "1px solid #ccc", // ← línea corregida
          }}
        />
      </div>

      {/* Tabla centrada */}
      <div
        className="ag-theme-alpine"
        style={{
          height: 350,
          width: "100%",
          maxWidth: 1500,
          border: "1px solid #ddd",
          margin: "0 auto",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          quickFilterText={quickFilterText}
        />
      </div>
    </div>
  );
}
