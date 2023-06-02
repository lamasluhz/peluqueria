import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const ProveedorRow = ({ cliente, handleFieldUpdate, handleDeleteCliente }) => {
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
                <NavLink to='/CompraProveedores'>Comprar</NavLink>
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

export default ProveedorRow;
