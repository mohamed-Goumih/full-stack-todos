import express from 'express';

import {  createTodo ,getTodos,deleteTodo,updateTodo } from './storage_todos.js';

//router
const router = express.Router();

//route pour retourner la liste des todos

router.get('/', (req, res) => {
  res.json(getTodos());
});

//route pour ajouter un todo
router.post('/', (req, res) => {
  //generer ID
  //const id=generateUniqueId({length:10, useLetters: false});
  const newTodo = createTodo({
    title:req.body.title,
    completed:req.body.completed
  });
  res.status(201).json(newTodo);
});
//route pour modifier un todo
router.put('/:id', (req, res) => {
  const updatedTodo = updateTodo(req.params.id, req.body);

  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).send('Todo non trouvé');
  }
});
//route pour suprimer un todo
router.delete('/:id', (req, res) => {
  const deletedTodo = deleteTodo(req.params.id);
  if (deletedTodo) {
    res.json(deletedTodo);
  } else {
    res.status(404).send('Todo non trouvé'); }
});
export default router;

