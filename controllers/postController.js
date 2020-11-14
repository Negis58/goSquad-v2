const {validationResult} = require('express-validator');
const postService = require('../services/postService');

exports.createPost = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }

        let response = await postService.createPost(req.body, req.user.userId);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.getPosts = async function (req, res) {
    try {
        let response = await postService.getPosts();
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.getPostById = async function(req, res) {
    try {
        let response = await postService.getPostById();
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.deletePost = async function(req,res) {
    try {
        let response = await postService.deletePost(req.params.id,req.user.userId);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};