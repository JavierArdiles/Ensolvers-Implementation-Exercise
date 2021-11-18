const { Router } = require('express');
const { Todo } = require('../db');
const { postTodo, putTodo, getTodos, deleteTodo } = require('../controllers/Todo')

const router = Router();

router.post('/', postTodo);
router.get('/', getTodos);
router.put('/', putTodo);
router.delete('/', deleteTodo);

module.exports = router;