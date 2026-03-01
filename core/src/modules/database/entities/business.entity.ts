import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ServiceCategory } from '../../../common/enums/service-category.enum';

@Entity('businesses')
export class Business {
    @ApiPropertyOptional({ type: () => String })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiPropertyOptional({ type: String, example: 'ABC Plumbing Services' })
    @Column({ type: 'varchar', length: 255, nullable: true })
    businessName?: string;

    @ApiPropertyOptional({ type: String, example: '+1234567890' })
    @Column({ type: 'varchar', length: 50, nullable: true })
    phone?: string;

    @ApiPropertyOptional({ enum: ServiceCategory })
    @Column({
        type: 'enum',
        enum: ServiceCategory,
        nullable: true,
    })
    serviceCategory?: ServiceCategory;

    @ApiPropertyOptional({ type: () => String })
    @Column({ type: 'uuid', nullable: true })
    userId: string;

    @OneToOne(() => User, (user) => user.business)
    @JoinColumn({ name: 'userId' })
    user: User;
}
