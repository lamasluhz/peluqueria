import React, { useEffect, useState } from "react";
import '../css/Caja.css';
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';
import { parse } from "date-fns";



const FCaja = () => {
  const [showModalCreacion, setShowModalCreacion] = useState(false);
  const [showModalAbrir, setShowModalAbrir] = useState(false);
  const [cajero, setCajero] = useState('');
  const [clave, setClave] = useState('');
  const [montoInicial, setMontoInicial] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCaja, setShowCaja] = useState(false);
  const [datosCajero, setDatosCajero] = useState([]);
  const [idCajero, setIdCajero] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [sumaEntradas, setSumaEntradas] = useState(0);
  const [sumaSalidas, setSumaSalidas] = useState(0);
  const [totalCaja, setTotalCaja] = useState('');

  const recargarPagina = () => {
    window.location.reload();
  }
  const handleCerrarSesion = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarCerrarSesion = () => {
    cerrarCaja();
    setMostrarConfirmacion(false);

    recargarPagina();
  };

  const cancelarCerrarSesion = () => {
    setMostrarConfirmacion(false);
  };

  
  useEffect(() => {
    const storedIdCajero = localStorage.getItem("idCajero");
    if (storedIdCajero !== null) {
      const parsedData = JSON.parse(storedIdCajero);
      setIdCajero(parsedData);
    }
  }, [idCajero]);



  useEffect(() => {
    const storedConectado = localStorage.getItem("cajero");
    if (storedConectado !== null) {
      const parsedData = JSON.parse(storedConectado);
      setDatosCajero(parsedData);
      setShowCaja(true);
    }
  }, []);


  useEffect(() => {
    const storedConectado = localStorage.getItem("cajero");
    if (storedConectado !== null) {
      const parsedData = JSON.parse(storedConectado);
      setDatosCajero(parsedData);
      setShowCaja(true);
    }
  }, []);



  function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEntrada = await axios.get('https://localhost:7137/api/MovimientosCaja/entrada/totalSuma', {
          params: {
            fecha: getFormattedDate(),
            idCaja: idCajero
          }
        });
        const responseSalida = await axios.get('https://localhost:7137/api/MovimientosCaja/salida/totalSuma', {
          params: {
            fecha: getFormattedDate(),
            idCaja: idCajero
          }
        });

        setSumaEntradas(responseEntrada.data);
        setSumaSalidas(responseSalida.data);
        console.log('Movimiento Realizado con Exito');
      } catch (error) {
        console.error("Error al obtener los datos de los Movimientos:", error);
      }
    };

    if (idCajero !== null) {
      fetchData();
    }
  }, [idCajero]);

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
    axios.post('https://localhost:7137/api/Caja/VerificarUsuario', {
      nombre: cajero,
      clave: clave,
      montoApertura: montoInicial
    })
      .then(response => {
        localStorage.setItem('idCajero', JSON.stringify(response.data.idUsuario));

        setCajero('');
        setClave('');
        setMontoInicial('');
        setShowModalAbrir(false);
        abrirCaja(response.data.idUsuario);
        setIdCajero(response.data.idUsuario);

      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  const handleCrearCaja = () => {
    axios.post('https://localhost:7137/api/Caja/cajas', {
      nombre: cajero,
      clave: clave
    })
      .then(response => {
        setCajero('');
        setClave('');
        handleCreateSuccess();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const abrirCaja = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7137/api/Caja/cajas/${id}`);
      localStorage.setItem('cajero', JSON.stringify(response.data));
    } catch (error) {
      console.error("Error al obtener los datos de la caja:", error);
    }
  };



  useEffect(() => {
    const totalAperturaStorage = () => {
      const storageCajero = localStorage.getItem('cajero');
      let montoApertura = 0;
      if (storageCajero !== null) {
        const parsedData = JSON.parse(storageCajero);
        montoApertura = parsedData.montoApertura;

      }
      let montoTotal = fnTotalCaja(montoApertura);
      setTotalCaja(montoTotal);
    };

    totalAperturaStorage();
  }, []);

  const datosCerrarPut = {
    montoCierre: totalCaja,
    id: idCajero,
  }

  const cerrarCaja = () => {
    localStorage.removeItem('cajero');
    localStorage.removeItem('idCajero');
  }

  const fnTotalCaja = (valorInicial) => {
    let total = valorInicial;

    if (sumaEntradas === null && sumaSalidas === null) {
      total = valorInicial;
    } else {
      total = datosCajero.montoApertura + (sumaEntradas || 0) - (sumaSalidas || 0);

      if (total < 0) {
        total *= -1;
      }
    }
    return total;
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
            <p>Inicial: {datosCajero.montoApertura}</p>
            <p>Entrada: {sumaEntradas ?? 0}</p>
            <p>Salida: {sumaSalidas ?? 0}</p>
            <hr id="linea" />
            <p>Total: {fnTotalCaja(datosCajero.montoApertura)}</p>
            <hr />
            <button id="btn-cerrar" className="btn btn-outline-primary btn-sm" onClick={() => handleCerrarSesion()}>Cerrar</button>
          </div>
        ) : (

          <div>
            <p className="botones">
              <button className="btn btn-outline-primary btn-sm" onClick={handleShowModalCreacion}>Crear</button>
            </p>
            <p className="botones">
              <button className="btn btn-outline-success btn-sm" onClick={handleShowModalAbrir}>Abrir</button>
            </p>
            <hr id="linea" />
            <br />
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



      <Modal show={mostrarConfirmacion} onHide={cancelarCerrarSesion}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Cierre de Caja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas cerrar la caja?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarCerrarSesion}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarCerrarSesion}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default FCaja;
