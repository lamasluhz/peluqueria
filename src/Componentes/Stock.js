import { Table, Image } from 'react-bootstrap';
import BuscadorProductos from './BuscadorProductos';
const Stock = () => {
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
                    <tr style={{ backgroundColor: '#FFE2D9' }}>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Depósito N°</th>
                        <th>Proveedor</th>
                        <th>Precio</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Image src="/path/to/image" thumbnail /></td>
                        <td>Producto 1</td>
                        <td>10</td>
                        <td>Depósito 1</td>
                        <td>Proveedor 1</td>
                        <td>$10.00</td>
                        <td>Detalles del producto 1</td>
                    </tr>
                    <tr>
                        <td><Image src="/path/to/image" thumbnail /></td>
                        <td>Producto 2</td>
                        <td>5</td>
                        <td>Depósito 2</td>
                        <td>Proveedor 2</td>
                        <td>$15.00</td>
                        <td>Detalles del producto 2</td>
                    </tr>
                    <tr>
                        <td><Image src="/path/to/image" thumbnail /></td>
                        <td>Producto 3</td>
                        <td>2</td>
                        <td>Depósito 3</td>
                        <td>Proveedor 3</td>
                        <td>$20.00</td>
                        <td>Detalles del producto 3</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    );
};

export default Stock;
