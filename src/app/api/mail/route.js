import { NextResponse } from 'next/server'
const nodemailer = require('nodemailer');

export async function POST(request) {
    const myEmail = process.env.MAIL_PERSONAL_EMAIL;

    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER_HOST,
        port: process.env.SMTP_SERVER_PORT,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {

            user: process.env.SMTP_SERVER_USERNAME,
            pass: process.env.SMTP_SERVER_PASSWORD
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: process.env.SMTP_SERVER_USERNAME,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }


}