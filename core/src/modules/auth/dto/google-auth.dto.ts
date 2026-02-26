import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from 'src/common/enums/user-type.enum';

export class GoogleAuthDto {
  @ApiProperty({
    description: 'Google OAuth access token obtained from Google sign-in',
    example: 'ya29.a0Aa4xrX...',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    description: 'Type of user (CONTRACTOR or HOME_OWNER or PLATFORM_ADMIN)',
    enum: UserType,
    example: UserType.CONTRACTOR,
  })
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;
}
