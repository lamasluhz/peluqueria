import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import BuscadorProductos from './BuscadorProductos';

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
        <div style={{ padding: '0 15%' }}>
            <div>
                <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>
                    Stock de Productos</h2>

            </div>
            <br />
            <BuscadorProductos />
            <Table bordered hover>
                <thead>
                    <tr style={{ backgroundColor: '#B4D8E9' }}>

                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Proveedor</th>
                        <th>Precio Unitario</th>
                        <th>Descripcion</th>

                        <th>Acciones</th>
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

                                    <td><i className="fa-solid fa-pen" style={{ marginRight: '15px', cursor: 'pointer' }}></i> <i class="fa-solid fa-trash" style={{ marginRight: '15px', cursor: 'pointer' }} ></i></td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </Table>
        </div>

    );
};

export default Stock;
