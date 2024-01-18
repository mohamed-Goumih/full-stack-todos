import TodoList from "./TodoList"

function App() {
  const onAdd = async (text) => {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (response.ok) {
      // Mettez à jour l'état local pour refléter le nouveau todo
    }
  };

  const onDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      // Mettez à jour l'état local pour enlever le todo supprimé
    }
  };
  
  const onUpdate = async (id, newText) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });
    if (response.ok) {
      // Mettez à jour l'état local pour refléter le todo modifié
    }
  };
  

  return (
    <>
      <TodoList onAdd onDelete={} onUpdate={} />
    </>
  )
}

export default App
