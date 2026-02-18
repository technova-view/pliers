import { UserType } from "./enums";

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

export interface GoogleAuthRequest {
	accessToken: string;
}



export interface BaseApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
	error?: string | null;
}

export interface BaseApiError {
	data?: {
        success: false;
		message: string;
		error: string;
	};
	status?: number;
}

export interface AuthTokensResponse {
	accessToken: string;
	refreshToken: string;
	userType: UserType;
}

export interface RefreshAccessTokenResponse {
	accessToken: string;
	userType: UserType;
}

export interface LogoutResponse {
	loggedOut: boolean;
}


export interface UserResponse {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
	createdAt: string;
	updatedAt: string;
}
