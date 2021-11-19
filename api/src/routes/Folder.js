const { Router } = require('express');
const { Folder } = require('../db');
const { postFolder, getFolders, deleteFolder, editFolder } = require('../controllers/Folder')

const router = Router();

router.post('/', postFolder);
router.get('/', getFolders);
router.delete('/', deleteFolder);
router.put('/', editFolder);

module.exports = router;