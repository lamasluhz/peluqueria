import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

const estilo = { paddingLeft: '10px' }

const Header = () => {
    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Halojusa</h1>
            <Navbar bg="light" expand="lg" style={{ display: "flex", alignItems: 'center' }}>
                <Navbar.Toggle aria-controls="navbarNavAltMarkup" />

                <Navbar.Collapse id="navbarNavAltMarkup">
                    <Nav className="mr-auto w-100 justify-content-start" style={{ backgroundColor: "#FFD1BC", paddingLeft: '30px', fontSize: '20px' }}>
                        <NavLink className="nav-link" to="/clientes" style={estilo}>Clientes</NavLink>
                        <NavLink className="nav-link" to="/peluqueros" style={estilo}>Peluqueros</NavLink>
                        <NavLink className="nav-link" to="" style={estilo}>Servicios</NavLink>
                        <NavLink className="nav-link" to="/reservas" style={estilo}>Reservas</NavLink>
                        <NavLink className="nav-link" to="/stock" style={estilo}>Compras</NavLink>
                        <NavLink className="nav-link" to="" style={estilo}>Venta</NavLink>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </div>
    )
}

export default Header;
