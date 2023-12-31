const { validationResult } = require('express-validator');
const { User } = require('../database/models');
const { getDataForView, compareHash } = require("../helpers");
const { sendEmail } = require('../utils/nodemailer');

const viewData = getDataForView('login');
viewData.title = 'Login';
viewData.errors.message = [];

module.exports = {

    getLogin: ( req, res ) => {
        const verify = req.query.verify || [];
        viewData.errors.message = [ verify ];

        res.render('login', { ...viewData });
    },

    postLogin: async ( req, res ) => {
        viewData.errors.message = [];
        const { email, submitType } = req.body;
        console.log({ submitType });
        const isRemember = req.body.remember;
        
        try {

            let { errors } = validationResult( req );
            if ( errors.length > 0 ) {

                const errorMsg = errors.map(( error ) => error.msg );
                viewData.errors.message = errorMsg;
                return res.render( 'login', { ...viewData } );
                
            }
            
            const user = await User.findOne({ where: { email: email } });

            if ( !user ) {
                viewData.oldData = req.body;
                viewData.errors.message = ['Email or password error'];
                return res.render('login', { ...viewData });
            }

            const { id, verify, expiration_time } = user;

            if ( submitType === 'login' ) {
                
                if ( email === '' || req.body.password === '' ) {
                    viewData.errors.message = ['Fields cannot be empty'];
                    return res.render('login', { ...viewData });
                }

                const { password } = user;
                const loginPassword = req.body.password;

                const isCorrect = compareHash( loginPassword, password );

                if ( !isCorrect ) {
                    viewData.oldData = req.body;
                    viewData.errors.message = ['Email or password error'];
                    return res.render('login', { ...viewData });
                }

                const dbEmail = user.email;

                if ( isRemember === '' ) {
                    res.cookie( 'email', dbEmail, {
                        maxAge: 1000 * 60 * 24 * 360 * 9999
                    } );
                    console.log('Cookie establecida');
                } else {
                    console.log('NO HAY COOKIE');
                }

                if ( verify === 0 ) {
                    viewData.oldData         = req.body;
                    viewData.errors.message  = ['Your account is not activated, check your email'];

                    if ( new Date().getTime() > expiration_time ) {
                        viewData.button.resend   = 'Resend code';
                        viewData.errors.message  = ['Resend code to activate your account'];

                    }

                    return res.render('login', { ...viewData });
                }

                delete user.id;
                delete user.password; 

                req.session.user = user;
                
                return res.redirect('./');
            }

            if ( submitType === 'Resend' ) {
                
                const expirationTime  = new Date().getTime() + 2 * 60 * 1000;

                await User.update({ expiration_time: expirationTime }, { where: { id: id } });

                const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/verify/${id}`;
                const emailOptions = {
                    userEmail : email,
                    subject   : 'Re-send token',
                    html      : 
                    `<p>Click on the following button to verify your account</p>
                    <a href=${ url } target="_blank" style="display: inline-block; padding: 10px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;"> Click here </a>`
                }
                sendEmail( emailOptions.userEmail, emailOptions.subject, emailOptions.html );
                
                viewData.info.message = 'Code resent. Check your email';
                viewData.oldData      = {};

                delete viewData.button.resend;

                return res.render('login', { ...viewData });
            }

        } catch (error) {
            console.log( error );
        }

    },

    postLogout: ( req, res ) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect( './login' );
    }

}