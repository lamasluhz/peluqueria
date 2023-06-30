import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import FacturaVenta from "./FacturaVenta";
import ConvertirFecha from "./ConvertirFecha";
import { format, isSameDay, parseISO } from "date-fns";
import FacturaCompra from "./FacturaCompra";

const FacturasCobradas = () => {
    const [buscar, setBuscar] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalCompra, setShowModalCompra] = useState(false);
    const [idFacturaVentas, setIdFacturaVentas] = useState("");
    const [idFacturaCompra, setIdFacturaCompra] = useState("");
    const [showTablaVentas, setShowTablaVentas] = useState(true);
    const [showTablaCompras, setShowTablaCompras] = useState(false);
    const [facturas, setFacturas] = useState([]);
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [facturaCompra, setFacturaCompra] = useState([]);
    const [showFactura, setShowFactura] = useState(false);
    const [idCajas, setIdCaja] = useState('');


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModalCompra = () => {
        setShowModalCompra(false);
    };

    const handleShowModalCompra = () => {
        setShowModalCompra(true);
    };


    const searchingSales = (buscar) => (x) => {
        if (buscar != null && x.nombreCliente && x.apellidoCliente) {
            const fullName = `${x.nombreCliente} ${x.apellidoCliente}`;
            const searchLower = buscar.toLowerCase();
            const fullNameLower = fullName.toLowerCase();
            return (
                x.nombreCliente.toLowerCase().includes(searchLower) ||
                x.apellidoCliente.toLowerCase().includes(searchLower) ||
                fullNameLower.includes(searchLower)
            );
        } else {
            return true;
        }
    };

    const searchingBuys = (buscar) => (x) => {
        if (buscar != null && x.proveedor.nombreEmpresa) {
            const searchLower = buscar.toLowerCase();
            return (
                x.proveedor.nombreEmpresa.toLowerCase().includes(searchLower)
            );
        } else {
            return true;
        }
    };


    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await axios.get("https://localhost:7137/api/Factura/facturadas");
                setFacturas(response.data);
            } catch (error) {
                console.error("Error al obtener los datos de las facturas de Ventas:", error);
            }
        };

        fetchFacturas();
    }, []);

    useEffect(() => {
        const fetchFacturasCompra = async () => {
            try {
                const response = await axios.get("https://localhost:7137/api/FacturaProveedores/facturaProveedoresFacturadas");
                const data = response.data;
                setFacturaCompra(data);
            } catch (error) {
                console.error("Error al obtener los datos de las facturas de Compras:", error);
            }
        };

        fetchFacturasCompra();
    }, []);


    useEffect(() => {
        const storedConectado = localStorage.getItem("cajero");
        if (storedConectado !== null) {
            setShowFactura(true);
        }
        const storedIdCajero = localStorage.getItem("idCajero");
        if (storedIdCajero !== null) {
            const parsedData = JSON.parse(storedIdCajero);
            setIdCaja(parsedData);
        }
    }, []);



    const handleShowTablaVentas = () => {
        setShowTablaVentas(true);
        setShowTablaCompras(false);
    };

    const handleShowTablaCompras = () => {
        setShowTablaCompras(true);
        setShowTablaVentas(false);
    };

    return (

        <div >
            <div>
                <h3 className="titulos">Reportes de Facturas</h3>
                <hr className="hr" />
            </div>

            <div className="container" >
                <br />
                <div>
                    <div className="input-group mb-1">
                        <button type="button" className="btn btn-outline-primary boton">
                            <BsSearch />
                        </button>
                        <input type="text" onChange={(e) => setBuscar(e.target.value)} className="form-control" placeholder="Buscador" aria-label="" aria-describedby="basic-addon1" />
                    </div>

                    <div style={{ backgroundColor: '#aae0fa', padding: '6' }}>
                        <Form>
                            <Form.Group as={Row}>
                                <Col sm="1">
                                    <Button disabled>Fecha: </Button>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        type="date"
                                        value={fechaFiltro}
                                        onChange={(e) => setFechaFiltro(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    {/* Div tabla de ventas*/}
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            className={showTablaVentas ? "btn-activo" : ""}
                            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                            onClick={() => {
                                handleShowTablaVentas();
                            }}
                        >
                            Ventas
                        </Button>

                        <Button
                            className={showTablaCompras ? "btn-activo" : ""}
                            style={{ marginLeft: "1%", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                            onClick={() => {
                                handleShowTablaCompras();
                            }}
                        >
                            Compras
                        </Button>
                    </div>

                    {showTablaVentas && (
                        <div className="TablaVentas">
                            {/* TABLAS */}
                            <table className="mt-0 table table-striped table-hover" id="myTable">
                                <thead className='tabla-cabeza' >
                                    <tr style={{ backgroundColor: "#B4D8E9" }}>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Otros</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturas
                                        .filter(searchingSales(buscar))
                                        .filter((factura) =>
                                            fechaFiltro ? (
                                                isSameDay(parseISO(factura.fechaEmision), parseISO(fechaFiltro))
                                            ) : true
                                        )
                                        .map((factura) => (
                                            <tr key={factura.id}>
                                                <td>
                                                    {factura.nombreCliente} {factura.apellidoCliente}
                                                </td>
                                                <td>
                                                    <ConvertirFecha fecha={factura.fechaEmision} />
                                                </td>
                                                <td>{factura.totalVenta}</td>
                                                <td>{factura.estado}</td>
                                                <td>

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            setIdFacturaVentas(factura.id);
                                                            handleShowModal();
                                                        }}
                                                        style={{ color: "green" }}
                                                    >
                                                        Ver
                                                    </Button>

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {showTablaCompras && (
                        <div className="TablaCompras">
                            {/* TABLAS */}
                            <table className="mt-0 table table-striped table-hover" id="myTable">
                                <thead className='tabla-cabeza'>
                                    <tr style={{ backgroundColor: "#B4D8E9" }}>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Otros</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturaCompra
                                        .filter(searchingBuys(buscar))
                                        .filter((factura) =>
                                            fechaFiltro ? (
                                                isSameDay(parseISO(factura.facturaProveedor.fechaEmision) - 1, parseISO(fechaFiltro))
                                            ) : true
                                        )
                                        .map((factura) => (
                                            <tr key={factura.id}>
                                                <td>
                                                    {factura.proveedor.nombreEmpresa}
                                                </td>
                                                <td>
                                                    <ConvertirFecha fecha={factura.facturaProveedor.fechaEmision} />
                                                </td>
                                                <td>{factura.totalProductos}</td>
                                                <td>{factura.facturaProveedor.estado}</td>
                                                <td>

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            setIdFacturaCompra(factura.facturaProveedor.id);
                                                            handleShowModalCompra();
                                                        }}
                                                        style={{ color: "green" }}
                                                    >
                                                        Ver
                                                    </Button>

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FacturaVenta facturaId={idFacturaVentas} />
                </Modal.Body>
            </Modal>


            <Modal show={showModalCompra} onHide={handleCloseModalCompra} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FacturaCompra facturaId={idFacturaCompra} />
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default FacturasCobradas;