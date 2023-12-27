const { hashSync, compareSync } = require('bcryptjs');

const hashPassword = ( password ) => {
    return hashSync( password, 12 )
}

const comparePassword = ( confirmPassword, hashedPassword ) => {
    return compareSync( confirmPassword, hashedPassword );
}

module.exports = {
    hashPassword,
    comparePassword,
}