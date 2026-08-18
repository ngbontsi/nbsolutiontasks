import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import api from '../services/api';
import type { Product, CartItem } from '../types';

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ShopContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQty: (productId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const ShopContext = createContext<ShopContextType | null>(null);

function mapProduct(p: any, catMap: Record<string, string>): Product {
  return {
    id: p.id,
    name: p.name,
    category: catMap[p.categoryId] || p.categoryId || 'Specials',
    price: Number(p.price),
    unit: 'kg',
    image: p.imageUrl || '🛒',
    description: p.description || '',
    inStock: (p.stockQuantity ?? 0) > 0,
    featured: (p.rating ?? 0) >= 4.7,
    brand: p.brand,
    rating: p.rating,
    reviewCount: p.reviewCount,
  };
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('bs_wishlist') || '[]'); } catch { return []; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('bs_token');
    const savedUser = localStorage.getItem('bs_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bs_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const fetchProducts = useCallback(async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/api/marketplace/products/active'),
        api.get('/api/marketplace/categories'),
      ]);
      const catMap: Record<string, string> = {};
      for (const c of catRes.data) {
        catMap[c.id] = c.name;
      }
      setProducts(prodRes.data.map((p: any) => mapProduct(p, catMap)));
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get('/api/marketplace/cart/my');
      const data = res.data;
      if (data?.items) {
          const mapped = data.items.map((i: any) => ({
          product: {
            id: i.productId,
            name: i.productName || '',
            category: '',
            price: Number(i.price),
            unit: 'kg',
            image: '',
            description: '',
            inStock: true,
            featured: false,
          },
          quantity: i.quantity,
        }));
        setCart(mapped);
      }
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (token) fetchCart();
    else setCart([]);
  }, [token, fetchCart]);

  const login = async (email: string, password: string) => {
    const res = await api.post('/api/auth/login', { email, password });
    const d = res.data;
    const u: AuthUser = { id: d.userId, email: d.email, firstName: d.firstName, lastName: d.lastName };
    localStorage.setItem('bs_token', d.token);
    localStorage.setItem('bs_user', JSON.stringify(u));
    setToken(d.token);
    setUser(u);
    await fetchCart();
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const res = await api.post('/api/auth/register', data);
    const d = res.data;
    const u: AuthUser = { id: d.userId, email: d.email, firstName: d.firstName, lastName: d.lastName };
    localStorage.setItem('bs_token', d.token);
    localStorage.setItem('bs_user', JSON.stringify(u));
    setToken(d.token);
    setUser(u);
    await fetchCart();
  };

  const logout = () => {
    const t = localStorage.getItem('bs_token');
    if (t) api.post('/api/auth/logout', null, { headers: { Authorization: `Bearer ${t}` } }).catch(() => {});
    localStorage.removeItem('bs_token');
    localStorage.removeItem('bs_user');
    setToken(null);
    setUser(null);
    setCart([]);
  };

  const addToCart = useCallback(async (product: Product, qty = 1) => {
    if (!token) return;
    try {
      await api.post('/api/marketplace/cart', { productId: product.id, quantity: qty });
      await fetchCart();
    } catch { /* ignore */ }
  }, [token, fetchCart]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!token) return;
    try {
      await api.put(`/api/marketplace/cart/items/${productId}?quantity=0`);
      await fetchCart();
    } catch { /* ignore */ }
  }, [token, fetchCart]);

  const updateCartQty = useCallback(async (productId: string, qty: number) => {
    if (!token) return;
    if (qty <= 0) {
      await removeFromCart(productId);
      return;
    }
    try {
      await api.put(`/api/marketplace/cart/items/${productId}?quantity=${qty}`);
      await fetchCart();
    } catch { /* ignore */ }
  }, [token, removeFromCart, fetchCart]);

  const clearCart = useCallback(async () => {
    if (!token) return;
    try {
      await api.delete('/api/marketplace/cart/my');
      setCart([]);
    } catch { /* ignore */ }
  }, [token]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        user, token, isAuthenticated: !!token, loading,
        login, register, logout,
        products, cart, addToCart, removeFromCart, updateCartQty, clearCart,
        cartTotal, cartCount,
        wishlist, toggleWishlist, isInWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
