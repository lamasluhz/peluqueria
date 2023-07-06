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
import "../css/Estilos.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Calendar = () => {
  //// segundo post en modal
  const obtenerDetallesTurnoPorPeluquero = async (peluqueroId) => {
    try {
      const response = await axios.get(
        `https://localhost:7137/api/DetallesTurno/GetDetallesTurnoByPeluquero(${peluqueroId})`
      );
      const detallesTurno = response.data;
      setAllReservas(detallesTurno);
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
  const [allReservas, setAllReservas] = useState([]);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const filteredReservas = reservas.filter((reserva) => {
    const fecha = reserva.fecha || "";
    const reservaFecha = new Date(fecha);
    const reservaDay = reservaFecha.getDate();
    const reservaMonth = reservaFecha.getMonth() + 1;
    const reservaYear = reservaFecha.getFullYear();
  
    if (selectedDate) {
      const selectedDay = selectedDate.getDate();
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedYear = selectedDate.getFullYear();
  
      return (
        selectedDay === reservaDay &&
        selectedMonth === reservaMonth &&
        selectedYear === reservaYear
      );
    }
  
    return true;
  });
  
  return (
    <div>
      <br />
     
      {/* Tabla de reservas */}
      <div>
        <div>
          <hr
            style={{ marginBottom: "-15px", borderTop: "2px solid #B4D8E9" }}
          />
          <h2
            style={{
              paddingLeft: "20px",
              marginTop: "15px",
              marginBottom: "-15px",
            }}
          >
            {`Turnos: `}
          </h2>
          <hr style={{ borderTop: "2px solid #B4D8E9" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "10px" }}>
  <Buscador action={handleModal} handleSearch={handleSearch} />
</div>
<DatePicker
  selected={selectedDate}
  onChange={handleDateChange}
  dateFormat="dd/MM/yyyy"
  placeholderText="Seleccionar fecha"
  className="form-control"
/>

          <div>
            <div className="TablaBordes">
              <table className="table table-striped table-hover" id="myTable">
                <thead>
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
                  {filteredReservas.map((reserva, index) => (
                    <tr key={index}>
                      <td>{reserva.cliente}</td>
                      <td>{reserva.hora}</td>
                      <td>{formatearFecha(reserva.fecha)}</td>
                      <td>{reserva.peluquero}</td>
                      <td>
                        {reserva.servicios.map((servicio) => (
                          <div key={servicio.id}>
                            <span>{servicio.tipoServicio}</span>
                            <span> - </span>
                            <span>{servicio.descripcion}</span>
                          </div>
                        ))}
                      </td>
                      <td>{reserva.totalidad}</td>
                      <td>{reserva.estado}</td>
                      <td>
                        <IoEyeSharp
                          size={20}
                          onClick={() => handleShowModal1(index)}
                          style={{ cursor: "pointer" }}
                        />
                        <BiPencil
                          size={20}
                          onClick={handleShowModal2}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
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

          <Modal.Footer style={{ justifyContent: "flex-end" }}>
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
