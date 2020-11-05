const authService = require('../services/authService');
const {validationResult} = require('express-validator');

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

