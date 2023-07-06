import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Estilos.css'
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import ConvertirFecha from "./ConvertirFecha";
import {isSameDay, parseISO } from "date-fns";


const ReportesVentas = () => {
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [ventas, setVentas] = useState([]);
    return (
        <div>
            <div>
                <h4 className="titulos">Reportes de Ventas</h4>
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
                                    onChange={(e) => setFechaFiltro(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <br/>
                <div className="TablaVentas">
                {/* TABLAS */}
                <table className="mt-0 table table-striped table-hover" id="myTable">
                  <thead className='tabla-cabeza' >
                    <tr style={{ backgroundColor: "#B4D8E9" }}>
                      <th scope="col">Producto</th>
                      <th scope="col">Monto</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventas
                      .filter((venta) =>
                        fechaFiltro ? (
                          isSameDay(parseISO(venta.fechaEmision), parseISO(fechaFiltro)) //CAMBIAR POR EL GET
                        ) : true
                      )
                      .map((venta) => (
                        <tr key={venta.id}>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>




            </div>
        </div>
    )
}

export default ReportesVentas;