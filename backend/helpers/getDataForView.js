
const { signupData, loginData, resendData } = require('../data/viewsData');

const getDataForView = ( view ) => {

    let data;

    if (view === 'register') {
        data = signupData;
    }

    if ( view === 'login' ) {
        data = loginData;
    }

    if ( view === 'verify' ) {
        data = resendData;
    }

    return {
        ...data,
        oldData: {},
        errors: {},
        info: {},
        title: ''
    }

}

module.exports = {
    getDataForView,
}