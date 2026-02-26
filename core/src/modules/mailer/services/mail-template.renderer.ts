import { Injectable, Logger } from '@nestjs/common';
import { TemplateEngine } from '../types';


@Injectable()
export class MailTemplateRenderer {
    constructor(
        /**
         * All available template engines
         * (Handlebars, MJML, React, etc.)
         */
        private readonly engines: TemplateEngine[],
    ) { }

    async render(
        template: string,
        data: Record<string, any>,
    ): Promise<string> {
        const engine = this.resolveEngine(template);

        if (!engine) {
            throw new Error(
                `No template engine found for template: ${template}`,
            );
        }

        let renderedData = await engine.render(template, data);
        return renderedData;
    }

    private resolveEngine(template: string): TemplateEngine | undefined {
        return this.engines.find((engine) =>
            template.endsWith(engine.extension),
        );
    }
}
