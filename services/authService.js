const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../util/response');

async function singUp(data) {
        const candidate = await User.findOne({username: data.username});
        if (candidate) {
            return new ApiResponse(401, 'error', {err: 'Такой пользователь уже существует'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const user = new User({
            username: data.username,
            email: data.email,
            password: hashedPassword
        });
        const result = await user.save();
        return new ApiResponse(200, 'success', result);

}

async function login(username, password) {
    const user = await User.findOne({username});
    if (!user) {
        return new ApiResponse(401, 'error', {err: 'Пользователь не найден'});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return new ApiResponse(401, 'error', {err: 'Неверный пароль'});
    }
    const token = jwt.sign({id: user._id}, config.get('jwtSecret'), {expiresIn: '2d'});
    let result = {
        "access_token": token,
        ...user._doc
    };
    return new ApiResponse(200, 'success', result);
}

module.exports = {singUp, login};