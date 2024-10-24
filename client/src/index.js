import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login'; // Importa o componente Login
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} /> {/* Rota padrão para Login */}
      <Route path="/app" element={<App />} /> {/* Rota para o App */}
    </Routes>
  </BrowserRouter>
);
