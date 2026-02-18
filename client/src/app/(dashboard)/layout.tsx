import { getServerAuthState } from '@/lib/server-cookies';
import { AuthGuard } from '@/components/auth-guard';
import { DashboardLayoutClient } from './dashboard-layout-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverAuthState = await getServerAuthState();

  return (
    <AuthGuard>
      <DashboardLayoutClient serverAuthState={serverAuthState}>
        {children}
      </DashboardLayoutClient>
    </AuthGuard>
  );
}
