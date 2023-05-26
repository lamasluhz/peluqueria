import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const PeinadosModal = ({ showModal, handleClose }) => {
  const [formValues, setFormValues] = useState({
    id: 0,
    tipo: 'Peinados',
    descripcion: '',
    decMonto: 0,
    eliminado: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePeinadoModal = () => {
    axios
      .post('https://localhost:7137/api/TiposServicios', formValues)
      .then((response) => {
        console.log('POST request successful');
        console.log(response.data);
        handleClose(true); // Indicate that a new peinado has been added
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Peinado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPeinado">
            <Form.Label>Peinado</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="decMonto"
              value={formValues.decMonto}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handlePeinadoModal}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PeinadosModal;

