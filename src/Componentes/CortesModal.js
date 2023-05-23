import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CortesModal = ({ showModal, handleClose }) => {
    const [formValues, setFormValues] = useState({
        descripcion: '',
        decMonto: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleClienteModal = () => {
        axios
            .post('https://localhost:7137/api/TiposServicios/Corte', formValues)
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
                <Modal.Title>Agregar Corte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCorte">
                        <Form.Label>Corte</Form.Label>
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
                            type="text"
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
                <Button variant="primary" onClick={handleClienteModal}>
                    Agregar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CortesModal;
