'use client';

import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/lib/api/auth-api-slice';
import { useAuth } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface LogoutButtonProps {
	className?: string;
	children?: ReactNode;
}

export function LogoutButton({ className, children }: LogoutButtonProps) {
	const router = useRouter();
	const { refreshToken } = useAuth();
	const [logout, { isLoading }] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			if (refreshToken) {
				await logout({ refreshToken }).unwrap();
			}
			toast.success('Logged out successfully');
			router.push('/login');
			router.refresh();
		} catch {
			toast.error('Logout failed');
		}
	};

	return (
		<Button
			variant="outline"
			onClick={handleLogout}
			disabled={isLoading}
			className={cn(className)}
		>
			{children || (isLoading ? 'Logging out...' : 'Logout')}
		</Button>
	);
}
