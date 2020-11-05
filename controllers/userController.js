const userService = require('../services/userService');
const {validationResult} = require('express-validator');

exports.getMyProfile = async function(req, res) {
    try {
        let response = await userService.getMyProfile(req.user.id);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'});
    }
}

exports.getUsers = async function(req,res) {
    try {
        let response = await userService.getUsers();
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

exports.getUserById = async function(req,res) {
    try {
        let response = await userService.getUserById();
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

exports.createOrUpdateUserProfile = async function(req,res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        let response = await userService.createOrUpdateUserProfile(req.body, req.user.id);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

exports.deleteUser = async function(req,res) {
    try {
        let response = await userService.deleteProfile(req.user.id);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

exports.addFavoriteGamesForUser = async function(req,res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        let response = await userService.addFavoriteGamesForUser(req.body, req.user.id);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'});
    }
}

exports.deleteFavoriteGamesForUser = async function(req,res) {
    try {
        let response = await userService.deleteFavoriteGamesForUser(req.params.favId, req.user.id);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}