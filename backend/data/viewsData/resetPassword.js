const resetPassword = {
    titleSection: {
        title: 'Send email to reset password'
    },
    route: './reset',
    method: 'POST',
    submit: 'Submit',
    inputs: [
        { type: 'email', name: 'email', label: 'Email' },
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
    resetPassword,
}