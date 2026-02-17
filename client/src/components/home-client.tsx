'use client';

import Link from 'next/link';
import { useAuth, AuthStateProps } from '@/lib/hooks';
import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HomeClientProps {
	ssrAuth?: AuthStateProps['ssrAuth'];
}

export function HomeClient({ ssrAuth }: HomeClientProps) {
	// Pass SSR auth state to useAuth hook for consistent SSR/client rendering
	const { isAuthenticated } = useAuth(ssrAuth);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Welcome to Pliers</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{isAuthenticated ? (
						<div className="flex flex-col gap-4">
							<p className="text-gray-600">You are logged in!</p>
							<LogoutButton />
						</div>
					) : (
						<div className="flex flex-col gap-4">
							<p className="text-gray-600">Please sign in to continue.</p>
							<div className="flex gap-4">
								<Link href="/login">
									<Button>Sign In</Button>
								</Link>
								<Link href="/signup">
									<Button variant="outline">Sign Up</Button>
								</Link>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
