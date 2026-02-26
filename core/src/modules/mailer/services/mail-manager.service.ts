import { Injectable, Logger } from '@nestjs/common';
import { MailResult, MailJobData, MailProvider } from '../types';


@Injectable()
export class MailerManager {

    constructor(
        private readonly provider: MailProvider,
    ) { }

    private readonly logger = new Logger(MailerManager.name);

    async send(options: MailJobData): Promise<MailResult> {
        if (!this.provider) {
            throw new Error('No mail provider registered');
        }

        try {
            this.logger.debug(
                `Sending email using provider: ${this.provider.name}`,
            );

            const result = await this.provider.send(options);

            this.logger.debug(
                `Email sent successfully via ${this.provider.name}`,
            );

            return result;
        } catch (err) {
            this.logger.error(
                `Provider ${this.provider.name} failed: ${err?.message ?? err}`,
            );

            throw err;
        }
    }
}
