const resetPasswordData = {
    titleSection: {
        title: 'Reset password'
    },
    route: '?_method=PUT',
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
    forgotPassword: {},
}

module.exports = {
    resetPasswordData,
}