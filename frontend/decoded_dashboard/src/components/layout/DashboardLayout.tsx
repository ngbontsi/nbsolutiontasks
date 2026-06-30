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

const navItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/users", label: "Users", icon: Users },
  { path: "/app/monitoring", label: "Monitoring", icon: Activity },
  { path: "/app/business", label: "Business", icon: Store },
  { path: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/app/audit", label: "Audit Trail", icon: History },
  { path: "/app/data", label: "Data", icon: Database },
];

const externalApps = [
  { href: "https://ngbontsi.github.io/decodedsolutions/butcher-shop/", label: "Butcher Shop", icon: ShoppingBag },
  { href: "https://ngbontsi.github.io/decodedsolutions/guesthouse-client/", label: "Guesthouse", icon: Hotel },
  { href: "https://ngbontsi.github.io/zozos-kitchen/", label: "Zozo's Kitchen", icon: UtensilsCrossed },
  { href: "https://ngbontsi.github.io/vuyolwethu/", label: "Vuyolwethu", icon: ExternalLink },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();

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
              <span className="user-role">{user.role}</span>
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
