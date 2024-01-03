const loginData = {
    titleSection: {
        title: 'Login'
    },
    route: './login',
    method: 'POST',
    submit: 'Login',
    inputs: [
        { type: 'email',    name: 'email',    label: 'Email' },
        { type: 'password', name: 'password', label: 'Password' },
        { type: 'checkbox', name: 'remember', label: 'Mantener sesión iniciada' },
    ],
    button: {},
    submitType: 'login',
    redirect: './register',
    label: {},
    link: 'Login with Gmail',
    forgotPassword: {
        link: '/forgot-password',
        text: 'Forgot Password'
    },
}

module.exports = {
    loginData,
}