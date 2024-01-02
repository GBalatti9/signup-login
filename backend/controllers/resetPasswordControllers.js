const { User } = require('../database/models');
const { getDataForView } = require("../helpers");
const { sendEmail } = require('../utils/nodemailer');

const viewData = getDataForView('forgot-password');
module.exports = {
    
    getForgotPassword: ( req, res ) => {
        return res.render('resetPassword', { ...viewData });
    },

    postForgotPassword: async ( req, res ) => {

        const { email } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if ( !user ) {
            viewData.errors.message = 'Not user found'
            return res.render( 'resetPassword', { ...viewData } )
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

        viewData.errors.message = 'Check your email';
        return res.render( 'resetPassword', { ...viewData } );
    },



}