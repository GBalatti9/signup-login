const resetPasswordData = {
    titleSection: {
        title: 'Reset password'
    },
    route: './reset-password',
    method: 'POST',
    submit: 'Submit',
    inputs: [
        { type: 'password', name: 'password', label: 'Password' },
        { type: 'password', name: 'checkPassword', label: 'Confirm Password' },
    ],
    button: {},
    submitType: '',
    redirect: '',
    label: {},
    link: '',
    forgotPassword: {
    },
}

module.exports = {
    resetPasswordData,
}