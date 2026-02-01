// src/App.js
import { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

import { TanStackTableDemo } from "./demos/TanStackTableDemo";
import { AgGridDemo } from "./demos/AgGridDemo";
import { MuiDataGridDemo } from "./demos/MuiDataGridDemo";
import { ReactVirtualDemo } from "./demos/ReactVirtualDemo";
import { ReactWindowDemo } from "./demos/ReactWindowDemo";
import { ReactVirtualizedDemo } from "./demos/ReactVirtualizedDemo";

// 🔹 Imágenes
import tanstackLogo from "./imagenes/tanstack.png";
import agLogo from "./imagenes/ag.webp";
import muiLogo from "./imagenes/mui.png";
import virtualLogo from "./imagenes/virtual.png";
import windowLogo from "./imagenes/window.png";
import virtualizedLogo from "./imagenes/virtualized1.png";
import githubLogo from "./imagenes/github.png";

// 🔧 Config general de librerías (card, nav, footer)
const LIBRARIES = [
  {
    id: "tanstack-table",
    name: "TanStack Table",
    path: "/tanstack-table",
    category: "Tablas y Data Grids",
    logoSrc: tanstackLogo,
    author: "Tanner Linsley & comunidad",
    docsUrl: "https://tanstack.com/table/latest",
    tagline: "Tablas headless súper flexibles para React.",
    badge: "Data Grid",
    info: `
<p>
  TanStack Table es una librería headless para construir tablas avanzadas en React.
  No trae estilos por defecto: vos decidís el diseño y el renderer (HTML, divs, componentes).
  Soporta sorting, filtering, paginación, grouping, column reordering y más.
  Es ideal cuando necesitás máximo control y performance en tablas complejas.
</p>

<p><strong>Características:</strong></p>

<ul>
  <li>Headless (sin estilos predefinidos)</li>
  <li>Ordenación de columnas</li>
  <li>Filtrado de datos</li>
  <li>Paginación</li>
  <li>Alto rendimiento en tablas grandes</li>
</ul>
    `,
  },
  {
    id: "ag-grid",
    name: "AG Grid",
    path: "/ag-grid",
    category: "Tablas y Data Grids",
    logoSrc: agLogo,
    author: "AG Grid Ltd",
    docsUrl: "https://www.ag-grid.com/",
    tagline: "Data grid muy potente para dashboards complejos.",
    badge: "Data Grid",
    info: `
<p>
  AG Grid es un data grid extremadamente completo y orientado a aplicaciones enterprise.
  Ofrece una enorme cantidad de funcionalidades listas para usar y una API muy madura.
</p>

<p><strong>Características:</strong></p>

<ul>
  <li>Edición de celdas en línea</li>
  <li>Ordenación y filtrado avanzado</li>
  <li>Agrupación y pivot de datos</li>
  <li>Paginación cliente y servidor</li>
  <li>Exportación a Excel y CSV</li>
  <li>Versión gratuita y versión enterprise con soporte</li>
</ul>
    `,
  },
  {
    id: "mui-datagrid",
    name: "MUI DataGrid",
    path: "/mui-datagrid",
    category: "Tablas y Data Grids",
    logoSrc: muiLogo,
    author: "MUI",
    docsUrl: "https://mui.com/x/react-data-grid/",
    tagline: "Tabla lista para usar dentro del ecosistema MUI.",
    badge: "Data Grid",
    info: `
<p>
  MUI DataGrid forma parte de la familia MUI X y se integra perfecto con Material UI.
  Trae un look moderno out-of-the-box, ideal si ya usás MUI para formularios y diseño general.
</p>

<p><strong>Características:</strong></p>

<ul>
  <li>Estilos Material Design por defecto</li>
  <li>Ordenación y filtrado integrados</li>
  <li>Paginación automática</li>
  <li>Selección de filas con checkbox</li>
  <li>Columnas redimensionables y ocultables</li>
</ul>
    `,
  },
  {
    id: "react-virtual",
    name: "React Virtual (TanStack Virtual)",
    path: "/react-virtual",
    category: "Virtualización",
    logoSrc: virtualLogo,
    author: "TanStack",
    docsUrl: "https://tanstack.com/virtual/latest",
    tagline: "Listas virtualizadas simples y muy performantes.",
    badge: "Virtualización",
    info: `
<p>
  React Virtual se enfoca exclusivamente en virtualizar listas y grids para mejorar el rendimiento.
  Solo renderiza los elementos visibles en pantalla en cada momento.
</p>

<p><strong>Características:</strong></p>

<ul>
  <li>Virtualización de listas y grids</li>
  <li>Altísimo rendimiento con miles de filas</li>
  <li>Headless y muy flexible</li>
  <li>Compatible con cualquier layout o tabla custom</li>
  <li>Integración sencilla con otras librerías</li>
</ul>
    `,
  },
  {
    id: "react-window",
    name: "React Window",
    path: "/react-window",
    category: "Virtualización",
    logoSrc: windowLogo,
    author: "Brian Vaughn",
    docsUrl: "https://react-window.vercel.app/",
    tagline: "Virtualización minimalista para listas y grids.",
    badge: "Virtualización",
    info: `
<p>
  React Window es una librería liviana y simple para virtualizar listas y grids.
  Está pensada para cuando necesitás rendimiento sin demasiada complejidad extra.
</p>

<p><strong>Características:</strong></p>

<ul>
  <li>API simple y minimalista</li>
  <li>Tamaño de bundle muy pequeño</li>
  <li>Virtualización eficiente de listas</li>
  <li>Soporte para listas y grids fijos o variables</li>
  <li>Ideal para proyectos medianos y UI personalizadas</li>
</ul>
    `,
  },
  {
    id: "react-virtualized",
    name: "React Virtualized",
    path: "/react-virtualized",
    category: "Virtualización",
    logoSrc: virtualizedLogo,
    author: "Brian Vaughn",
    docsUrl: "https://bvaughn.github.io/react-virtualized/#/components/List",
    tagline: "Colección de componentes para listas enormes.",
    badge: "Virtualización",
    info: `
<p>
  React Virtualized es una colección completa de componentes para manejar listas grandes
  y layouts complejos con virtualización.
</p>

<p><strong>Características:</strong></p>

<ul>
  <li>Componentes List, Grid, Table y Masonry</li>
  <li>Soporte para layouts complejos</li>
  <li>Virtualización avanzada y configurable</li>
  <li>Más potente pero más compleja que React Window</li>
  <li>Útil cuando necesitás varios tipos de layouts virtualizados</li>
</ul>
    `,
  },
];

// 🔹 Home con las tarjetas + panel lateral
function Home() {
  const [activeLib, setActiveLib] = useState(null);

  const grids = LIBRARIES.filter((l) => l.category === "Tablas y Data Grids");
  const virtual = LIBRARIES.filter((l) => l.category === "Virtualización");

  return (
    <main className="app-main">
      <section className="hero">
        <h1>Galería de Tablas y Listas Virtualizadas</h1>
        <p>
          Explorá distintas librerías para mostrar datos en React. Pasá el mouse
          por las tarjetas para ver la información detallada en el panel de la
          derecha y hacé click para abrir cada demo.
        </p>
      </section>

      {/* Contenedor principal: cards a la izquierda + info a la derecha */}
      <div className="main-layout">
        <div className="cards-column">
          <section className="section">
            <h2>Tablas y Data Grids</h2>
            <div className="card-grid">
              {grids.map((lib) => (
                <LibraryCard
                  key={lib.id}
                  lib={lib}
                  onHover={() => setActiveLib(lib)}
                />
              ))}
            </div>
          </section>

          <section className="section">
            <h2>Virtualización (listas grandes)</h2>
            <div className="card-grid">
              {virtual.map((lib) => (
                <LibraryCard
                  key={lib.id}
                  lib={lib}
                  onHover={() => setActiveLib(lib)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Panel lateral con información de la librería */}
        <aside className="info-column">
          {activeLib ? (
            <div className="lib-info-box">
              <h2>{activeLib.name}</h2>

              <div
                className="lib-info-html"
                dangerouslySetInnerHTML={{ __html: activeLib.info }}
              />

              <a
                href={activeLib.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="lib-info-link"
              >
                Ver documentación oficial
              </a>
            </div>
          ) : (
            <div className="lib-info-box lib-info-box--empty">
              <h2>Información de la librería</h2>
              <p>
                Pasá el mouse por una tarjeta de la izquierda para ver acá la
                descripción detallada de cada librería.
              </p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

// 🔹 Tarjeta con imagen de fondo + overlay en hover
function LibraryCard({ lib, onHover }) {
  return (
    <Link
      to={lib.path}
      className="lib-card"
      onMouseEnter={onHover}
    >
      <div className="lib-card-inner">
        {/* Imagen de fondo */}
        <div
          className="lib-card-background"
          style={{ backgroundImage: `url(${lib.logoSrc})` }}
        />

        {/* Badge arriba a la izquierda */}
        <div className="lib-card-badge">{lib.badge}</div>

        {/* Overlay inferior con nombre + descripción */}
        <div className="lib-card-overlay">
          <h3>{lib.name}</h3>
          <p>{lib.tagline}</p>
        </div>
      </div>
    </Link>
  );
}

// 🔹 Header con nav
function Header() {
  const location = useLocation();

  const githubRepo = "https://github.com/tu-usuario/tablas-react-demo"; // cambiá por el real

  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">T</span>
          <span className="brand-text">Tablas & Virtualización en React</span>
        </Link>

        <nav className="nav">
          {LIBRARIES.map((lib) => {
            const active = location.pathname.startsWith(lib.path);
            return (
              <Link
                key={lib.id}
                to={lib.path}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
              >
                {lib.name}
              </Link>
            );
          })}

          <a
            href={githubRepo}
            target="_blank"
            rel="noreferrer"
            className="nav-link nav-link-ghost"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

// 🔹 Footer con links a docs + autor + repo
function Footer() {
  const githubRepo = "https://github.com/tu-usuario/tablas-react-demo";
  

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-libs">
          {LIBRARIES.map((lib) => (
            <div key={lib.id} className="footer-lib">
              <a href={lib.docsUrl} target="_blank" rel="noreferrer">
                {lib.name}
              </a>
              <span> · by {lib.author}</span>
            </div>
          ))}
        </div>

        <div className="footer-meta">
          <span>
            Realizado por Juan Ignacio Salias © {new Date().getFullYear()} Demo
            de Tablas en React.
          </span>

          <a
            href={githubRepo}
            target="_blank"
            rel="noreferrer"
            className="footer-github-link"
          >
            Ver código en GitHub
            <img
              src={githubLogo}
              alt="GitHub"
              className="footer-github-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

// 🔹 App principal
function App() {
  return (
    <div className="app-root">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tanstack-table" element={<TanStackTableDemo />} />
        <Route path="/ag-grid" element={<AgGridDemo />} />
        <Route path="/mui-datagrid" element={<MuiDataGridDemo />} />
        <Route path="/react-virtual" element={<ReactVirtualDemo />} />
        <Route path="/react-window" element={<ReactWindowDemo />} />
        <Route path="/react-virtualized" element={<ReactVirtualizedDemo />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
