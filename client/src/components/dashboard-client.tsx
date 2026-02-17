'use client';

import Link from 'next/link';
import { useAuth, AuthStateProps } from '@/lib/hooks';
import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardClientProps {
    serverAuthState?: AuthStateProps['serverAuthState'];
}

export function DashboardClient({ serverAuthState }: DashboardClientProps) {
    const { isAuthenticated } = useAuth(serverAuthState);
    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-600">You are logged in!</p>
                        <LogoutButton />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
