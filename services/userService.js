const ApiResponse = require('../util/response');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');


async function getMyProfile(userId) {
    let profile = await UserProfile.findOne({user: userId})
        .populate('user', ['username']);
    if (!profile) {
        return new ApiResponse(400, 'error', {message: 'У этого пользователя нет профиля'});
    }
    return new ApiResponse(200, 'success', profile);

}

async function getUsers() {
    let result = await UserProfile.find().populate('user', ['username']);
    return new ApiResponse(200, 'success', result);
}

async function getUserById(userId) {
    let userProfile = await UserProfile.findById({user: userId})
        .populate('user', ['username']);
    if (!userProfile) {
        return new ApiResponse(400, 'error', {err: 'Профиль не найден'});
    }
    return new ApiResponse(200,'success', userProfile);
}

async function createOrUpdateUserProfile(data, userId) {
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
    } = data;
    console.log(data);
    const profileFields = {
        user: userId,
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
    console.log(profileFields);
    const profile = await UserProfile.findOneAndUpdate(
        {user: userId},
        {$set: profileFields},
        {new: true, upsert: true, setDefaultsOnInsert: true}
    );
    return new ApiResponse(200, 'success', profile);
}

async function deleteProfile(userId) {

    // Удаление профиля пользователя
    await UserProfile.findOneAndRemove({user: userId});

    // Удаление пользователя
    await User.findOneAndRemove({user: userId});

    return new ApiResponse(200, 'success',{message: 'Пользователь удален'});
}

async function addFavoriteGamesForUser(data, userId) {
    const {title, platform} = data;
    const newFavorite = {title, platform};

    const userProfile = await UserProfile.findOne({user: userId});

    userProfile.favorite.unshift(newFavorite);

    await userProfile.save();

    return new ApiResponse(200, 'success', userProfile);

}

async function deleteFavoriteGamesForUser(favId, userId) {
    const userProfile = await UserProfile.findOne({user: userId});
    userProfile.favorite = userProfile.favorite.filter(
        (fav) => fav._id.toString() !== favId);
    await userProfile.save();

    return new ApiResponse(200,'success', userProfile);
}

module.exports = {getMyProfile, getUsers, getUserById, createOrUpdateUserProfile, deleteProfile,
    addFavoriteGamesForUser, deleteFavoriteGamesForUser};