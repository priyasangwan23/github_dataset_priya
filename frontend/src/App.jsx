import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DatasetPage from './pages/DatasetPage';

function App() {
  return (
    <Router>
      <div className="app-container" id="app-root-layout">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DatasetPage />} />
          {/* Fallback Route for NotFound */}
          <Route 
            path="*" 
            element={
              <div className="error-wrapper" id="not-found-container">
                <div className="dataset-card error-card glass-panel" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="error-icon" style={{ color: 'var(--accent-tertiary)' }}>🧭</span>
                  <h3 className="error-title">Page Not Found</h3>
                  <p className="error-msg">The URL you requested does not exist in our catalog mapping.</p>
                  <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
                    Return to Catalog
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>

        {/* Premium Footer */}
        <footer className="footer" id="app-footer">
          <p>
            &copy; {new Date().getFullYear()} GitDataset Hub. Designed for machine learning instruction-tuning pipelines.
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
            Powered by Vite, React, Axios & Express. Check out the project on{' '}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
