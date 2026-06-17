import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" id="app-navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="nav-brand">
          <span className="nav-brand-icon">⚡</span>
          <span>GitDataset Hub</span>
        </div>
      </Link>
      
      <div className="nav-links" style={{ alignItems: 'center' }}>
        {token ? (
          <>
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              id="nav-link-dashboard"
            >
              Dashboard
            </Link>

            <Link 
              to="/datasets" 
              className={`nav-link ${location.pathname === '/datasets' ? 'active' : ''}`}
              id="nav-link-datasets"
            >
              Datasets
            </Link>
            
            {/* User Profile Badge */}
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '0.85rem', color: 'var(--text-primary)' }} id="navbar-user-badge">
              <span style={{ fontSize: '1rem' }}>👤</span>
              <span style={{ fontWeight: 600 }}>{user?.name || 'User'}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="btn-reset"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', borderStyle: 'solid' }}
              id="btn-navbar-logout"
            >
              Logout
            </button>
          </>
        ) : (
          location.pathname !== '/login' && (
            <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }} id="btn-navbar-signin">
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
