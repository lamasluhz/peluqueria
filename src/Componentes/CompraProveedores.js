import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const CompraProveedores = () => {
    return (
        <Container className="w-75 mt-4" >
            <Row className="mb-4">
                <Col>
                    <h2>Proveedor: Clubman Pinaud</h2>
                    <h2>Deposito: Deposito 4</h2>
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
                            <th>Categoria</th>
                            <th>Costo</th>
                            <th>Cantidad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Plusbelle</td>
                            <td>1 Litro de manzana </td>
                            <td>Cabello</td>
                            <td>10000</td>
                            <td>
                                - 3 + 
                            </td>
                            <td><button>Comprar</button></td>
                        </tr>
                        <tr>
                            <td>Sedal</td>
                            <td>1 Litro Rizos </td>
                            <td>Cabello</td>
                            <td>12000</td>
                            <td>
                                - 0 + 
                            </td>
                            <td><button>Comprar</button></td>
                        </tr>
                        {/* Aca va a ir un map de los productos */}
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
                                <th>Categoria</th>
                                <th>Costo</th>
                                <th>Cantidad</th>
                                <th>IVA 5%</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Plusbelle</td>
                            <td>1 Litro de manzana </td>
                            <td>Cabello</td>
                            <td>10000</td>
                            <td>
                                3
                            </td>
                            <td>5%</td>
                        </tr>
                            {/* Aca se mapea todo y se pone un basurerito */}
                        </tbody>
                        <tfooter>
                            <tr>
                                <td colSpan="5">Total</td>
                                <td>50.000</td>
                            </tr>
                        </tfooter>
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
