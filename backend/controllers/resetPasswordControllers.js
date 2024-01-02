const { User } = require('../database/models');
const { getDataForView } = require("../helpers");
const { sendEmail } = require('../utils/nodemailer');

const viewDataForgot = getDataForView('forgot-password');
viewDataForgot.title = 'Forgot password';

const viewDataReset = getDataForView('reset-password');
viewDataReset.title = 'Reset password';

module.exports = {
    
    getForgotPassword: ( req, res ) => {
        return res.render('forgotPassword', { ...viewDataForgot });
    },

    postForgotPassword: async ( req, res ) => {

        const { email } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if ( !user ) {
            viewDataForgot.errors.message = 'Not user found'
            return res.render( 'forgotPassword', { ...viewDataForgot } )
        }

        const { id } = user;

        const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/${id}`;
        const emailOptions = {
            userEmail : email,
            subject   : 'Reset Password',
            html      : 
            `<p>Click on the following button to reset your password</p>
            <a href=${ url } target="_blank" style="display: inline-block; padding: 10px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;"> Click here </a>`
        }

        sendEmail( emailOptions.userEmail, emailOptions.subject, emailOptions.html );

        viewDataForgot.errors.message = 'Check your email';
        return res.render( 'forgotPassword', { ...viewDataForgot } );
    },

    getResetPassword: ( req, res ) => {
        return res.render( 'resetPassword', { ...viewDataReset } ) ;
    },

    putResetPassword: ( req, res ) => {
        return res.redirect( '/login' ) ;
    }


}