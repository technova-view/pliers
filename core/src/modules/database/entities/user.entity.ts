import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('users')
export class User {
  @ApiPropertyOptional({ type: () => String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({ type: String, example: 'John' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  firstName?: string;

  @ApiPropertyOptional({ type: String, example: 'Doe' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName?: string;


  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index()
  email: string;

  @ApiProperty({ type: String, example: '$2b$10$...' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordHash: string;

  @ApiProperty({ type: Boolean, default: false })
  @Column({ type: 'boolean', nullable: false, default: false })
  @Index()
  accountVerified: boolean;

  
  // add provider: email | google 
  @Column({ type: 'varchar', length: 255, nullable: false, default: 'email' })
  @Index()
  provider: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2022-11-21T06:22:34.234Z',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;
}