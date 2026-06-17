import React, { useState } from 'react';

export const DatasetCard = ({ dataset }) => {
  const { id, instruction, input, output, metadata = {} } = dataset;
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Helper to choose badge colors based on metadata values
  const getSourceTypeBadgeClass = (source) => {
    if (!source) return 'badge-violet';
    const s = source.toLowerCase();
    if (s.includes('git') || s.includes('repo')) return 'badge-cyan';
    if (s.includes('scrape') || s.includes('web')) return 'badge-rose';
    return 'badge-violet';
  };

  return (
    <div className="dataset-card glass-panel" id={`dataset-card-${id}`}>
      {/* Header */}
      <div className="card-header">
        <span className="card-id-badge" id={`card-id-${id}`}>ID: {id}</span>
        <div className="card-badges">
          {metadata.type && (
            <span className="badge badge-violet" id={`badge-type-${id}`}>
              {metadata.type}
            </span>
          )}
          {metadata.source_type && (
            <span className={`badge ${getSourceTypeBadgeClass(metadata.source_type)}`} id={`badge-source-${id}`}>
              {metadata.source_type}
            </span>
          )}
        </div>
      </div>

      {/* Instruction */}
      <div className="card-section">
        <span className="card-section-label">Instruction</span>
        <div className="instruction-text" id={`instruction-${id}`}>{instruction}</div>
      </div>

      {/* Input (only show if it exists) */}
      {input && input.trim() !== '' && (
        <div className="card-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="card-section-label">Input</span>
          </div>
          <div className="code-container">
            <div className="code-header">
              <span className="code-lang">Data</span>
              <button 
                className="btn-copy" 
                onClick={() => handleCopy(input, 'input')}
                id={`btn-copy-input-${id}`}
              >
                {copiedSection === 'input' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="code-block" id={`input-${id}`}>{input}</pre>
          </div>
        </div>
      )}

      {/* Output */}
      <div className="card-section">
        <span className="card-section-label">Expected Output</span>
        <div className="code-container">
          <div className="code-header">
            <span className="code-lang">Code / Text</span>
            <button 
              className="btn-copy" 
              onClick={() => handleCopy(output, 'output')}
              id={`btn-copy-output-${id}`}
            >
              {copiedSection === 'output' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="code-block" id={`output-${id}`}>{output || <span className="no-data-placeholder">No output specified</span>}</pre>
        </div>
      </div>

      {/* Metadata Footnote details */}
      {(metadata.repo_name || metadata.code_element || metadata.file_path) && (
        <div className="card-metadata-details">
          {metadata.repo_name && (
            <div className="meta-item">
              <span className="meta-label">Repository</span>
              <span className="meta-val" title={metadata.repo_name}>{metadata.repo_name}</span>
            </div>
          )}
          {metadata.code_element && (
            <div className="meta-item">
              <span className="meta-label">Code Element</span>
              <span className="meta-val" title={metadata.code_element}>{metadata.code_element}</span>
            </div>
          )}
          {metadata.file_path && (
            <div className="meta-item" style={{ gridColumn: 'span 2' }}>
              <span className="meta-label">File Path</span>
              <span className="meta-val" title={metadata.file_path} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                {metadata.file_path}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatasetCard;
