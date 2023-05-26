import React, { useState } from 'react';
import { FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const PeinadosRow = ({ peinado, handleFieldUpdate, handleDeletePeinado }) => {
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    id: peinado.id,
    tipo: peinado.tipo,
    descripcion: peinado.descripcion,
    decMonto: peinado.decMonto,
    eliminado: peinado.eliminado
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedFields({
      descripcion: peinado.descripcion,
      decMonto: peinado.decMonto,
    });
  };

  const handleSaveEdit = () => {
    handleFieldUpdate(peinado.id, editedFields);
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
    handleDeletePeinado(peinado.id);
    setShowConfirmModal(false);
  };

  return (
    <tr id={peinado.id}>
      <td>
        {editing ? (
          <input
            type="text"
            value={editedFields.descripcion}
            onChange={(e) => handleChange(e, 'descripcion')}
          />
        ) : (
          peinado.descripcion
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
          peinado.decMonto
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
            ¿Estás seguro de eliminar este peinado?
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

export default PeinadosRow;

