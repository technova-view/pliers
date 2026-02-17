import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { getAccessToken, getRefreshToken } from './cookies';

export interface AuthState {
	accessToken: string | undefined;
	refreshToken: string | undefined;
	isAuthenticated: boolean;
}

export interface AuthStateProps {
	serverAuthState?: {
		accessToken: string | null;
		refreshToken: string | null;
		isAuthenticated: boolean;
	};
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Client-side auth hook that can optionally accept SSR auth state.
 * When SSR auth state is provided (from server component), it takes precedence
 * during initial render to ensure SSR and client render the same UI.
 * After hydration, falls back to client-side cookie checking.
 */
export const useAuth = (serverAuthState?: AuthStateProps['serverAuthState']) => {
	// Use client-side cookies - this works after hydration
	const clientAccessToken = getAccessToken();
	const clientRefreshToken = getRefreshToken();

	// During SSR/hydration, use the SSR auth state if provided
	// After client hydration, use client-side values for consistency
	const isClientSide = typeof window !== 'undefined';

	if (!isClientSide && serverAuthState) {
		// Server-side rendering: use SSR auth state
		return {
			accessToken: serverAuthState.accessToken || undefined,
			refreshToken: serverAuthState.refreshToken || undefined,
			isAuthenticated: serverAuthState.isAuthenticated,
		};
	}

	// Client-side: use client cookies
	const isAuthenticated = !!clientAccessToken;

	return {
		accessToken: clientAccessToken,
		refreshToken: clientRefreshToken,
		isAuthenticated,
	};
};
