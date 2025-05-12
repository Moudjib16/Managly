const express = require('express');
const router = express.Router();
const { getLandingPage, createUser, loginUser } = require('../controllers/auth');

router.get('/', getLandingPage);


router.post('/signup', createUser);


router.post('/login', loginUser);

module.exports = router;