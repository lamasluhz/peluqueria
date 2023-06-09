import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Table, Row, Col } from 'react-bootstrap';

const Reportes = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tipoReporte, setTipoReporte] = useState('entrada');

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para manejar los datos ingresados en el formulario
  };

  return (
    <div>
      {/* Navbar con las fechas y el selector */}
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="mr-auto">
            <Form inline onSubmit={handleSubmit}>
              <Row className="align-items-center">
                <Col>
                  {/* Fecha inicio */}
                  <Form.Group controlId="formFechaInicio">
                    <Form.Label>Fecha inicio:</Form.Label>
                    <FormControl
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* Fecha fin */}
                  <Form.Group controlId="formFechaFin">
                    <Form.Label>Fecha fin:</Form.Label>
                    <FormControl
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* Selector de tipo de reporte */}
                  <Form.Group controlId="formTipoReporte">
                    <Form.Label>Tipo de reporte:</Form.Label>
                    <Form.Control
                      as="select"
                      value={tipoReporte}
                      onChange={(e) => setTipoReporte(e.target.value)}
                    >
                      <option value="entrada">Entrada</option>
                      <option value="salida">Salida</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  {/* Botón para generar el reporte */}
                  <Button type="submit" variant="primary">Generar Reporte</Button>
                </Col>
              </Row>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Tabla de reportes */}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Título</th>
            <th>Caja</th>
            <th>Detalle</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí puedes renderizar las filas de la tabla */}
        </tbody>
      </Table>
    </div>
  );
};

export default Reportes;
