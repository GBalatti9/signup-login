const { User } = require('../database/models');
const { getDataForView } = require("../helpers");

const viewData = getDataForView('forgot-password');
module.exports = {
    
    getForgotPassword: ( req, res ) => {
        return res.render('resetPassword', { ...viewData });
    },

    postForgotPassword: async ( req, res ) => {
        // Encontrar usuario en la base de datos, si no existe no se puede
        const { email } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if ( !user ) {
            viewData.errors.message = 'Not user found'
            return res.render( 'resetPassword', { ...viewData } )
        }

        console.log({ email });
    },



}