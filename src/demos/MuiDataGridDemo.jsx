import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";

const TOTAL_ROWS = 80;

export function MuiDataGridDemo() {
  // Columnas (agregué más campos)
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "nombre", headerName: "Nombre", width: 160 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "edad", headerName: "Edad", width: 90, type: "number" },
    { field: "ciudad", headerName: "Ciudad", width: 140 },
    { field: "rol", headerName: "Rol", width: 130 },
    { field: "estado", headerName: "Estado", width: 130 },
    { field: "fechaAlta", headerName: "Fecha alta", width: 140 },
  ];

  // Filas: hasta 80 registros (menos de 100)
  const rows = React.useMemo(
    () =>
      Array.from({ length: TOTAL_ROWS }, (_, i) => ({
        id: i + 1,
        nombre: `Usuario ${i + 1}`,
        email: `usuario${i + 1}@mail.com`,
        edad: 18 + (i % 50),
        ciudad: `Ciudad ${i % 10}`,
        rol: ["Admin", "Usuario", "Editor"][i % 3],
        estado: i % 2 === 0 ? "Activo" : "Inactivo",
        fechaAlta: `2024-${String((i % 12) + 1).padStart(2, "0")}-01`,
      })),
    []
  );

  return (
    <Box
      sx={{
        
        width: "95%",         // 👈 ocupa el 95% del ancho
        mx: "auto",           // centra horizontalmente
        p: 3,
        bgcolor: "#0f172a",   // fondo oscuro
        borderRadius: 2,
      }}
    >
      {/* Header con título + botón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", m: 0 }}>
          Lista de Usuarios (MUI DataGrid)
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component="a"
          href="https://mui.com/x/react-data-grid/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Web oficial
        </Button>
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        sx={{
          bgcolor: "#fff",          // 👈 la tabla queda blanca sobre fondo oscuro
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
