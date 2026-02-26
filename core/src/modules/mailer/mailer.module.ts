import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvironmentConfig } from "src/common/interfaces/config.interface";
import { MailTemplateRenderer } from "./services/mail-template.renderer";
import { MailerService } from "./services/mailer.service";
import { MjmlTemplateEngine } from "./engines/mjml.engine";
import { MailerManager } from "./services/mail-manager.service";
import { MailProcessor } from "./processors/processor";
import { SmtpProvider } from "./providers/smtp.provider";
import { MailProvider } from "./types";

@Module({
    imports: [        
        // BullMQ for mail queue processing
        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService<EnvironmentConfig>) => ({
                connection: config.get("REDIS_URL"), // change to REDIS_URL later
            }),
        }),
        BullModule.registerQueue({
            name: 'mail',
        }),
    ],
    providers: [
        ConfigService,
        MailerService,
        MailerManager,
        MailTemplateRenderer,
        MailProcessor,
        // Engines
        MjmlTemplateEngine,
        // Providers
        SmtpProvider,

        {
            provide: MailerManager,
            useFactory: (
                config: ConfigService<EnvironmentConfig>,
                smtp: SmtpProvider,
            ) => {
                const providerName = config.get("MAIL_PROVIDER"); // change to MAIL_PROVIDER later
                let selectedProvider: MailProvider;

                if (providerName === 'smtp') {
                    selectedProvider = smtp;
                } else {
                    throw new Error(`Unsupported mail provider: ${providerName}`);
                }

                return new MailerManager(selectedProvider);
            },
            inject: [ConfigService, SmtpProvider],
        },

        {
            provide: MailTemplateRenderer,
            useFactory: (
                mjml: MjmlTemplateEngine,
            ) => {
                return new MailTemplateRenderer([mjml]);
            },
            inject: [MjmlTemplateEngine],
        },
    ],
    exports: [MailerService],
})
export class MailerModule { }
