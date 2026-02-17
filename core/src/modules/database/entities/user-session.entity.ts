import { Entity, Column, ManyToOne, JoinColumn, Index, CreateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('sessions')
export class UserSession {
    @ApiProperty({ type: String })
    @Column({ type: 'uuid', primary: true, default: () => 'gen_random_uuid()' })
    id: string;

    @ApiPropertyOptional({ type: String })
    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    @Index({ unique: true })
    refreshTokenHash?: string;

    @ApiProperty({ type: 'string', format: 'date-time' })
    @Column({ type: 'timestamptz', nullable: false })
    @Index()
    expiresAt: Date;

    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @Column({ type: 'timestamptz', nullable: true })
    @Index()
    revokedAt?: Date;
    
    @ApiProperty({ type: 'string', format: 'date-time' })
    @CreateDateColumn()
    createdAt: Date;
    
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    @ApiPropertyOptional({ type: () => User })
    user: User;
}