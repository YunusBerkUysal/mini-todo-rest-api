const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

router.get('/', todoController.getAllTodos.bind(todoController));

router.get('/:id', todoController.getTodoById.bind(todoController));

router.post('/', todoController.createTodo.bind(todoController));

router.patch('/:id', todoController.updateTodo.bind(todoController));

router.delete('/:id', todoController.deleteTodo.bind(todoController));

router.patch('/:id/toggle', todoController.toggleTodo.bind(todoController));

module.exports = router;