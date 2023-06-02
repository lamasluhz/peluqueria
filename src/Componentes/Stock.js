import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import BuscadorProductos from './BuscadorProductos';
import GraficosProductos from './GraficosProductos';
const Stock = () => {
    const url = 'https://localhost:7137/StockProducto/GetStockProductos'
    const [productos, setProducto] = useState([]);
    const obtenerProductos = async () => {
        const response = await axios.get(url);
        setProducto(response.data);
    }
    // {

    //   }
    useEffect(() => {
        obtenerProductos();
    }, []);





    return (
        <div>
            <div>
                <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
                <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px', fontWeight: 'bold' }}>Stock de Productos</h2>
                <hr style={{ borderTop: '2px solid #B4D8E9' }} />
            </div>
            <br />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '2', marginLeft: '1%' }}>
                    <BuscadorProductos />
                    <Table bordered hover>
                        <thead>
                            <tr style={{ backgroundColor: '#B4D8E9' }}>

                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Proveedor</th>
                                <th>Precio Unitario</th>
                                <th>Descripcion</th>
                                <th>Detalles</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map((producto) => {
                                    return (
                                        <tr id={producto.id}>
                                            <td> {producto.nombre}</td>
                                            <td> {producto.cantidad}</td>

                                            <td> {producto.proveedor}</td>

                                            <td> {producto.precioUnitario}</td>

                                            <td> {producto.descripcionTipoProducto}</td>
                                            <td><i className="fa-solid fa-arrows-to-eye"></i></td>
                                            <td><i className="fa-solid fa-pen" style={{ marginRight: '15px' }}></i> <i class="fa-solid fa-trash"></i></td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div style={{ flex: '1' }}>
                    <GraficosProductos />
                </div>

            </div>

        </div>

    );
};

export default Stock;
