const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtSecret');

exports.authValidate = async function(req,res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({message: 'Нет авторизации'});
        }
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({message: 'Срок действия токена истек'});
            return;
        }
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({message: 'Недействительный токен'});
        }
    }
}