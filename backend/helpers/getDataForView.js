
const { signupData, loginData, resendData, resetPassword } = require('../data/viewsData');

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

    if ( view === 'forgot-password' ) {
        data = resetPassword;
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