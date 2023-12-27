const jwt = require('jsonwebtoken');

const newJWT = ( data, secret, expirationTime ) => {
    return jwt.sign( data, secret, {
        expiresIn: `${expirationTime}m`
    } )
}

module.exports = {
    newJWT,
}