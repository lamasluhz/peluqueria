import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Clientes,
  Header,
  Peluqueros,
} from "./Componentes";

ReactDOM.render(
  <Router>
    <Header />
    <Routes>
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/peluqueros" element={<Peluqueros />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);