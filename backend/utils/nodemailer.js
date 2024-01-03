require('dotenv').config();
const { createTransport } = require('nodemailer');

const transporter = createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'gas.balatti@gmail.com',
        pass: process.env.MAILPASSWORD,
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

const sendEmail = ( userEmail, subject, html ) => {

    const mailOptions = {
        from    :    'gas.balatti@gmail.com',
        to      :     userEmail,
        subject :     subject,
        text    :     '',
        html    :      html,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    })

}

module.exports = {
    sendEmail,
}