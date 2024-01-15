const { validationResult } = require('express-validator');
const { User } = require('../database/models');
const { getDataForView, hashPassword, compareHash } = require("../helpers");
const { sendEmail } = require('../utils/nodemailer');

const viewDataForgot = getDataForView('forgot-password');
viewDataForgot.title = 'Forgot password';
viewDataForgot.errors.message = ''

const viewDataReset = getDataForView('reset-password');
viewDataReset.title = 'Reset password';

module.exports = {
    
    getForgotPassword: ( req, res ) => {
        return res.render('forgotPassword', { ...viewDataForgot });
    },

    postForgotPassword: async ( req, res ) => {
        
        const { email } = req.body;


        const { errors } = validationResult( req );
        if ( errors.length > 0 ) {
            const errorMsg = errors.map(( error ) => error.msg );
            // viewDataForgot.errors.message = errorMsg;
            // return res.render( 'forgotPassword', { ...viewDataForgot } )
            return res.json({ errors: errorMsg })
        }

        const user = await User.findOne({ where: { email: email } });

        if ( !user ) {
            const errorMsg = ['Not user found'];
            // viewDataForgot.errors.message = 'Not user found'
            // return res.render( 'forgotPassword', { ...viewDataForgot } )
            return res.json({ errors: errorMsg })
        }

        const { id, isGmailAccount } = user;

        if ( isGmailAccount === 1 ) {
            const errorMsg = ['You cannot reset your password because you sign up with Gmail'];
            // viewDataForgot.errors.message = 'You cannot reset your password because you sign up with Gmail'
            // return res.render( 'forgotPassword', { ...viewDataForgot } );
            return res.json({ errors: errorMsg })
        }

        // const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/${id}`;
        const url = `https://signup-login-qaz1.onrender.com${req.originalUrl}/${id}`;
        const emailOptions = {
            userEmail : email,
            subject   : 'Reset Password',
            html      : 
            `<p>Click on the following button to reset your password</p>
            <a href=${ url } target="_blank" style="display: inline-block; padding: 10px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;"> Click here </a>`
        }

        sendEmail( emailOptions.userEmail, emailOptions.subject, emailOptions.html );

        const errorMsg = ['Check your email'];
        // viewDataForgot.errors.message = 'Check your email';
        // return res.render( 'forgotPassword', { ...viewDataForgot } );
        return res.json({ errors: errorMsg })
    },

    getResetPassword: ( req, res ) => {
        const error = req.query.error || '';
        viewDataReset.errors.message = error;

        return res.render( 'resetPassword', { ...viewDataReset } ) ;
    },

    putResetPassword: async ( req, res ) => {

        const { id } = req.params;
        const { password, checkPassword } = req.body;

        
        try {
            
            const user = await User.findByPk( id );
            
            if ( !user ) {
                return res.redirect( `./${id}?error=User not found` );
            }
            
            const { errors } = validationResult( req );
            if ( errors.length > 0 ) {
                const errorsMsg = errors.map(( error ) => error.msg );
                viewDataForgot.errors.message = errorsMsg;
                return res.redirect( `./${id}?error=${ errorsMsg }` )
            }

            if ( user.isGmailAccount === 1 ) {
                return res.redirect( `./${id}?error=You cannot reset your password because you sign up with Gmail` );
            }

            const comparePasswords = password === checkPassword ? true : false;

            if ( !comparePasswords ) {
                return res.redirect( `./${id}?error=Passwords should be equal` )
            }

            console.log({ user });
            console.log(user.password);
            const areEqual = compareHash( password, user.password );
            if ( areEqual ) {
                return res.redirect( `./${id}?error=Choose another password` )
            }

            const hashedPassword = hashPassword( password );

            await User.update( { password: hashedPassword }, { where: { id: id } } );

            // return res.redirect('/login');
            const url = 'https://argentina-world-cup.onrender.com/'
            // const url = 'http://localhost:5173/login';
            return res.redirect( url );

        } catch (error) {
            console.log( error );
        }
    }


}