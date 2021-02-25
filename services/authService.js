const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const ApiResponse = require('../util/response');
const forgotPasswordURL = process.env.FORGOT_PASSWORD_URL;
const mailerService = require('../services/mailerService');
const authHelper = require('../util/authHelper');


async function forgotPassword(email) {
    const user = await User.findOne({email});
    if (!user) {
        return new ApiResponse(401, 'error',
            {err: 'Электронная почта не найдена, введите корректный адрес электронной почты'});
    }
    console.log(user);
    let token = crypto.randomBytes(16).toString('hex');
    await User.updateOne({_id: user.id}, {$set: {resetToken: token}});
    let text = 'Вы запросили сброс пароля для своей учетной записи. \n\n' +
        'Пожалуйста, перейдите по ссылке или вставьте ее в своей браузер,' +
        'чтобы завершить процесс восстановления пароля: \n\n' + forgotPasswordURL + '/new-password?refreshToken=' + token +
        '\n\n Если вы не запрашивали восстановления пароля, проигнорируйте это письмо, и ваш пароль останется преждним';
    await mailerService.sendEmail(email, 'Password Reset', text);

    return new ApiResponse(200, 'success',
        {message: 'Мы отправили письмо на вашу электронную почту для восстановления пароля'});
}

async function resetPassword(token, newPassword) {
    let user = await User.findOne({resetToken: token});
    console.log(token, newPassword)
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

async function registerSuccess(email) {
    let text = 'Вы зарегистрировались в лучшем игровом сообществе GOSQUAD';
    await mailerService.sendEmail(email, 'Register Success', text);
}

const updateTokens = (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken();
    return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token
        }));
}


module.exports = { forgotPassword, resetPassword, updateTokens, registerSuccess};