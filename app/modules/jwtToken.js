const jwt = require('jsonwebtoken');

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}

module.exports = {
    tokenGenerator,
}