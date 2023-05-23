import React, { useState, useEffect } from "react";
import "../css/Calendario.css";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


const Calendar = () => {
  //Utilizo hook useState de react
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };

  const [selectedCliente, setSelectedCliente] = useState("");
const [selectedService, setSelectedService] = useState("");



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

useEffect(() => {
  const fetchClientes = async () => {
    try {
      const response = await axios.get("https://localhost:7137/api/Cliente/getCliente");
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de clientes:", error);
    }
  };

  fetchClientes();
}, []);
  

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


      <div className="button-container" style={{ marginBottom: '20px' }}>
  {/* Aca tambien hice cambioss */}
  <button
    className="btn btn-primary create-button"
    onClick={handleCreateClick}
    disabled={!selectedDay}
    style={{ backgroundColor: "#FF8E8C", borderColor: "#FF8E8C" }}
  >
    Create
  </button>


  <Link to="/reservas-mes" className="btn btn-primary additional-button" style={{ backgroundColor: '#FF8E8C', borderColor: '#FF8E8C' }}>
    Reservas del mes
  </Link>
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
            <div className="input-group">
            <select
  className="form-control"
  id="nombre_cliente"
  value={selectedCliente}
  onChange={(e) => setSelectedCliente(e.target.value)}
>
  <option value="">Seleccionar cliente</option>
  {clientes.map((cliente) => (
    <option key={cliente.id} value={cliente.id}>
    {cliente.nombres} {cliente.apellidos}
  </option>
  ))}
</select>

            </div>
          </div>

          <div className="form-group">
            <label htmlFor="servicios">Servicios</label>
            <div className="mt-2">
            <button
  type="button"
  className={`btn btn-outline-secondary btn-sm ${
    selectedService === "lavado" ? "active" : ""
  }`}
  onClick={() => setSelectedService("lavado")}
>
  Lavado y Secado
</button>
<button
  type="button"
  className={`btn btn-outline-secondary btn-sm ${
    selectedService === "corte" ? "active" : ""
  }`}
  onClick={() => setSelectedService("corte")}
>
  Corte
</button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="opciones">Opciones</label>
            <select className="form-control" id="opciones">
              <option value="">Seleccionar opción</option>
              <option value="corte_tipo_v">Corte tipo V</option>
              <option value="corte_pixie">Corte Pixie</option>
              <option value="corte_estilo_militar">Corte estilo Militar</option>
              <option value="tinte_fantasia">Tinte fantasia</option>
              <option value="desmechado">Desmechado</option>
              <option value="alizado">Alizado</option>
              <option value="tratamiento">Tratamiento</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="peluquero">Peluquero</label>
            <select className="form-control" id="peluquero">
              <option value="">Seleccionar peluquero</option>
              <option value="julio_zacarias">Julio Zacarias</option>
              <option value="aurora_guzman">Aurora Guzman</option>
            </select>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="hora_inicio">Hora de inicio</label>
                {/* AAAAAAAAAAAAAAAAAAAAAAAAAA */}
                <input type="time" className="form-control" id="hora_inicio" />
              </div>
              <div className="col-sm-6">
                <label htmlFor="hora_fin">Hora de finalización</label>
                <input type="time" className="form-control" id="hora_fin" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-danger" onClick={handleCloseModal}>
            Anular Turno
          </button> */}
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleCloseModal}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </div>

    <div> 
      <div>
        <hr style={{marginBottom:'-15px', borderTop: '2px solid #B4D8E9'}}/>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Reservas "MES"</h2>
        <hr style={{borderTop: '2px solid #B4D8E9'}}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{marginBottom: '10px'}}>
      <Buscador action={handleModal} />
    </div>
     <div>
     <table className="table table-striped table-hover border-white" style={{border: '1px solid black'}} id="myTable">
      
          < thead >
            <tr style={{ backgroundColor: '#c3dce8' }}>
              <th scope="col">Nombre</th>
              <th scope="col">Hora</th>
              <th scope="col">Fecha</th>
              <th scope="col">Peluquero</th>
              <th scope="col">Servicios</th>
              
              <th scope="col">Otros</th>
            </tr>
          </thead >
          <tbody>
            
          </tbody>
          </table>
          </div>

    </div>
    </div>

    </div>
  );
};

export default Calendar;
