import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// PÁGINAS
import HomePage from './pages/Inicio';
import Login from './pages/login';
import Register from './pages/register';
import RecuperacionContrasena from './pages/solicitar';
import Perfil from './pages/perfil';
import CambiarContrasena from './pages/cambio';
import Coleccion from './pages/coleccion';
import ContactPage from './pages/contacto';
import NosotrosPage from './pages/nosotros';
import AdminDashboard from './pages/admin/AdminDashboard';

// RUTAS PROTEGIDAS
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar" element={<RecuperacionContrasena />} />
        <Route path="/Nosotros" element={<NosotrosPage />} />
        <Route path="/cambio" element={<CambiarContrasena />} />
        <Route path="/Contacto" element={<ContactPage />} />
        <Route path="/Coleccion" element={<Coleccion />} />

        {/* RUTAS PROTEGIDAS — solo usuario autenticado (cualquier rol) */}
        <Route path="/perfil" element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        } />


        {/* RUTAS PROTEGIDAS — solo rol admin */}
        <Route path="/Admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;