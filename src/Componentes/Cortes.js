import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CortesModal from './CortesModal';
import Buscador from './Buscador';
import { Modal, Button } from 'react-bootstrap';
import CortesRow from './CortesRow';
import '../css/Estilos.css'

const Cortes = () => {
  const [cortes, setCortes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'https://localhost:7137/api/TiposServicios/Corte';

  useEffect(() => {
    obtenerCortes();
  }, []);

  const obtenerCortes = () => {
    axios
      .get(url)
      .then(response => {
        setCortes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleDeleteCorte = id => {
    axios
      .delete(`https://localhost:7137/api/TiposServicios/${id}`)
      .then(response => {
        console.log(response);
        obtenerCortes();
      })
      .catch(error => {
        console.error('Error deleting corte:', error);
      });
  };

  const handleFieldUpdate = (id, values) => {
    axios
      .put(`https://localhost:7137/api/TiposServicios/${id}`, values)
      .then(response => {
        console.log(response);
        obtenerCortes();
      })
      .catch(error => {
        console.error('Error updating corte:', error);
      });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = isCorteAdded => {
    setShowModal(false);
    if (isCorteAdded) {
      obtenerCortes();
    }
  };

  const renderCortes = () => {
    const filteredCortes = cortes.filter(corte =>
      corte.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredCortes.map(corte => {
      if (corte.eliminado) {
        return null;
      }
      return (
        <CortesRow
          key={corte.id}
          corte={corte}
          handleFieldUpdate={handleFieldUpdate}
          handleDeleteCorte={handleDeleteCorte}
        />
      );
    });
  };

  return (
    <div>


      <div className="container">
        <div>
          <h4 className="titulos">Cortes</h4>
        </div>
        <br />
        {/* <!-- TABLAS --> */}
        <CortesModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <div className="TablaBordes">
          <table className="table table-striped table-hover" id="myTable"
          >
            < thead >
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Corte</th>
                <th scope="col">Precio</th>
                <th scope="col">Otros</th>
              </tr>
            </thead >
            <tbody>
              {renderCortes()}
            </tbody>
          </table >
        </div>
      </div >
    </div>
  )
}

export default Cortes