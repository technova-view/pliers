import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'User email address'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: '6-digit OTP'
  })
  @IsString()
  otp: string;

  @ApiProperty({
    type: String,
    example: 'newPassword123',
    description: 'New password'
  })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
