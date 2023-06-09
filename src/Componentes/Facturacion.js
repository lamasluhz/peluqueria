import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import Facturas from "./Facturas";
import ConvertirFecha from "./ConvertirFecha";

const Facturacion = () => {
  const [buscar, setBuscar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalPago, setShowModalPago] = useState(false);
  const [idMedioPago, setIdMedioPago] = useState("");
  const [idFactura, setIdFactura] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModalPago = () => {
    setShowModalPago(false);
    if (idMedioPago != null) {
      setShowModal(true); // Corregir el cierre del modal principal aquí
    }
  };

  const handleShowModalPago = () => {
    setShowModalPago(true);
  };

  function searching(buscar) {
    return function (x) {
      return (
        x.nombreCliente.includes(buscar) ||
        !buscar ||
        x.apellidoCliente.includes(buscar) ||
        x.fechaEmision.includes(buscar) ||
        (x.nombreCliente + " " + x.apellidoCliente).includes(buscar) ||
        x.estado.includes(buscar)
      );
    };
  }

 
  const [facturas, setFacturas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7137/api/Factura");
        setFacturas(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de las facturas:", error);
      }
    };

    fetchData();
  }, []);

  const [medioPago, setMedioPago] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7137/api/MediosPagos");
        setMedioPago(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del medio de pago:", error);
      }
    };

    fetchData();
  }, []);

  const facturaActualizado = {
    idFactura: idFactura,
    idMedioPago: idMedioPago,
  };

  const putFactura = () => {
    // Realizar la solicitud PUT
    {console.log(idFactura)}
    {console.log(idMedioPago)}
    axios
      .put(`https://localhost:7137/api/Factura/facturas`, facturaActualizado) // Corregir la URL para incluir el ID de la factura
      .then((response) => {
        console.log("Factura actualizada");
        // Realiza las acciones adicionales necesarias después de la actualización
      })
      .catch((error) => {
        console.error("Error al actualizar la factura:", error);
      });
  };

  return (
    <div>
      <div>
        <hr style={{ marginBottom: "-15px", borderTop: "2px solid #B4D8E9" }} />
        <h2 style={{ paddingLeft: "20px", marginTop: "15px", marginBottom: "-15px", fontWeight: "bold" }}>Facturas</h2>
        <hr style={{ borderTop: "2px solid #B4D8E9" }} />
      </div>

      <div className="container">
        <br />

        <div class="input-group mb-1">
          <button type="button" class="btn btn-outline-primary boton">
            <BsSearch />
          </button>
          <input type="text" onChange={(e) => setBuscar(e.target.value)} class="form-control" placeholder="Buscador" aria-label="" aria-describedby="basic-addon1" />
        </div>

        {/* TABLAS */}
        <table className="table table-striped table-hover border-white" style={{ border: "1px solid white" }} id="myTable">
          <thead>
            <tr style={{ backgroundColor: "#B4D8E9" }}>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col">Otros</th>
            </tr>
          </thead>
          <tbody>
            {facturas.filter(searching(buscar)).map((factura) => (
              <tr key={factura.id}>
                <td>
                  {factura.nombreCliente} {factura.apellidoCliente}
                </td>
                <td> <ConvertirFecha fecha={factura.fechaEmision}/></td>
                <td>{factura.totalVenta}</td>
                <td>{factura.estado}</td>
                <td>
                  {factura.estado === "Pendiente" ? (
                    <Button variant="contained" color="primary" onClick={() => {
                      setIdFactura(factura.id);
                      handleShowModalPago();
                    }} style={{ color: "red" }}>
                      Facturar
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => {                    
                      setIdFactura(factura.id);
                      handleShowModal();
                    }} style={{ color: "green" }}>
                      Ver
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Facturas facturaId={idFactura} />
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
          <Button variant="primary" onClick={() => {
            putFactura();
            handleCloseModalPago();
          }}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Facturacion;
