import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import DatasetPage from "./pages/DatasetPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div className="app-container" id="app-root-layout">
            {/* Sticky Navbar */}
            <Navbar />

            {/* Routes */}
            <Routes>
              {/* Root redirects to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Dashboard — protected */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Datasets catalog — protected */}
              <Route
                path="/datasets"
                element={
                  <ProtectedRoute>
                    <DatasetPage />
                  </ProtectedRoute>
                }
              />

              {/* Public Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <div className="error-wrapper" id="not-found-container">
                    <div className="dataset-card error-card glass-panel" style={{ borderColor: "var(--border-color)" }}>
                      <span className="error-icon" style={{ color: "var(--accent-tertiary)" }}>🧭</span>
                      <h3 className="error-title">Page Not Found</h3>
                      <p className="error-msg">The URL you requested does not exist in our catalog mapping.</p>
                      <a href="/dashboard" className="btn-primary" style={{ textDecoration: "none" }}>
                        Return to Dashboard
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>

            {/* Footer */}
            <footer className="footer" id="app-footer">
              <p>&copy; {new Date().getFullYear()} GitDataset Hub. Built for ML instruction-tuning pipelines.</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
                Powered by Vite · React · Axios · Express
              </p>
            </footer>
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
