const { Router } = require('express');
const { Todo } = require('../db');
const { postTodo } = require('../controllers/Todo')

const router = Router();

router.post('/', postTodo);

module.exports = router;