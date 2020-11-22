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

router.put('/users/recent', auth.authValidate, [
    check('title', 'title is Required').not().isEmpty(),
    check('platform', 'platform is Required').not().isEmpty(),
    check('hours','From date is required and needs to be from the past').not().isEmpty()
], userController.addRecentlyPlayedGames);

router.delete('/users/recent/:id', auth.authValidate, userController.deleteRecentlyPlayedGames);



module.exports = router;