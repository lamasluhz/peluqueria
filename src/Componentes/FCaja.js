import React, { useEffect, useState } from "react";
import '../css/Caja.css';
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';



const FCaja = () => {
  const [showModalCreacion, setShowModalCreacion] = useState(false);
  const [showModalAbrir, setShowModalAbrir] = useState(false);
  const [cajero, setCajero] = useState('');
  const [clave, setClave] = useState('');
  const [montoInicial, setMontoInicial] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [idCajero, setIdCajero] = useState('');
  const [showCaja, setShowCaja] = useState(false);
  const [datosCajero, setDatosCajero] = useState([]);

  const acceder = (estado) => {
    setShowCaja(estado);
  }

  const handleCreateSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const handleCloseModalCreacion = () => {
    setShowModalCreacion(false);
  };

  const handleShowModalCreacion = () => {
    setShowModalCreacion(true);
  };

  const handleCloseModalAbrir = () => {
    setShowModalAbrir(false);
  };

  const handleShowModalAbrir = () => {
    setShowModalAbrir(true);
  };

  const handleInputChange = (event) => {
    if (event.target.id === 'cajaCajero') {
      setCajero(event.target.value);
    } else if (event.target.id === 'cajaMontoInicial') {
      setMontoInicial(event.target.value);
    } else if (event.target.id === 'cajaClave') {
      setClave(event.target.value);
    }
  };

  const handleAbrirCaja = () => {
    // Realizar la solicitud POST utilizando Axios
    axios.post('https://localhost:7137/api/Caja/VerificarUsuario', {
      nombre: cajero,
      clave: clave,
      montoApertura: montoInicial
    })
      .then(response => {
        // Lógica a realizar después de una respuesta exitosa
        console.log('Respuesta conectado:', response.data);
        setIdCajero(response.data);
        // Reiniciar los valores de cajero y montoInicial si es necesario
        setCajero('');
        setClave('');
        setMontoInicial('');
        setShowModalAbrir(false); // Cerrar el modal
        abrirCaja();
        acceder(true); // Mostrar el div cuando alguien ingresa
      })
      .catch(error => {
        // Lógica a realizar en caso de error
        console.error('Error:', error);
      });
  };
  

  const handleCrearCaja = () => {
    // Realizar la solicitud POST utilizando Axios
    axios.post('https://localhost:7137/api/Caja/cajas', {
      nombre: cajero,
      clave: clave
    })
      .then(response => {
        // Lógica a realizar después de una respuesta exitosa
        console.log('Respuesta:', response.data);
        // Reiniciar los valores
        setCajero('');
        setClave('');
        handleCreateSuccess();
      })
      .catch(error => {
        // Lógica a realizar en caso de error
        console.error('Error:', error);
      });
  };

  const abrirCaja = () => {
    const fetchCaja = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Caja/cajas/${idCajero}`);
        setDatosCajero(response.data);
        console.log('datosss', response.data);
        setShowCaja(true);
      } catch (error) {
        console.error("Error al obtener los datos de la caja:", error);
      }
    };
  };
  

  return (
    <>
      <div className="contenedor">
        <p className="titulo-caja">
          Caja
        </p>
        <hr id="linea" />

        {showCaja ? (
          <div className="custom-component">
            <p>Cajero: {datosCajero.nombre}</p>
            <h4 className="monto">Monto</h4>
            <p>Inicial: 0000</p>
            <p>Entrada: 0000</p>
            <p>Salida: 0000</p>
            <hr id="linea" />
            <p>Total: 0000</p>
          </div>
        ) : (

          <div>
            <p className="botones">
              <button className="btn btn-outline-primary btn-lg" onClick={handleShowModalCreacion}>Crear</button>
            </p>
            <p className="botones">
              <button className="btn btn-outline-success btn-lg" onClick={handleShowModalAbrir}>Abrir</button>
            </p>
          </div>


        )}

        <Modal show={showModalAbrir} onHide={handleCloseModalAbrir}>
          <Modal.Header closeButton>
            <Modal.Title>Abrir Caja</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="cajaCajero">Cajero:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cajaCajero"
                  value={cajero}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cajaClave">Clave:</label>
                <input
                  type="password"
                  className="form-control"
                  id="cajaClave"
                  value={clave}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cajaMontoInicial">Monto Inicial:</label>
                <input
                  type="number"
                  className="form-control"
                  id="cajaMontoInicial"
                  value={montoInicial}
                  onChange={handleInputChange}
                />
              </div>


            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalAbrir}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleAbrirCaja}>
              Abrir
            </Button>
          </Modal.Footer>
        </Modal>




        <Modal show={showModalCreacion} onHide={handleCloseModalCreacion}>
          <Modal.Header closeButton>
            <Modal.Title>Crear una Nueva Caja</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="cajaCajero">Cajero:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cajaCajero"
                  value={cajero}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cajaClave">Clave:</label>
                <input
                  type="password"
                  className="form-control"
                  id="cajaClave"
                  value={clave}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                {showSuccess && (
                  <div className="success-animation">
                    <span>¡Creado con éxito!</span>
                  </div>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalCreacion}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleCrearCaja}>
              Crear
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default FCaja;
