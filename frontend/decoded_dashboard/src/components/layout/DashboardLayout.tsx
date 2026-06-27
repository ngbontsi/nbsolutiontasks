import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Activity,
  Store,
  BarChart3,
  History,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/users", label: "Users", icon: Users },
  { path: "/app/monitoring", label: "Monitoring", icon: Activity },
  { path: "/app/business", label: "Business", icon: Store },
  { path: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/app/audit", label: "Audit Trail", icon: History },
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
