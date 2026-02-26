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
import { Column } from 'typeorm';

export class SignupDto {

    @ApiProperty({ example: 'contracor' })
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

    @ApiPropertyOptional({ example: 'John' })
    @IsString()
    @IsOptional()
    @Matches(NAME_REGEX, {
        message: 'First name must contain only letters, spaces, hyphens, or apostrophes',
    })
    @MaxLength(100)
    firstName?: string;

    @ApiPropertyOptional({ example: 'Doe' })
    @IsString()
    @IsOptional()
    @Matches(NAME_REGEX, {
        message: 'Last name must contain only letters, spaces, hyphens, or apostrophes',
    })
    @MaxLength(100)
    lastName?: string;
}