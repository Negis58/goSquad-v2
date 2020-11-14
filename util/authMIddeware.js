const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtToken.secret');

exports.authValidate = async function(req,res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({ message: "Нет авторизации"});
        return;
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const payload = jwt.verify(token, secret);
            req.user = payload;
            if (payload.type !== 'access') {
                res.status(401).json({message: "Неверный токен"});
                return;
            }
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.status(401).json({message: "Срок жизни токена истек"});
                return;
            }
            if (err instanceof  jwt.JsonWebTokenError) {
                res.status(401).json({ message: "Invalid token"});
            }
        }
    }
    next();
}

