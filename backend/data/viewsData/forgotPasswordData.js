const forgotPasswordData = {
    titleSection: {
        title: 'Send email to reset password'
    },
    route: './forgot-password',
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
    forgotPasswordData,
}