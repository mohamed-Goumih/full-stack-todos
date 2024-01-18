import connection from '../database.js'; 
import util from 'util';

//!Ajouter un todo
// Convertir connection.query en une fonction qui retourne une Promise
const queryAsync = util.promisify(connection.query).bind(connection);

export const createTodo = async (newTodo) => {
  try {
    const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
    const results = await queryAsync(query, [newTodo.title, newTodo.completed]);
    return { id: results.insertId, ...newTodo };
  } catch (error) {
    throw new Error('Erreur lors de la création du todo: ' + error.message);
  }
};

//!retourner la liste des todos
export const getTodos = async () => {
  try {
    const query = 'SELECT * FROM todos';
    const results = await queryAsync(query);
    return results;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des todos: '
     + error.message);
  }
};

//!Modifier un todo 
export const updateTodo = async (id, updatedTodo) => {
  try {
    const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
    await queryAsync(query, [updatedTodo.title, updatedTodo.completed, id]);
    return { id, ...updatedTodo };
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du todo: ' + error.message);
  }
};

//!supprimer un todo
export const deleteTodo = async (id) => {
  try {
    const query = 'DELETE FROM todos WHERE id = ?';
    await queryAsync(query, [id]);
  } catch (error) {
    throw new Error('Erreur lors de la suppression du todo: ' + error.message);
  }
};













// export const createTodo = (newTodo) => {
//   return new Promise((resolve, reject) => {
//     const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
//     connection.query(query, [newTodo.title, newTodo.completed], (error, results) => {
//       if (error) {
//         return reject(error);
//       }
//       resolve({ id: results.insertId, ...newTodo });
//     });
//   });
// };
