'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;
const SITE_MAIL_PORT = process.env.SITE_MAIL_PORT;
const SITE_MAIL_SERVICE = process.env.SITE_MAIL_SERVICE;
const transporter = nodemailer.createTransport({
    service: SITE_MAIL_SERVICE,
    host: SMTP_SERVER_HOST,
    port: SITE_MAIL_PORT,
    secure: true,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
});

export async function sendMail({
    email,
    sendTo,
    subject,
    text,
    html }) {
    try {
        const isVerified = await transporter.verify();
    } catch (error) {
        console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
        return;
    }
    const info = await transporter.sendMail({
        from: email,
        to: sendTo || SITE_MAIL_RECIEVER,
        subject: subject,
        text: text,
        html: html ? html : '',
    });
    return info;
}