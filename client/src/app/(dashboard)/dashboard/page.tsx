import { redirect } from 'next/navigation';
import { getServerAuthState } from '@/lib/server-cookies';
import { UserType } from '@/lib/enums';

export default async function DashboardRootPage() {
  const authState = await getServerAuthState();

  if (!authState.isAuthenticated || !authState.user) {
    redirect('/login');
  }

  // Redirect to role-specific dashboard
  if (authState.user.userType === UserType.PLATFORM_ADMIN) {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/contractor');
  }
}
