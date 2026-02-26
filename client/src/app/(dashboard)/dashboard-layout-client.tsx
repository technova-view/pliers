"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useAuth, AuthStateProps } from "@/lib/hooks";
import { LogoutButton } from "@/components/logout-button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserType } from "@/lib/enums";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  serverAuthState?: AuthStateProps["serverAuthState"];
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
    name: "Dashboard",
    href: ROUTES.contractor(),
    icon: LayoutDashboard,
    scope: [UserType.CONTRACTOR],
  },
  {
    name: "Admin",
    href: ROUTES.admin(),
    icon: Users,
    scope: [UserType.PLATFORM_ADMIN],
  },
  {
    name: "Profile",
    href: ROUTES.profile(),
    icon: User,
    scope: [UserType.PLATFORM_ADMIN, UserType.CONTRACTOR],
  },
];

export function DashboardLayoutClient({
  children,
  serverAuthState,
}: DashboardLayoutClientProps) {
  const { user, isAuthenticated } = useAuth(serverAuthState);
  const userType = user?.userType;

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * ✅ Filter navigation based on scope
   */
  const navigation = navigationItems.filter((item) =>
    userType ? item.scope.includes(userType) : false,
  );

  if (!isAuthenticated) return null;

  return (
    <div className="bg-background flex min-h-screen">
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
          "bg-card fixed inset-y-0 left-0 z-50 flex min-h-svh flex-col border-r transition-all duration-300 lg:static",
          mobileOpen
            ? "w-64 translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-16" : "lg:w-64",
          "h-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href={ROUTES.home()} className="text-lg font-bold">
              Pliers
            </Link>
          )}

          <Button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-accent hidden rounded-md p-1 lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>

          <Button
            onClick={() => setMobileOpen(false)}
            className="hover:bg-accent rounded-md p-1 lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard/contractor" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
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
              <p className="truncate text-sm font-medium">
                {user?.firstName || "User"} {user?.lastName || ""}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {user?.email}
              </p>
              {userType === UserType.PLATFORM_ADMIN && (
                <span className="bg-primary/10 text-primary mt-1 inline-block rounded px-2 py-0.5 text-xs">
                  Admin
                </span>
              )}
            </div>
          )}

          <LogoutButton
            className={cn(
              "w-full justify-start",
              collapsed && "px-0 lg:justify-center",
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
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="bg-background flex h-14 items-center justify-between border-b px-4 lg:hidden">
          <Button
            onClick={() => setMobileOpen(true)}
            className="hover:bg-accent -ml-2 rounded-md p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold">Pliers</span>
          <div className="w-9" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
