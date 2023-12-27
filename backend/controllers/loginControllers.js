const { getDataForView } = require("../helpers");

module.exports = {

    getLogin: ( req, res ) => {

        const viewData = getDataForView('login');
        viewData.title = 'Login';
        res.render('login', { ...viewData });
    },

    postLogin: ( req, res ) => {

        res.json({ data: req.body })
    }

}