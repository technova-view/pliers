import Cookies from 'js-cookie';

export const COOKIE_NAMES = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
} as const;

export const COOKIE_OPTIONS = {
	ACCESS_TOKEN: {
		expires: 15, // 15 minutes
		sameSite: 'lax' as const,
	},
	REFRESH_TOKEN: {
		expires: 7, // 7 days
		sameSite: 'lax' as const,
	},
} as const;

export const getAccessToken = (): string | undefined => {
	return Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | undefined => {
	return Cookies.get(COOKIE_NAMES.REFRESH_TOKEN);
};

export const setAccessToken = (token: string): void => {
	Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, token, COOKIE_OPTIONS.ACCESS_TOKEN);
};

export const setRefreshToken = (token: string): void => {
	Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, token, COOKIE_OPTIONS.REFRESH_TOKEN);
};

export const removeAccessToken = (): void => {
	Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN);
};

export const removeRefreshToken = (): void => {
	Cookies.remove(COOKIE_NAMES.REFRESH_TOKEN);
};

export const clearAuthTokens = (): void => {
	removeAccessToken();
	removeRefreshToken();
};
