import { StringValue } from "ms";
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production';
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: StringValue | number;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}