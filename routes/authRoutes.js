const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const{check} = require('express-validator');

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароль должна составлять 8 символов').isLength({min: 8})
], authController.register);

router.post('/login', [
    check('username', '').exists(),
    check('password', 'Введите пароль').exists()
], authController.login);

module.exports = router;