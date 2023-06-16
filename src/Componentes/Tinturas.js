import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TinturasModal from './TinturasModal';
import Buscador from './Buscador';
import { Modal, Button } from 'react-bootstrap';
import TinturasRow from './TinturasRow';
import '../css/Estilos.css'

const Tinturas = () => {
  const [tinturas, setTinturas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'https://localhost:7137/api/TiposServicios/Tintura';

  useEffect(() => {
    obtenerTinturas();
  }, []);

  const obtenerTinturas = () => {
    axios
      .get(url)
      .then(response => {
        setTinturas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleDeleteTintura = id => {
    axios
      .delete(`https://localhost:7137/api/TiposServicios/${id}`)
      .then(response => {
        console.log(response);
        obtenerTinturas();
      })
      .catch(error => {
        console.error('Error deleting tintura:', error);
      });
  };

  const handleFieldUpdate = (id, values) => {
    axios
      .put(`https://localhost:7137/api/TiposServicios/${id}`, values)
      .then(response => {
        console.log(response);
        obtenerTinturas();
      })
      .catch(error => {
        console.error('Error updating tintura:', error);
      });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = isTinturaAdded => {
    setShowModal(false);
    if (isTinturaAdded) {
      obtenerTinturas();
    }
  };

  const renderTinturas = () => {
    const filteredTinturas = tinturas.filter(tintura =>
      tintura.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredTinturas.map(tintura => {
      if (tintura.eliminado) {
        return null;
      }
      return (
        <TinturasRow
          key={tintura.id}
          tintura={tintura}
          handleFieldUpdate={handleFieldUpdate}
          handleDeleteTintura={handleDeleteTintura}
        />
      );
    });
  };

  return (
    <div>


      <div className="container">
        <div>
          <h4 className="titulos">Tinturas</h4>
        </div>
        <br />
        {/* Buscador */}
        <Buscador action={handleModal} handleSearch={handleSearch} />
        {/* Modal de Tinturas */}
        <TinturasModal showModal={showModal} handleClose={handleClose} />
        {/* Tabla de Tinturas */}
        <div className="TablaBordes">
          <table className="table table-striped table-hover" id="myTable">
            <thead >
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Tintura</th>
                <th scope="col">Precio</th>
                <th scope="col">Otros</th>
              </tr>
            </thead>
            <tbody>
              {renderTinturas()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default Tinturas