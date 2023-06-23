import { useEffect, useState } from 'react';
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

const CompraModal = ({ showModal, handleClose, idProveedores }) => {
    const [formValues, setFormValues] = useState({
        idTipoProducto: 1,
        nombre: '',
        precioUnitario: 0,
        idProveedor: idProveedores,
        notasAdicionales: '',
        iva: 0
    });

    const [productoData, setProductoData] = useState({
        idProducto: 11,
        idDeposito: 1,
        cantidad: 0,
        idProveedor: idProveedores,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleAgregarProducto = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://localhost:7137/Producto?IdTipoProducto=${formValues.idTipoProducto}&Nombre=${formValues.nombre}&PrecioUnitario=${formValues.precioUnitario}&NotasAdicionales=${formValues.notasAdicionales}&Iva=1`);

            const { data: productos } = await axios.get('https://localhost:7137/Producto');
            const maxIdProducto = Math.max(...productos.map(producto => producto.id));
            console.log(maxIdProducto)
            setProductoData(prevData => ({ ...prevData, idProducto: maxIdProducto }));
        } catch (error) {
            console.error(`Error: ${error}`);
        }

        handleClose();
    };
    useEffect(() => {
        if (productoData.idProducto !== 11) {
            axios.post(`https://localhost:7137/StockProducto?IdProducto=${productoData.idProducto}&IdDeposito=${productoData.idDeposito}&Cantidad=${productoData.cantidad}&IdProveedor=${productoData.idProveedor}`)
                .then(() => handleClose())
                .catch(error => console.error(`Error: ${error}`));
        }
    }, [productoData]);

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
                            name="nombre"
                            value={formValues.nombre}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Precio Unitario</Form.Label>
                        <Form.Control
                            type="text"
                            name="precioUnitario"
                            value={formValues.precioUnitario}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCedula">
                        <Form.Label>Notas Adicionales</Form.Label>
                        <Form.Control
                            type="text"
                            name="notasAdicionales"
                            value={formValues.notasAdicionales}
                            onChange={handleInputChange}
                        />
                    </Form.Group>






                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleAgregarProducto}>
                    Agregar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default CompraModal;