import React from 'react';
import { NavLink } from "react-router-dom";


const estilo = { paddingLeft: '10px' }

const Header = () => {
    return (<header>
        <h3 >HAJOLUSA</h3>
        <nav className="navbar navbar-expand-lg navbar-light navbar-background" >

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div className="navbar-nav"  >
                    <NavLink className="navbar-brand" to="/clientes" style={estilo}>Clientes</NavLink>
                    <NavLink className="navbar-brand" to="/peluqueros" style={estilo}>Peluqueros</NavLink>
                    <NavLink className="navbar-brand" to="" style={estilo}>Servicios</NavLink>
                    <NavLink className="navbar-brand" to="" style={estilo}>Reservas</NavLink>
                    <NavLink className="navbar-brand" to="" style={estilo}>Compras</NavLink>
                    <NavLink className="navbar-brand" to="" style={estilo}>Venta</NavLink>
                </div>
            </div>
        </nav>
    </header>)
}

export default Header