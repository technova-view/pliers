import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { EnvironmentConfig } from '../../shared/interfaces/config.interface';
import { UserSession } from './entities/user-session.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentConfig>) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [
          User,
          UserSession,
        ],
        synchronize: config.get('NODE_ENV') === 'development',
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}