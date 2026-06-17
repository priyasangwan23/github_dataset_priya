import React from "react";

const COLORS = [
  "var(--accent-primary)",
  "var(--accent-secondary)",
  "var(--accent-tertiary)",
  "var(--success)",
  "var(--warning)",
  "hsl(200,90%,60%)",
  "hsl(45,95%,55%)",
];

export const TypeDistributionChart = ({ data = {}, loading = false }) => {
  if (loading) {
    return (
      <div className="glass-panel chart-card">
        <div className="skeleton-item" style={{ height:"20px", width:"40%", marginBottom:"1.5rem" }} />
        {[80,65,50,40,30].map((w,i) => (
          <div key={i} style={{ marginBottom:"0.85rem" }}>
            <div className="skeleton-item" style={{ height:"12px", width:"30%", marginBottom:"0.35rem" }} />
            <div className="skeleton-item" style={{ height:"16px", width:`${w}%`, borderRadius:"8px" }} />
          </div>
        ))}
      </div>
    );
  }

  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0);

  if (!entries.length) {
    return (
      <div className="glass-panel chart-card" style={{ display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-muted)", fontSize:"0.9rem" }}>
        No analytics data available.
      </div>
    );
  }

  return (
    <div className="glass-panel chart-card">
      <h3 className="chart-title">Type Distribution</h3>
      <div className="chart-bars">
        {entries.map(([type, count], i) => {
          const pct = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
          const color = COLORS[i % COLORS.length];
          return (
            <div key={type} className="chart-row">
              <div className="chart-label">
                <span className="chart-dot" style={{ background: color }} />
                <span className="chart-type-name" title={type}>{type}</span>
                <span className="chart-count">{count.toLocaleString()}</span>
              </div>
              <div className="chart-track">
                <div
                  className="chart-fill"
                  style={{ width: `${pct}%`, background: color }}
                  title={`${pct}%`}
                />
              </div>
              <span className="chart-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
      <div className="chart-footer">Total: {total.toLocaleString()} records</div>
    </div>
  );
};

export default TypeDistributionChart;
