
const { signupData, loginData, resendData, resetPasswordData, forgotPasswordData, logOutData } = require('../data/viewsData');

const getDataForView = ( view ) => {

    let data;

    if (view === 'register') { data = signupData };

    if ( view === 'login' ) { data = loginData };

    if ( view === 'verify' ) { data = resendData };

    if ( view === 'forgot-password' ) { data = forgotPasswordData };

    if ( view === 'reset-password' ) { data = resetPasswordData };

    if ( view === 'logout' ) { data = logOutData };

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