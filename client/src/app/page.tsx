import { HomeClient } from '@/components/home-client';
import { getServerAuthState } from '@/lib/server-cookies';

export default async function Home() {
	const serverAuthState = await getServerAuthState();
	return <HomeClient serverAuthState={serverAuthState} />;
}
