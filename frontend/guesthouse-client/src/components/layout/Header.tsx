import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Calendar } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function Header() {
  const { user, isAuthenticated, logout, bookings } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">🏡</span>
          <div>
            <div className="brand-name">Rasmeni & Sons</div>
            <div className="brand-tagline">Find your perfect getaway</div>
          </div>
        </Link>

        <nav className={`nav${menuOpen ? ' open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
          <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>
            <Calendar size={16} /> My Bookings <span className="badge-count">{bookings.length || ''}</span>
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
