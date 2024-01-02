const { User } = require('../database/models');
const { getDataForView, hashPassword, newId } = require("../helpers");
const { sendEmail } = require('../utils/nodemailer');

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
                id              : id,
                first_name      : firstName,
                last_name       : lastName,
                email           : email,
                password        : hashedPassword,
                verify          : 0,
                token           : token,
                expiration_time : expirationTime,
                isGmailAccount  : 0,
            }

            await User.create( userData );

            const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/verify/${id}`;
            const emailOptions = {
                userEmail : email,
                subject   : 'Verify account',
                html      : 
                `<p>Click on the following button to verify your account</p>
                <a href=${ url } target="_blank" style="display: inline-block; padding: 10px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;"> Click here </a>`
            }

            sendEmail( emailOptions.userEmail, emailOptions.subject, emailOptions.html );


            res.redirect('./login');

        } catch (error) {
            console.log( error );
        }

    },
}