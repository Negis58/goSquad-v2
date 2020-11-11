const authService = require('../services/authService');
const {validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtToken.secret');
const Token = require('../models/Token');

exports.register = async function (req, res) {
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

exports.login = async function (req, res) {
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

exports.forgotPassword = async function (req, res) {
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

exports.resetPassword = async function (req, res) {
    try {
        let response = await authService.resetPassword(req.body.token, req.body.password);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.refreshToken = async function (req, res) {
    const {refreshToken} = req.body;
    let payload;
    try {
        payload = jwt.verify(refreshToken, secret);
        if (payload.type !== 'refresh') {
            res.status(400).json({message: "Недействительный токен"});
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({message: "Срок действия токена истек"});
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({message: "Недействительный токен"});
            return;
        } else {
            res.status(500).json({message: 'Что-то пошло не так попробуйте снова'});
        }
    }
    Token.findOne({tokenId: payload.id}).exec()
        .then((token) => {
            if (token === null) {
                throw new Error('Недействительный токен');
            }
            return authService.updateTokens(token.userId);
        }).then(tokens => {
        res.json(tokens);
    }).catch(err => res.status(400).json({message: err.message}));
};