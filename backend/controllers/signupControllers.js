const { getDataForView } = require("../helpers");


module.exports = {

    getRegister: ( req, res ) => {

        const viewData = getDataForView('register');
        viewData.title = 'register'
        
        res.render('signup', {...viewData});
    },

    postRegister: ( req, res ) => {

        return res.json({ data: req.body })

    }
}