import { Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database/database.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from '../common/utils/config-validation.util';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }