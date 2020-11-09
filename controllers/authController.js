const authService = require('../services/authService');
const {validationResult} = require('express-validator');
const config = require('config');


exports.register = async function(req,res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            });
        }
        let response = await authService.singUp(req.body);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.login = async function(req,res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            });
        }
        let response = await authService.login(req.body.username, req.body.password);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.forgotPassword = async function(req,res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            });
        }
        if (!req.body.email) {
            res.status(500).json({message: 'Для восстановления пароля требуется электронная почта'});
        }
        let response = await authService.forgotPassword(req.body.email);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.resetPassword = async function(req,res) {
    try {
        let response = await authService.resetPassword(req.body.token, req.body.password);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};