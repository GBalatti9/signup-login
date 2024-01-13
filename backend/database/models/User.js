module.exports = ( sequelize, dataTypes ) => {

    let alias = 'User';

    let cols = {
        id:                   { type: dataTypes.STRING, primaryKey: true, },
        first_name:           { type: dataTypes.STRING, },
        last_name:            { type: dataTypes.STRING, },
        email:                { type: dataTypes.STRING, },
        password:             { type: dataTypes.STRING },
        verify:               { type: dataTypes.INTEGER, },
        token:                { type: dataTypes.STRING },
        expiration_time:      { type: dataTypes.INTEGER },
        isGmailAccount:       { type: dataTypes.INTEGER },
    }

    let config = {
        // tableName:  'register-login',
        tableName:  'users',
        timestamps: false,
    }

    const User = sequelize.define( alias, cols, config );

    return User;

}