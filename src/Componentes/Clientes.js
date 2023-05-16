import axios from "axios";
import React, { useEffect, useState } from "react";
import ClienteModal from "./ClienteModal";
import Buscador from "./Buscador";
import { Modal, Form, Button } from 'react-bootstrap';
const url = 'https://localhost:7137/api/Cliente/getCliente'


const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };
  const handleClose = (data) => {
    axios.post('https://localhost:7137/api/Cliente/postCliente', {
      "id": 0,
      "nombres": data,
      "apellidos": "string",
      "correo": "string",
      "telefono": "string",
      "direccion": "string",
      "cedula": "string",
      "ruc": "string",
      "eliminado": true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      }

    })
      .then(response => {
        // Aquí puedes manejar la respuesta si es necesario
      })
      .catch(error => {
        // Aquí puedes manejar el error si la petición falla
      });
    setShowModal(!showModal);
  }

  useEffect(() => {
    const obtenerClientes = () => {
      axios.get(url).then(response => {
        setClientes(response.data);

      })
        .catch(error => {
          console.log(error)
        });

    }
    obtenerClientes()
  }, [])


  return (

    < div >
      <div>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Clientes</h2>
      </div>

      <div className="container">

        <br />

        {/* <!-- TABLAS --> */}


        <ClienteModal showModal={showModal} handleClose={handleClose} />

        <Buscador action={handleModal} />


        <table className="table table-striped table-hover border-black " style={{
          border: '1px solid black',
        }} id="myTable"
        >
          < thead >
            <tr style={{ backgroundColor: '#FFE2D9' }}>
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