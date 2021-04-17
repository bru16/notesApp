const { Router } = require('express');
const router = Router();

const { login, signup, renderSignUpForm, renderLogInForm, logout } = require('../controllers/users.controller');

// SIGN UP
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);

//LOG IN
router.get('/users/login', renderLogInForm);
router.post('/users/login', login);

//LOG OUT
router.get('/users/logout', logout);

module.exports = router;