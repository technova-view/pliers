import { ApiProperty } from '@nestjs/swagger';
import { BaseApiResponse } from '../../../common/interfaces/api-response.interface';

export class AuthTokensResponseDto {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	accessToken: string;

	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	refreshToken: string;
}

export class RefreshAccessTokenResponseDto {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	accessToken: string;
}

export class LogoutResponseDto {
	@ApiProperty({ example: true })
	loggedOut: boolean;
}

export type RefreshAccessTokenResponse = BaseApiResponse<RefreshAccessTokenResponseDto>;
export type LogoutResponse = BaseApiResponse<LogoutResponseDto>;
