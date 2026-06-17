import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" id="app-navbar">
      <div className="nav-brand">
        <span className="nav-brand-icon">⚡</span>
        <span>GitDataset Hub</span>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          id="nav-link-home"
        >
          Datasets
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
