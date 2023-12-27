const { User } = require('../database/models');
const { getDataForView, hashPassword, newId, newJWT } = require("../helpers");
const { sendVerificationEmail } = require('../utils/nodemailer');

const viewData = getDataForView('register');
viewData.title = 'Register';

const storedToken = {};

module.exports = {

    getRegister: ( req, res ) => {        
        res.render('signup', { ...viewData });
    },

    postRegister: async ( req, res ) => {

        const { firstName, lastName, email, password, checkPassword } = req.body;

        if ( firstName === '' || lastName === '' || email === '' || password === '' || checkPassword === '' ) {
            viewData.errors.message = 'Fields cannot be empty';
            viewData.oldData = req.body;
            return res.render('signup', { ...viewData })
        }

        try {
            const user = await User.findOne({ where: { email: email } });

            if ( user ) {
                viewData.errors.message = 'You are already register, please login';
                return res.render('signup', { ...viewData });
            }

            const comparePasswords = password === checkPassword ? true : false;
            if ( !comparePasswords ) {
                viewData.errors.message = 'Passwords should be equal';

                const newBody = { firstName, lastName, email };
                viewData.oldData = newBody;
                return res.render('signup', { ...viewData });
            }

            const hashedPassword = hashPassword( password );
            const id = newId();
            const tokenId = hashPassword( id );

            const userData = {
                id,
                first_name: firstName,
                last_name: lastName,
                email,
                passwrod: hashedPassword,
                verify: 0
            }

            await User.create( userData );

            const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/verify/${tokenId}`;
            sendVerificationEmail( email, url );

            const token = newJWT( userData, 'secret', 2 );
            storedToken[ id ] = token;

            res.redirect('./login');

        } catch (error) {
            console.log( error );
        }

    },

    verifyAccount: ( req, res ) => {
        console.log({ storedToken });
    }
}