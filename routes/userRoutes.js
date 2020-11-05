const express = require('express');
const router = express.Router();
const auth = require('../util/authMIddeware');
const userController = require('../controllers/userController');
const {check} = require('express-validator');

router.get('/users/me', auth.authValidate, userController.getMyProfile);
router.get('/users', auth.authValidate, userController.getUsers);
router.get('/users/:id', auth.authValidate, userController.getUserById);

router.post('/users', auth.authValidate, [
    check('firstname','Имя обязательно').not().isEmpty(),
    check('lastname', 'Фамилия обязательно').not().isEmpty(),
    check('platform', 'Игровая платформа обязательно').not().isEmpty(),
    check('status', 'Игровой статус обязателен').not().isEmpty()
], userController.createOrUpdateUserProfile);

router.delete('/users', auth.authValidate, userController.deleteUser);

router.put('/users/favorite/', auth.authValidate, [
    check('title', 'Название игры обятельно').not().isEmpty(),
    check('platform', 'Игровая платформа обязательно').not().isEmpty()
], userController.addFavoriteGamesForUser);

router.delete('/users/favorite/:favId', auth.authValidate, userController.deleteFavoriteGamesForUser);

module.exports = router;