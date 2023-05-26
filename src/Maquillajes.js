import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MaquillajesModal from './MaquillajesModal';
import Buscador from './Buscador';
import { Modal, Form, Button } from 'react-bootstrap';
import MaquillajesRow from './MaquillajesRow';

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
      <div>
        <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Maquillajes</h2>
        <hr style={{ borderTop: '2px solid #B4D8E9' }} />
      </div>

      <div className="container">
        <br />
        <MaquillajesModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <table className="table table-striped table-hover border-black" style={{ border: '1px solid black' }} id="myTable">
          <thead>
            <tr>
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
  );

}

export default Maquillajes