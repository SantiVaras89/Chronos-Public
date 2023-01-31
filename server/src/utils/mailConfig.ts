
import nodeMailer from 'nodemailer'

const mail = process.env.MAIL_USER
const password = process.env.MAIL_PASSWORD
const host = process.env.MAIL_HOST
const port = process.env.MAIL_PORT

export const transporter = nodeMailer.createTransport({
    port: port,
    host: host,
       auth: {
            user: mail,
            pass: password,
         },
    secure: true,
    });