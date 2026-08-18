import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Activity,
  Store,
  BarChart3,
  History,
  LogOut,
  ShoppingBag,
  Hotel,
  UtensilsCrossed,
  ExternalLink,
  Database,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const allNavItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard, roles: ["ADMIN", "USER", "RESTAURANT_OWNER", "GUESTHOUSE_OWNER", "MARKETPLACE_VENDOR", "SUPERVISOR", "MANAGER"] },
  { path: "/app/users", label: "Users", icon: Users, roles: ["ADMIN"] },
  { path: "/app/monitoring", label: "Monitoring", icon: Activity, roles: ["ADMIN"] },
  { path: "/app/business", label: "Business", icon: Store, roles: ["ADMIN", "RESTAURANT_OWNER", "GUESTHOUSE_OWNER", "MARKETPLACE_VENDOR", "MANAGER"] },
  { path: "/app/analytics", label: "Analytics", icon: BarChart3, roles: ["ADMIN", "USER", "RESTAURANT_OWNER", "GUESTHOUSE_OWNER", "MARKETPLACE_VENDOR", "SUPERVISOR", "MANAGER"] },
  { path: "/app/audit", label: "Audit Trail", icon: History, roles: ["ADMIN"] },
  { path: "/app/data", label: "Data", icon: Database, roles: ["ADMIN", "USER", "RESTAURANT_OWNER", "GUESTHOUSE_OWNER", "MARKETPLACE_VENDOR", "SUPERVISOR", "MANAGER"] },
];

const externalApps = [
  { href: "https://ngbontsi.github.io/decodedsolutions/butcher-shop/", label: "Butcher Shop", icon: ShoppingBag },
  { href: "https://ngbontsi.github.io/decodedsolutions/guesthouse-client/", label: "Guesthouse", icon: Hotel },
  { href: "https://ngbontsi.github.io/zozos-kitchen/", label: "Zozo's Kitchen", icon: UtensilsCrossed },
  { href: "https://ngbontsi.github.io/vuyolwethu/", label: "Vuyolwethu", icon: ExternalLink },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const userRole = (user?.role ?? "USER") as string;

  const navItems = allNavItems.filter(
    (item) => item.roles.includes(userRole)
  );

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo-mark">DS</span>
          <span className="logo-text">Decoded Solutions</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/app"}
              className={({ isActive }) =>
                `nav-item${isActive ? " active" : ""}`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="sidebar-divider" />
          <span className="sidebar-section-label">Client Apps</span>

          {externalApps.map((app) => (
            <a
              key={app.href}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item"
            >
              <app.icon size={20} />
              <span>{app.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          {user && (
            <div className="sidebar-user">
              <span className="user-name">{user.firstName} {user.lastName}</span>
              <span className="user-role">{user.role.replace(/_/g, " ")}</span>
            </div>
          )}
          <button className="nav-item logout" onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
