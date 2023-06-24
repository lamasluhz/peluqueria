import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BuscadorCompraProductos from './BuscadorVentaProductos';
import SuccessModal from './SuccessModal';
import '../css/Estilos.css'

const VentaProductos = () => {
  const url = 'https://localhost:7137/StockProducto/GetStockProductos';
  const location = useLocation();
  const [proveedor, setProveedor] = useState();
  const [showModal, setShowModal] = useState(false);
  const [productos, setProducto] = useState([]);
  const [productosSeleccionados, setProductoSeleccionados] = useState([]);
  const [cantidadProducto, setCantidadProducto] = useState({});
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cliente, setCliente] = useState({});
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { state } = location;

  const obtenerProveedor = async () => {
    if (!state || !state.idProveedor) {
      return;
    }

    const response = await axios.get(`https://localhost:7137/Proveedor/${state.idProveedor}`);
    setProveedor(response.data);
  };

  const getCliente = async (cedula) => {
    try {
      const response = await axios.get(`https://localhost:7137/api/Cliente/obtener${cedula}`);
      if (response.data) {
        setCliente(response.data);
      } else {
        setCliente({});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const obtenerProductos = async () => {
    const response = await axios.get(url);
    const updatedProductos = response.data.map((producto) => ({
      ...producto,
      precioUnitario: producto.precioUnitario + 10000,
    }));
    setProducto(updatedProductos);
  };

  useEffect(() => {
    obtenerProductos();
  }, [proveedor]);

  useEffect(() => {
    obtenerProveedor();
  }, [state]); // Depend on state so the effect runs whenever state changes

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  const handleSearch = (searchValue) => {
    if (searchValue.trim() === '') {
      setProductosFiltrados([]);
    } else {
      const productosFiltrados = productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
          producto.descripcionTipoProducto.toLowerCase().includes(searchValue.toLowerCase())
      );
      setProductosFiltrados(productosFiltrados);
    }
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCedulaChange = (event) => {
    setCedulaCliente(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      try {
        await getCliente(cedulaCliente);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  const agregarAlCarrito = (productoAgregado) => {
    let productoYaEnCarrito = productosSeleccionados.find((producto) => producto.id === productoAgregado.id);

    if (productoYaEnCarrito) {
      // Si el producto ya está en el carrito, aumenta su cantidad
      setCantidadProducto({
        ...cantidadProducto,
        [productoAgregado.id]: cantidadProducto[productoAgregado.id] + 1,
      });
    } else {
      // Si el producto no está en el carrito, añádelo
      const precioActualizado = productoAgregado.precioUnitario;
      setProductoSeleccionados([...productosSeleccionados, { ...productoAgregado, precioUnitario: precioActualizado, cantidad: 1 }]);
      setCantidadProducto({ ...cantidadProducto, [productoAgregado.id]: 1 });
    }
  };

  const cambiarCantidadProducto = (idProducto, nuevaCantidad) => {
    setProductoSeleccionados(
      productosSeleccionados.map((producto) => {
        if (producto.id === idProducto) {
          return { ...producto, cantidad: nuevaCantidad };
        }
        return producto;
      })
    );
  };

  const eliminarProducto = (idProducto) => {
    setProductoSeleccionados(productosSeleccionados.filter((producto) => producto.id !== idProducto));
  };

  const formatearPrecio = (precio) => {
    return precio.toFixed(0);
  };

  let total = productosSeleccionados.reduce(
    (total, producto) => total + producto.precioUnitario * (1 + 0.05) * producto.cantidad,
    0
  );


  const confirmarVenta = async () => {
    const postUrl = 'https://localhost:7137/Productos'; // Use your API URL

    // Collect all the product details into an array
    let detalleVentaDto = productosSeleccionados.map(producto => {
      return {
        idProducto: producto.idProducto,
        cantidad: cantidadProducto[producto.id],
        precioUnitario: producto.precioUnitario, // Assuming producto has a 'precioUnitario' property
        iva: 0 // Assuming a 5% tax rate
      };
    });

    // Prepare the data to be sent in the POST request
    const data = {
      idCliente: cliente.id,
      idDeposito: 1,
      idTurno: null,
      detalleVentaDto: detalleVentaDto
    };

    try {
      // Perform a single Axios POST request
      await axios.post(postUrl, data);

      // Show success modal after completing the request
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };


  return (
    <Container className="w-75 mt-4">
      <Row className="mb-4" style={{ border: '1px solid #aae0fa', borderRadius: '10px' }}>
        <h3 >Cliente</h3>
        <hr style={{ color: '#aae0fa'}} />
        <Col>
          <div className='column is-one-third'>
            <label htmlFor="cedula" style={{fontWeight: 'bold',fontSize: '15',paddingRight: '5'}}>Nro Documento: </label>
            <input
              className="input is-primary"
              type="text"
              name="cedula"
              onChange={handleCedulaChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <br />
          <div className='column is-one-third'>
            <label htmlFor="str_nombre"  style={{fontWeight: 'bold',fontSize: '15',paddingRight: '5'}}>Nombre:</label>
            <input
              className="input is-primary"
              type="text"
              name="str_nombre"
              readOnly
              value={`${cliente?.nombres || ''} ${cliente?.apellidos || ''}`}
            />
          </div>
          <br />
          <SuccessModal
            show={showSuccessModal}
            handleClose={() => setShowSuccessModal(false)}
            message="Compra Confirmada"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <h3>Venta de Productos</h3>
        <BuscadorCompraProductos handleSearch={handleSearch} action={openModal} />
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: '#B4D8E9' }}>
              <th>Nombre</th>
              <th>Detalles</th>
              <th>Costo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Aca va a ir un map de los productos */}
            {productosFiltrados.map((producto) => (
              <tr id={producto.idProducto}>
                <td> {producto.nombre}</td>
                <td> {producto.descripcionTipoProducto}</td>
                <td> {producto.precioUnitario}</td>
                <td>
                  <button onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="mb-4">
        <h3>Productos Seleccionados</h3>
        <Table striped bordered hover id="carrito">
          <thead>
            <tr style={{ backgroundColor: '#B4D8E9' }}>
              <th>Nombre</th>
              <th>Detalles</th>
              <th>Costo</th>
              <th>Cantidad</th>
              <th>IVA 5%</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Aca se cargan los elemento del carrito */}
            {productosSeleccionados.map((producto) => (
              <tr id={producto.id}>
                <td> {producto.nombre}</td>
                <td> {producto.descripcionTipoProducto}</td>
                <td> {formatearPrecio(producto.precioUnitario)}</td>
                <td>
                  <input
                    type="number"
                    value={cantidadProducto[producto.id]}
                    onChange={(e) => {
                      const nuevaCantidad = e.target.value;
                      setCantidadProducto({ ...cantidadProducto, [producto.id]: nuevaCantidad });
                      cambiarCantidadProducto(producto.id, nuevaCantidad);
                    }}
                    min={1}
                  />
                  <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                </td>
                <td> {formatearPrecio(producto.precioUnitario * producto.cantidad * 0.05)}</td>
                <td> {formatearPrecio(producto.precioUnitario * (1 + 0.05) * producto.cantidad)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">Total</td>
              <td>{/* Aca se calcula el total de todos los elementos del carrito */ formatearPrecio(total)}</td>
            </tr>
          </tfoot>
        </Table>
      </Row>
      <Row>
        <Col style={{ justifyContent: 'center', display: 'flex' }}>
          <Button variant="success" onClick={confirmarVenta}>Confirmar Venta</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VentaProductos;
