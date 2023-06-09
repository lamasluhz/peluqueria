import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const estilo = { paddingLeft: '10px' };

const Header = (props) => {
    const API_URL = "https://localhost:7137";
    const datosUsuario = localStorage.getItem('usuario');
    const usuarioConectado = JSON.parse(datosUsuario);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const handleCerrarSesion = () => {
        setMostrarConfirmacion(true);
    };

    const confirmarCerrarSesion = () => {
        localStorage.removeItem('conectado');
        cerrarSesion();
        localStorage.removeItem('usuario');
        props.acceder(false);
        setMostrarConfirmacion(false);
    };

    const cancelarCerrarSesion = () => {
        setMostrarConfirmacion(false);
    };

    const cerrarSesion = () => {
        const storedUsuario = localStorage.getItem('usuario');
        if (storedUsuario) {
            const usuario = JSON.parse(storedUsuario);
            const usuarioId = usuario.id;
            axios.put(`${API_URL}/Usuario/CerrarSesion/${usuarioId}`)
                .then((response) => {
                    console.error("Sesión Cerrada");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const estiloNegrita = { fontWeight: 'bold' };

    return (
        <div>
            <div>
               
            </div>
            <Navbar expand="lg" style={{ display: "flex", alignItems: 'center', padding: 0 }}>
                <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
                <Navbar.Collapse id="navbarNavAltMarkup" style={{ backgroundColor: '#aae0fa'}}>
                    <Nav className="mr-auto w-100 justify-content-center" style={{ backgroundColor: "#aae0fa", paddingLeft: '30px', fontSize: '20px' }}>
                        <NavLink className="nav-link" to="/inicio" style={estilo}> <img src='/inicio.png' style={{ maxHeight: 25, maxWidth: 20 }} /> Inicio</NavLink>
                        <NavLink className="nav-link" to="/clientes" style={estilo}> <img src='/clientes.png' style={{ maxHeight: 25, maxWidth: 20 }} /> Clientes </NavLink>
                        <NavLink className="nav-link" to="/peluqueros" style={estilo}> <img src='/peluqueros.png' style={{ maxHeight: 25, maxWidth: 20 }} /> Peluqueros </NavLink>
                        <NavLink className="nav-link" to="/servicios" style={estilo}> <img src='/servicios.png' style={{ maxHeight: 25, maxWidth: 20 }} /> Servicios </NavLink>
                        <NavLink className="nav-link" to="/reservas" style={estilo}> <img src='/reservas.png' style={{ maxHeight: 25, maxWidth: 20 }} /> Reservas </NavLink>
                        <NavLink className="nav-link" to="/stock" style={estilo}> <img src='/compras.png' style={{ maxHeight: 25, maxWidth: 20 }} /> Compras </NavLink>
                        <NavLink className="nav-link" to="/ventaProductos" style={estilo}> <img src='/venta.png' style={{ maxHeight: 25, maxWidth: 20 }} /> Venta </NavLink>
                        <NavLink className="nav-link" to="/facturas" style={estilo}> <img src='/factura.png' style={{ maxHeight: 25, maxWidth: 20 }} />Factura</NavLink>
                   <NavLink className="nav-link" to="/reportes" style={estilo}> <img src='/factura.png' style={{ maxHeight: 25, maxWidth: 20 }} />Reportes</NavLink>
                            </Nav>
                    <div style={{ borderLeft: '1px solid blue', paddingLeft: '20px' }}>
                        <img src="./usuario.png" alt="Logo" />
                    </div>
                    <div style={{ paddingRight: 10, paddingLeft: 10 }}>
                        <span>Hola,</span>
                        <span style={estiloNegrita}>{usuarioConectado.nombre}</span>
                        <span>! </span>
                        <span>{usuarioConectado.rol}</span>
                    </div>
                    <div style={{ paddingRight: 15 }}>
                        <button className="btn btn-outline-primary" type="button" onClick={handleCerrarSesion}>
                            <div style={{ letterSpacing: 1 }}>
                                <img src="./salida.png" alt="Logo" />
                            </div>
                        </button>
                    </div>

                </Navbar.Collapse>
            </Navbar>

            <Modal show={mostrarConfirmacion} onHide={cancelarCerrarSesion}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de Cierre de Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro que deseas cerrar sesión?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelarCerrarSesion}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmarCerrarSesion}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Header;
