const { Router } = require('express');
const { Folder } = require('../db');
const { postFolder, getFolders, deleteFolder } = require('../controllers/Folder')

const router = Router();

router.post('/', postFolder);
router.get('/', getFolders);
router.delete('/', deleteFolder);

module.exports = router;