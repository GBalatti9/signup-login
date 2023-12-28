const { User } = require('../database/models');
const { getDataForView, hashPassword, newId } = require("../helpers");
const { sendVerificationEmail } = require('../utils/nodemailer');

const viewData = getDataForView('register');
viewData.title = 'Register';

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

            const hashedPassword  = hashPassword( password );
            const id              = newId();
            const token           = newId();
            const expirationTime  = new Date().getTime() + 2 * 60 * 1000;

            const userData = {
                id: id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: hashedPassword,
                verify: 0,
                token: token,
                expiration_time: expirationTime
            }

            await User.create( userData );

            const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/verify/${id}`;
            sendVerificationEmail( email, url );


            res.redirect('./login');

        } catch (error) {
            console.log( error );
        }

    },

    verifyAccount: async ( req, res ) => {
        const { id } = req.params;
        console.log({ id });
        const user = await User.findOne({ where: { id: id } });

        if ( !user ) {
            return res.status(404).send('User not found. Invalid token');
        }

        const { expiration_time } = user;

        const currentTime = new Date().getTime();
        console.log({ currentTime }, { expiration_time } );
        console.log( currentTime < expiration_time );

        if ( currentTime <= user.expiration_time ) {

            await User.update({ verify: 1, token: 'Activated' }, { where: { id: id } });

            return res.send('Your account has been verify. Please login')
        } else {
            return res.status(404).send('Token has expired');
        }

        
    }
}