const resendData = {
    route: './verify',
    method: 'POST',
    submit: 'Resend code',
    inputs: [
        { type: 'submit', name: 'id', label: 'id' }
    ],
    redirect: './login',
}

module.exports = {
    resendData,
}