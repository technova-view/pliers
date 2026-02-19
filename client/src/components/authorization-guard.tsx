'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, AuthStateProps } from '@/lib/hooks';
import { UserType } from '@/lib/enums';

interface AuthorizationGuardProps {
	children: React.ReactNode;
	serverAuthState?: AuthStateProps['serverAuthState'];
	/**
	 * Required user types for this route.
	 * If not provided, the route is accessible to all authenticated users.
	 */
	requiredUserTypes?: UserType[];
	/**
	 * Fallback URL for unauthorized access.
	 * If user is authenticated but doesn't have required role, redirect here.
	 */
	fallbackUrl?: string;
}

// Define which routes are admin-only, contractor-only, or common
export const ROUTE_CONFIG: Record<string, {
	requiredUserTypes: UserType[];
	fallbackUrl?: string;
}> = {
	// Admin-only routes
	'/dashboard/admin': {
		requiredUserTypes: [UserType.PLATFORM_ADMIN],
		fallbackUrl: '/dashboard/contractor',
	},
	// Contractor-only routes
	'/dashboard/contractor': {
		requiredUserTypes: [UserType.CONTRACTOR],
		fallbackUrl: '/dashboard/admin',
	},
	// Common routes (accessible to both admin and contractor) - at /dashboard/xxxx
	'/dashboard/profile': {
		requiredUserTypes: [UserType.PLATFORM_ADMIN, UserType.CONTRACTOR],
		fallbackUrl: undefined,
	},
};

export function AuthorizationGuard({
	children,
	serverAuthState,
	requiredUserTypes,
	fallbackUrl,
}: AuthorizationGuardProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated, user: clientUser } = useAuth(serverAuthState);
	const [isLoading, setIsLoading] = useState(true);

	// Get the base path to check route config
	const getBasePath = (path: string): string => {
		// Handle paths like /dashboard/admin, /dashboard/contractor, /dashboard/profile
		const segments = path.split('/').filter(Boolean);
		if (segments[0] === 'dashboard' && segments[1]) {
			// Return /dashboard/{scope} or /dashboard/{common}
			// For admin/contractor scoped routes, return the full scope
			// For common routes like /dashboard/profile, return the full path
			const scope = segments[1];
			if (scope === 'admin' || scope === 'contractor') {
				return `/dashboard/${scope}`;
			}
			// For other routes like /dashboard/profile, return the full path
			return `/dashboard/${scope}`;
		}
		return path;
	};

	useEffect(() => {
		const checkAuthorization = async () => {
			// Step 1: Check if user is authenticated
			if (!isAuthenticated) {
				router.push('/login');
				return;
			}

			// Step 2: Get user data (prefer server auth state for SSR)
			let userType: UserType | undefined;
			
			if (serverAuthState?.user?.userType) {
				userType = serverAuthState.user.userType as UserType;
			} else if (clientUser?.userType) {
				userType = clientUser.userType;
			}

			// If we don't have user type yet, we need to wait or redirect
			if (!userType) {
				// Try to fetch user data client-side
				try {
					const response = await fetch('/api/users/me', {
						credentials: 'include',
					});
					if (response.ok) {
						const data = await response.json();
						if (data.success && data.data) {
							userType = data.data.userType as UserType;
						}
					}
				} catch (error) {
					console.error('Failed to fetch user data:', error);
				}
			}

			// If still no user type, redirect to login
			if (!userType) {
				router.push('/login');
				return;
			}

			// Step 3: Check route-specific authorization
			const basePath = getBasePath(pathname);
			const routeConfig = ROUTE_CONFIG[basePath as keyof typeof ROUTE_CONFIG];

			if (routeConfig) {
				const { requiredUserTypes: allowedTypes, fallbackUrl: routeFallback } = routeConfig;
				
				// Check if user's role is allowed
				if (!allowedTypes.includes(userType)) {
					// User is authenticated but not authorized for this route
					const redirectUrl = routeFallback || (userType === UserType.PLATFORM_ADMIN ? '/dashboard/admin' : '/dashboard/contractor');
					router.push(redirectUrl);
					return;
				}
			} else if (requiredUserTypes && requiredUserTypes.length > 0) {
				// Check explicit requiredUserTypes prop
				if (!requiredUserTypes.includes(userType)) {
					const redirectUrl = fallbackUrl || (userType === UserType.PLATFORM_ADMIN ? '/dashboard/admin' : '/dashboard/contractor');
					router.push(redirectUrl);
					return;
				}
			}

			// User is authenticated and authorized
			setIsLoading(false);
		};

		checkAuthorization();
	}, [isAuthenticated, clientUser, serverAuthState, pathname, router, requiredUserTypes, fallbackUrl]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return <>{children}</>;
}
