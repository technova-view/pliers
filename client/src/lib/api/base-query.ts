import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseApiResponse, RefreshAccessTokenResponse } from '../types';
import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	clearAuthTokens,
} from '../cookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Base query with 401 handling for token refresh and logout
export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = getAccessToken();
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
		credentials: 'include',
	});

	let result = await baseQuery(args, api, extraOptions);

	// If we get a 401 response, try to refresh the token
	if (result.error && result.error.status === 401) {
		const refreshToken = getRefreshToken();

		if (refreshToken) {
			const refreshResult = await baseQuery(
				{
					url: '/auth/refresh',
					method: 'POST',
					body: { refreshToken },
					credentials: 'include',
				},
				api,
				extraOptions
			);

			if (refreshResult.data) {
				const refreshData = refreshResult.data as BaseApiResponse<RefreshAccessTokenResponse>;
				if (refreshData.success && refreshData.data) {
					// Update the access token
					setAccessToken(refreshData.data.accessToken);

					// Retry the original query with the new access token
					result = await baseQuery(args, api, extraOptions);
				}
			} else {
				// Refresh token failed, clear tokens and logout
				clearAuthTokens();
				window.location.href = '/login';
			}
		} else {
			// No refresh token available, clear any remaining tokens and logout
			clearAuthTokens();
			window.location.href = '/login';
		}
	}

	return result;
};
