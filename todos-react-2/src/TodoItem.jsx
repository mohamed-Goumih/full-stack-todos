/* eslint-disable react/prop-types */

const TodoItem = ({ todo, onDelete, onEdit }) => {
  return (
    <div>
      {todo.title}
      <button onClick={() => onEdit(todo)}>Modifier</button>
      <button onClick={() => onDelete(todo.id)}>Supprimer</button>
    </div>
  );
};
export default TodoItem;
