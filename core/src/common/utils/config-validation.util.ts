import Joi from 'joi';

/**
 * Joi validation schema for environment configuration.
 * All environment variables must be validated against this schema at application startup.
 */
export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.alternatives().try(
    Joi.number().integer().positive(),
    Joi.string().pattern(/^\d+[smhdw]$/, 'time format (e.g., 1d, 2h, 30m, 10s, 1w)')
  ).required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  MAIL_PROVIDER: Joi.string().valid('smtp').required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().integer().positive().required(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
});

/**
 * Validates the given configuration object against the validation schema.
 * @param config - The configuration object to validate
 * @throws Error if validation fails
 */
export function validateConfig(config: Record<string, unknown>): void {
  const { error } = configValidationSchema.validate(config, { abortEarly: true });
  
  if (error) {
    throw new Error(`Configuration validation failed: ${error.message}`);
  }
}
