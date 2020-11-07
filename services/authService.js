const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../util/response');
const forgotPasswordURL = config.get('forgotPasswordURL');
const mailerService = require('../services/mailerService');

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

async function forgotPassword(email) {
    const user = await User.findOne({email});
    if (!user) {
        return new ApiResponse(401, 'error',
            {err: 'Электронная почта не найдена, введите корректный адрес электронной почты'});
    }
    console.log(user);
    let token = crypto.randomBytes(16).toString('hex');
    await User.updateOne({ _id: user.id }, { $set: { resetToken: token }});
    let text = 'Вы получили это письмо, потому что вы запросили сброс пароля для своей учетной записи. \n\n' +
        'Пожалуйста, перейдите по ссылке или вставьте ее в своей браузер,' +
        'чтобы завершить процесс восстановления пароля: \n\n' + forgotPasswordURL + '/new-password/' + token +
        'Если вы не запрашивали восстановления пароля, проигнорируйте это письмо, и ваш пароль останется преждним';
    await mailerService.sendEmail(email, 'Password Reset', text);

    return new ApiResponse(200, 'success',
        {message: 'Мы отправили письмо на вашу электронную почту для восстановления пароля'});
}

async function resetPassword(token, newPassword) {
    let user = await User.findOne({resetToken: token});
    if (!user) {
        return new ApiResponse(401, 'error',
            {message: 'Недействительная ссылка для сброса пароля'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.password = hashedPassword;
    await user.save();
    return new ApiResponse(200, 'success',
        {message: 'Вы изменили свой пароль'});

}


module.exports = {singUp, login, forgotPassword, resetPassword};