import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Header() {
  const { cartCount, wishlist, user, isAuthenticated, logout } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">🔪</span>
          <div>
            <div className="brand-name">SC Socio Economic Growth Implementation Experts</div>
            <div className="brand-tagline">Cutting poverty, serving quality</div>
          </div>
        </Link>

        <nav className={`nav${menuOpen ? ' open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
            Wishlist <span className="badge-count">{wishlist.length || ''}</span>
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <ShoppingBag size={18} /> Cart <span className="badge-count">{cartCount || ''}</span>
          </Link>
          {isAuthenticated ? (
            <>
              <span className="nav-user"><User size={14} /> {user?.firstName}</span>
              <button className="btn btn-sm btn-outline" onClick={() => { logout(); setMenuOpen(false); }}>
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary" onClick={() => setMenuOpen(false)}>Sign In</Link>
          )}
        </nav>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
