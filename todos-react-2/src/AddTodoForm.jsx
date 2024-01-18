/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
const AddTodoForm = ({ onAdd, onUpdate, editingTodo }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.title);
    }
  }, [editingTodo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingTodo) {
      onUpdate(editingTodo.id, text);
    } else {
      onAdd(text);
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" required value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">{editingTodo ? 'Modifier' : 'Ajouter'}</button>
    </form>
  );
};

export default AddTodoForm ;