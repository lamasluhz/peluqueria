import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/Factura.css"
import ConvertirFecha from "./ConvertirFecha";


const Facturas = (props) => {
    const [factura, setFactura] = useState(null);

    useEffect(() => {
        const fetchFactura = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7137/api/Factura/facturas/${props.facturaId}`
                );
                setFactura(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de las facturas:', error);
            }
        };

        fetchFactura();
    }, [props.facturaId]);

    if (!factura) {
        return <p>Cargando factura...</p>;
    }

    return (
        <div id="contenedorPadre">
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
                        <p>Fecha: <ConvertirFecha fecha = {factura.factura.fechaEmision}/> </p>
                        <p>Ruc o Cédula de Identidad: {factura.cliente.cedula}</p>
                        <p>Nombre o Razón Social:  {factura.cliente.nombres} {factura.cliente.apellido}</p>
                        <p>Telefono: {factura.cliente.telefono}</p>
                        <p>Correo Electrónico: {factura.cliente.correo}</p>
                    </div>
                    <div id="contenedor-cliente-hijo-1">
                        <p>Cond. de Venta: {factura.cliente.telefono}</p>
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