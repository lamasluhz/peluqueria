import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ClienteModal = ({ showModal, handleClose }) => {
    const [formValues, setFormValues] = useState({
        nombres: '',
        apellidos: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: '',
        ruc: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleClienteModal = () => {
        axios
            .post('https://localhost:7137/api/Cliente/postCliente', formValues)
            .then((response) => {
                console.log('PUT request successful');
                console.log(response.data); // You can do something with the response if needed
            })
            .catch((error) => {
                console.error('Error making PUT request:', error);
            });
        handleClose();

    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNombres">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombres"
                            value={formValues.nombres}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellidos">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellidos"
                            value={formValues.apellidos}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCedula">
                        <Form.Label>Cedula</Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={formValues.cedula}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formTelefono">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                            type="text"
                            name="telefono"
                            value={formValues.telefono}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCorreo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            name="correo"
                            value={formValues.correo}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDireccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={formValues.direccion}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formRUC">
                        <Form.Label>RUC</Form.Label>
                        <Form.Control
                            type="text"
                            name="ruc"
                            value={formValues.ruc}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleClienteModal}>
                    Agregar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClienteModal;
