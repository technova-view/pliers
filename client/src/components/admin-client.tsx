'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AdminClient() {
    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600">Welcome to the Admin Panel!</p>
                </CardContent>
            </Card>
        </div>
    );
}
