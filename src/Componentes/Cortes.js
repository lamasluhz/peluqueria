import axios from "axios";
import React, { useState, useEffect } from "react";
import Buscador from "./Buscador";

const url = 'https://localhost:7137/api/TiposServicios/Corte'


const Cortes = () => {
  const [cortes, setCortes] = useState([]);

  const obtenerCortes = () => {
    axios.get(url).then(response => {
      setCortes(response.data);
    });
  }

  useEffect(() => {
    obtenerCortes();
  }, []);
  
  return (
    <div>
      <div>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Cortes</h2>
      </div>

      <div className="container">

        <br />

        {/* <!-- TABLAS --> */}
        
       
        <table className="table table-striped table-hover border-black " style={{
          border: '1px solid black'
        }} id="myTable"
        >
          < thead >
            <tr>
              <th scope="col">Corte</th>
              <th scope="col">Precio</th>
              <th scope="col">Otros</th>
            </tr>
          </thead >
          <tbody>
            {cortes.map((cortes, i) => {
              return (
                <tr id={i}>
                  <td> {cortes.descripcion}</td>
                  <td> {cortes.decMonto}</td>
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

export default Cortes