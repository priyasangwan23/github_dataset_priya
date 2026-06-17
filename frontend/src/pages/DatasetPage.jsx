import React, { useState, useEffect } from 'react';
import useDatasets from '../hooks/useDatasets';
import DatasetCard from '../components/DatasetCard';
import Spinner from '../components/Spinner';

export const DatasetPage = () => {
  const {
    datasets,
    loading,
    error,
    params,
    pagination,
    updateParams,
  } = useDatasets({ limit: 6 });

  const [searchInput, setSearchInput] = useState(params.search);

  // Debounce search input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      updateParams({ search: searchInput, page: 1 });
    }, 450);

    return () => clearTimeout(handler);
  }, [searchInput, updateParams]);

  // Sync search input if reset or modified externally
  useEffect(() => {
    setSearchInput(params.search);
  }, [params.search]);

  const handleFilterChange = (key, value) => {
    updateParams({ [key]: value, page: 1 });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    updateParams({
      search: '',
      type: '',
      repo_name: '',
      source_type: '',
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      updateParams({ page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Pre-populated common options for dropdowns based on typical backend entries
  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'function', label: 'Function' },
    { value: 'function_implementation', label: 'Function Implementation' },
    { value: 'class', label: 'Class' },
    { value: 'class_implementation', label: 'Class Implementation' },
    { value: 'documentation', label: 'Documentation' },
  ];

  const repoOptions = [
    { value: '', label: 'All Repositories' },
    { value: 'ultralytics/yolov5', label: 'ultralytics/yolov5' },
    { value: 'EleutherAI/lm-evaluation-harness', label: 'EleutherAI/lm-evaluation-harness' },
    { value: 'huggingface/transformers', label: 'huggingface/transformers' },
    { value: 'deepfakes/faceswap', label: 'deepfakes/faceswap' },
    { value: 'mlflow/mlflow', label: 'mlflow/mlflow' },
  ];

  const sourceTypeOptions = [
    { value: '', label: 'All Sources' },
    { value: 'github_repository', label: 'GitHub Repository' },
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
            value={params.type || ''}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            id="filter-type-select"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Filter Repo */}
          <select
            className="filter-select"
            value={params.repo_name || ''}
            onChange={(e) => handleFilterChange('repo_name', e.target.value)}
            id="filter-repo-select"
          >
            {repoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Filter Source Type */}
          <select
            className="filter-select"
            value={params.source_type || ''}
            onChange={(e) => handleFilterChange('source_type', e.target.value)}
            id="filter-source-select"
          >
            {sourceTypeOptions.map((opt) => (
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
            <h3 className="error-title">No Datasets Found</h3>
            <p className="error-msg">No records matched your search query or filter options.</p>
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
