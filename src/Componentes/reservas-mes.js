import React, { useState, useEffect } from "react";

const ReservasMes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar una llamada a la API para obtener los clientes
    // y luego establecer los clientes en el estado usando setClientes(response.data)
    // Por ahora, vamos a simular datos estáticos para probar la estructura de la tabla.
    const fakeClientes = [
      {
        nombres: "Cliente 1",
        cedula: "123456",
        correo: "cliente1@example.com",
        direccion: "Dirección 1",
        telefono: "123456789",
      },
      {
        nombres: "Cliente 2",
        cedula: "654321",
        correo: "cliente2@example.com",
        direccion: "Dirección 2",
        telefono: "987654321",
      },
    ];

    setClientes(fakeClientes);
  }, []);

  return (
    <div>
      <div>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Clientes</h2>
      </div>

      <div className="container">

        <br />

        {/* <!-- TABLAS --> */}
        <div style={{ backgroundColor: '#f8e1e1', paddingTop: '1%', paddingLeft: '1%' }} ><input type="text" id="myInput" onKeyUp="myFunction()" placeholder="Buscar..." title="Type in a name" /> <button className="button"></button></div>
        <table className="table table-striped table-hover border-black" style={{ border: '1px solid black' }} id="myTable">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">C.I.</th>
              <th scope="col">Correo</th>
              <th scope="col">Direccion</th>
              <th scope="col">Telefono</th>
              <th scope="col">Historial</th>
              <th scope="col">Otros</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, i) => {
              return (
                <tr key={i}>
                  <td>{cliente.nombres}</td>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td><i className="fa-solid fa-arrows-to-eye"></i></td>
                  <td><i className="fa-solid fa-pen" style={{ marginRight: '15px' }}></i> <i className="fa-solid fa-trash"></i></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservasMes;
