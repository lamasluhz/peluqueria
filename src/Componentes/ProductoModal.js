import { useEffect, useState } from 'react';
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

const CompraModal = ({ showModal, handleClose }) => {
    const [formValues, setFormValues] = useState({
        id: 0,
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        direccion: "",
        cedula: "",
        listEspecialidades: [],
        eliminado: false
    });
    const [options, setOptions] = useState([])


    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/Especialidad');
            const data = response.data;

            setOptions(data.map(item => ({
                value: item.id,
                label: item.especialidad
            })));

            console.log(options);
            return options
            // Now, "options" is in the format you need
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };


    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleAddStylist = (e) => {
        e.preventDefault();
        axios.post('https://localhost:7137/api/Peluquero', formValues)
            .then(response => {
                console.log(response.data); // You can check the server response
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombres"
                            value={formValues.nombres}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Precio Unitario</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellidos"
                            value={formValues.apellidos}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCedula">
                        <Form.Label>Notas Adicionales</Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={formValues.cedula}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Iva">
                        <Form.Label> Tipo Producto</Form.Label>
                        <Select
                            isMulti
                            options={options}
                            value={selectedOptions}
                            onChange={handleSelectChange}
                        />
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


export default CompraModal;
