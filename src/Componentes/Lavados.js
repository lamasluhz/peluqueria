import axios from "axios";
import React, { useState, useEffect } from "react";


const url = 'https://localhost:7137/api/TiposServicios/Lavado'


const Lavados = () => {
  const [lavados, setLavados] = useState([]);

  const obtenerLavados = () => {
    axios.get(url).then(response => {
      setLavados(response.data);
    });
  }

  useEffect(() => {
    obtenerLavados();
  }, []);
  
  return (
    <div>
      <div>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Lavados</h2>
      </div>

      <div className="container">

        <br />

        {/* <!-- TABLAS --> */}
        <div style={{ backgroundColor: '#f8e1e1', paddingTop: '1%', paddingLeft: '1%' }} ><input type="text" id="myInput" onkeyup="myFunction()" placeholder="Buscar..." title="Type in a name" /> <button className="button"></button></div>
        <table className="table table-striped table-hover border-black " style={{
          border: '1px solid black'
        }} id="myTable"
        >
          < thead >
            <tr>
              <th scope="col">Lavado</th>
              <th scope="col">Precio</th>
              <th scope="col">Otros</th>
            </tr>
          </thead >
          <tbody>
            {lavados.map((lavados, i) => {
              return (
                <tr id={i}>
                  <td> {lavados.descripcion}</td>
                  <td> {lavados.decMonto}</td>
                  <td><i className="fa-solid fa-arrows-to-eye"></i></td>
                  <td><i className="fa-solid fa-pen" style={{ marginRight: '15px' }}></i> <i class="fa-solid fa-trash"></i></td>
                </tr>
              )

            })}
          </tbody>
        </table >
      </div>
    </div >
  )
}

export default Lavados