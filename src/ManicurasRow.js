import React, { useState } from 'react';
import { FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const ManicurasRow = ({ manicura, handleFieldUpdate, handleDeleteManicura }) => {
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    id: manicura.id,
    tipo: manicura.tipo,
    descripcion: manicura.descripcion,
    decMonto: manicura.decMonto,
    eliminado: manicura.eliminado
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedFields({
      descripcion: manicura.descripcion,
      decMonto: manicura.decMonto,
    });
  };

  const handleSaveEdit = () => {
    handleFieldUpdate(manicura.id, editedFields);
    setEditing(false);
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setEditedFields(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleDeleteConfirm = () => {
    handleDeleteManicura(manicura.id);
    setShowConfirmModal(false);
  };

  return (
    <tr id={manicura.id}>
      <td>
        {editing ? (
          <input
            type="text"
            value={editedFields.descripcion}
            onChange={(e) => handleChange(e, 'descripcion')}
          />
        ) : (
          manicura.descripcion
        )}
      </td>
      <td>
        {editing ? (
          <input
            type="number"
            value={editedFields.decMonto}
            onChange={(e) => handleChange(e, 'decMonto')}
          />
        ) : (
          manicura.decMonto
        )}
      </td>
      <td>
        {editing ? (
          <>
            <FaCheck onClick={handleSaveEdit} />
            <FaTimes onClick={handleCancelEdit} />
          </>
        ) : (
          <FaPen style={{ marginRight: '15px' }} onClick={handleEdit} />
        )}
        <FaTrash onClick={handleDeleteConfirmation} />

        {/* Confirmación de eliminación */}
        <Modal show={showConfirmModal} onHide={handleDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de eliminar esta manicura?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteConfirm}>Aceptar</Button>
            <Button variant="secondary" onClick={handleDeleteCancel}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
      </td>
    </tr>
  );
};

export default ManicurasRow;
