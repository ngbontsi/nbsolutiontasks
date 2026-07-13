-- =============================================================================
-- Row-Level Security Setup for Decoded Solutions Platform
-- Run against each database after schema migrations.
-- Requires session-level variables set before queries:
--   SET app.current_user_id = '<uuid>';
--   SET app.current_user_role = '<ADMIN|CLIENT|MANAGER|SUPERVISOR>';
-- =============================================================================

-- ==================== authdb (auth-service) ====================
\c authdb;

-- Users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON users;
CREATE POLICY admin_all ON users
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_self ON users;
CREATE POLICY user_self ON users
    FOR ALL
    USING (id = current_setting('app.current_user_id', true))
    WITH CHECK (id = current_setting('app.current_user_id', true));

-- Audit logs table
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON audit_logs;
CREATE POLICY admin_all ON audit_logs
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_self ON audit_logs;
CREATE POLICY user_self ON audit_logs
    FOR ALL
    USING (actor_id = current_setting('app.current_user_id', true))
    WITH CHECK (actor_id = current_setting('app.current_user_id', true));

-- ==================== restaurantdb (restaurant-service) ====================
\c restaurantdb;

-- Restaurants table
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON restaurants;
CREATE POLICY admin_all ON restaurants
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON restaurants;
CREATE POLICY user_own ON restaurants
    FOR ALL
    USING (owner_id = current_setting('app.current_user_id', true))
    WITH CHECK (owner_id = current_setting('app.current_user_id', true));

-- Menu items table
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON menu_items;
CREATE POLICY admin_all ON menu_items
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON menu_items;
CREATE POLICY user_own ON menu_items
    FOR ALL
    USING (owner_id = current_setting('app.current_user_id', true))
    WITH CHECK (owner_id = current_setting('app.current_user_id', true));

-- ==================== guesthousedb (guesthouse-service) ====================
\c guesthousedb;

-- Guesthouses table
ALTER TABLE guesthouses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON guesthouses;
CREATE POLICY admin_all ON guesthouses
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON guesthouses;
CREATE POLICY user_own ON guesthouses
    FOR ALL
    USING (owner_id = current_setting('app.current_user_id', true))
    WITH CHECK (owner_id = current_setting('app.current_user_id', true));

-- Rooms table
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON rooms;
CREATE POLICY admin_all ON rooms
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON rooms;
CREATE POLICY user_own ON rooms
    FOR ALL
    USING (owner_id = current_setting('app.current_user_id', true))
    WITH CHECK (owner_id = current_setting('app.current_user_id', true));

-- Reservations table
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON reservations;
CREATE POLICY admin_all ON reservations
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON reservations;
CREATE POLICY user_own ON reservations
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true))
    WITH CHECK (user_id = current_setting('app.current_user_id', true));

-- ==================== marketplacedb (marketplace-service) ====================
\c marketplacedb;

-- Products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON products;
CREATE POLICY admin_all ON products
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON products;
CREATE POLICY user_own ON products
    FOR ALL
    USING (owner_id = current_setting('app.current_user_id', true))
    WITH CHECK (owner_id = current_setting('app.current_user_id', true));

-- Categories (shared reference data - publicly readable)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON categories;
CREATE POLICY admin_all ON categories
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS public_read ON categories;
CREATE POLICY public_read ON categories
    FOR SELECT
    USING (true);

-- Carts table
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON carts;
CREATE POLICY admin_all ON carts
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON carts;
CREATE POLICY user_own ON carts
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true))
    WITH CHECK (user_id = current_setting('app.current_user_id', true));

-- Cart items (child of carts - RLS via parent)
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON cart_items;
CREATE POLICY admin_all ON cart_items
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS cart_owner ON cart_items;
CREATE POLICY cart_owner ON cart_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = cart_items.cart_id
            AND carts.user_id = current_setting('app.current_user_id', true)
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = cart_items.cart_id
            AND carts.user_id = current_setting('app.current_user_id', true)
        )
    );

-- Orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON orders;
CREATE POLICY admin_all ON orders
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS user_own ON orders;
CREATE POLICY user_own ON orders
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true))
    WITH CHECK (user_id = current_setting('app.current_user_id', true));

-- Order items (child of orders - RLS via parent)
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all ON order_items;
CREATE POLICY admin_all ON order_items
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'ADMIN')
    WITH CHECK (current_setting('app.current_user_role', true) = 'ADMIN');

DROP POLICY IF EXISTS order_owner ON order_items;
CREATE POLICY order_owner ON order_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = current_setting('app.current_user_id', true)
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = current_setting('app.current_user_id', true)
        )
    );
