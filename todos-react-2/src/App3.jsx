import  { useState, useEffect } from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm"; // Assurez-vous d'avoir ce composant

function App() {
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
        //Refraichir les todos
       // fetchTodos()
  
      
    }
   
    setTodos([...todos, { title }]);
  };

  const onDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      const updatedTodo = await response.json();
      const updatedTodos = todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
 
     // setTodos(todos.filter(todo => todo.id !== id));
    }
    fetchTodos();
  };
  
  const onUpdate = async (id, newTitle) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTitle })
    });
    if (response.ok) {
      // Mettez à jour l'état local pour refléter le todo modifié
      //fetchTodos();
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
      <AddTodoForm onAdd={onAdd} />
      <TodoList todos={todos} onDelete={onDelete} onUpdate={onUpdate} />
    </>
  );
}

export default App;
