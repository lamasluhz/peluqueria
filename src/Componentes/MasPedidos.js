import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Buscador from './Buscador';

const MasPedidos = () => {
  const [serviciosMasPedidos, setServiciosMasPedidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const swaggerUrl = 'https://localhost:7137/api/Factura/serviciosMasPedidos';

  useEffect(() => {
    obtenerServiciosMasPedidos();
  }, []);

  const obtenerServiciosMasPedidos = () => {
    axios
      .get(swaggerUrl)
      .then(response => {
        setServiciosMasPedidos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const renderServicios = () => {
    const filteredServicios = serviciosMasPedidos.filter(servicio =>
      servicio.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredServicios.map(servicio => (
      <tr key={servicio.descripcion}>
        <td>{servicio.tipo}</td>
        <td>{servicio.descripcion}</td>
        <td>{servicio.precio}</td>
        <td>{servicio.cantidad}</td>
       
        <td></td>
      </tr>
    ));
  };

  return (
    <div>
      <div>
        <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Servicios Mas Pedidos</h2>
        <hr style={{ borderTop: '2px solid #B4D8E9' }} />
      </div>

      <div className="container">
        <br />
        {/* <!-- TABLAS --> */}
        
        <Buscador handleSearch={handleSearch} />
        <table className="table table-striped table-hover border-black" style={{ border: '1px solid black' }} id="myTable">
          <thead>
            <tr>
              <th scope="col">Tipo de Servicio</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {renderServicios()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasPedidos;
