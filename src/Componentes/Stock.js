import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import BuscadorProductos from "./BuscadorProductos";

const Stock = () => {
  const url = "https://localhost:7137/StockProducto/GetStockProductos";
  const [productos, setProducto] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const obtenerProductos = async () => {
    const response = await axios.get(url);
    setProducto(response.data);
  };
  // {

  //   }
  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producto.proveedor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producto.descripcionTipoProducto
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div>
        <h3 className="titulos">Stock de Productos</h3>
        <hr className="hr" />
      </div>
      <div style={{ padding: "0 15%" }}>
        <BuscadorProductos handleSearch={handleSearch} />
        <div className="TablaBordes">
          <table className="table table-striped table-hover" id="myTable">
            <thead>
              <tr style={{ backgroundColor: "#B4D8E9" }}>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Proveedor</th>
                <th>Precio Unitario</th>
                <th>Descripcion</th>

                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => {
                return (
                  <tr id={producto.id}>
                    <td> {producto.nombre}</td>
                    <td> {producto.cantidad}</td>

                    <td> {producto.proveedor}</td>

                    <td> {producto.precioUnitario}</td>

                    <td> {producto.descripcionTipoProducto}</td>

                    <td>
                      <i
                        className="fa-solid fa-pen"
                        style={{ marginRight: "15px", cursor: "pointer" }}
                      ></i>{" "}
                      <i
                        className="fa-solid fa-trash"
                        style={{ marginRight: "15px", cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stock;
