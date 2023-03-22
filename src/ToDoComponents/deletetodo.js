import React from 'react';

const DeleteTodoItem = ({ id, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteTodoItem;