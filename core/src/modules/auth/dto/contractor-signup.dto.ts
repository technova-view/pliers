import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    Matches,
    IsEmail,
    MinLength,
    IsEnum,
} from 'class-validator';
import { NAME_REGEX } from '../../../common/regex/name.regex';
import { UserType } from 'src/common/enums/user-type.enum';
import { ServiceCategory } from '../../../common/enums/service-category.enum';

export class ContractorSignupDto {

    @ApiProperty({ example: UserType.CONTRACTOR })
    @IsEnum(UserType)
    @IsNotEmpty()
    userType: UserType;

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

    @ApiProperty({ example: '1234567890' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    phone: string;

    @ApiProperty({ example: 'ABC Plumbing Services' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    businessName: string;

    @ApiProperty({ example: 'user@pliers.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ enum: ServiceCategory, example: ServiceCategory.PLUMBING })
    @IsEnum(ServiceCategory)
    @IsNotEmpty()
    serviceCategory: ServiceCategory;
}
