import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BuscadorCompraProductos from './BuscadorCompraProductos'
//import CompraModal from './ProductoModal';

const CompraProveedores = () => {
    const url = 'https://localhost:7137/StockProducto/GetStockProductos'
    const location = useLocation();
    const [proveedor, setProveedor] = useState();
    const [showModal, setShowModal] = useState(false);
    const [productos, setProducto] = useState([]);
    const [productosSeleccionados, setProductoSeleccionados] = useState([]);
    const [cantidadProducto, setCantidadProducto] = useState({})
    const [productosFiltrados, setProductosFiltrados] = useState([]);

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

    const handleSearch = (searchValue) => {
        if (searchValue.trim() === "") {
            setProductosFiltrados([]);
        } else {
            const productosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
                producto.descripcionTipoProducto.toLowerCase().includes(searchValue.toLowerCase())
            );
            setProductosFiltrados(productosFiltrados);
        }
    }

    const openModal = () => {
        console.log(showModal);
        setShowModal(!showModal);
    }
    const handleClose = () => { setShowModal(false) }
    const agregarAlCarrito = (productoAgregado) => {
        let productoYaEnCarrito = productosSeleccionados.find(producto => producto.id === productoAgregado.id);

        if (productoYaEnCarrito) {
            // Si el producto ya está en el carrito, aumenta su cantidad
            setCantidadProducto({
                ...cantidadProducto,
                [productoAgregado.id]: cantidadProducto[productoAgregado.id] + 1
            });
        } else {
            // Si el producto no está en el carrito, añádelo
            setProductoSeleccionados([...productosSeleccionados, productoAgregado]);
            setCantidadProducto({ ...cantidadProducto, [productoAgregado.id]: 1 });
        }
    }

    let total = productosSeleccionados.reduce((total, producto) => total + producto.precioUnitario * producto.cantidad, 0);

    const cambiarCantidadProducto = (idProducto, nuevaCantidad) => {
        setProductoSeleccionados(productosSeleccionados.map(producto => {
            if (producto.id === idProducto) {
                return { ...producto, cantidad: nuevaCantidad };
            }
            return producto;
        }));
    }
    const eliminarProducto = (idProducto) => {
        setProductoSeleccionados(productosSeleccionados.filter(producto => producto.id !== idProducto));
    }




    return (

        <Container className="w-75 mt-4" >
            <Row className="mb-4">
                <Col>
                    <h2>Proveedor: {(proveedor && proveedor.nombreEmpresa) ? proveedor.nombreEmpresa : null} </h2>

                    <h2>Deposito: Deposito 1</h2>
                </Col>
            </Row>
            <Row>

            </Row>
            <Row className="mb-4">
                <Row>
                    <Col>
                        <h2>Compras de Productos</h2>
                        <BuscadorCompraProductos handleSearch={handleSearch} action={openModal} />
                        {/*<CompraModal showModal={showModal} handleClose={handleClose} />*/}
                    </Col>

                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Detalles</th>

                            <th>Costo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aca va a ir un map de los productos */}

                        {productosFiltrados.map((producto) => {
                            return (
                                <tr id={producto.id}>
                                    <td> {producto.nombre}</td>
                                    <td> {producto.descripcionTipoProducto}</td>
                                    <td> {producto.precioUnitario}</td>
                                    <td> <button onClick={(e) => {

                                        agregarAlCarrito(producto);
                                    }}>Añadir al carrito</button>

                                    </td>

                                </tr>)
                        })

                        }
                    </tbody>
                </Table>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h2>Productos Seleccionados</h2>
                    <Table striped bordered hover id='carrito'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Detalles</th>

                                <th>Costo</th>
                                <th>Cantidad</th>
                                <th>IVA 5%</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aca se cargan los elemento del carrito */}
                            {productosSeleccionados.map((producto) => {
                                return (
                                    <tr id={producto.id}>
                                        <td> {producto.nombre}</td>
                                        <td> {producto.descripcionTipoProducto}</td>
                                        <td> {producto.precioUnitario}</td>
                                        <td> <input
                                            type="number"
                                            value={cantidadProducto[producto.id]}
                                            onChange={(e) => {
                                                const nuevaCantidad = e.target.value;
                                                setCantidadProducto({ ...cantidadProducto, [producto.id]: nuevaCantidad });
                                                cambiarCantidadProducto(producto.id, nuevaCantidad);
                                            }}
                                            min={1}
                                        />
                                            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>

                                        </td>
                                        <td> {(producto.precioUnitario * producto.cantidad * 0.05).toFixed(4)}</td>
                                        <td> {(producto.cantidad * producto.precioUnitario).toFixed(4)}</td>
                                        {/* Aquí se calcula el IVA */}
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5">Total</td>
                                <td>{/*Aca se calcula el total de todos los elementos del carrito */} {total.toFixed(4)}</td>
                            </tr>
                        </tfoot>
                    </Table>
                </Col>
            </Row>
            <Row>

                <Col style={{ justifyContent: 'center', display: 'flex' }}>

                    <Button variant="success">Confirmar Compra</Button>
                </Col>

            </Row>
        </Container>
    );
}

export default CompraProveedores;
