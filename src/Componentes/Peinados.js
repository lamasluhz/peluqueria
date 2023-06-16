import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PeinadosModal from './PeinadosModal';
import Buscador from './Buscador';
import { Modal, Button } from 'react-bootstrap';
import PeinadosRow from './PeinadosRow';
import '../css/Estilos.css';

const Peinados = () => {
  const [peinados, setPeinados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'https://localhost:7137/api/TiposServicios/Peinados';

  useEffect(() => {
    obtenerPeinados();
  }, []);

  const obtenerPeinados = () => {
    axios
      .get(url)
      .then(response => {
        setPeinados(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleDeletePeinado = id => {
    axios
      .delete(`https://localhost:7137/api/TiposServicios/${id}`)
      .then(response => {
        console.log(response);
        obtenerPeinados();
      })
      .catch(error => {
        console.error('Error deleting peinado:', error);
      });
  };

  const handleFieldUpdate = (id, values) => {
    axios
      .put(`https://localhost:7137/api/TiposServicios/${id}`, values)
      .then(response => {
        console.log(response);
        obtenerPeinados();
      })
      .catch(error => {
        console.error('Error updating peinado:', error);
      });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = isPeinadoAdded => {
    setShowModal(false);
    if (isPeinadoAdded) {
      obtenerPeinados();
    }
  };

  const renderPeinados = () => {
    const filteredPeinados = peinados.filter(peinado =>
      peinado.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredPeinados.map(peinado => {
      if (peinado.eliminado) {
        return null;
      }
      return (
        <PeinadosRow
          key={peinado.id}
          peinado={peinado}
          handleFieldUpdate={handleFieldUpdate}
          handleDeletePeinado={handleDeletePeinado}
        />
      );
    });
  };
  return (
    <div>
      <div className="container">
        <div>
          <h4 className="titulos">Peinados</h4>
        </div>
        <br />
        {/* Buscador */}
        <Buscador action={handleModal} handleSearch={handleSearch} />
        <PeinadosModal showModal={showModal} handleClose={handleClose} />
        {/* Tabla de peinados */}
        <div className="TablaBordes">
          <table className="table table-striped table-hover " id="myTable">
            <thead>
              <tr style={{ backgroundColor: '#B4D8E9' }}>
                <th scope="col">Peinado</th>
                <th scope="col">Precio</th>
                <th scope="col">Otros</th>
              </tr>
            </thead>
            <tbody>
              {renderPeinados()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default Peinados