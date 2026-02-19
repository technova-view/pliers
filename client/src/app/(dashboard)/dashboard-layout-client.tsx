'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useAuth, AuthStateProps } from '@/lib/hooks';
import { LogoutButton } from '@/components/logout-button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useGetUserQuery } from '@/lib/api/users-api-slice';
import { UserType } from '@/lib/enums';

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  serverAuthState?: AuthStateProps['serverAuthState'];
}

type NavigationItem = {
  name: string;
  href: string;
  icon: any;
  scope: UserType[];
};

/**
 * ✅ Single navigation source of truth
 */
const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    scope: [
      UserType.CONTRACTOR,
    ],
  },
  {
    name: 'Admin',
    href: '/admin',
    icon: Users,
    scope: [UserType.PLATFORM_ADMIN],
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    scope: [
      UserType.PLATFORM_ADMIN,
      UserType.CONTRACTOR,
    ],
  },
];

export function DashboardLayoutClient({
  children,
  serverAuthState,
}: DashboardLayoutClientProps) {
  const serverUser = serverAuthState?.user;
  const { data: userData } = useGetUserQuery();

  // Prefer fresh API data
  const user = userData?.data || serverUser;
  const userType = user?.userType;

  const { isAuthenticated } = useAuth(serverAuthState);
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * ✅ Filter navigation based on scope
   */
  const navigation = navigationItems.filter((item) =>
    userType ? item.scope.includes(userType) : false
  );

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 min-h-svh',
          mobileOpen
            ? 'w-64 translate-x-0'
            : '-translate-x-full lg:translate-x-0',
          collapsed ? 'lg:w-16' : 'lg:w-64',
          'h-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/" className="font-bold text-lg">
              Pliers
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded-md hover:bg-accent"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t p-4">
          {!collapsed && (
            <div className="mb-3">
              <p className="text-sm font-medium truncate">
                {user?.firstName || 'User'} {user?.lastName || ''}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
              {userType === UserType.PLATFORM_ADMIN && (
                <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                  Admin
                </span>
              )}
            </div>
          )}

          <LogoutButton
            className={cn(
              'w-full justify-start',
              collapsed && 'lg:justify-center px-0'
            )}
          >
            {collapsed ? (
              <LogOut className="h-4 w-4" />
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </LogoutButton>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex h-14 items-center justify-between border-b px-4 bg-background">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold">Pliers</span>
          <div className="w-9" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}