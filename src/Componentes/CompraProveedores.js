import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CompraProveedores = () => {
    const url = 'https://localhost:7137/StockProducto/GetStockProductos'
    const location = useLocation();
    const [proveedor, setProveedor] = useState();
    const [productos, setProducto] = useState([]);
    const { state } = location;
    const obtenerProveedor = async () => {
        if (!state || !state.idProveedor) {
            // State or idProveedor is not defined, return early
            return;
        }

        const response = await axios.get(`https://localhost:7137/Proveedor/${state.idProveedor}`);
        setProveedor(response.data);
    }
    const obtenerProductos = async () => {
        const response = await axios.get(url);
        const productosFiltrados = response.data.filter(producto => producto.proveedor === proveedor.nombreEmpresa);
        setProducto(productosFiltrados);
    }

    useEffect(() => {
        obtenerProductos();
        console.log(productos)
    }, [proveedor])
    useEffect(() => {
        obtenerProveedor();

    }, [state]) // Depend on state so the effect runs whenever state changes
    if (!state || !state.idProveedor) {
        // If state or idProveedor is not defined, render a placeholder
        return <div>Loading...</div>;
    }






    return (
        <Container className="w-75 mt-4" >
            <Row className="mb-4">
                <Col>
                    <h2>Proveedor: {(proveedor && proveedor.nombreEmpresa) ? proveedor.nombreEmpresa : null} </h2>

                    <h2>Deposito: Deposito 1</h2>
                </Col>
            </Row>
            <Row className="mb-4">
                <Row>
                    <Col>
                        <h2>Compras de Productos</h2>
                    </Col>
                    <Col style={{ justifyContent: 'flex-end', display: 'flex' }}><Button variant="primary" >Nuevo Producto</Button></Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Detalles</th>

                            <th>Costo</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aca va a ir un map de los productos */}

                        {productos.map((producto) => {
                            return (
                                <tr id={producto.id}>
                                    <td> {producto.nombre}</td>
                                    <td> {producto.descripcionTipoProducto}</td>
                                    <td> {producto.precioUnitario}</td>
                                    <td> {producto.cantidad}</td>

                                </tr>)
                        })

                        }
                    </tbody>
                </Table>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h2>Productos Seleccionados</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Detalles</th>

                                <th>Costo</th>
                                <th>Cantidad</th>
                                <th>IVA 5%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aca se mapea todo y se pone un basurerito */}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5">Total</td>
                                <td>50.000</td>
                            </tr>
                        </tfoot>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="danger">Anular Compra</Button>
                </Col>
                <Col style={{ justifyContent: 'flex-end', display: 'flex' }}>

                    <Button variant="success">Confirmar Compra</Button>
                </Col>

            </Row>
        </Container>
    );
}

export default CompraProveedores;
