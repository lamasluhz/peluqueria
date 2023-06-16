import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ManicurasModal from './ManicurasModal';
import Buscador from './Buscador';
import { Modal, Form, Button } from 'react-bootstrap';
import ManicurasRow from './ManicurasRow';
import '../css/Estilos.css'

const Manicuras = () => {
  const [manicuras, setManicuras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'https://localhost:7137/api/TiposServicios/Manicura';

  useEffect(() => {
    obtenerManicuras();
  }, []);

  const obtenerManicuras = () => {
    axios
      .get(url)
      .then(response => {
        setManicuras(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleDeleteManicura = id => {
    axios
      .delete(`https://localhost:7137/api/TiposServicios/${id}`)
      .then(response => {
        console.log(response);
        obtenerManicuras();
      })
      .catch(error => {
        console.error('Error deleting manicura:', error);
      });
  };

  const handleFieldUpdate = (id, values) => {
    axios
      .put(`https://localhost:7137/api/TiposServicios/${id}`, values)
      .then(response => {
        console.log(response);
        obtenerManicuras();
      })
      .catch(error => {
        console.error('Error updating manicura:', error);
      });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = isManicuraAdded => {
    setShowModal(false);
    if (isManicuraAdded) {
      obtenerManicuras();
    }
  };

  const renderManicuras = () => {
    const filteredManicuras = manicuras.filter(manicura =>
      manicura.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredManicuras.map(manicura => {
      if (manicura.eliminado) {
        return null;
      }
      return (
        <ManicurasRow
          key={manicura.id}
          manicura={manicura}
          handleFieldUpdate={handleFieldUpdate}
          handleDeleteManicura={handleDeleteManicura}
        />
      );
    });
  };

  return (
    <div>

      <div className="container">
        <div>
          <h4 className="titulos">Manicuras</h4>
        </div>
        <br />
        {/* <!-- TABLAS --> */}
        <ManicurasModal showModal={showModal} handleClose={handleClose} />
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <div className="TablaBordes">

          <table className="table table-striped table-hover" id="myTable">
            <thead >
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Manicura</th>
                <th scope="col">Precio</th>
                <th scope="col">Otros</th>
              </tr>
            </thead>
            <tbody>
              {renderManicuras()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default Manicuras