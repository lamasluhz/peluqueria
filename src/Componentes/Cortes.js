import axios from "axios";
import React, { useState, useEffect } from "react";
import CortesModal from "./CortesModal";
import Buscador from "./Buscador";
import { Modal, Form, Button } from 'react-bootstrap';

const url = 'https://localhost:7137/api/TiposServicios/Corte'


const Cortes = () => {
  const [cortes, setCortes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const obtenerCortes = () => {
    axios.get(url)
      .then(response => {
        setCortes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  

  const headers = {
    'accept': 'text/plain',
    'Content-Type': 'application/json'
  }
  const handleModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };

  useEffect(() => {
    obtenerCortes();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClose = (data) => {
    axios.post('https://localhost:7137/api/TiposServicios/Corte', {
      "id": 0,
      "descripcion": data,
      "decMonto": "string",
      "eliminado": true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      }

    })
      .then(response => {
        obtenerCortes(); // Refresh the client list after adding a new client
      })
      .catch(error => {
        console.error('Error adding cliente:', error);
      });
    setShowModal(!showModal);
  }
  
  return (
    <div>
      <div>
        <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Cortes</h2>
        <hr style={{ borderTop: '2px solid #B4D8E9' }} />
      </div>

      <div className="container">

        <br />

        {/* <!-- TABLAS --> */}
        <CortesModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
       
        <table className="table table-striped table-hover border-black " style={{
          border: '1px solid black'
        }} id="myTable"
        >
          < thead >
            <tr>
              <th scope="col">Corte</th>
              <th scope="col">Precio</th>
              <th scope="col">Otros</th>
            </tr>
          </thead >
          <tbody>
            {cortes.map((cortes, i) => {
              return (
                <tr id={i}>
                  <td> {cortes.descripcion}</td>
                  <td> {cortes.decMonto}</td>
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

export default Cortes