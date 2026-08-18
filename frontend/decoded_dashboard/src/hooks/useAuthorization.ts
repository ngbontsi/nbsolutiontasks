import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

const adminOnly: UserRole[] = ["ADMIN"];
const businessRoles: UserRole[] = ["RESTAURANT_OWNER", "GUESTHOUSE_OWNER", "MARKETPLACE_VENDOR", "ADMIN"];
const allRoles: UserRole[] = ["ADMIN", "USER", "RESTAURANT_OWNER", "GUESTHOUSE_OWNER", "MARKETPLACE_VENDOR", "SUPERVISOR", "MANAGER"];

export function useAuthorization() {
  const { user } = useAuth();
  const role = (user?.role as UserRole) ?? "USER";

  return {
    role,
    user,
    isAdmin: role === "ADMIN",
    isBusinessOwner: businessRoles.includes(role),
    hasAccess: (...allowed: UserRole[]) => allowed.includes(role),
    canViewAdminPages: adminOnly.includes(role),
    canViewAllRoles: allRoles,
  };
}
