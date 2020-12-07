const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../util/authMIddeware');


// https://localhost:5000/api/login

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('username', 'Имя пользователя обязетельно').exists(),
    check('password', 'Минимальная длина пароль должна составлять 8 символов').isLength({min: 8})
], authController.register);

router.post('/login', [
    check('username', 'Введите имя пользователя').exists(),
    check('password', 'Введите пароль').exists()
], authController.login);

router.get('/login', auth.authValidate, authController.loginGetProfile);

router.post('/forgot-password', [
    check('email', 'Некорректный email').isEmail(),
], authController.forgotPassword);


router.post('/reset-password', [
    check('password', 'Введите пароль').exists()
], authController.resetPassword);

router.post('/refresh-token', authController.refreshToken);

module.exports = router;