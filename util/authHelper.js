const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtToken.secret');
const {uuid} = require('uuidv4');
const Token = require('../models/Token');

const generateAccessToken = async function(userId) {
    const payload = {
        userId,
        type: config.get('jwtToken.tokens.access.type')
    };
    const options = { expiresIn: config.get('jwtToken.tokens.access.expiresIn')};
    return jwt.sign(payload, secret, options);
};

const generateRefreshToken = async function() {
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

const replaceDbRefreshToken = async function(tokenId, userId) {
    return Token.findOneAndRemove({userId}).exec()
        .then(() => Token.create({tokenId, userId}));
};

module.exports = { generateAccessToken, generateRefreshToken, replaceDbRefreshToken };