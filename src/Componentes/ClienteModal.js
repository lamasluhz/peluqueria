import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ClienteModal = ({ showModal, handleClose }) => {
    const initialFormValues = {
        nombres: '',
        apellidos: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: '',
        ruc: '',
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para el modal de operación exitosa

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
                setShowSuccessModal(true);
                setFormValues(initialFormValues);
            })
            .catch((error) => {
                console.error('Error making PUT request:', error);
            });
        handleClose();

    }; const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
    };

    return (
        <div>

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
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Operación exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>La operación se completó exitosamente.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSuccessModalClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ClienteModal;
