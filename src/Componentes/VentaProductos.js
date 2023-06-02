import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';
import { Modal, Button } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';

const VentaProductos = () => {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'https://localhost:7137/api/TiposServicios/Lavado';

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = () => {
    axios
      .get(url)
      .then(response => {
        setVentas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleSearch = query => {
    setSearchQuery(query);
  };
   
    return (
      <div>
        <div>
          <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
          <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Nueva Venta</h2>
          <hr style={{ borderTop: '2px solid #B4D8E9' }} />
        </div>
  
        <div className="container">
  
          <br />
  
          {/* <!-- TABLAS --> */}
          <Buscador action={handleModal} handleSearch={handleSearch} />
         
          <MDBTable small responsive className="table table-striped table-hover border-black " style={{
            border: '1px solid black',
            overflow: 'scroll',
            maxHeight: '100px',
          }} id="myTable"
          >
            <MDBTableHead  style={{
            position: 'sticky',
            top: '0' }}>
              <tr>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Nombre</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Detalles</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Categoria</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Precio</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Stock</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Cantidad</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Agregar Producto</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td><Button variant="secondary" >Agregar</Button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Item 2</td>
                    <td>Description of Item 2</td>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td><Button variant="secondary" >Agregar</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Item 3</td>
                    <td>Description of Item 3</td>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td><Button variant="secondary" >Agregar</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Item 3</td>
                    <td>Description of Item 3</td>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td><Button variant="secondary" >Agregar</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Item 3</td>
                    <td>Description of Item 3</td>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td><Button variant="secondary" >Agregar</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Item 3</td>
                    <td>Description of Item 3</td>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td><Button variant="secondary" >Agregar</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Item 3</td>
                    <td>Description of Item 3</td>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td><Button variant="secondary" >Agregar</Button></td>
                </tr>
            </MDBTableBody>
          </MDBTable >
          <div>
          <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
          <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Productos Seleccionados</h2>
          <hr style={{ borderTop: '2px solid #B4D8E9' }} />
          <MDBTable small responsive className="table table-striped table-hover border-black " style={{
            border: '1px solid black',
            overflow: 'scroll',
            maxHeight: '100px',
          }} id="myTable"
          >
            <MDBTableHead  style={{
            position: 'sticky',
            top: '0' }}>
              <tr>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Nombre</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Detalles</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Categoria</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Precio</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Cantidad</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Iva%</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Total</th>
                <th scope="col" style={{ position: 'sticky',top: '0' }}>Otros</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>Description of Item 1</td>
                    <td>50.000</td>
                    <td>1</td>
                    <td>5.000</td>
                    <td>55.000</td>
                    <td><FaTrash/></td>
                </tr>
            </MDBTableBody>
          </MDBTable >
          <div style={{ border: '1px solid black', borderRadius:'7px', padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>Monto Total:</span> <span style={{ float: 'right' }}>55.000</span>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="danger">Anular Venta</Button>
            <Button variant="success">Confirmar Venta</Button>
          </div>    


        </div>
        </div>
      </div >
    );
}

export default VentaProductos