// src/TestAgGrid.jsx
import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function TestAgGrid() {
  const rowData = [
    { id: 1, producto: "Hamburguesa", precio: 8.5 },
    { id: 2, producto: "Pizza", precio: 11 },
    { id: 3, producto: "Coca-Cola", precio: 2 },
  ];

  const columnDefs = [
    { field: "id", headerName: "ID" },
    { field: "producto", headerName: "Producto" },
    { field: "precio", headerName: "Precio" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>TEST AG GRID (mínimo)</h2>

      <div
        className="ag-theme-alpine"
        style={{ height: 300, width: 500, border: "1px solid red" }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
}
