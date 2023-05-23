import React, { useEffect, useState} from "react";
import '../css/Inicio.css';
import Button from 'react-bootstrap/Button';


const Principal = (props) => {

    function ocultarDiv() {
        props.acceder(true);
      }

    return (
        <div className="miDivPrincipal">
            <div id="contenedor-centrado">

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
                        
                            <Button variant="primary" className="btn-ancho" onClick={ocultarDiv}>Ingresar</Button>
                       

                    </div>
                </div>
            </div>
        </div >
    );
}


export default Principal;