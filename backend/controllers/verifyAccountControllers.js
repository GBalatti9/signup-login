const { User } = require('../database/models');
const { getDataForView } = require('../helpers');
const { sendVerificationEmail } = require('../utils/nodemailer');

const viewData = getDataForView('login');
viewData.title = 'Login';
viewData.info = {};

module.exports = {

    verifyAccount: async (req, res) => {
        const { id } = req.params;
        console.log({ id });
        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            return res.status(404).send('User not found. Invalid token');
        }

        const { expiration_time } = user;

        const currentTime = new Date().getTime();
        console.log({ currentTime }, { expiration_time });
        console.log(currentTime < expiration_time);

        if (currentTime <= user.expiration_time) {

            await User.update({ verify: 1, token: 'Activated' }, { where: { id: id } });

            return res.send('Your account has been verify. Please login')
        } else {
            return res.render('status', { id: id, text: 'Token expired', title: 'Register' });
        }


    },

    resendToken: async ( req, res ) => {
        const { id } = req.body;

        try {
        const user = await User.findOne({ where: { id: id } });
        const { email } = user;

        const expirationTime  = new Date().getTime() + 2 * 60 * 1000;

        await User.update({ expiration_time: expirationTime }, { where: { id: id } });

        const url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}/verify/${id}`;
        sendVerificationEmail( email, url );
        
        return res.send('Token resent');

    } catch (error) {
            console.log( error );
    }
    }
}