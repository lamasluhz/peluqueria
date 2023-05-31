import axios from "axios";
import React, { useState, useEffect } from "react";
import Buscador from "./Buscador";
import PeluqueroModal from "./PeluqueroModal";
import PeluquerosRow from "./PeluquerosRow";
const url = 'https://localhost:7137/api/Peluquero/getPeluqueros'


const Peluquero = () => {
    const [peluqueros, setPeluqueros] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const obtenerPeluqueros = async () => {
        const response = await axios.get(url);
        setPeluqueros(response.data);
    }
    const headers = {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }
    useEffect(() => {
        obtenerPeluqueros();
    }, []);

    const handleFieldUpdate = (id, values) => {
        axios.put(`https://localhost:7137/api/Peluquero/${id}`, {
            values
        }, headers)
            .then(response => {
                console.log(response);
                obtenerPeluqueros(); // Refresh the client list after field update
            })
            .catch(error => {
                console.error('Error updating cliente:', error);
            });
    };
    const handleModal = () => {
        console.log(showModal);
        setShowModal(!showModal);
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    const handleDeleteCliente = (id) => {
        axios.delete(`https://localhost:7137/api/Peluquero/${id}`)
            .then(response => {
                console.log(response);
                obtenerPeluqueros(); // Refresh the client list after deletion
            })
            .catch(error => {
                console.error('Error deleting cliente:', error);
            });
    };

    const renderPeluqueros = () => {
        const filteredClientes = peluqueros.filter(peluquero =>
            peluquero.nombres.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return filteredClientes.map((peluquero, i) => {
            if (peluquero.eliminado) {
                return null; // Skip rendering if 'eliminado' is true
            }

            return (
                <PeluquerosRow
                    key={peluquero.id}
                    cliente={peluquero}
                    handleFieldUpdate={handleFieldUpdate}
                    handleDeleteCliente={handleDeleteCliente}
                />
            );
        });
    };
    return (
        <div>
            <div>
                <hr style={{ marginBottom: '-15px', borderTop: '2px solid #B4D8E9' }} />
                <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' ,fontWeight: 'bold'}}>Peluqueros</h2>
                <hr style={{ borderTop: '2px solid #B4D8E9' }} />
            </div>

            <div class="container">

                <br />
                <PeluqueroModal showModal={showModal} handleClose={handleModal} />
                <Buscador action={handleModal} />
                <table className="table table-striped table-hover border-white" style={{ border: '1px solid white' }} id="myTable">
                    <thead>
                        <tr style={{ backgroundColor: '#B4D8E9' }}>
                            <th scope="col">Nombre</th>
                            <th scope="col">C.I.</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Otros</th>  <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPeluqueros()}
                    </tbody>
                </table>
            </div>
        </div >)
}

export default Peluquero