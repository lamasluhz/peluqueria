import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import FacturaVenta from "./FacturaVenta";
import ConvertirFecha from "./ConvertirFecha";
import { format, isSameDay, parseISO } from "date-fns";
import FacturaCompra from "./FacturaCompra";
import FCaja from "./FCaja";

const Facturacion = () => {
  const [buscar, setBuscar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalCompra, setShowModalCompra] = useState(false);
  const [showModalPago, setShowModalPago] = useState(false);
  const [idMedioPago, setIdMedioPago] = useState("");
  const [idFacturaVentas, setIdFacturaVentas] = useState("");
  const [idFacturaCompra, setIdFacturaCompra] = useState("");
  const [showTablaVentas, setShowTablaVentas] = useState(true);
  const [showTablaCompras, setShowTablaCompras] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [medioPago, setMedioPago] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [facturaCompra, setFacturaCompra] = useState([]);
  const [showFactura, setShowFactura] = useState(false);
  const [idCajas, setIdCaja] = useState('');
  const [montoCompra, setMontoCompra] = useState('');
  const [montoVenta, setMontoVenta] = useState('');


  const recargarPagina = () => {
    window.location.reload();
  }

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

  const handleCloseModalPago = () => {
    setShowModalPago(false);
    recargarPagina();
  };

  const handleShowModalPago = () => {
    setShowModalPago(true);
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
        const response = await axios.get("https://localhost:7137/api/Factura");
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
        const response = await axios.get("https://localhost:7137/api/FacturaProveedores/facturaProveedores");
        const data = response.data;
        setFacturaCompra(data);
      } catch (error) {
        console.error("Error al obtener los datos de las facturas de Compras:", error);
      }
    };

    fetchFacturasCompra();
  }, []);

  useEffect(() => {
    const fetchMedioPago = async () => {
      try {
        const response = await axios.get("https://localhost:7137/api/MediosPagos");
        setMedioPago(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del medio de pago:", error);
      }
    };

    fetchMedioPago();
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


  const facturaVentaActualizado = {
    idFactura: idFacturaVentas,
    idMedioPago: idMedioPago,
  };

  const facturaCompraActualizado = {
    idFactura: idFacturaCompra,
    idMedioPago: idMedioPago,
  };

  const actualizacionesFactura = () => {
    if (idFacturaVentas != null) {
      axios
        .put('https://localhost:7137/api/Factura/facturas', facturaVentaActualizado)
        .then((response) => {
          console.log("Factura de Ventas Actualizado");
        })
        .catch((error) => {
          console.error("Error al actualizar la factura de ventas:", error);
        });
      cajaEntradaPost();
      setIdFacturaVentas(null);
    } else if (idFacturaCompra != null) {
      axios
        .put('https://localhost:7137/api/FacturaProveedores/FacturaProveedores', facturaCompraActualizado)
        .then((response) => {
          console.log("Factura de Compras Actualizado");
        })
        .catch((error) => {
          console.error("Error al actualizar la factura de compras:", error);
        });
      cajaSalidaPost();
      setIdFacturaCompra(null);
    }
    handleCloseModalPago();
  };


  const handleShowTablaVentas = () => {
    setShowTablaVentas(true);
    setShowTablaCompras(false);
  };

  const handleShowTablaCompras = () => {
    setShowTablaCompras(true);
    setShowTablaVentas(false);
  };

  const cajaEntradaPost = () => {
    axios.post("https://localhost:7137/api/MovimientosCaja/entrada", {
      idCaja: idCajas,
      monto: montoVenta,
      idFactura: idFacturaVentas
    }).then((response) => {
      console.log("Movimiento Entrada Agregado con Exito")
    }).catch((error) => {
      console.error("Error al actualizar el Movimiento de Entrada:", error);
    })
  }

  const cajaSalidaPost = () => {
    axios.post("https://localhost:7137/api/MovimientosCaja/salida", {
      idCaja: idCajas,
      monto: montoCompra,
      idFacturaProveedor: idFacturaCompra
    }).then((response) => {
      console.log("Movimiento Salida Agregado con Exito")
    }).catch((error) => {
      console.error("Error al actualizar el Movimiento de Salida:", error);
    })
  }


  return (

    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <FCaja />
      </div>

      <div className="container" style={{ flex: '5' }}>
        <br />

        {showFactura ? (
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
                  <Col sm="1">
                    <Button disabled>Estado: </Button>
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      value={estadoFiltro}
                      onChange={(e) => setEstadoFiltro(e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Facturado">Facturado</option>
                    </Form.Select>
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
                      .filter((factura) =>
                        estadoFiltro ? (
                          factura.estado === estadoFiltro
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
                            {factura.estado === "Pendiente" ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  setMontoVenta(factura.totalVenta);
                                  setIdFacturaCompra(null);
                                  setIdFacturaVentas(factura.id);
                                  handleShowModalPago();

                                }}
                                style={{ color: "red" }}
                              >
                                Facturar
                              </Button>
                            ) : (
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
                            )}
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
                      .filter((factura) =>
                        estadoFiltro ? (
                          factura.facturaProveedor.estado === estadoFiltro
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
                            {factura.facturaProveedor.estado === "Pendiente" ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  setMontoCompra(factura.totalProductos);
                                  setIdFacturaVentas(null);
                                  setIdFacturaCompra(factura.facturaProveedor.id);
                                  handleShowModalPago();
                                }}
                                style={{ color: "red" }}
                              >
                                Facturar
                              </Button>
                            ) : (
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
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        ) : (
          null
        )}
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


      <Modal show={showModalPago} onHide={handleCloseModalPago}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccione el modo de pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select className="form-control" value={idMedioPago} onChange={(e) => setIdMedioPago(e.target.value)}>
            <option value="">Elige una opción</option>
            {medioPago.map((mpago) => (
              <option key={mpago.id} value={mpago.id}>
                {mpago.nombre}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalPago}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizacionesFactura}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Facturacion;