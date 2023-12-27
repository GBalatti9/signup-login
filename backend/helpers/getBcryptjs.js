const { hashSync, compareSync } = require('bcryptjs');

const hashPassword = ( password ) => {
    return hashSync( password, 12 )
}

const compareHash = ( confirmPassword, hashedPassword ) => {
    return compareSync( confirmPassword, hashedPassword );
}

module.exports = {
    hashPassword,
    compareHash,
}