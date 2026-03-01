import { MailJobData, MailResult, MailProvider } from "../types";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";


@Injectable()
export class SmtpProvider implements MailProvider {
    readonly name = 'smtp';

    private transporter: nodemailer.Transporter;

    constructor(private config: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.config.get('SMTP_HOST'),
            port: Number(this.config.get('SMTP_PORT')),
            secure: false,
            auth: {
                user: this.config.get('SMTP_USER'),
                pass: this.config.get('SMTP_PASS'),
            },
        });
    }

    async send(options: MailJobData): Promise<MailResult> {
        const info = await this.transporter.sendMail({
            from: "noreply@pliers.co.za",
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });

        return {
            provider: this.name,
            messageId: info.messageId,
        };
    }
}
