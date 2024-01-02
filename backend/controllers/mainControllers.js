module.exports = {

    getIndex: ( req, res ) => {

        let userData = req.session.user;

        if ( !userData ) {
            userData = {}
        }

        res.render('index', {
            title: 'Home',
            userData,
        });
    }

}