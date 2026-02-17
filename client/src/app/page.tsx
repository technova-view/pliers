import { cookies } from 'next/headers';
import { HomeClient } from '@/components/home-client';
import { COOKIE_NAMES } from '@/lib/server-cookies';

export default async function Home() {
	// Read cookies server-side for SSR auth state
	const cookieStore = await cookies();

	const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
	const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

	// Pass auth state to client component for consistent SSR/client rendering
	const ssrAuth = {
		accessToken: accessToken || null,
		refreshToken: refreshToken || null,
		isAuthenticated: !!accessToken,
	};

	return <HomeClient ssrAuth={ssrAuth} />;
}
