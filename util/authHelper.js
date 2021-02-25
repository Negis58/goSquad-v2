const config = require('config');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const {uuid} = require('uuidv4');
const Token = require('../models/Token');

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: config.get('jwtToken.tokens.access.type')
    };
    const options = { expiresIn: config.get('jwtToken.tokens.access.expiresIn')};
    return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
    const payload = {
        id: uuid(),
        type: config.get('jwtToken.tokens.refresh.type')
    };
    const options = { expiresIn: config.get('jwtToken.tokens.refresh.expiresIn')};
    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options)
    }
};

const replaceDbRefreshToken = (tokenId, userId) => {
    return Token.findOneAndRemove({userId})
        .exec().then(() => Token.create({tokenId, userId}));
};

module.exports = { generateAccessToken, generateRefreshToken, replaceDbRefreshToken };