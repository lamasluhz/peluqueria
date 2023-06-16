import React, { useState, useEffect } from "react";
import "../css/Calendario.css";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { IoEyeSharp } from "react-icons/io5";
import { BiPencil } from "react-icons/bi";
import Stock from "./Stock";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import '../css/Estilos.css'

const Calendar = () => {
  //// segundo post en modal
  const obtenerDetallesTurnoPorPeluquero = async (peluqueroId) => {
    try {
      const response = await axios.get(
        `https://localhost:7137/api/DetallesTurno/GetDetallesTurnoByPeluquero(${peluqueroId})`
      );
      const detallesTurno = response.data;
      // Actualiza el estado de las reservas con los detalles del turno obtenidos
      setReservas(detallesTurno);
    } catch (error) {
      console.error("Error al obtener los detalles del turno:", error);
    }
  };

  const [horaInicio, setHoraInicio] = useState("");
  const [horaFinalizacion, setHoraFinalizacion] = useState("");

  const [clienteId, setClienteId] = useState("");

  const handleFormSubmit = () => {
    // Construye el objeto de datos a enviar en la solicitud POST
    const valores = selectedServices.map((objeto) => objeto.value);
    const data = {
      idsTipoServicio: valores,
      idCliente: clienteId,
      idPeluquero: selectedPeluqueros,
      //////////////////////////////////////////////////////////////////////////
      fecha: selectedDate, //selectedDate,
      eliminado: true,
      horaInicio: horaInicio,
      horaFinalizacion: horaFinalizacion,
      estado: "pendiente",
    };
    console.log(data);
    // Realiza la solicitud POST utilizando Axios
    axios
      .post("https://localhost:7137/api/DetallesTurno", data)
      .then((response) => {
        console.log("Datos guardados exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
      });

    // Cierra el modal después de guardar los datos
    handleCloseModal();
  };

  ///////////////////////////

  // para el servicio
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);

  //Utilizo hook useState de react
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleCloseModal3 = () => {
    setShowModal3(false);
  };

  const [selectedCliente, setSelectedCliente] = useState([]);

  //////////////////////////
  const [selectedPeluquero, setSelectedPeluquero] = useState("");

  const [selectedPeluqueros, setSelectedPeluqueros] = useState([]);
  const [reservas, setReservas] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  
  ///Array 1
  const monthNames = [
    "Enero",
    "Febrero", //02
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  /// Array 2
  const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  ////Funciones que cambian el mes mostrado en el calendario
  //Funcion 1
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  //Funcion 2
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  //funcion 3
  //La función handleDayClick se ejecuta cuando se hace clic en un día del calendario
  //y actualiza el estado selectedDay con el día seleccionado.
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  //Funcion 4
  //La función handleCreateClick se ejecuta cuando se hace clic en el botón "Create"
  //y muestra el modal si hay un día seleccionado.
  const handleCreateClick = () => {
    if (selectedDay) {
      setShowModal(true);
    }
  };
  //Funcion5
  // La función handleCloseModal se ejecuta cuando se cierra el modal y oculta el modal.
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCliente("");
    setSelectedPeluqueros("");
  };
  const handleShowModal1 = (index) => {
    setSelectedReserva(reservas[index]);
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleShowModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  /////////////
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClick = () => {
    setFechaSeleccionada(selectedDate);
    handleFormSubmit();
  };

  //renderHeader renderiza la cabecera del calendario, que incluye botones para navegar entre meses
  // y muestra el mes y año actual.
  const renderHeader = () => {
    return (
      <div>
        {" "}
        <h2 className="Reservas">Reservas</h2>
        <div className="header">
          {/* Aqui hice cambios para modificar en el front  */}
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#0532FB", borderColor: "#0532FB" }}
            onClick={prevMonth}
          >
            &lt;
          </button>
          <div className="month-year">
            {selectedDay} {monthNames[date.getMonth()]} {date.getFullYear()}
          </div>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#0532FB", borderColor: "#0532FB" }}
            onClick={nextMonth}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const firstDayIndex = date.getDay();
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDay === i;

      days.push(
        <div
          className={`day ${isSelected ? "selected" : ""}`}
          key={i}
          onClick={() => handleDayClick(i)}
          style={{ backgroundColor: "#75D2F3" }}
        >
          {i}
        </div>
      );
    }

    for (let i = 0; i < firstDayIndex; i++) {
      days.unshift(<div className="empty-day" key={`empty-${i}`} />);
    }

    return <div className="days">{days}</div>;
  };
  const [clientes, setClientes] = useState([]);
  const [peluqueros, setPeluqueros] = useState([]);
  const [Servicios, setServicio] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    ///Clientes
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7137/api/Cliente/getCliente"
        );
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    };
    fetchClientes();
    ///servicios
    const fetchServicios = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7137/api/TiposServicios/getServicios"
        );
        setServicios(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de Servicios", error);
      }
    };
    fetchServicios();
    const fetchPeluqueros = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7137/api/Peluquero/GetPeluqueros"
        );
        setPeluqueros(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de peluqueros:", error);
      }
    };
    fetchPeluqueros();

    const obtenerReservas = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7137/api/DetallesTurno/GetDetallesTurnoGeneral"
        );
        const datosReserva = response.data;
        setReservas(datosReserva);
        // Guardar la reserva en el estado
      } catch (error) {
        console.error(error);
      }
    };

    obtenerReservas();
  }, []);
  // Función para formatear la hora (ejemplo: "11:30 - 12:00")
  const formatearHora = (horaInicio, horaFinalizacion) => {
    const horaInicioFormateada = horaInicio.slice(0, 5);
    const horaFinalizacionFormateada = horaFinalizacion.slice(0, 5);
    return `${horaInicioFormateada} - ${horaFinalizacionFormateada}`;
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedServices(selectedOptions);
  };

  const serviciosOptions = servicios.map((servicio) => ({
    value: servicio.id,
    label: `${servicio.descripcion} ${servicio.decMonto}`,
  }));

  // Función para formatear la fecha (ejemplo: "2023-05-26")
  const formatearFecha = (fecha) => {
    return fecha.slice(0, 10);
  };

  ///////////////////////////////////
  const handleDateSearch = () => {
    // Realizar solicitud GET a la API con la fecha seleccionada
    fetch(`https://localhost:7137/api/DetallesTurno?fecha=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado 'reservas' con los datos obtenidos
        setReservas(data);
      })
      .catch((error) => {
        console.error("Error al buscar las reservas:", error);
      });
  };

  ///////////////////////
  useEffect(() => {
    const fetchDetallesTurnoByPeluquero = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7137/api/DetallesTurno/GetDetallesTurnoByPeluquero(${selectedPeluquero})`
        );
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles de los turnos:", error);
      }
    };

    if (selectedPeluquero) {
      fetchDetallesTurnoByPeluquero();
    }
  }, [selectedPeluquero]);

  ////////

  const confirmarFactura = async () => {
    const postUrl = "https://localhost:7137/Servicios"; // Use your API URL

    // Prepare the data to be sent in the POST request
    const data = {
      idCliente: selectedReserva.idClienteG,
      idDeposito: 1,
      idTurno: selectedReserva.id,
      detalleVentaDto: null,
    };

    try {
      // Perform a single Axios POST request
      await axios.post(postUrl, data);

      // Show success modal after completing the request
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error during POST request:", error);
    }

    setShowModal2(true);
  };

  return (
    <div>
      <br/>
      <div className="calendar">
        {renderHeader()}
        <div className="weekdays">
          {weekdays.map((weekday) => (
            <div className="weekday" key={weekday}>
              {weekday}
            </div>
          ))}
        </div>
        {renderDays()}

        <div className="button-container" style={{ marginBottom: "30px" }}>
          <button
            className="btn btn-primary create-button"
            onClick={handleCreateClick}
            disabled={!selectedDay}
            style={{ backgroundColor: "#0532FB", borderColor: "#0532FB" }}
          >
            Nueva reserva
          </button>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{`Fecha seleccionada: ${selectedDay} de ${
              monthNames[date.getMonth()]
            } ${date.getFullYear()}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="cliente">Cliente</label>
              <select
                className="form-control"
                id="cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
              >
                <option value="">Seleccionar Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombres} {cliente.apellidos}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="servicios">Servicios</label>
              <Select
                id="servicios"
                options={serviciosOptions}
                value={selectedServices}
                isMulti
                onChange={handleSelectChange}
              />

              {/* no funciona */}
              {Servicios.map((servicios) => (
                <option key={servicios.id} value={servicios.id}>
                  {servicios.descripcion} {servicios.decMonto}
                </option>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="peluquero">Peluquero</label>
              <div className="input-group">
                <select
                  className="form-control"
                  id="peluquero"
                  value={selectedPeluqueros}
                  onChange={(e) => setSelectedPeluqueros(e.target.value)}
                >
                  <option value="">Seleccionar peluquero</option>
                  {peluqueros.map((peluquero) => (
                    <option key={peluquero.id} value={peluquero.id}>
                      {peluquero.nombres}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="hora_inicio">Hora de inicio</label>
                  <input
                    type="time"
                    className="form-control"
                    id="horaInicio"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="hora_fin">Hora de finalización</label>
                  <input
                    type="time"
                    className="form-control"
                    id="horaFinalizacion"
                    value={horaFinalizacion}
                    onChange={(e) => setHoraFinalizacion(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Cerrar
            </button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Guardar
            </button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Tabla de reservas */}
      <div>
        <div>     
          <h4 className="Reservas">Reservas 'MES'</h4>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "10px" }}>
            <Buscador action={handleModal} handleSearch={handleSearch} />
          </div>

          <div>
          <div className="TablaBordes">
            <table
              className="table table-striped table-hover"
              id="myTable"
            >
              <thead >
                <tr style={{ backgroundColor: "#c3dce8" }}>
                  <th scope="col">Nombre</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Peluquero</th>
                  <th scope="col">Servicios</th>
                  <th scope="col">Totalidad</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Otros</th>
                </tr>
              </thead>
              <tbody>
                {reservas
                  .filter((reserva) => {
                    const cliente = reserva.cliente?.toLowerCase() || "";
                    const peluquero = reserva.peluquero?.toLowerCase() || "";
                    const hora = reserva.hora?.toLowerCase() || "";
                    const fecha = reserva.fecha?.toLowerCase() || "";
                    const servicios = reserva.servicios?.some((servicio) =>
                      servicio.tipoServicio.toLowerCase().includes(searchQuery)
                    );
                    const totalidad = reserva.totalidad?.toLowerCase() || "";
                    const estado = reserva.estado?.toLowerCase() || "";

                    return (
                      cliente.includes(searchQuery) ||
                      peluquero.includes(searchQuery) ||
                      hora.includes(searchQuery) ||
                      fecha.includes(searchQuery) ||
                      servicios ||
                      totalidad.includes(searchQuery) ||
                      estado.includes(searchQuery)
                    );
                  })
                  .map((reserva, index) => {
                    const reservaFecha = new Date(reserva.fecha);
                    const reservaMes = reservaFecha.getMonth();
                    const reservaDia = reservaFecha.getDate();

                    if (
                      reservaMes !== date.getMonth() ||
                      reservaDia !== selectedDay
                    ) {
                      return null;
                    }
                    return (
                      <tr key={reserva.id}>
                        <td>
                          {reserva.cliente} {reserva.idClienteG}{" "}
                        </td>
                        <td>
                          {formatearHora(
                            reserva.horaInicio,
                            reserva.horaFinalizacion
                          )}
                        </td>
                        <td>{formatearFecha(reserva.fecha)}</td>
                        <td>{reserva.peluquero}</td>
                        <td>
                          {reserva.servicios.map((servicio) => (
                            <div key={servicio.id}>
                              <span>{servicio.tipoServicio}</span>
                              <span> </span>
                              <span>{servicio.descripcion}</span>
                              <span> - </span>
                              <span>{servicio.monto}</span>
                            </div>
                          ))}
                        </td>
                        <td>{reserva.montoTotal}</td>
                        <td>{reserva.estado}</td>
                        <td>
                          <IoEyeSharp
                            size={20}
                            onClick={() => handleShowModal1(index)}
                            style={{ cursor: "pointer" }}
                          />
                          {/* <BiPencil
                            size={20}
                            onClick={handleShowModal2}
                            style={{ cursor: "pointer" }}
                          /> */}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <Modal show={showModal1} onHide={handleCloseModal1}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles Generales</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedReserva && (
              <div>
                <p>Fecha: {selectedReserva.fecha.split("T")[0]}</p>
                <p>Cliente:{selectedReserva.cliente}</p>

                <p>
                  Servicio:
                  {selectedReserva.servicios.map((servicio) => (
                    <div key={servicio.id}>
                      <span>{servicio.tipoServicio}</span>
                      <span> </span>
                      <span>{servicio.descripcion}</span>
                      <span> - </span>
                      <span>{servicio.monto}</span>
                    </div>
                  ))}
                </p>
                <p>Peluquero: {selectedReserva.peluquero}</p>
                <p>Hora de inicio: {selectedReserva.horaInicio}</p>
                <p>Hora de finalización: {selectedReserva.horaFinalizacion}</p>
                <p>Totalidad: {selectedReserva.montoTotal}</p>
                {/* Agrega aquí los demás detalles que quieras mostrar */}
              </div>
            )}
          </Modal.Body>

          <Modal.Footer style={{ justifyContent: "space-between" }}>
            <NavLink
              to="/ventas-productos-servicios"
              className="nav-link"
              activeClassName="active"
            >
              Agregar Producto
            </NavLink>

            <Button variant="success" onClick={confirmarFactura}>
              Facturar
            </Button>

            {/* <Button variant="secondary" onClick={}> */}
          </Modal.Footer>
        </Modal>
        

        <Modal show={showModal2} onHide={handleCloseModal2}>
          <Modal.Header closeButton>
            <Modal.Title>Facturacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Se facturo correctamente</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal2}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Calendar;
