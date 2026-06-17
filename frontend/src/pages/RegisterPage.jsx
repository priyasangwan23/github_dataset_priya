import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const RegisterPage = () => {
  const { register, token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect to home page
  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Form validation checks
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      // Wait for 2 seconds then redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }} id="register-page-container">
      <div className="dataset-card glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', gap: '1.75rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--text-primary), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Get Started
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Create an account to explore datasets
          </p>
        </div>

        {error && (
          <div className="glass-panel" style={{ background: 'hsla(325, 90%, 60%, 0.08)', borderColor: 'hsla(325, 90%, 60%, 0.3)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-tertiary)', fontSize: '0.85rem' }} id="register-error-alert">
            <span style={{ fontSize: '1.1rem' }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="glass-panel" style={{ background: 'hsla(142, 70%, 45%, 0.08)', borderColor: 'hsla(142, 70%, 45%, 0.3)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--success)', fontSize: '0.85rem' }} id="register-success-alert">
            <span style={{ fontSize: '1.1rem' }}>✓</span>
            <span>Registration successful! Redirecting to sign in...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }} id="register-form">
          <div className="meta-item" style={{ gap: '0.4rem' }}>
            <label htmlFor="reg-name" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
              Full Name
            </label>
            <input
              type="text"
              id="reg-name"
              className="search-input"
              style={{ padding: '0.8rem 1rem' }}
              placeholder="Alex Mercer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading || success}
              required
            />
          </div>

          <div className="meta-item" style={{ gap: '0.4rem' }}>
            <label htmlFor="reg-email" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
              Email Address
            </label>
            <input
              type="email"
              id="reg-email"
              className="search-input"
              style={{ padding: '0.8rem 1rem' }}
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
              required
            />
          </div>

          <div className="meta-item" style={{ gap: '0.4rem' }}>
            <label htmlFor="reg-password" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
              Password
            </label>
            <input
              type="password"
              id="reg-password"
              className="search-input"
              style={{ padding: '0.8rem 1rem' }}
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || success}
              required
            />
          </div>

          <div className="meta-item" style={{ gap: '0.4rem' }}>
            <label htmlFor="reg-confirm-password" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
              Confirm Password
            </label>
            <input
              type="password"
              id="reg-confirm-password"
              className="search-input"
              style={{ padding: '0.8rem 1rem' }}
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading || success}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
            disabled={loading || success}
            id="btn-submit-register"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
