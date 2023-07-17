const jwt = require('jsonwebtoken');

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}

function verifyToken(token) {
    const verifyTokenResult = jwt.verify(token, process.env.SECRET_KEY);
    if(!verifyTokenResult.username) {
        throw { status: 401, message: 'Please login first' };
    }
    return verifyTokenResult;
}

module.exports = {
    tokenGenerator,
    verifyToken
}