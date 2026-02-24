import { getServerAuthState } from '@/lib/server-cookies';
import { AuthorizationGuard } from '@/components/authorization-guard';
import { DashboardLayoutClient } from './dashboard-layout-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverAuthState = await getServerAuthState();

  return (
    <AuthorizationGuard serverAuthState={serverAuthState}>
      <DashboardLayoutClient serverAuthState={serverAuthState}>
        {children}
      </DashboardLayoutClient>
    </AuthorizationGuard>
  );
}
