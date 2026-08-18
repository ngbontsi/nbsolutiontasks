import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/users/UsersPage";
import MonitoringPage from "./pages/monitoring/MonitoringPage";
import BusinessPage from "./pages/business/BusinessPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import AuditPage from "./pages/audit/AuditPage";
import DataPage from "./pages/data/DataPage";
import EntityDataPage from "./pages/data/EntityDataPage";
import "./styles/dashboard.css";
import "./styles/data.css";
import type { UserRole } from "./types";

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: UserRole[] }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role as UserRole)) {
    return <Navigate to="/app" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/app" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/app" replace /> : <RegisterPage />} />
      <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<ProtectedRoute allowedRoles={["ADMIN"]}><UsersPage /></ProtectedRoute>} />
        <Route path="monitoring" element={<ProtectedRoute allowedRoles={["ADMIN"]}><MonitoringPage /></ProtectedRoute>} />
        <Route path="business" element={<BusinessPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="audit" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AuditPage /></ProtectedRoute>} />
        <Route path="data" element={<DataPage />} />
        <Route path="data/:entityKey" element={<EntityDataPage />} />
      </Route>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
