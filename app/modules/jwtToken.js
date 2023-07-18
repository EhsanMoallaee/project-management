const jwt = require('jsonwebtoken');

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY, (err, data ) => {
        if (err) {
            return false;
        } else {
            return data
        }
    })
}

module.exports = {
    tokenGenerator,
    verifyToken
}