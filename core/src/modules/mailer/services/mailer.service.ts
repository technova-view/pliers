import { Injectable, Logger } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { MailTemplateRenderer } from "./mail-template.renderer";
import { SendMailOptions, MailJobData } from "../types";

@Injectable()
export class MailerService {
    private readonly logger = new Logger(MailerService.name);

    constructor(
        private readonly mailRenderer: MailTemplateRenderer,
        @InjectQueue('mail') private readonly mailQueue: Queue
    ) {}

    /**
     * Directly queue a mail job using BullMQ
     */
    async sendMail(options: SendMailOptions): Promise<string> {
        Logger.log(`Sending mail to ${options.to} with subject ${options.subject}`);
        const content = await this.mailRenderer.render(options.template, options.data);

        const jobData: MailJobData = {
            to: options.to,
            subject: options.subject,
            html: content,
            text: content,
        };

        try {
            const job = await this.mailQueue.add('send-mail', jobData, {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000,
                },
            });

            this.logger.log(`Mail job queued. id=${job.id} subject=${options.subject}`);
            return job.id as string;
        } catch (error: any) {
            this.logger.error(`Failed to queue mail job: ${error.message}`);
            throw error;
        }
    }
}
