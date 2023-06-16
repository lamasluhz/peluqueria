import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LavadosModal from './LavadosModal';
import Buscador from './Buscador';
import { Modal, Button } from 'react-bootstrap';
import LavadosRow from './LavadosRow';
import '../css/Estilos.css';

const Lavados = () => {
  const [lavados, setLavados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'https://localhost:7137/api/TiposServicios/Lavado';

  useEffect(() => {
    obtenerLavados();
  }, []);

  const obtenerLavados = () => {
    axios
      .get(url)
      .then(response => {
        setLavados(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleDeleteLavado = id => {
    axios
      .delete(`https://localhost:7137/api/TiposServicios/${id}`)
      .then(response => {
        console.log(response);
        obtenerLavados();
      })
      .catch(error => {
        console.error('Error deleting lavado:', error);
      });
  };

  const handleFieldUpdate = (id, values) => {
    axios
      .put(`https://localhost:7137/api/TiposServicios/${id}`, values)
      .then(response => {
        console.log(response);
        obtenerLavados();
      })
      .catch(error => {
        console.error('Error updating lavado:', error);
      });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = isLavadoAdded => {
    setShowModal(false);
    if (isLavadoAdded) {
      obtenerLavados();
    }
  };

  const renderLavados = () => {
    const filteredLavados = lavados.filter(lavado =>
      lavado.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredLavados.map(lavado => {
      if (lavado.eliminado) {
        return null;
      }
      return (
        <LavadosRow
          key={lavado.id}
          lavado={lavado}
          handleFieldUpdate={handleFieldUpdate}
          handleDeleteLavado={handleDeleteLavado}
        />
      );
    });
  };
  return (
    <div>
      <div className="container">
        <div>
          <h4 className="titulos">Lavados</h4>
        </div>
        <br />

        {/* <!-- TABLAS --> */}
        <LavadosModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <div className="TablaBordes">
          <table className="table table-striped table-hover" id="myTable"
          >
            < thead >
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Lavado</th>
                <th scope="col">Precio</th>
                <th scope="col">Otros</th>
              </tr>
            </thead >
            <tbody>
              {renderLavados()}
            </tbody>
          </table >
        </div>
      </div>
    </div >
  );

}

export default Lavados