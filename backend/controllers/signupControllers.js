const { User } = require('../database/models');
const { getDataForView } = require("../helpers");

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

            

        } catch (error) {
            throw new Error( error )
        }

        return res.json({ data: req.body })

    }
}