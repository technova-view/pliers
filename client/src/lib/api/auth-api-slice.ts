import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseApiResponse,
	AuthTokensResponse,
	RefreshAccessTokenResponse,
	LogoutResponse,
	LoginRequest,
	SignupRequest,
	RefreshTokenRequest,
	GoogleAuthRequest,
} from '../types';
import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
	clearAuthTokens,
} from '../cookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = getAccessToken();
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
		credentials: 'include',
	}),
	endpoints: (builder) => ({
		login: builder.mutation<BaseApiResponse<AuthTokensResponse>, LoginRequest>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
				credentials: 'include',
			}),
			transformResponse: (response: BaseApiResponse<AuthTokensResponse>) => {
				if (response.success && response.data) {
					setAccessToken(response.data.accessToken);
					setRefreshToken(response.data.refreshToken);
				}
				return response;
			},
		}),

		signup: builder.mutation<BaseApiResponse<{ userId: string }>, SignupRequest>({
			query: (userData) => ({
				url: '/auth/signup',
				method: 'POST',
				body: userData,
				credentials: 'include',
			}),
		}),

		googleAuth: builder.mutation<BaseApiResponse<AuthTokensResponse>, GoogleAuthRequest>({
			query: (data) => ({
				url: '/auth/google',
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
			transformResponse: (response: BaseApiResponse<AuthTokensResponse>) => {
				if (response.success && response.data) {
					setAccessToken(response.data.accessToken);
					setRefreshToken(response.data.refreshToken);
				}
				return response;
			},
		}),

		refreshAccessToken: builder.mutation<
			BaseApiResponse<RefreshAccessTokenResponse>,
			RefreshTokenRequest
		>({
			query: (body) => ({
				url: '/auth/refresh',
				method: 'POST',
				body,
				credentials: 'include',
			}),
			transformResponse: (response: BaseApiResponse<RefreshAccessTokenResponse>) => {
				if (response.success && response.data) {
					setAccessToken(response.data.accessToken);
				}
				return response;
			},
		}),

		logout: builder.mutation<BaseApiResponse<LogoutResponse>, RefreshTokenRequest>({
			query: (body) => ({
				url: '/auth/logout',
				method: 'POST',
				body,
				credentials: 'include',
			}),
			transformResponse: (response: BaseApiResponse<LogoutResponse>) => {
				clearAuthTokens();
				return response;
			},
		}),

		// Helper to get current tokens for refresh
		getTokens: builder.query<{ accessToken: string | undefined; refreshToken: string | undefined }, void>({
			queryFn: () => {
				return {
					data: {
						accessToken: getAccessToken(),
						refreshToken: getRefreshToken(),
					},
				};
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useRefreshAccessTokenMutation,
	useLogoutMutation,
	useGetTokensQuery,
	useGoogleAuthMutation,
} = authApi;
