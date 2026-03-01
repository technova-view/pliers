import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../database/entities/user.entity';

export class PaginatedUsersResponseDto {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  limit: number;

  @ApiProperty({ type: Number })
  totalPages: number;
}
