const {validationResult} = require('express-validator');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const Post = require('../models/Post');

// Получить текущий профиль пользователя
// @Route get api/users/me

exports.getMyProfile = async function (req, res) {
    try {
        let profile = await UserProfile.findOne({user: req.user.userId})
            .populate('user', ['username', 'avatar']);
        if (!profile) {
            res.status(400).json({message: 'У этого пользователя нет профиля'});
        }
        res.status(200).json(profile);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'});
    }
}

// Получить всех пользователей
// @Route get api/users/

exports.getUsers = async function (req, res) {
    try {
        let profiles = await UserProfile.find().populate('user', ['username', 'avatar']);
        res.status(200).json(profiles);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

// Получить пользователя по id
// @Route get api/users/:id

exports.getUserById = async function (req, res) {
    try {
        console.log(req.params);
        let userProfile = await UserProfile.findOne({user: req.params.id})
            .populate('user', ['username', 'avatar']);
        if (!userProfile) {
            res.status(400).json({err: 'Профиль не найден'});
        }
        res.status(200).json(userProfile);

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

// Создать или обновить профиль пользователя
// @Route get api/users/

exports.createOrUpdateUserProfile = async function (req, res) {
    try {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        const {
            firstname,
            lastname,
            birthdate,
            location,
            about,
            status,
            platform,
            discord,
            youtube,
            steam
        } = req.body;
        const userAvatar = await User.findById(req.user.userId);

        const profileFields = {
            user: req.user.userId,
            firstname,
            lastname,
            //birthdate,
            location,
            about,
            status,
            platform: Array.isArray(platform) ? platform : platform.split(',').map((skill) => '' + skill.trim())
        };

        const socialFields = {
            discord,
            youtube,
            steam,
        };

        profileFields.social = socialFields;
        const profile = await UserProfile.findOneAndUpdate(
            {user: req.user.userId},
            {$set: profileFields},
            {new: true, upsert: true, setDefaultsOnInsert: true}
        );
        res.status(200).json(profile);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

// Удаление аккаунта пользователя
// @Route delete api/users/

exports.deleteUser = async function (req, res) {
    try {

        // Удаление профиля пользователя
        await UserProfile.findOneAndRemove({user: req.user.userId});

        // Удаление пользователя
        await User.findOneAndRemove({user: req.user.userId});

        // Удаление постов пользователя
        await Post.deleteMany({user: req.user.id});


        res.status(200).json({message: 'Пользователь удален'});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}

// Добавление сыгранных игр
// @Route put api/users/recent
exports.addRecentlyPlayedGames = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        const {title, platform, hours} = req.body;
        const recentPlayed = {
            title,
            platform,
            hours
        };
        const profile = await UserProfile.findOne({user: req.user.userId});
        profile.recent.unshift(recentPlayed);
        const result = await profile.save();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

// Удаление недавно сыгранных игр
// @Route delete api/users/recent/:id

exports.deleteRecentlyPlayedGames = async function (req, res) {
    try {
        const foundProfile = await UserProfile.findOne({user: req.user.userId});
        foundProfile.recent = foundProfile.recent.filter((rec) => rec._id.toString() !== req.params.id);
        const result = await foundProfile.save();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }

};

// Добавление любимых игр пользователя
// @Route put api/users/favorite/

exports.addFavoriteGamesForUser = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        const {title, platform, hours} = req.body;
        const newFavorite = {title, platform, hours};

        const userProfile = await UserProfile.findOne({user: req.user.userId});

        userProfile.favorite.unshift(newFavorite);

        const result = await userProfile.save();

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'});
    }
}

// Добавление любимых игр пользователя
// @Route delete api/users/favorite/favId

exports.deleteFavoriteGamesForUser = async function (req, res) {
    try {
        const userProfile = await UserProfile.findOne({user: req.user.userId});

        userProfile.favorite = userProfile.favorite.filter(
            (fav) => fav._id.toString() !== req.params.favId);
        const result = await userProfile.save();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
}