export interface SendMailOptions {
    to: string | string[];
    subject: string;
    template: string;
    data: Record<string, any>;
}

export interface MailJobData {
    to: string | string[];
    subject: string;
    html: string;
    text: string;
}

export interface MailResult {
    provider: string;
    messageId?: string;
}

export interface MailProvider {
    readonly name: string;
    send(options: MailJobData): Promise<MailResult>;
}

export interface TemplateEngine {
    readonly name: string;
    readonly extension: string; // '.mjml', '.hbs', etc.
    render(
        template: string,
        data: Record<string, any>,
    ): Promise<string>;
}
