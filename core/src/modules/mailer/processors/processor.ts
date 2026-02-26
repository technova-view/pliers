import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailJobData } from '../types';
import { MailerManager } from '../services/mail-manager.service';


@Injectable()
@Processor('mail')
export class MailProcessor extends WorkerHost {
  constructor(
    private readonly manager: MailerManager,
  ) {
    super();
  }

  private readonly logger = new Logger(MailProcessor.name);

  async process(job: Job<MailJobData>): Promise<any> {
    this.logger.debug(`Processing mail job ${job.id} with name ${job.name}`);

    if (job.name === 'send-mail') {
      try {
        const result = await this.manager.send(job.data);
        this.logger.debug(`Mail job ${job.id} processed successfully`);
        return result;
      } catch (error) {
        this.logger.error(`Mail job ${job.id} failed: ${error.message}`);
        throw error;
      }
    }

    this.logger.warn(`Unknown job name: ${job.name}`);
  }
}
