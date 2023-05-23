import React, { useState } from "react";

const PeluquerosRow = ({ cliente, handleFieldUpdate, handleDeleteCliente }) => {
    const [editing, setEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({
        nombres: cliente.nombres,
        cedula: cliente.cedula,
        correo: cliente.correo,
        direccion: cliente.direccion,
        telefono: cliente.telefono
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
                <i className="fa-solid fa-arrows-to-eye"></i>
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
                        style={{ marginRight: "15px" }}
                        onClick={handleEdit}
                    ></i>
                )}
                <i
                    className="fa-solid fa-trash"
                    onClick={() => handleDeleteCliente(cliente.id)}
                ></i>
            </td>
        </tr>
    );
};

export default PeluquerosRow;
