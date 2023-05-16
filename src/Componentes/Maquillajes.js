import axios from "axios";
import React, { useState, useEffect } from "react";


const url = 'https://localhost:7137/api/TiposServicios/Maquillaje' 



const Maquillajes = () => {
  const [maquillajes, setMaquillajes] = useState([]);

  const obtenerMaquillajes = () => {
    axios.get(url).then(response => {
      setMaquillajes(response.data);
    });
  }

  useEffect(() => {
    obtenerMaquillajes();
  }, []);
  
  return (
    <div>
      <div>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Maquillajes</h2>
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
              <th scope="col">Maquillajes</th>
              <th scope="col">Precio</th>
              <th scope="col">Otros</th>
            </tr>
          </thead >
          <tbody>
            {maquillajes.map((maquillajes, i) => {
              return (
                <tr id={i}>
                  <td> {maquillajes.descripcion}</td>
                  <td> {maquillajes.decMonto}</td>
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

export default Maquillajes