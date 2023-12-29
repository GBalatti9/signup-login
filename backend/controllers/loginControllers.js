const { User } = require('../database/models');
const { getDataForView, compareHash } = require("../helpers");
const { sendVerificationEmail } = require('../utils/nodemailer');

const viewData = getDataForView('login');
viewData.title = 'Login';
viewData.errors.message = '';

module.exports = {

    getLogin: ( req, res ) => {
        res.render('login', { ...viewData });
    },

    postLogin: async ( req, res ) => {
        viewData.errors.message = '';
        const { email, submitType } = req.body;
        console.log(req.body);

        try {

            if ( email === '' || req.body.password === '' ) {
                viewData.errors.message = 'Fields cannot be empty';
                return res.render('login', { ...viewData });
            }

            const user = await User.findOne({ where: { email: email } });

            if ( !user ) {
                viewData.errors.message = 'Email or password error';
                return res.render('login', { ...viewData });
            }

            const { password } = user;
            const loginPassword = req.body.password;

            const isCorrect = compareHash( loginPassword, password );

            if ( !isCorrect ) {
                viewData.errors.message = 'Email or password error';
                return res.render('login', { ...viewData });
            }

            const { id } = user;

            if ( submitType === 'Resend' ) {
                
                const expirationTime  = new Date().getTime() + 2 * 60 * 1000;

                await User.update({ expiration_time: expirationTime }, { where: { id: id } });

                const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/verify/${id}`;
                sendVerificationEmail( email, url );
                
                viewData.info.message = 'Code resent. Check your email';
                viewData.oldData      = {};

                delete viewData.button.resend;

                return res.render('login', { ...viewData });
            }

            const { verify } = user;

            if ( verify === 1 ) {
                return res.redirect('./');
            } else {
                viewData.oldData         = req.body;
                viewData.errors.message  = 'Your account is not activated, check your email';
                viewData.button.resend   = 'Resend code';
                return res.render('login', { ...viewData });
            }


        } catch (error) {
            console.log( error );
        }

    }

}