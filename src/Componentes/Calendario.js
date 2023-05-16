import React, { useState } from "react";
import "../css/Calendario.css";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import { Button, Modal } from "react-bootstrap";

import { Link } from "react-router-dom";
// import ReservasMes from './reservas-mes';

const Calendar = () => {
  //Utilizo hook useState de react
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  const [selectedService, setSelectedService] = useState("");

  return (
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

  {/* <button
    className="btn btn-primary additional-button"
    onClick={() => console.log("Additional Button Clicked")}
  >
  <Link to="/reservas-mes" className="btn btn-primary additional-button">
    Reservas del mes
  </Link>
</button> */}
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
              <input
                type="text"
                className="form-control"
                id="nombre_cliente"
                placeholder="Nombre completo"
              />
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
          <button className="btn btn-danger" onClick={handleCloseModal}>
            Anular Turno
          </button>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleCloseModal}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;
