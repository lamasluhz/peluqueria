import axios from "axios";
import React, { useState, useEffect } from "react";


const url = 'https://localhost:7137/api/Cliente/getCliente'


const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const obtenerClientes = () => {
    axios.get(url).then(response => {
      setClientes(response.data);
    });
  }

  useEffect(() => {
    obtenerClientes();
  }, []);
  
  return (
    <div>
      <div>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Clientes</h2>
      </div>

      <div className="container">

        <br />

        {/* <!-- TABLAS --> */}
        <div style={{ backgroundColor: '#f8e1e1', paddingTop: '1%', paddingLeft: '1%' }} ><input type="text" id="myInput" onkeyup="myFunction()" placeholder="Buscar..." title="Type in a name" /> <button className="button"></button></div>
        <table className="table table-striped table-hover border-black " style={{
          border: '1px solid black'
        }} id="myTable"
        >
          < thead >
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">C.I.</th>
              <th scope="col">Correo</th>
              <th scope="col">Direccion</th>
              <th scope="col">Telefono</th>
              <th scope="col">Historial</th>
              <th scope="col">Otros</th>
            </tr>
          </thead >
          <tbody>
            {clientes.map((cliente, i) => {
              return (
                <tr id={i}>
                  <td> {cliente.nombres}</td>
                  <td> {cliente.cedula}</td>
                  <td> {cliente.correo}</td>
                  <td> {cliente.direccion}</td>
                  <td> {cliente.telefono}</td>
                  <td><i className="fa-solid fa-arrows-to-eye"></i></td>
                  <td><i className="fa-solid fa-pen" style={{ marginRight: '15px' }}></i> <i class="fa-solid fa-trash"></i></td>
                </tr>
              )

            })}
          </tbody>
        </table >
      </div>
    </div >
  )
}

export default Clientes