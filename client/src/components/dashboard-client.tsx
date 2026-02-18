'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardClient() {
    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600">You are logged in!</p>
                </CardContent>
            </Card>
        </div>
    );
}
