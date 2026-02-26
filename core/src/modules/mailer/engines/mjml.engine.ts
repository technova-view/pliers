import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import mjml2html from 'mjml';
import { TemplateEngine } from '../types';

@Injectable()
export class MjmlTemplateEngine implements TemplateEngine {
    readonly name = 'mjml';
    readonly extension = '.mjml';

    async render(template: string, data: Record<string, any>): Promise<string> {
        // Load MJML template
        const filePath = `templates/${template}`;
        if (!fs.existsSync(filePath)) {
            throw new Error(`MJML template not found: ${filePath}`);
        }

        const fileContent = await fs.promises.readFile(filePath, 'utf8');

        // Compile Handlebars inside MJML (for dynamic variables)
        const compiled = Handlebars.compile(fileContent)(data);

        // Convert MJML to email-safe HTML
        const { html, errors } = mjml2html(compiled, { validationLevel: 'strict' });

        if (errors?.length) {
            throw new Error(`MJML render error: ${errors[0].message}`);
        }

        return html;
    }
}
