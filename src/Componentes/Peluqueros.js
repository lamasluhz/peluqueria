import axios from "axios";
import React, { useState, useEffect } from "react";


const url = 'https://localhost:7137/api/Peluquero/getPeluqueros'


const Peluquero = () => {
    const [peluquero, setPeluquero] = useState([]);

    useEffect(() => {
        const obtenerPeluquero = async () => {
            const response = await axios.get(url);
            setPeluquero(response.data);
        }
        obtenerPeluquero();
    }, []);
    return (
        <div>
            <div>
                <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Peluqueros</h2>
            </div>

            <div class="container">

                <br />


                <div style={{ backgroundColor: '#f8e1e1', paddingTop: '1%', paddingLeft: '1%' }} ><input type="text" id="myInput" onkeyup="myFunction()" placeholder="Buscar..." title="Type in a name" /> <button class="button"></button></div>
                <table class="table table-striped table-hover border-black " style={{ border: '1px solid black' }} id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">C.I.</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Otros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peluquero.map((peluquero, i) => {
                            return (
                                <tr id={peluquero.id}>
                                    <td> {peluquero.nombres}</td>
                                    <td> {peluquero.cedula}</td>
                                    <td> {peluquero.correo}</td>
                                    <td> {peluquero.direccion}</td>
                                    <td> {peluquero.telefono}</td>
                                    <td><i className="fa-solid fa-arrows-to-eye"></i></td>
                                    <td><i className="fa-solid fa-pen" style={{ marginRight: '15px' }}></i> <i class="fa-solid fa-trash"></i></td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default Peluquero