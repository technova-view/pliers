'use client';

import { useAuth, AuthStateProps } from '@/lib/hooks';
import { LogoutButton } from '@/components/logout-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminClientProps {
    serverAuthState?: AuthStateProps['serverAuthState'];
}

export function AdminClient({ serverAuthState }: AdminClientProps) {
    const { isAuthenticated } = useAuth(serverAuthState);
    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-600">Welcome to the Admin Panel!</p>
                        <LogoutButton />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
