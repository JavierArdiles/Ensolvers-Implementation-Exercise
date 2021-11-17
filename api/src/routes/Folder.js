const { Router } = require('express');
const { Folder } = require('../db');
const { postFolder, getFolders } = require('../controllers/Folder')

const router = Router();

router.post('/', postFolder);
router.get('/', getFolders);

module.exports = router;