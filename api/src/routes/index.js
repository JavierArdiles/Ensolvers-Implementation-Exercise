const { Router } = require('express');

const router = Router();

const todoRouter = require('./Todo');
const folderRouter = require('./Folder');

router.use('/todo', todoRouter);
router.use('/folder', folderRouter);

module.exports = router;
