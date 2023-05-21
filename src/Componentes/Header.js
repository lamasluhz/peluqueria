import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

const estilo = { paddingLeft: '10px'}

const Header = () => {
    return (
        <div>
            <div style = {{backgroundImage:`url('https://static.vecteezy.com/system/resources/previews/003/026/014/non_2x/soft-pastel-colors-gradient-blur-free-photo.jpg')`}}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="./logo1.png" class="image-logo2" alt="Logo" />
                </div>
            </div>
            <Navbar expand="lg" style={{ display: "flex", alignItems: 'center' }}>
                <Navbar.Toggle aria-controls="navbarNavAltMarkup" />

                <Navbar.Collapse id="navbarNavAltMarkup">
                    <Nav className="mr-auto w-100 justify-content-start" style={{ backgroundColor: "#B4D8E9", paddingLeft: '30px', fontSize: '20px' }}>
                        <NavLink className="nav-link" to="/clientes" style={estilo}> <img src='/clientes.png' style={{maxHeight:20, maxWidth:25}}/> Clientes </NavLink>
                        <NavLink className="nav-link" to="/peluqueros" style={estilo}> <img src='/peluqueros.png' style={{maxHeight:20, maxWidth:25}}/> Peluqueros </NavLink>
                        <NavLink className="nav-link" to="/servicios" style={estilo}> <img src='/servicios.png' style={{maxHeight:20, maxWidth:25}}/> Servicios </NavLink>
                        <NavLink className="nav-link" to="/reservas" style={estilo}> <img src='/reservas.png' style={{maxHeight:20, maxWidth:25}}/> Reservas </NavLink>
                        <NavLink className="nav-link" to="/stock" style={estilo}> <img src='/compras.png' style={{maxHeight:20, maxWidth:25}}/> Compras </NavLink>
                        <NavLink className="nav-link" to="" style={estilo}> <img src='/venta.png' style={{maxHeight:20, maxWidth:25}}/> Venta </NavLink>
                        <NavLink className="nav-link" to="/facturas" style={estilo}>Factura</NavLink>


                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </div>
    )
}

export default Header;