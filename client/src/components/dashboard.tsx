"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
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
