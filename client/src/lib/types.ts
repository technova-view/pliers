export interface BaseApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
	error?: string | null;
}

export interface AuthTokensResponse {
	accessToken: string;
	refreshToken: string;
}

export interface RefreshAccessTokenResponse {
	accessToken: string;
}

export interface LogoutResponse {
	loggedOut: boolean;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignupRequest {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface User {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
	createdAt: string;
	updatedAt: string;
}

export interface ErrorFormat {
	data?: {
        success: false;
		message: string;
		error: string;
	};
	status?: number;
}