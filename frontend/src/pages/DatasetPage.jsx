import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDatasets from '../hooks/useDatasets';
import DatasetCard from '../components/DatasetCard';
import Spinner from '../components/Spinner';

export const DatasetPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract filters from URL query parameters (single source of truth)
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';
  const language = searchParams.get('language') || '';
  const category = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Fetch datasets matching the URL state
  const {
    datasets,
    loading,
    error,
    pagination,
    updateParams,
  } = useDatasets({
    limit: 6,
    search,
    type,
    language,
    category,
    page,
  });

  // Local state for immediate responsiveness in search input text box
  const [searchInput, setSearchInput] = useState(search);

  // Sync state whenever URL query params change (e.g. back/forward navigation or resets)
  useEffect(() => {
    updateParams({
      search,
      type,
      language,
      category,
      page,
    });
  }, [search, type, language, category, page, updateParams]);

  // Sync search input box when URL search param updates externally
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounce user typing to prevent excessive API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== search) {
        const nextParams = new URLSearchParams(searchParams);
        if (searchInput.trim()) {
          nextParams.set('search', searchInput);
        } else {
          nextParams.delete('search');
        }
        nextParams.set('page', '1'); // Reset to first page on new search
        setSearchParams(nextParams);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput, search, searchParams, setSearchParams]);

  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    nextParams.set('page', '1'); // Reset page to 1 on filter change
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams({}); // Clear all parameters from URL
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('page', newPage.toString());
      setSearchParams(nextParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dropdown list options
  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'function', label: 'Function' },
    { value: 'function_implementation', label: 'Function Implementation' },
    { value: 'class', label: 'Class' },
    { value: 'class_implementation', label: 'Class Implementation' },
    { value: 'documentation', label: 'Documentation' },
  ];

  const languageOptions = [
    { value: '', label: 'All Languages' },
    { value: 'Python', label: 'Python' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'C++', label: 'C++' },
    { value: 'Go', label: 'Go' },
    { value: 'Shell', label: 'Shell' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Utility', label: 'Utility' },
    { value: 'Algorithm', label: 'Algorithm' },
    { value: 'AI Model', label: 'AI Model' },
    { value: 'API Wrapper', label: 'API Wrapper' },
    { value: 'Configuration', label: 'Configuration' },
    { value: 'Documentation', label: 'Documentation' },
  ];

  return (
    <div className="main-content" id="dataset-page-container">
      {/* Header Banner */}
      <header className="page-header">
        <h1 className="page-title">Dataset Catalog</h1>
        <p className="page-subtitle">
          Explore code instructions, input templates, and expected outputs harvested from open-source GitHub repositories.
        </p>
      </header>

      {/* Search and Filters Bar */}
      <section className="search-filter-section glass-panel" id="filters-panel">
        <div className="search-wrapper">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search instructions, inputs, or outputs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="search-input-field"
          />
        </div>

        <div className="filter-grid">
          {/* Filter Type */}
          <select
            className="filter-select"
            value={type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            id="filter-type-select"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Filter Language */}
          <select
            className="filter-select"
            value={language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            id="filter-language-select"
          >
            {languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Filter Category */}
          <select
            className="filter-select"
            value={category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            id="filter-category-select"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Reset button */}
          <button 
            className="btn-reset" 
            onClick={handleResetFilters}
            id="btn-reset-filters"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Main content display area */}
      {loading ? (
        <div id="loading-state-container">
          <Spinner message="Retrieving catalog records..." />
          <div className="datasets-grid">
            {/* Show skeleton cards during initial loading for premium vibe */}
            {[...Array(6)].map((_, idx) => (
              <div className="skeleton-card" key={idx}>
                <div className="skeleton-item" style={{ height: '20px', width: '30%', marginBottom: '1rem' }}></div>
                <div className="skeleton-item" style={{ height: '30px', width: '80%', marginBottom: '1.5rem' }}></div>
                <div className="skeleton-item" style={{ height: '100px', width: '100%', marginBottom: '1rem' }}></div>
                <div className="skeleton-item" style={{ height: '150px', width: '100%' }}></div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="error-wrapper" id="error-state-container">
          <div className="dataset-card error-card glass-panel">
            <span className="error-icon">⚠️</span>
            <h3 className="error-title">Connection Failed</h3>
            <p className="error-msg">{error}</p>
            <button className="btn-primary" onClick={handleResetFilters}>
              Retry Connection
            </button>
          </div>
        </div>
      ) : datasets.length === 0 ? (
        <div className="empty-wrapper" id="empty-state-container">
          <div className="dataset-card error-card glass-panel" style={{ borderColor: 'var(--border-color)' }}>
            <span className="error-icon" style={{ color: 'var(--text-muted)' }}>🔍</span>
            <h3 className="error-title">No results found</h3>
            <p className="error-msg">No datasets matched your search query or filter options.</p>
            <button className="btn-primary" onClick={handleResetFilters}>
              Clear Search & Filters
            </button>
          </div>
        </div>
      ) : (
        <div id="data-state-container">
          {/* Dataset Grid */}
          <div className="datasets-grid" id="datasets-cards-grid">
            {datasets.map((dataset) => (
              <DatasetCard key={dataset.id || dataset._id} dataset={dataset} />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="pagination-container" id="pagination-controls">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                id="btn-prev-page"
              >
                &larr; Prev
              </button>
              <span className="pagination-info" id="pagination-info-text">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                id="btn-next-page"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatasetPage;
