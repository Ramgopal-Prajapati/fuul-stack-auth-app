const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', upload.single('profilePhoto'), register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router;