import React, { useState, useEffect } from "react";
import "../css/Calendario.css";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { IoEyeSharp } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';




const Calendar = () => {
  //// segundo post en modal

  const handleFormSubmit = () => {
    // Construye el objeto de datos a enviar en la solicitud POST
    const valores = selectedServices.map(objeto => objeto.value);
    const data = {
      idsTipoServicio: valores,
      idCliente: selectedCliente,
      idPeluquero: selectedPeluqueros,
      fecha: new Date().toISOString(),
      eliminado: true,
      horaInicio: document.getElementById("horaInicio").value,
      horaFinalizacion: document.getElementById("horaFinalizacion").value,
      estado: "pendiente"
    };
    console.log(data)
    // Realiza la solicitud POST utilizando Axios
    axios
      .post("https://localhost:7137/api/DetallesTurno", data)
      .then((response) => {
        // Aquí puedes realizar cualquier acción adicional después de guardar los datos
        console.log("Datos guardados exitosamente:", response.data);
      })
      .catch((error) => {
        // Manejo de errores en caso de que la solicitud falle
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
  


  const handleModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };

  const [selectedCliente, setSelectedCliente] = useState("");

  const [selectedPeluqueros, setSelectedPeluqueros] = useState([]);
  const [reservas, setReservas] = useState([]);

  ///Array 1
  const monthNames = [
    "Enero",
    "Febrero",
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
  
  


  //renderHeader renderiza la cabecera del calendario, que incluye botones para navegar entre meses
  // y muestra el mes y año actual.
  const renderHeader = () => {
    return (
      <div>
        {" "}
        <h2>Reservas</h2>
        <div className="header">
          {/* Aqui hice cambios para modificar en el front  */}
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#FF8E8C", borderColor: "#FF8E8C" }}
            onClick={prevMonth}
          >
            &lt;
          </button>
          <div className="month-year">
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </div>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#FF8E8C", borderColor: "#FF8E8C" }}
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
        /////////////////////////////////// Aca modifique tambien
        <div
          className={`day ${isSelected ? "selected" : ""}`}
          key={i}
          onClick={() => handleDayClick(i)}
          style={{ backgroundColor: "#FFB38C" }}
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

  useEffect(() => {
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

  // const [selectedCliente, setSelectedCliente] = useState("");

  return (
    <div>
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

        <div className="button-container" style={{ marginBottom: "20px" }}>
          <button
            className="btn btn-primary create-button"
            onClick={handleCreateClick}
            disabled={!selectedDay}
            style={{ backgroundColor: "#FF8E8C", borderColor: "#FF8E8C" }}
          >
            Create
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
              <label htmlFor="nombre_cliente">Cliente</label>
              <select
                className="form-control"
                id="nombre_cliente"
                value={selectedCliente}
                onChange={(e) => setSelectedCliente(e.target.value)}>
                <option value="">Seleccionar cliente</option>
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
                  onChange={(e) => setSelectedPeluqueros(e.target.value)}>
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
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="hora_inicio">Hora de inicio</label>
                  <input type="time" className="form-control" id="horaInicio" />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="hora_fin">Hora de finalización</label>
                  <input
                    type="time"
                    className="form-control"
                    id="horaFinalizacion"
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
            Reservas "MES"
          </h2>
          <hr style={{ borderTop: "2px solid #B4D8E9" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "10px" }}>
            <Buscador action={handleModal} />
          </div>
          <div>
            <table
              className="table table-striped table-hover border-white"
              style={{ border: "1px solid black" }}
              id="myTable"
            >
              <thead>
                <tr style={{ backgroundColor: "#c3dce8" }}>
                  <th scope="col">Nombre</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Peluquero</th>
                  <th scope="col">Servicios</th>
                  <th scope="col">Totalidad</th>
                  <th scope="col">Otros</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva, index) => (
                  <tr key={reserva.id}>
                    <td>{reserva.cliente}</td>
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
                    <td> <IoEyeSharp
    size={20}
    onClick={() => handleShowModal1(index)}
    style={{ cursor: 'pointer' }}
  />  
                    <BiPencil size={20} onClick={handleShowModal2} style={{ cursor: 'pointer' }} />
                    </td>{" "}
                    
                    {/* Agrega aquí los datos adicionales que quieras mostrar */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
       <Modal show={showModal1} onHide={handleCloseModal1}>
  <Modal.Header closeButton>
    <Modal.Title>Facturar</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {selectedReserva && (
  <div>
    <p>Fecha: {selectedReserva.fecha.split('T')[0]}</p>
    <p>Cliente: {selectedReserva.cliente}</p>
    <p>
      Servicio:
      {selectedReserva.servicio && selectedReserva.servicio.length > 0 ? (
        <ul>
          {selectedReserva.servicio.map((servicio) => (
            <li key={servicio.id}>
              {servicio.tipoServicio} - {servicio.descripcion} - {servicio.monto}
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </p>
    <p>Peluquero: {selectedReserva.peluquero}</p>
    <p>Hora de inicio: {selectedReserva.horaInicio}</p>
    <p>Hora de finalización: {selectedReserva.horaFinalizacion}</p>
    <p>Totalidad: {selectedReserva.montoTotal}</p>
    {/* Agrega aquí los demás detalles que quieras mostrar */}
  </div>
)}




  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal1}>
      Facturar
    </Button>
  </Modal.Footer>
</Modal>


<Modal show={showModal2} onHide={handleCloseModal2}>
  <Modal.Header closeButton>
    <Modal.Title>Descripción 2</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Aquí puedes agregar la descripción correspondiente al botón 2.
  </Modal.Body>
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
