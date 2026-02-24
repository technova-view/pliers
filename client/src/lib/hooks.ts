import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { getAccessToken, getRefreshToken } from './cookies';
import { UserResponse } from './types';
import { useGetUserQuery } from './api/users-api-slice';

export interface AuthState {
	accessToken: string | undefined;
	refreshToken: string | undefined;
	isAuthenticated: boolean;
	user: UserResponse | null;
}

export interface AuthStateProps {
	serverAuthState?: {
		accessToken: string | null;
		refreshToken: string | null;
		isAuthenticated: boolean;
		user: UserResponse | null;
	};
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Unified auth hook that provides user data from a single source.
 * - On server: uses serverAuthState from SSR
 * - On client: fetches user data via useGetUserQuery when needed
 * 
 * @param serverAuthState - Optional SSR auth state from getServerAuthState()
 */
export const useAuth = (serverAuthState?: AuthStateProps['serverAuthState']) => {
	// Use client-side cookies - this works after hydration
	const clientAccessToken = getAccessToken();
	const clientRefreshToken = getRefreshToken();

	// During SSR/hydration, use the SSR auth state if provided
	const isClientSide = typeof window !== 'undefined';

	if (!isClientSide && serverAuthState) {
		// Server-side rendering: use SSR auth state
		return {
			accessToken: serverAuthState.accessToken || undefined,
			refreshToken: serverAuthState.refreshToken || undefined,
			isAuthenticated: serverAuthState.isAuthenticated,
			user: serverAuthState.user,
		};
	}

	// Client-side: use client cookies
	const isAuthenticated = !!clientAccessToken;

	// Fetch user data on client side when authenticated
	const { data: userData, isLoading: isLoadingUser } = useGetUserQuery(undefined, {
		skip: !isAuthenticated,
	});

	// Get user from API response
	const user = userData?.data || null;

	return {
		accessToken: clientAccessToken,
		refreshToken: clientRefreshToken,
		isAuthenticated,
		user,
		isLoadingUser,
	};
};

/**
 * Simple hook to get just the user data.
 * Use this when you only need the user and don't need token info.
 * Internally uses useAuth.
 */
export const useUser = (serverAuthState?: AuthStateProps['serverAuthState']) => {
	const { user, isLoadingUser, isAuthenticated } = useAuth(serverAuthState);
	return { user, isLoadingUser, isAuthenticated };
};
