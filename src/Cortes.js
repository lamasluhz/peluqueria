import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CortesModal from './CortesModal';
import Buscador from './Buscador';
import { Modal, Button } from 'react-bootstrap';
import CortesRow from './CortesRow';

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
      <div>
        <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Cortes</h2>
        <hr style={{ borderTop: '2px solid #B4D8E9' }} />
      </div>

      <div className="container">

        <br />
        {/* <!-- TABLAS --> */}
        <CortesModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <table className="table table-striped table-hover border-black " style={{
          border: '1px solid black'
        }} id="myTable"
        >
          < thead >
            <tr>
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
  )
}

export default Cortes