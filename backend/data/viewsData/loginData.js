const loginData = {
    route: './login',
    method: 'POST',
    submit: 'Login',
    inputs: [
        { type: 'email', name: 'email', label: 'Email' },
        { type: 'password', name: 'password', label: 'Password' },
        { type: 'checkbox', name: 'session', label: 'Mantener sesión iniciada' },
    ],
    button: {},
    submitType: 'login',
    redirect: './register',
    label: {},
}

module.exports = {
    loginData,
}