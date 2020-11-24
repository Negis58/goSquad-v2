const {validationResult} = require('express-validator');
const User = require('../models/User');
const Post = require('../models/Post');


// Создать пост
// @Route post api/post/

exports.createPost = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        const user = await User.findById(req.user.userId).select('-password');

        const newPost = new Post({
            text: req.body.text,
            postedBy: user._id,
            name: user.username,
            avatar: user.avatar
        });
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

// Получить все посты
// @Route get api/post/

exports.getPosts = async function (req, res) {
    try {
        const posts = await Post.find().sort({date: -1});
        console.log(posts);
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

// Получить пост по id
// @Route get api/post/id

exports.getPostById = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({message: 'Пост не найден'});
        }
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

// Удалить пост по id
// @Route delete api/post/id

exports.deletePost = async function (req, res) {
    try {
        console.log("fsdfsdfsd")
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({message: 'Пост не найден'});
        }
        if (post.postedBy.toString() !== req.user.userId) {
            res.status(401).json({message: 'Пользователь не авторизован'});
        }
        await post.remove();
        const posts = await Post.find();
        res.json(posts);
        //res.json({message: "Пост удален"});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.likePost = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.some((like) => like.likedBy.toString() === req.user.userId)) {
            return res.status(400).json({message: 'Пост уже лайкнут'});
        }

        post.likes.unshift({likedBy: req.user.userId});

        await post.save();

        res.json(post.likes);

        return res.json(post.likes);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.unLikePost = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.some((like) => like.likedBy.toString() === req.user.userId)) {
            return res.status(400).json({message: 'Вы еще не ставили лайк на этот пост'});
        }
        post.likes = post.likes.filter(({likedBy}) => likedBy.toString() !== req.user.userId);
        await post.save();
        return res.json(post.likes);

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.commentPost = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.userId);

        const newComment = {
            text: req.body.text,
            username: user.username,
            commentedBy: req.user.userId,
            avatar: user.avatar
        };

        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.deleteCommentPost = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
        console.log(comment);
        if (!comment) {
            res.status(404).json({message: 'Коментарий не найден'});
        }
        if (comment.commentedBy.toString() !== req.user.userId) {
            return res.status(401).json({message: 'Пользователь не авторизован'});
        }
        post.comments = post.comments.filter(({id}) => id !== req.params.comment_id);
        await post.save();
        return res.json(post.comments);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};