import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleAuthDto {
  @ApiProperty({
    description: 'Google OAuth access token obtained from Google sign-in',
    example: 'ya29.a0Aa4xrX...',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
