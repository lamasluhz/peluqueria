import { useState } from 'react';
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';

const PeluqueroModal = ({ showModal, handleClose }) => {
    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: '',
        ruc: '',
        especialidad: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleDropdownChange = (event) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            especialidad: event.target.value,
        }));
    };

    const handleAddStylist = () => {
        console.log(formValues);
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Peluquero</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formValues.nombre}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellido"
                            value={formValues.apellido}
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

                    <Form.Group controlId="formEspecialidad">
                        <Form.Label>Especialidad</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Seleccione la especialidad</option>
                            <option value="corte">Corte</option>
                            <option value="tintura">Tintura</option>
                            <option value="peinado">Peinados</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleAddStylist}>
                    Agregar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PeluqueroModal;
