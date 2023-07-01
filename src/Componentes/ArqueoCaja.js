import React, { useEffect, useState } from 'react';
import '../css/Estilos.css';
import axios from 'axios';
import ConvertirFecha from './ConvertirFecha';
import { BsSearch } from 'react-icons/bs';
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { isSameDay, parseISO } from "date-fns";


const ArqueoCaja = () => {
  const [movimientoGeneral, setMovimientoGeneral] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');

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

  return (
    <>
      <div>
        <h3 className="titulos">Reportes de Cajas</h3>
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
            </Form.Group>
          </Form>

        </div>
        <br />
        {/* TABLAS */}
        <div className="TablaVentas">

          <table className="mt-0 table table-striped table-hover" id="myTable">
            <thead className="tabla-cabeza">
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Fecha de Inicio</th>
                <th scope="col">Hora de Inicio</th>
                <th scope="col">Fecha de Cierre</th>
                <th scope="col">Hora de Cierre</th>
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
      </div>
    </>
  );
};

export default ArqueoCaja;
