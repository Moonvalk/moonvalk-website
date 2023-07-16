import { SentMessageInfo, createTransport } from 'nodemailer';
import { Request, Response } from 'express';
import { EnvironmentProps } from '../util/EnvironmentProps';
import Mail from 'nodemailer/lib/mailer';

/**
 * Handles a contact form submission and sends a new email to the provided
 * contact account through itself.
 * @param {Request} request_ - 
 * @param {Response} response_ - 
 * @return {Promise<void>} void
 */
export async function sendContactMessageController(request_: Request, response_: Response): Promise<void> {
    // Use contact authorization to generate a valid email transporter.
    let transport = createTransport({
        host: 'smtp.zoho.com',
        secure: true,
        port: 465,
        auth: {
            user: EnvironmentProps.config.contactEmail,
            pass: EnvironmentProps.config.contactPassword,
        },
    });

    // Generate a new message from the provided body.
    const {firstName, lastName, email, phone, subject, message} = request_.body;
    const html = `
        <h2><strong><em>Subject:</em></strong> ${subject}</h2>
        <h3><strong><em>Sent from:</em></strong> ${firstName} ${lastName}</h3>
        <h3><strong><em>Email:</em></strong> ${email} <strong><em>Phone:</em></strong> ${phone}</h3>
        <p><strong><em>Message:</em></strong> ${message}</p>
    `;

    // Generate mail options that describe how this message should be sent.
    const mailOptions: Mail.Options = {
        from: EnvironmentProps.config.contactEmail,
        to: EnvironmentProps.config.contactEmail,
        subject: `New Contact Message: ${subject}`,
        html: html,
    };

    // Using the provided config, send an email now.
    await transport.sendMail(mailOptions, (error_: Error, info_: SentMessageInfo) => {
        if (error_) {
            throw error_;
        }
    });
    response_.json('Success');
}
