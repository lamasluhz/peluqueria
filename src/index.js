import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import {
  Clientes,
  Header,
  Peluqueros,
  Stock,
  Manicuras,
  Principal,
  Facturas,
  Peinados,
  Maquillajes,
  Tinturas,
  Cortes,
  Servicios,
  Lavados,
  Reservas,
} from "./Componentes";

const App = () => {
  const [ingresar, setIngresar] = useState(false);

  const acceder = (estado) => {
    setIngresar(estado);
  };

  return (
    <Router>
      {ingresar ? <Header acceder={acceder}/> : <Principal acceder={acceder} />}
      {ingresar ? <Routes>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/peluqueros" element={<Peluqueros />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/cortes" element={<Cortes />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/manicuras" element={<Manicuras />} />
        <Route path="/peinados" element={<Peinados />} />
        <Route path="/maquillajes" element={<Maquillajes />} />
        <Route path="/tinturas" element={<Tinturas />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/lavados" element={<Lavados />} />
        <Route path="/facturas" element={<Facturas />} />
      </Routes>: null}
    </Router> 
  );
};

ReactDOM.render(<App />, document.getElementById("root"));