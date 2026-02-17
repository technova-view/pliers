import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/common/enums/user-type.enum';

export class AuthTokensResponseDto {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	accessToken: string;

	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	refreshToken: string;

	@ApiProperty({ example: UserType.CONTRACTOR })
	userType: UserType;
}

export class RefreshAccessTokenResponseDto {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	accessToken: string;

	@ApiProperty({ example: UserType.CONTRACTOR })
	userType: UserType;
}

export class LogoutResponseDto {
	@ApiProperty({ example: true })
	loggedOut: boolean;
}

