const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getItems);
router.post('/', auth, upload.single('image'), createItem);
router.put('/:id', auth, upload.single('image'), updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;