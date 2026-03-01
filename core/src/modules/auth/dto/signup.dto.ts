import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    Matches,
    IsEmail,
    MinLength,
    IsOptional,
    IsEnum,
} from 'class-validator';
import { NAME_REGEX } from '../../../common/regex/name.regex';
import { UserType } from 'src/common/enums/user-type.enum';
import { ServiceCategory } from 'src/common/enums/service-category.enum';
import { Column } from 'typeorm';

export class SignupDto {

    @ApiProperty({ example: UserType.CONTRACTOR })
    @IsEnum(UserType)
    @IsNotEmpty()
    @Column({ type: 'enum', enum: UserType, default: UserType.CONTRACTOR })
    userType: UserType;

    @ApiProperty({ example: 'user@pliers.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: 'John' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_REGEX, {
        message: 'First name must contain only letters, spaces, hyphens, or apostrophes',
    })
    @MaxLength(100)
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_REGEX, {
        message: 'Last name must contain only letters, spaces, hyphens, or apostrophes',
    })
    @MaxLength(100)
    lastName: string;

    // Contractor-specific fields
    @ApiPropertyOptional({ example: '1234567890' })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    phone?: string;

    @ApiPropertyOptional({ example: 'ABC Plumbing Services' })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    businessName?: string;

    @ApiPropertyOptional({ enum: ServiceCategory })
    @IsEnum(ServiceCategory)
    @IsOptional()
    serviceCategory?: ServiceCategory;
}
