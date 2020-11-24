const authService = require('../services/authService');
const {validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtToken.secret');
const Token = require('../models/Token');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Регистрация пользователя
// @Route post api/register

exports.register = async function (req, res) {
    try {
        const {username, email, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            });
        }
        const candidate = await User.findOne({username: username});
        if (candidate) {
            res.status(401).json({message: 'Такой пользователь уже существует'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        const result = await user.save();

        const tokens = await authService.updateTokens(result._id);
        const resultTokens = {tokens};
        res.status(200).json(resultTokens);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

// Аутентификация пользователя с помощью jwt токена
// @Route post api/login

exports.login = async function (req, res) {
    try {
        const {username, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            });
        }
        const user = await User.findOne({username});
        if (!user) {
            res.status(401).json({message: 'Пользователь не найден'});
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            res.status(401).json({message: 'Неверный пароль'});
        }
        //const token = jwt.sign({id: user._id}, config.get('jwtSecret'), {expiresIn: '2d'});
        const tokens = await authService.updateTokens(user._id);
        let result = {
            tokens,
            /*...user._doc*/
        };
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

// Аутентификация пользователя с помощью jwt токена
// @Route get api/login

exports.loginGetProfile = async function (req,res) {
  try {
      const user = await User.findById(req.user.userId).select('-password');
      res.json(user);
  }  catch (e) {
      res.status(500).json({message: 'Что-то пошло не так попробуйте снова'});
  }
};


// Восстановление пароля пользователя по email

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


// Обновление jwt токена

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