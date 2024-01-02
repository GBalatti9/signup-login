const signupData = {
    route: './register',
    method: 'POST',
    submit: 'Register',
    inputs: [
        { type: 'text', name: 'firstName', label: 'Name' },
        { type: 'text', name: 'lastName', label: 'Last Name' },
        { type: 'email', name: 'email', label: 'Email' },
        { type: 'password', name: 'password', label: 'Password' },
        { type: 'password', name: 'checkPassword', label: 'Confirm Password' },
    ],
    submitType: 'register',
    button: {},
    redirect: './login',
    link: 'Register with Gmail',
    label: {},
    forgotPassword: {},
}

module.exports = {
    signupData,
}