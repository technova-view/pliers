import { cookies } from 'next/headers';

export const COOKIE_NAMES = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
} as const;

/**
 * Server-side cookie utility for Next.js App Router.
 * Use these functions in Server Components and Server Actions.
 */
export const getServerAuthState = async () => {
	const cookieStore = await cookies();

	const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
	const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

	return {
		accessToken: accessToken || null,
		refreshToken: refreshToken || null,
		isAuthenticated: !!accessToken,
	};
};

/**
 * Get auth state for SSR without async - use in page props
 */
export const getAuthState = () => {
	// This is a synchronous version that works in server components
	// when called within the context of cookies()
	return cookies().then((cookieStore) => {
		const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
		const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

		return {
			accessToken: accessToken || null,
			refreshToken: refreshToken || null,
			isAuthenticated: !!accessToken,
		};
	});
};

export interface ServerAuthState {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
}
