const authService = require('../services/authService');
const {validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtToken.secret');

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

exports.refreshToken = async function(req,res) {
  try {
      console.log(req.body)
      let payload = jwt.verify(req.body.refreshToken, secret);
      console.log(payload)
      if (payload.type !== 'refresh') {
          res.status(400).json({message: 'Неверный токен'});
      }
      let response = await authService.refreshToken(payload);
      res.status(response.status).json(response);
  } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
          res.status(400).json({message: 'Срок жизни токена истек'});
      } else if (e instanceof jwt.JsonWebTokenError) {
          res.status(400).json({message: 'Неверный токен'});
      } else {
          res.status(500).json({message: 'Что-то пошло не так попробуйте снова'});
      }
  }
};