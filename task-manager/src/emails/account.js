const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = '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';

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name, subject, msg) => {
    sgMail.send({
        to: email,
        from: 'bakker311042@gmail.com',
        subject,
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        html: `Welcome to the app, ${name}. Let me know how you get along with the app.` + msg
    });
};
const sendCancelationEmail = (email, name, subject, msg) => {
    sgMail.send({
        to: email,
        from: 'bakker311042@gmail.com',
        subject,
        text: `asdf aks jdlfja`,
        html: `Goodbye, ${name}. I hope to see you back sometime soon.`
    });
};

module.exports = {
    sendWelcomeEmail, sendCancelationEmail
};
//const msg = {
//    to: 'bakker311042@gmail.com',
//    from: 'bakker311042@gmail.com',
//    subject: 'This is my first mail.',
//    text: ' Sending with Twilio SendGrid is Fun and easy to do anywhere, even with Node.js',
//    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
//};
//sgMail.send(msg);