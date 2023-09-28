import React from 'react';

const DeleteTaskButton = ({ taskId, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(taskId);
  };

  return (
    <button onClick={handleDeleteClick}>Excluir</button>
  );
};

export default DeleteTaskButton;
