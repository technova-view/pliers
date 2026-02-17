'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks';

interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check auth status
		if (!isAuthenticated) {
			router.push('/login');
		} else {
			setIsLoading(false);
		}
	}, [isAuthenticated, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return <>{children}</>;
}
