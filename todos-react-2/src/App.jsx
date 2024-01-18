import  { useState, useEffect } from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm"; // Assurez-vous d'avoir ce composant

function App() {
//partie modification :
const [editingTodo, setEditingTodo] = useState(null);

const onEdit = (todo) => {
  setEditingTodo(todo);
};


  const [todos, setTodos] = useState([]);

//fetcher les todos
const fetchTodos = async () => {
  const response = await fetch('http://localhost:3000/todos');
  const data = await response.json();
  setTodos(data);
  console.log(data)
};


  useEffect(() => {
    fetchTodos();
  }, []);

  const onAdd = async (title) => {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title:title,completed:false  })
    });
    if (response.ok) {
      // Mettez à jour l'état local pour refléter le nouveau todo
        const addedTodo = await response.json();
        setTodos([...todos, addedTodo]);
  
  }
};

  const onDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      // Juste filtrer le todo supprimé de la liste des états
      console.log(id)
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      // Gérer l'erreur si nécessaire
      console.error('Erreur lors de la suppression du todo');
    }
  };
  
  
  const onUpdate = async (id, newTitle) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle ,completed:false})
    });
    if (response.ok) {
      // Mettez à jour l'état local pour refléter le todo modifié
      setEditingTodo(null); // Réinitialiser après la mise à jour
      fetchTodos();
    }
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newTitle };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
    <AddTodoForm onAdd={onAdd} onEdit={onEdit} 
    onUpdate={onUpdate} editingTodo={editingTodo} />
    <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} />
    </>
  );
}
export default App;

