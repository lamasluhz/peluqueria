import axios from "axios";
import React, { useEffect, useState } from "react";
import ClienteModal from "./ClienteModal";
import Buscador from "./Buscador";
import { Modal, Form, Button } from 'react-bootstrap';
import ClienteRow from "./ClientesRow";
import '../css/Estilos.css';

const url = 'https://localhost:7137/api/Cliente/getCliente';


const Clientes = () => {

  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para el modal de confirmación
  const [selectedClienteId, setSelectedClienteId] = useState(null); // Estado para almacenar el ID del cliente seleccionado


  const [searchQuery, setSearchQuery] = useState('');


  const headers = {
    'accept': 'text/plain',
    'Content-Type': 'application/json'
  }
  const handleModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = () => {
    axios.get(url)
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  const handleDeleteCliente = (id) => {
    setSelectedClienteId(id); // Guardar el ID del cliente seleccionado
    setShowConfirmationModal(true); // Mostrar el modal de confirmación
  };

  const handleConfirmDeleteCliente = () => {
    axios
      .delete(`https://localhost:7137/api/Cliente/${selectedClienteId}`)
      .then((response) => {
        console.log(response);
        obtenerClientes(); // Actualizar la lista de clientes después de eliminar
      })
      .catch((error) => {
        console.error("Error deleting cliente:", error);
      });

    setShowConfirmationModal(false); // Cerrar el modal de confirmación
  };
  const handleCancelDeleteCliente = () => {
    setSelectedClienteId(null); // Reiniciar el ID del cliente seleccionado
    setShowConfirmationModal(false); // Cerrar el modal de confirmación
  };

  const handleFieldUpdate = (id, values) => {
    axios.put(`https://localhost:7137/api/Cliente/${id}`,
      values
      // {
      //   "id": 0,
      //   "nombres": "string",
      //   "apellidos": "string",
      //   "correo": "string",
      //   "telefono": "string",
      //   "direccion": "string",
      //   "cedula": "string",
      //   "ruc": "string",
      //   "eliminado": true
      // }
      , headers)
      .then(response => {
        console.log(response);
        obtenerClientes(); // Refresh the client list after field update
      })
      .catch(error => {
        console.error('Error updating cliente:', error);
      });
  };

  const renderClientes = () => {
    const filteredClientes = clientes.filter(cliente =>
      cliente.nombres.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredClientes.map((cliente, i) => {
      if (cliente.eliminado) {
        return null; // Skip rendering if 'eliminado' is true
      }

      return (
        <ClienteRow
          key={cliente.id}
          cliente={cliente}
          handleFieldUpdate={handleFieldUpdate}
          handleDeleteCliente={handleDeleteCliente}
        />
      );
    });
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
        obtenerClientes(); // Refresh the client list after adding a new client
      })
      .catch(error => {
        console.error('Error adding cliente:', error);
      });
    setShowModal(!showModal);
  }

  return (
    <div>
      <div>
        <h3 className="titulos">Clientes</h3>
        <hr className="hr" />
      </div>

      <div className="container">
        <br />

        {/* <!-- TABLAS --> */}
        <ClienteModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <div className="TablaBordes">
          <table className="table table-striped table-hover" id="myTable">
            <thead>
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Nombre</th>
                <th scope="col">C.I.</th>
                <th scope="col">Correo</th>
                <th scope="col">Direccion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Historial</th>
                <th scope="col">Otros</th>
              </tr>
            </thead>
            <tbody>
              {renderClientes()}
            </tbody>
          </table>
        </div>
        <Modal show={showConfirmationModal} onHide={handleCancelDeleteCliente}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar este cliente?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDeleteCliente}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDeleteCliente}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};



export default Clientes;
