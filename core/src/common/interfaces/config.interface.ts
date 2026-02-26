import { StringValue } from "ms";
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production';
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: StringValue | number;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  MAIL_PROVIDER: 'smtp';
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
}