import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'User email address'
  })
  @IsEmail()
  email: string;
}
