require('dotenv').config();
const { createTransport } = require('nodemailer');

const transporter = createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'gas.balatti@gmail.com',
        pass: process.env.PASSWORD,
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

const sendVerificationEmail = ( userEmail, link ) => {

    const mailOptions = {
        from: 'gas.balatti@gmail.com',
        to: userEmail,
        subject: 'Verify email',
        text: '',
        html: `
        <p>Click on the following button to verify your account</p>
        <a href=${link} target="_blank" style="display: inline-block; padding: 10px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;"> Click here </a>`
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
    sendVerificationEmail,
}