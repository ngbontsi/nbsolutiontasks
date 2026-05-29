import api from './api';
import type { Restaurant, Guesthouse, Task } from '../types';

async function fetchWithFallback<T>(fetch: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetch();
  } catch {
    return fallback;
  }
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  return fetchWithFallback(async () => {
    const res = await api.get('/api/restaurant/restaurants');
    return res.data.map((r: any) => ({
      id: r.id,
      name: r.name,
      cuisine: r.address || r.description || 'Unknown',
      rating: 0,
      active: r.active,
      menuItemsCount: 0,
    }));
  }, []);
}

export async function fetchGuesthouses(): Promise<Guesthouse[]> {
  return fetchWithFallback(async () => {
    const res = await api.get('/api/guesthouse/guesthouses');
    return res.data.map((g: any) => ({
      id: g.id,
      name: g.name,
      location: g.address || 'Unknown',
      rating: 0,
      active: g.active,
      roomsCount: 0,
      reservationsCount: 0,
    }));
  }, []);
}

export async function fetchTasks(): Promise<Task[]> {
  return fetchWithFallback(async () => {
    const res = await api.get('/api/tasks');
    return res.data.map((t: any) => ({
      id: String(t.id),
      title: t.title,
      status: t.completed ? 'completed' : 'pending',
      priority: 'medium' as const,
      createdAt: '',
    }));
  }, []);
}
