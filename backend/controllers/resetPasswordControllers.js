const { getDataForView } = require("../helpers");

const viewData = getDataForView('forgot-password');
module.exports = {
    
    getForgotPassword: ( req, res ) => {
        res.render('resetPassword', { ...viewData });
    }

}