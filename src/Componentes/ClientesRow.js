import React, { useState } from "react";
import axios from "axios";
import { Modal, Card } from 'react-bootstrap'
const ClienteRow = ({ cliente, handleFieldUpdate, handleDeleteCliente }) => {
    const [editing, setEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({
        id: cliente.id,
        nombres: cliente.nombres,
        apellidos: '',
        correo: cliente.correo,
        telefono: cliente.telefono,
        direccion: cliente.direccion, cedula: cliente.cedula,
        ruc: cliente.ruc,
        eliminado: cliente.eliminado
    });
    const [showModal, setShowModal] = useState(false);
    const [detallesTurno, setDetallesTurno] = useState([]);
    const handleOpenModal = () => {
        setShowModal(true);
        fetchDetallesTurno(cliente.id);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const fetchDetallesTurno = async (id) => {
        try {
            const response = await axios.get(`https://localhost:7137/api/DetallesTurno/GetDetallesTurnoGeneral/${id}`);
            console.log(response.data);
            setDetallesTurno(response.data);
        } catch (error) {
            console.error('Error al obtener los detalles de turno:', error);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedFields({
            nombres: cliente.nombres,
            cedula: cliente.cedula,
            correo: cliente.correo,
            direccion: cliente.direccion,
            telefono: cliente.telefono
        });
    };

    const handleSaveEdit = () => {
        handleFieldUpdate(cliente.id, editedFields);
        setEditing(false);

    };

    const handleChange = (e, field) => {
        const { value } = e.target;
        setEditedFields(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <tr id={cliente.id}>
            <td>
                {editing ? (
                    <input
                        type="text"
                        value={editedFields.nombres}
                        onChange={(e) => handleChange(e, "nombres")}
                    />
                ) : (
                    cliente.nombres
                )}
            </td>
            <td>
                {editing ? (
                    <input
                        type="text"
                        value={editedFields.cedula}
                        onChange={(e) => handleChange(e, "cedula")}
                    />
                ) : (
                    cliente.cedula
                )}
            </td>
            <td>
                {editing ? (
                    <input
                        type="text"
                        value={editedFields.correo}
                        onChange={(e) => handleChange(e, "correo")}
                    />
                ) : (
                    cliente.correo
                )}
            </td>
            <td>
                {editing ? (
                    <input
                        type="text"
                        value={editedFields.direccion}
                        onChange={(e) => handleChange(e, "direccion")}
                    />
                ) : (
                    cliente.direccion
                )}
            </td>
            <td>
                {editing ? (
                    <input
                        type="text"
                        value={editedFields.telefono}
                        onChange={(e) => handleChange(e, "telefono")}
                    />
                ) : (
                    cliente.telefono
                )}
            </td>
            <td>
                <i className="fa-solid fa-arrows-to-eye" style={{ cursor: 'pointer' }} onClick={handleOpenModal}></i>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles de Turno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {detallesTurno.map((detalle, index) => (
                            <Card key={index} style={{ marginBottom: '10px' }}>
                                <Card.Body>
                                    <Card.Title>{detalle.peluquero}</Card.Title>
                                    <Card.Text>
                                        Fecha: {detalle.fecha}<br />
                                        Hora: {detalle.hora}<br />
                                        Servicio: {detalle.servicio}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Modal.Body>
                </Modal>


            </td>
            <td>
                {editing ? (
                    <>
                        <i
                            className="fa-solid fa-check"
                            onClick={handleSaveEdit}
                        ></i>
                        <i
                            className="fa-solid fa-times"
                            onClick={handleCancelEdit}
                        ></i>
                    </>
                ) : (
                    <i
                        className="fa-solid fa-pen"
                        style={{ marginRight: "15px", cursor: 'pointer' }}
                        onClick={handleEdit}
                    ></i>
                )}
                <i onClick={() => handleDeleteCliente(cliente.id)}
                    className="fa-solid fa-trash"
                    style={{ marginRight: "15px", cursor: 'pointer' }}
                ></i>
            </td>
        </tr >
    );
};

export default ClienteRow;
