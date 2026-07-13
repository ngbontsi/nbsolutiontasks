export type UserRole = 'ADMIN' | 'USER' | 'RESTAURANT_OWNER' | 'GUESTHOUSE_OWNER' | 'MARKETPLACE_VENDOR' | 'SUPERVISOR' | 'MANAGER';

export interface Role {
  id: string;
  name: string;
  description: string;
  fullAccess: boolean;
  modify: boolean;
  readOnly: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceStatus {
  name: string;
  port: number;
  status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
  uptime: string;
  lastCheck: string;
  requestsPerMinute: number;
  avgResponseTime: number;
  errorRate: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  active: boolean;
  menuItemsCount: number;
}

export interface Guesthouse {
  id: string;
  name: string;
  location: string;
  rating: number;
  active: boolean;
  roomsCount: number;
  reservationsCount: number;
}

export interface MarketplaceOrder {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  itemsCount: number;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  targetId: string;
  targetType: string;
  details: string;
  createdAt: string;
}

export interface AnalyticsDataPoint {
  date: string;
  users: number;
  orders: number;
  revenue: number;
}
