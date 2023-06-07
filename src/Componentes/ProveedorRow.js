import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const ProveedorRow = ({ cliente, handleFieldUpdate, handleDeleteCliente }) => {
    const [editing, setEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({
        id: cliente.id,
        cedula: cliente.cedula,
        nombreEmpresa: cliente.nombreEmpresa,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
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
                {cliente.nombreEmpresa}
            </td>
            <td>
                {cliente.cedula}
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
                <NavLink to='/compra-proveedores' state={{ idProveedor: cliente.id }}>Comprar</NavLink>
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
