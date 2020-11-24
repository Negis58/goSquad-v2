const express = require('express');
const router = express.Router();
const auth = require('../util/authMIddeware');
const {check} = require('express-validator');
const postController = require('../controllers/postController');

router.post('/post', auth.authValidate, [
    check('text', 'Текст обязателен').not().isEmpty()
], postController.createPost);

router.get('/post', auth.authValidate, postController.getPosts);
router.get('/post/:id', auth.authValidate, postController.getPostById);
router.delete('/post/:id', auth.authValidate, postController.deletePost);
router.put('/post/like/:id', auth.authValidate, postController.likePost);
router.put('/post/unlike/:id', auth.authValidate, postController.unLikePost);
router.post('/post/comment/:id', auth.authValidate, [
    check('text', 'Текст обязателен').not().isEmpty()
], postController.commentPost);
router.delete('/post/comment/:id/:comment_id', auth.authValidate, postController.deleteCommentPost);


module.exports = router;