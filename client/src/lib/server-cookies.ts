import { cookies } from 'next/headers';
import { UserType } from './enums';

export const COOKIE_NAMES = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
} as const;

export interface ServerUser {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
	userType: UserType;
	createdAt: string;
	updatedAt: string;
}

export interface ServerAuthState {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	user: ServerUser | null;
}

/**
 * Server-side cookie utility for Next.js App Router.
 * Use these functions in Server Components and Server Actions.
 */
export const getServerAuthState = async (): Promise<ServerAuthState> => {
	const cookieStore = await cookies();

	const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
	const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

	// If not authenticated, return without user
	if (!accessToken) {
		return {
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,
			user: null,
		};
	}

	// Try to fetch user data on the server
	let user: ServerUser | null = null;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/me`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		
		if (response.ok) {
			const data = await response.json();
			if (data.success && data.data) {
				user = data.data;
			}
		}
	} catch (error) {
		// If we can't fetch user data, continue without it
		console.error('Failed to fetch user data on server:', error);
	}

	return {
		accessToken: accessToken || null,
		refreshToken: refreshToken || null,
		isAuthenticated: !!accessToken,
		user,
	};
};

/**
 * Get auth state for SSR without async - use in page props
 */
export const getAuthState = (): Promise<ServerAuthState> => {
	// This is a synchronous version that works in server components
	// when called within the context of cookies()
	return getServerAuthState();
};
