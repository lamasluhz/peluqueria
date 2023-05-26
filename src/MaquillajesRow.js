import React, { useState } from 'react';
import { FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const MaquillajesRow = ({ maquillaje, handleFieldUpdate, handleDeleteMaquillaje }) => {
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    id: maquillaje.id,
    tipo: maquillaje.tipo,
    descripcion: maquillaje.descripcion,
    decMonto: maquillaje.decMonto,
    eliminado: maquillaje.eliminado
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedFields({
      descripcion: maquillaje.descripcion,
      decMonto: maquillaje.decMonto,
    });
  };

  const handleSaveEdit = () => {
    handleFieldUpdate(maquillaje.id, editedFields);
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
    handleDeleteMaquillaje(maquillaje.id);
    setShowConfirmModal(false);
  };

  return (
    <tr id={maquillaje.id}>
      <td>
        {editing ? (
          <input
            type="text"
            value={editedFields.descripcion}
            onChange={(e) => handleChange(e, 'descripcion')}
          />
        ) : (
          maquillaje.descripcion
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
          maquillaje.decMonto
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
            ¿Estás seguro de eliminar este maquillaje?
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

export default MaquillajesRow;



