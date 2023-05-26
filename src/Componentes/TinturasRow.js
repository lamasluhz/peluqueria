import React, { useState } from 'react';
import { FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const TinturasRow = ({ tintura, handleFieldUpdate, handleDeleteTintura }) => {
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    id: tintura.id,
    tipo: tintura.tipo,
    descripcion: tintura.descripcion,
    decMonto: tintura.decMonto,
    eliminado: tintura.eliminado
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedFields({
      descripcion: tintura.descripcion,
      decMonto: tintura.decMonto,
    });
  };

  const handleSaveEdit = () => {
    handleFieldUpdate(tintura.id, editedFields);
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
    handleDeleteTintura(tintura.id);
    setShowConfirmModal(false);
  };

  return (
    <tr id={tintura.id}>
      <td>
        {editing ? (
          <input
            type="text"
            value={editedFields.descripcion}
            onChange={(e) => handleChange(e, 'descripcion')}
          />
        ) : (
          tintura.descripcion
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
          tintura.decMonto
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
            ¿Estás seguro de eliminar esta tintura?
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

export default TinturasRow;
