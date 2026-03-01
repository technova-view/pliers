import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('password_reset_otp')
export class PasswordResetOtp {
  @ApiPropertyOptional({ type: () => String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String, example: 'user@example.com' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index()
  email: string;

  @ApiProperty({ type: String, example: '123456' })
  @Column({ type: 'varchar', length: 6, nullable: false })
  otp: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiPropertyOptional({ type: String })
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ApiProperty({
    type: 'boolean',
    default: false,
    description: 'Whether the OTP has been used'
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  used: boolean;

  @ApiProperty({
    type: 'boolean',
    default: false,
    description: 'Whether the OTP has been expired'
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  expired: boolean;

  @ApiProperty({
    type: String,
    example: '2024-11-21T06:22:34.234Z',
    description: 'When the OTP expires'
  })
  @Column({ type: 'timestamptz', nullable: false })
  expiresAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2024-11-21T06:22:34.234Z',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;
}
