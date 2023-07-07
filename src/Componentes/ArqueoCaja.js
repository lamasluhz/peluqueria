import React, { useEffect, useState, useRef } from 'react';
import '../css/Estilos.css';
import axios from 'axios';
import ConvertirFecha from './ConvertirFecha';
import { BsSearch } from 'react-icons/bs';
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { isSameDay, parseISO, format } from "date-fns";
import html2pdf from "html2pdf.js";


const ArqueoCaja = () => {
  const [movimientoGeneral, setMovimientoGeneral] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const reporteRef = useRef(null);

  useEffect(() => {
    const fetchMovimientoGeneral = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/MovimientosCaja/cajas/movimientosReporteGEneral');
        setMovimientoGeneral(response.data);
      } catch (error) {
        console.error('Error al obtener los movimientos generales: ', error);
      }
    };
    fetchMovimientoGeneral();
  }, []);

  const handleFechaFiltro = (fecha) => {
    if (fecha != '') {
      const selectedDate = new Date(fecha);
      selectedDate.setDate(selectedDate.getDate() + 1);
      const formattedDate = format(selectedDate, 'dd-MM-yyyy');
      return formattedDate;
    }
    return '';
  }


  const imprimirPDF = () => {
    const options = {
      margin: 1,
      filename: "reporte-caja.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(reporteRef.current)
      .save();
  };

  return (
    <>
      <div>
        <h3 className="titulos">Cajas</h3>
        <hr className="hr" />
      </div>

      <div style={{ padding: '0 15%' }}>

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
              <Col sm="3"></Col>
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
          <h5 style={{ fontWeight: 'bold' }}>Reporte de Caja</h5>
          {/* TABLAS */}

          <table className="mt-0 table table-striped table-hover" id="myTable">
            <thead className="tabla-cabeza">
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Fecha Apertura</th>
                <th scope="col">Hora Apertura</th>
                <th scope="col">Fecha Cierre</th>
                <th scope="col">Hora Cierre</th>
                <th scope="col">Monto Apertura</th>
                <th scope="col">Monto Entrada</th>
                <th scope="col">Monto Salida</th>
                <th scope="col">Monto Cierre</th>
              </tr>
            </thead>
            <tbody>
              {movimientoGeneral
                .filter((movimientos) =>
                  fechaFiltro ? (
                    isSameDay(parseISO(movimientos.caja.fechaInicio) - 1, parseISO(fechaFiltro))
                  ) : true
                )
                .filter((movimientos) =>
                  fechaFiltro ? (
                    isSameDay(parseISO(movimientos.caja.fechaFin) - 1, parseISO(fechaFiltro))
                  ) : true
                )

                .map((movimientos) => (

                  <tr key={movimientos.caja.idCaja}>
                    <td>
                      <ConvertirFecha fecha={movimientos.caja.fechaInicio} />
                    </td>
                    <td>
                      {movimientos.caja.horaInicio} hs
                    </td>
                    <td>
                      <ConvertirFecha fecha={movimientos.caja.fechaFin} />
                    </td>
                    <td>
                      {movimientos.caja.horaFin} hs
                    </td>
                    <td>{movimientos.caja.montoApertura}</td>
                    <td>{movimientos.movimientoTotalEntrada}</td>
                    <td>{movimientos.movimientoTotalSalida}</td>
                    <td>{movimientos.caja.montoCierre}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Button variant="primary" onClick={imprimirPDF} style={{ marginTop: '3%', marginLeft: '80%' }}>Generar PDF</Button>
      </div>
    </>
  );
};

export default ArqueoCaja;
