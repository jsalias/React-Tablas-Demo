import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// 👇 IMPORTANTE: importar y registrar los módulos de AG Grid
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Registramos los módulos de la versión Community
ModuleRegistry.registerModules([AllCommunityModule]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
