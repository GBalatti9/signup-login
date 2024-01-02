const { getDataForView } = require("../helpers");

const viewData = getDataForView('forgot-password');
module.exports = {
    
    getForgotPassword: ( req, res ) => {
        res.render('resetPassword', { ...viewData });
    },

    postForgotPassword: ( req, res ) => {
        const { email } = req.body;

        console.log({ email });
    },

    

}