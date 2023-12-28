const { User } = require('../database/models');
const { getDataForView, compareHash } = require("../helpers");

const viewData = getDataForView('login');
viewData.title = 'Login';
viewData.errors.message = '';
viewData.info = {};

module.exports = {

    getLogin: ( req, res ) => {
        res.render('login', { ...viewData });
    },

    postLogin: async ( req, res ) => {
        viewData.errors.message = '';
        const { email, resendButton } = req.body;
        console.log(req.body);

        try {
            
            if ( resendButton ) {
                viewData.info.message = 'Code resent';
                delete viewData.button.resend;
                return res.render('login', { ...viewData });
            }

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

            const { verify } = user;

            if ( verify === 1 ) {
                return res.redirect('./');
            } else {
                viewData.errors.message = 'Your account is not activated, check your email';
                viewData.button.resend = 'Resend code';
                return res.render('login', { ...viewData });
            }


        } catch (error) {
            console.log( error );
        }

    }

}