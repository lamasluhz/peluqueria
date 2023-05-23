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
                    <div id="contenedor-hijo-1">
                        <div id="contenedor-logo">
                            <img src="./logo2.png" className="image-logo2" alt="Logo" />
                        </div>
                        <div id="info-peluqueria">
                            <p id="nombre-empresa">PELUQUERIA HAJOLUSA</p>
                            <p>Mcal. Estigarribia, Encarnación</p>
                            <p>Tel. +595 30293405</p>
                            <p>Encarnación Py</p>
                        </div>
                    </div>
                </div>
                <div id="contenedor-datos-factura" >
                    <h5>RUC: 90000000-5</h5>
                    <p>N° de Timbrado: 2323232</p>
                    <p>FACTURA ELECTRONICA N°</p>
                    <p>001-001-001-0001477</p>
                </div>
            </div>

            <div id="div3">
                <div id="contenedor-datos-cliente">
                    <div id="contenedor-cliente-hijo-2">
                        <p>Fecha:</p>
                        <p>Ruc o Cédula de Identidad:</p>
                        <p>Nombre o Razón Social:</p>
                        <p>Telefono:</p>
                        <p>Correo Electrónico:</p>
                    </div>
                    <div id="contenedor-cliente-hijo-1">
                        <p>Cond. de Venta:</p>
                    </div>
                </div>
            </div>
            <div id="div4">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio Unitario</th>
                            <th scope="col">Tasa IVA %</th>
                            <th scope="col">Valor de la Venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>Shampoo</td>
                            <td>10.000</td>
                            <td>5</td>
                            <td>30.000</td>
                        </tr>
                    </tbody>
                </table>
                <p>TOTAL A PAGAR</p>
                <p>LIQUIDACIONES DEL IVA</p>
            </div>

        </div>
    );
}

export default Facturas