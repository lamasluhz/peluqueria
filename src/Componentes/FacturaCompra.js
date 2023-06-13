import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import html2pdf from "html2pdf.js";
import ConvertirFecha from "./ConvertirFecha";
import axios from "axios";
import "../css/Factura.css";

const FacturaCompra = (props) => {
    const [factura, setFactura] = useState(null);
    const [totalVenta, setTotalVenta] = useState(0);
    const [totalIvaCinco, setTotalIvaCinco] = useState(0);
    const [totalIvaDiez, setTotalIvaDiez] = useState(0);
    const facturaRef = useRef(null);

    useEffect(() => {
        const fetchFactura = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7137/api/FacturaProveedores/facturaProveedoresGeneral/${props.facturaId}`
                );
                setFactura(response.data);
            } catch (error) {
                console.error("Error al obtener los datos de las facturas:", error);
            }
        };

        fetchFactura();
    }, [props.facturaId]);

    useEffect(() => {
        if (factura) {
            let total = 0;
            let totalCinco = 0;
            let totalDiez = 0;
            factura.productos?.forEach((producto) => {
                total += producto.total;
                if (producto.iva === 5) {
                    totalCinco += producto.total * 0.05;
                } else {
                    totalDiez += producto.total * 0.1;
                }
            });
            setTotalVenta(total);
            setTotalIvaCinco(totalCinco);
            setTotalIvaDiez(totalDiez);
        }
    }, [factura]);

    const imprimirPDF = () => {
        const options = {
            margin: 1,
            filename: "factura.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf()
            .set(options)
            .from(facturaRef.current)
            .save();
    };

    if (!factura) {
        return <p>Cargando factura...</p>;
    }

    return (
        <div>
            <div id="contenedorPadre" ref={facturaRef}>
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
                        <p>{factura.facturaProveedor.numeroFactura}</p>
                    </div>
                </div>

                <div id="div3">
                    <div id="contenedor-datos-cliente">
                        <div id="contenedor-cliente-hijo-2">
                            <p>Fecha: <ConvertirFecha fecha={factura.facturaProveedor.fechaEmision} /> </p>
                            <p>Ruc o Cédula de Identidad: {factura.proveedor.ruc} </p>
                            <p>Nombre o Razón Social: {factura.proveedor.persona.nombres} {factura.proveedor.persona.apellidos}</p>
                            <p>Empresa: {factura.proveedor.nombreEmpresa}</p>
                            <p>Telefono: {factura.proveedor.persona.telefono}</p>
                            <p>Correo Electrónico: {factura.proveedor.persona.correo} </p>
                        </div>
                        <div id="contenedor-cliente-hijo-1">
                            <p>Cond. de Compra: {factura.facturaProveedor.medioPago}</p>
                        </div>
                    </div>
                </div>
                <div id="div4">
                    <table className="table table-striped">
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
                            {factura.productos?.map((producto, index) => (
                                <tr key={`producto-${index}`}>
                                    <td>{producto.cantidad}</td>
                                    <td>{producto.producto}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.iva}%</td>
                                    <td>{producto.total} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div id="div5">
                    <span className="texto-negritas">TOTAL A PAGAR: </span>
                    <span style={{ marginLeft: "62%" }}>{factura.totalProductos}</span>
                    <hr />
                    <span className="texto-negritas">LIQUIDACIONES DEL IVA: </span>
                    <span style={{ marginLeft: "15%" }}>5% {totalIvaCinco}</span>
                    <span style={{ marginLeft: "15%" }}>10% {totalIvaDiez}</span>
                </div>


            </div>
            <Button variant="primary" onClick={imprimirPDF} style={{ marginTop: '3%', marginLeft: '80%' }}>Generar PDF</Button>
        </div>
    );
}

export default FacturaCompra