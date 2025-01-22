const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

// All paths start with '/api/auth'

// POST /api/auth/signup
router.post('/signup', authCtrl.signup);

module.exports = router;
