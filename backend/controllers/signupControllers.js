const { signupData } = require('../data/viewsData');


const dataToTheView = {
    ...signupData,
    oldData: {},
    errors: {},
    title: '',
}

module.exports = {

    getRegister: ( req, res ) => {

        dataToTheView.title = 'Register';
        
        res.render('signup', {...dataToTheView});
    }

}