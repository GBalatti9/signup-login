
const { signupData, loginData } = require('../data/viewsData');

const getDataForView = ( view ) => {

    let data;

    if (view === 'register') {
        data = signupData;
    }

    if ( view === 'login' ) {
        data = loginData;
    }

    return {
        ...data,
        oldData: {},
        errors: {},
        title: ''
    }

}

module.exports = {
    getDataForView,
}