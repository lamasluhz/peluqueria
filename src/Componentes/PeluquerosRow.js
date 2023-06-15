import React, { useState } from "react";

const PeluquerosRow = ({ peluquero, handleFieldUpdate, handleDeletePeluquero }) => {
    const [editing, setEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({
        nombres: peluquero.nombres,
        cedula: peluquero.cedula,
        correo: peluquero.correo,
        direccion: peluquero.direccion,
        telefono: peluquero.telefono,
        id: peluquero.id,
        apellidos: peluquero.apellidos,
        eliminado: false,
        listEspecialidades: []
    });

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedFields({
            nombres: peluquero.nombres,
            cedula: peluquero.cedula,
            correo: peluquero.correo,
            direccion: peluquero.direccion,
            telefono: peluquero.telefono
        });
    };

    const handleSaveEdit = () => {
        handleFieldUpdate(peluquero.id, editedFields);
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
        <tr id={peluquero.id}>
            <td>
                {editing ? (
                    <input
                        type="text"
                        value={editedFields.nombres}
                        onChange={(e) => handleChange(e, "nombres")}
                    />
                ) : (
                    peluquero.nombres
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
                    peluquero.cedula
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
                    peluquero.correo
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
                    peluquero.direccion
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
                    peluquero.telefono
                )}
            </td>
            <td>
                {peluquero.listEspecialidades.map((especialidad) => {
                    return (
                        <div key={especialidad.id}>{especialidad.especialidad}</div>)
                })}
            </td>
            <td>
                {editing ? (
                    <>
                        <i
                            className="fa-solid fa-check"
                            onClick={handleSaveEdit}
                            style={{ cursor: 'pointer' }}
                        ></i>
                        <i
                            className="fa-solid fa-times"
                            onClick={handleCancelEdit}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </>
                ) : (
                    <i
                        className="fa-solid fa-pen"
                        style={{ marginRight: "15px", cursor: 'pointer' }}

                        onClick={handleEdit}
                    ></i>
                )}
                <i
                    className="fa-solid fa-trash"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeletePeluquero(peluquero.id)}
                ></i>
            </td>
        </tr>
    );
};

export default PeluquerosRow;
