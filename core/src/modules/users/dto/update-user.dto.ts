import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    Matches,
    MinLength,
    IsOptional,
} from 'class-validator';
import { NAME_REGEX } from '../../../common/regex/name.regex';
import { AtLeastOneField } from 'src/common/decorators/at-least-one-field.decorator';

@AtLeastOneField(['firstName', 'lastName'])
export class UpdateUserDto {
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



