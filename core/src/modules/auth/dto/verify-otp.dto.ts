import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
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
  @Length(6, 6)
  otp: string;
}
