import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDatasets from "../hooks/useDatasets";
import useStats from "../hooks/useStats";
import DatasetCard from "../components/DatasetCard";
import StatCard from "../components/StatCard";
import TypeDistributionChart from "../components/TypeDistributionChart";
import Spinner from "../components/Spinner";

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search   = searchParams.get("search")   || "";
  const type     = searchParams.get("type")     || "";
  const language = searchParams.get("language") || "";
  const category = searchParams.get("category") || "";
  const page     = parseInt(searchParams.get("page")  || "1", 10);
  const limit    = parseInt(searchParams.get("limit") || "10", 10);
  const sort     = searchParams.get("sort")  || "";
  const order    = searchParams.get("order") || "";

  const { datasets, loading, error, pagination, updateParams } = useDatasets({ limit, search, type, language, category, page, sort, order });
  const { count, typeDistribution, loading: statsLoading } = useStats();

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    updateParams({ search, type, language, category, page, limit, sort, order });
  }, [search, type, language, category, page, limit, sort, order, updateParams]);

  useEffect(() => { setSearchInput(search); }, [search]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== search) {
        const p = new URLSearchParams(searchParams);
        searchInput.trim() ? p.set("search", searchInput) : p.delete("search");
        p.set("page", "1");
        setSearchParams(p);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput, search, searchParams, setSearchParams]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    value ? p.set(key, value) : p.delete(key);
    p.set("page", "1");
    setSearchParams(p);
  };

  const handleSort = (value) => {
    const p = new URLSearchParams(searchParams);
    if (value) {
      const [sf, so] = value.split("-");
      p.set("sort", sf); p.set("order", so);
    } else {
      p.delete("sort"); p.delete("order");
    }
    p.set("page", "1");
    setSearchParams(p);
  };

  const handleLimit = (value) => {
    const p = new URLSearchParams(searchParams);
    value !== "10" ? p.set("limit", value) : p.delete("limit");
    p.set("page", "1");
    setSearchParams(p);
  };

  const handleReset = () => { setSearchInput(""); setSearchParams({}); };

  const goPage = (n) => {
    if (n < 1 || n > pagination.totalPages) return;
    const p = new URLSearchParams(searchParams);
    p.set("page", n.toString());
    setSearchParams(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const typeOptions = [
    { value: "", label: "All Types" },
    { value: "function", label: "Function" },
    { value: "function_implementation", label: "Function Implementation" },
    { value: "class", label: "Class" },
    { value: "class_implementation", label: "Class Implementation" },
    { value: "documentation", label: "Documentation" },
  ];
  const langOptions = [
    { value: "", label: "All Languages" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "C++", label: "C++" },
    { value: "Go", label: "Go" },
    { value: "Shell", label: "Shell" },
  ];
  const catOptions = [
    { value: "", label: "All Categories" },
    { value: "Utility", label: "Utility" },
    { value: "Algorithm", label: "Algorithm" },
    { value: "AI Model", label: "AI Model" },
    { value: "API Wrapper", label: "API Wrapper" },
    { value: "Configuration", label: "Configuration" },
    { value: "Documentation", label: "Documentation" },
  ];
  const sortOptions = [
    { value: "", label: "Sort: Newest First" },
    { value: "instruction-asc", label: "Instruction (A to Z)" },
    { value: "instruction-desc", label: "Instruction (Z to A)" },
    { value: "createdAt-asc", label: "Date Added (Oldest)" },
  ];
  const limitOptions = [
    { value: "5", label: "5 per page" },
    { value: "10", label: "10 per page" },
    { value: "20", label: "20 per page" },
    { value: "50", label: "50 per page" },
  ];
  const currentSortValue = sort && order ? `${sort}-${order}` : "";
  const topTypes = Object.entries(typeDistribution).sort((a,b)=>b[1]-a[1]).slice(0,3);

  return (
    <div className="main-content" id="dashboard-container">

      {/* Page Header */}
      <header className="page-header" style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Monitor your GitHub Dataset catalog metrics and explore records.
        </p>
      </header>

      {/* Stats Row */}
      <section className="stats-grid" id="stats-grid" aria-label="Catalog statistics">
        <StatCard label="Total Datasets" value={count !== null ? count.toLocaleString() : null} icon="🗄️" accent="violet" loading={statsLoading} />
        <StatCard label="Top Type" value={topTypes[0]?.[0] ?? "—"} icon="🏷️" accent="cyan" loading={statsLoading} />
        <StatCard label="Top Type Count" value={topTypes[0]?.[1] ? topTypes[0][1].toLocaleString() : null} icon="📊" accent="rose" loading={statsLoading} />
        <StatCard label="Unique Types" value={!statsLoading ? Object.keys(typeDistribution).length : null} icon="✳️" accent="green" loading={statsLoading} />
      </section>

      {/* Analytics Chart */}
      <section style={{ marginBottom: "2.5rem" }} id="analytics-section" aria-label="Type distribution chart">
        <TypeDistributionChart data={typeDistribution} loading={statsLoading} />
      </section>

      {/* Search & Filters */}
      <section className="search-filter-section glass-panel" id="filters-panel">
        <div className="search-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" className="search-input" placeholder="Search instructions, inputs, or outputs..." value={searchInput} onChange={e => setSearchInput(e.target.value)} id="search-input-field" />
        </div>
        <div className="filter-grid">
          <select className="filter-select" value={type} onChange={e => setParam("type", e.target.value)} id="filter-type-select">
            {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="filter-select" value={language} onChange={e => setParam("language", e.target.value)} id="filter-language-select">
            {langOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="filter-select" value={category} onChange={e => setParam("category", e.target.value)} id="filter-category-select">
            {catOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="filter-select" value={currentSortValue} onChange={e => handleSort(e.target.value)} id="filter-sort-select">
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="filter-select" value={limit.toString()} onChange={e => handleLimit(e.target.value)} id="filter-limit-select">
            {limitOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button className="btn-reset" onClick={handleReset} id="btn-reset-filters">Reset Filters</button>
        </div>
      </section>

      {/* Dataset Grid */}
      {loading ? (
        <div id="loading-state-container">
          <Spinner message="Retrieving catalog records..." />
          <div className="datasets-grid">
            {[...Array(limit > 6 ? 6 : limit)].map((_, i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-item" style={{ height:"20px", width:"30%", marginBottom:"1rem" }} />
                <div className="skeleton-item" style={{ height:"30px", width:"80%", marginBottom:"1.5rem" }} />
                <div className="skeleton-item" style={{ height:"100px", width:"100%", marginBottom:"1rem" }} />
                <div className="skeleton-item" style={{ height:"150px", width:"100%" }} />
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
            <button className="btn-primary" onClick={handleReset}>Retry Connection</button>
          </div>
        </div>
      ) : datasets.length === 0 ? (
        <div className="empty-wrapper" id="empty-state-container">
          <div className="dataset-card error-card glass-panel" style={{ borderColor:"var(--border-color)" }}>
            <span className="error-icon" style={{ color:"var(--text-muted)" }}>🔍</span>
            <h3 className="error-title">No Results Found</h3>
            <p className="error-msg">No datasets matched your search or filter criteria.</p>
            <button className="btn-primary" onClick={handleReset}>Clear All Filters</button>
          </div>
        </div>
      ) : (
        <div id="data-state-container">
          <div className="datasets-grid" id="datasets-cards-grid">
            {datasets.map(ds => <DatasetCard key={ds.id || ds._id} dataset={ds} />)}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination-container" id="pagination-controls">
              <button className="pagination-btn" onClick={() => goPage(1)} disabled={pagination.page <= 1} id="btn-first-page">«</button>
              <button className="pagination-btn" onClick={() => goPage(pagination.page - 1)} disabled={pagination.page <= 1} id="btn-prev-page">← Prev</button>
              <span className="pagination-info" id="pagination-info-text">
                Page {pagination.page} of {pagination.totalPages}
                <span style={{ fontSize:"0.75rem", color:"var(--text-muted)", marginLeft:"0.5rem" }}>
                  ({pagination.count?.toLocaleString()} total)
                </span>
              </span>
              <button className="pagination-btn" onClick={() => goPage(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} id="btn-next-page">Next →</button>
              <button className="pagination-btn" onClick={() => goPage(pagination.totalPages)} disabled={pagination.page >= pagination.totalPages} id="btn-last-page">»</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
