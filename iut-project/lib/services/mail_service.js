'use strict';

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

module.exports = class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendWelcomeEmail(to, firstName) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Welcome to Our Service',
            text: `Hello ${firstName},\n\nWelcome to our service! We're glad to have you with us.\n\nBest regards,\nThe Team`
        };

        await this.transporter.sendMail(mailOptions);
    }
};