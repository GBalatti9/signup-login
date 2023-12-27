const { getDataForView } = require("../helpers");


module.exports = {

    getRegister: ( req, res ) => {

        const viewData = getDataForView('register');
        viewData.title = 'register'
        
        res.render('signup', {...viewData});
    }

}