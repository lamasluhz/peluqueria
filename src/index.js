import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Clientes,
  Header,
  Peluqueros,
} from "./Componentes";
import Reservas from "./Componentes/Reservas";

ReactDOM.render(
  <Router>
    <Header />
    <Routes>
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/peluqueros" element={<Peluqueros />} />
      <Route path="/reservas" element={< Reservas />}/>
    </Routes>
  </Router>,

  document.getElementById("root")
);
