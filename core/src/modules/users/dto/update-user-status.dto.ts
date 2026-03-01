import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { UserStatus } from '../../../common/enums/user-status.enum';

export class UpdateUserStatusDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: UserStatus })
  @IsNotEmpty()
  @IsEnum(UserStatus)
  status: UserStatus;
}
