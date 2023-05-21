import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/Factura.css"


const Facturas = () => {
    return (
        <div id="contenedorPadre">


            <div id="divImprimir">
                <button class="image-button"></button>
            </div>

            <div id="contenedor-padre-1">
                <div id="contenedor-datos-peluqueria">
                    <div id = "contenedor-hijo-1">
                        <div id="contenedor-logo">
                            <img src="./logo2.png" className="image-logo2" alt="Logo" />
                        </div>
                        <div id="info-peluqueria">
                            <p id="nombre-empresa">PELUQUERIA HALOJUSA</p>
                        </div>
                    </div>
                </div>
                <div id="contenedor-datos-factura" >Div 2</div>
            </div>

            <div id="div3">
                <div>Div 3</div>
            </div>
            <div id="div4">
                <div>Div 4</div>
            </div>

        </div>
    );
}

export default Facturas