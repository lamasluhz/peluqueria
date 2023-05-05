import axios from "axios";
import React, { useState } from "react";


const url = 'https://localhost:7137/api/Peluquero/getPeluqueros'


const Peluquero = () => {
    const [peluquero, setPeluquero] = useState([]);

    const obtenerPeluquero = () => {
        axios.get(url).then(response => {
            setPeluquero(response.data);

        });

    }
    obtenerPeluquero()
    return (
        <div>
            <div>
                <h2 style="padding-left: 20px; margin-top: 15px; margin-bottom:-15px;">Peluqueros</h2>
            </div>

            <div class="container">

                <br />


                <div style="background-color: #f8e1e1; padding-top: 1%; padding-left: 1%;" ><input type="text" id="myInput" onkeyup="myFunction()" placeholder="Buscar..." title="Type in a name" /> <button class="button"></button></div>
                <table class="table table-striped table-hover border-black " style="border: 1px solid black;" id="myTable">
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
                                <tr id={i}>
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