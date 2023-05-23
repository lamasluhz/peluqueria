import React, { useEffect } from "react";
import '../css/Inicio.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Clientes from "./Clientes";
const Principal = () => {
    return (
        <div>
            <div id="contenedor-centrado">\

                <div id="contenedor-imagen">
                    <img src="/inicio.gif" style={{ maxHeight: '100%', maxWidth: '60%', borderColor: 'black' }} />
                </div>

                <div id="contenedor-inicio">
                    <div id="contenedor-bienvenida">
                        <h4 className="bienvenido-txt">Bienvenido!</h4>
                        <hr class="divisor" />
                        <p className="peluqueria-txt">Peluqueria HAJOLUSA</p>
                    </div>

                    <div id="contenedor-boton" >
                        <Link to="/clientes">
                            <Button variant="primary" className="btn-ancho">Ingresar</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div >
    );
}


export default Principal;