import { Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database/database.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        DATABASE_URL: Joi.string().required(),
      }),
      validationOptions: { abortEarly: true },
    }),
    DatabaseModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }