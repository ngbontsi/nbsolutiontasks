import api from './api';
import type { Restaurant, Guesthouse, User, AuditLog } from '../types';

async function fetchWithFallback<T>(fetch: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetch();
  } catch {
    return fallback;
  }
}

export async function fetchUsers(): Promise<User[]> {
  return fetchWithFallback(async () => {
    const res = await api.get('/api/auth/users');
    return res.data.map((u: any) => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      enabled: u.enabled,
      createdAt: u.createdAt ? u.createdAt.slice(0, 10) : '',
      updatedAt: u.updatedAt ? u.updatedAt.slice(0, 10) : '',
    }));
  }, []);
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  return fetchWithFallback(async () => {
    const res = await api.get('/api/restaurant/restaurants');
    return res.data.map((r: any) => ({
      id: r.id,
      name: r.name,
      address: r.address || r.description || '',
      active: r.active,
    }));
  }, []);
}

export async function fetchGuesthouses(): Promise<Guesthouse[]> {
  return fetchWithFallback(async () => {
    const res = await api.get('/api/guesthouse/guesthouses');
    return res.data.map((g: any) => ({
      id: g.id,
      name: g.name,
      address: g.address || '',
      active: g.active,
    }));
  }, []);
}

export async function fetchAuditLogs(page = 0, size = 50): Promise<{ content: AuditLog[]; totalElements: number }> {
  return fetchWithFallback(async () => {
    const res = await api.get(`/api/auth/audit?page=${page}&size=${size}`);
    return { content: res.data.content, totalElements: res.data.totalElements };
  }, { content: [], totalElements: 0 });
}

export async function fetchRoles(): Promise<any[]> {
  return fetchWithFallback(async () => {
    const res = await api.get('/api/auth/roles');
    return res.data;
  }, []);
}

export async function fetchEntityCounts(): Promise<Record<string, number>> {
  const [users, restaurants, guesthouses, products, orders] = await Promise.all([
    fetchWithFallback(() => api.get('/api/auth/users').then(r => r.data.length), 0),
    fetchWithFallback(() => api.get('/api/restaurant/restaurants').then(r => r.data.length), 0),
    fetchWithFallback(() => api.get('/api/guesthouse/guesthouses').then(r => r.data.length), 0),
    fetchWithFallback(() => api.get('/api/marketplace/products').then(r => r.data.length), 0),
    fetchWithFallback(() => api.get('/api/marketplace/orders').then(r => r.data.length), 0),
  ]);
  return { users, restaurants, guesthouses, products, orders };
}
