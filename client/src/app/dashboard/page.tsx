import { DashboardClient } from '@/components/dashboard-client';
import { getServerAuthState } from '@/lib/server-cookies';
import { AuthGuard } from '@/components/auth-guard';

export default async function Dashboard() {
	const serverAuthState = await getServerAuthState();
	return (
		<AuthGuard>
			<DashboardClient serverAuthState={serverAuthState} />
		</AuthGuard>
	);
}
