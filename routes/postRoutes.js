const express = require('express');
const router = express.Router();
const auth = require('../util/authMIddeware');
const {check} = require('express-validator');
const postController = require('../controllers/postController');

router.post('/post', auth.authValidate, [
    check('text', 'Текст обязателен').not().isEmpty()
], postController.createPost);

router.get('/post', auth.authValidate, postController.getPosts);
router.get('/post', auth.authValidate, postController.getPostById);
router.delete('/post/:id', auth.authValidate, postController.deletePost);


module.exports = router;