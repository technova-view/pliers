import { redirect } from "next/navigation";
import { getServerAuthState } from "@/lib/server-cookies";
import { UserType } from "@/lib/enums";
import { ROUTES } from "@/lib/routes";

export default async function DashboardRootPage() {
  const authState = await getServerAuthState();

  if (!authState.isAuthenticated || !authState.user) {
    redirect("/login");
  }

  // Redirect to role-specific dashboard
  if (authState.user.userType === UserType.PLATFORM_ADMIN) {
    redirect(ROUTES.admin());
  } else if (authState.user.userType === UserType.CONTRACTOR) {
    redirect(ROUTES.contractor());
  } else if (authState.user.userType === UserType.HOME_OWNER) {
    redirect(ROUTES.homeOwner());
  }

  // Fallback redirect
  redirect("/login");
}
