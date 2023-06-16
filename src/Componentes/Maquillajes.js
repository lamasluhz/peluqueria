import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MaquillajesModal from './MaquillajesModal';
import Buscador from './Buscador';
import { Modal, Form, Button } from 'react-bootstrap';
import MaquillajesRow from './MaquillajesRow';
import '../css/Estilos.css'

const Maquillajes = () => {
  const [maquillajes, setMaquillajes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'https://localhost:7137/api/TiposServicios/Maquillaje';

  useEffect(() => {
    obtenerMaquillajes();
  }, []);

  const obtenerMaquillajes = () => {
    axios
      .get(url)
      .then(response => {
        setMaquillajes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleDeleteMaquillaje = id => {
    axios
      .delete(`https://localhost:7137/api/TiposServicios/${id}`)
      .then(response => {
        console.log(response);
        obtenerMaquillajes();
      })
      .catch(error => {
        console.error('Error deleting maquillaje:', error);
      });
  };

  const handleFieldUpdate = (id, values) => {
    axios
      .put(`https://localhost:7137/api/TiposServicios/${id}`, values)
      .then(response => {
        console.log(response);
        obtenerMaquillajes();
      })
      .catch(error => {
        console.error('Error updating maquillaje:', error);
      });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = isMaquillajeAdded => {
    setShowModal(false);
    if (isMaquillajeAdded) {
      obtenerMaquillajes();
    }
  };

  const renderMaquillajes = () => {
    const filteredMaquillajes = maquillajes.filter(maquillaje =>
      maquillaje.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredMaquillajes.map(maquillaje => {
      if (maquillaje.eliminado) {
        return null;
      }
      return (
        <MaquillajesRow
          key={maquillaje.id}
          maquillaje={maquillaje}
          handleFieldUpdate={handleFieldUpdate}
          handleDeleteMaquillaje={handleDeleteMaquillaje}
        />
      );
    });
  };

  return (
    <div>
      <div className="container">
        <div>
          <h4 className="titulos">Maquillajes</h4>
        </div>
        <br />
        <MaquillajesModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <div className="TablaBordes">
          <table className="table table-striped table-hover " id="myTable">
            <thead >
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Maquillaje</th>
                <th scope="col">Precio</th>
                <th scope="col">Otros</th>
              </tr>
            </thead>
            <tbody>
              {renderMaquillajes()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default Maquillajes