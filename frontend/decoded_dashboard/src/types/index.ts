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

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  active: boolean;
}

export interface Guesthouse {
  id: string;
  name: string;
  address: string;
  active: boolean;
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
