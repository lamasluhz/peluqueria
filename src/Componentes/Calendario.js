import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Calendario() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log(date)
  };

  return (
    <div className='miCalendario'>
      <h1>Reservar turno</h1>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
}

export default Calendario;



