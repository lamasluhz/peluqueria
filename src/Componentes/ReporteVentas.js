import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Estilos.css'
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { format } from 'date-fns';

const ReportesVentas = () => {
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [ventas, setVentas] = useState([]);
  const reporteRef = useRef(null);


  const imprimirPDF = () => {
    const options = {
      margin: 1,
      filename: "reporte-compra.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(reporteRef.current)
      .save();
  };

  const getVentas = async (fecha) => {
    try {
      const response = await axios.get(`https://localhost:7137/api/MovimientosCaja/ventasDetalleSalida/${fecha}`);
      setVentas(response.data);
    } catch (error) {
      console.log('Ha ocurrido un error: ', error);
    }
  }


  const handleFechaFiltroChange = (e) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setDate(selectedDate.getDate() + 1);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    setFechaFiltro(formattedDate);
    getVentas(formattedDate);
  }


  const handleFechaFiltro = (fecha) => {
    if (fecha != '') {
      const selectedDate = new Date(fecha);
      selectedDate.setDate(selectedDate.getDate() + 1);
      const formattedDate = format(selectedDate, 'dd-MM-yyyy');
      return formattedDate;
    }
    return '';
  }

  return (
    <div>
      <div>
        <h4 className="titulos">Compras</h4>
      </div>
      <hr className="hr" />

      <div className="container">
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
                  onChange={handleFechaFiltroChange}
                />
              </Col>
              <Col sm="4">
              </Col>
              <Col sm="2">
                <Button disabled>Fecha Elegida: </Button>
              </Col>
              <Col sm="2">
                <p
                  style={{ fontWeight: "bold", color: "white", justifyContent: "center", marginTop: "center", fontSize: 25 }}
                > {handleFechaFiltro(fechaFiltro)}</p>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <br />

        <div ref={reporteRef}>
          <h5 style={{ fontWeight: 'bold' }}>Reportes de Compras Por Día</h5>
          {/* TABLAS */}
          {ventas ? (
            <table className="mt-0 table table-striped table-hover" id="myTable">
              <thead className='tabla-cabeza' >
                <tr style={{ backgroundColor: "#B4D8E9" }}>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Unitario</th>
                  <th scope="col">IVA</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.ventasDetalleSalida?.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.productoNombre}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.precioUnitario}</td>
                    <td>{venta.iva}</td>
                    <td>{venta.subTotal}</td>
                  </tr>
                ))}
                <br/>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Total</td>
                  <td style={{ fontWeight: 'bold' }}>{ventas.totalCantidad}</td>
                  <td></td>
                  <td></td>
                  <td style={{ fontWeight: 'bold' }}>{ventas.totalVentas}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No hay compras</p>
          )}
        </div>
        <Button variant="primary" onClick={imprimirPDF} style={{ marginTop: '3%', marginLeft: '80%' }}>Generar PDF</Button>
      </div>
    </div>
  )
}

export default ReportesVentas;
