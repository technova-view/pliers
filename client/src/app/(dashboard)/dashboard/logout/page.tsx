"use client";

import { LogoutButton } from "@/components/logout-button";

export default function LogoutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Are you sure you want to logout?</h1>
        <LogoutButton className="px-6 py-2">
          Confirm Logout
        </LogoutButton>
      </div>
    </div>
  );
}
