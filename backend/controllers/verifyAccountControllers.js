const { User } = require('../database/models');

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
            return res.status(404).send('Token has expired');
        }


    }
}