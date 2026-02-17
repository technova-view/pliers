import { getServerAuthState } from '@/lib/server-cookies';
import { AuthGuard } from '@/components/auth-guard';
import { AdminClient } from '@/components/admin-client';

export default async function Admin() {
	const serverAuthState = await getServerAuthState();
	return (
		<AuthGuard>
			<AdminClient serverAuthState={serverAuthState} />
		</AuthGuard>
	);
}
