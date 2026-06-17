import React from "react";

export const StatCard = ({ label, value, icon, accent = "violet", loading = false }) => {
  const accentMap = {
    violet: { color: "var(--accent-primary)", glow: "var(--accent-primary-glow)", border: "hsla(263,90%,65%,.3)" },
    cyan:   { color: "var(--accent-secondary)", glow: "var(--accent-secondary-glow)", border: "hsla(190,95%,50%,.3)" },
    rose:   { color: "var(--accent-tertiary)", glow: "hsla(325,90%,60%,.1)", border: "hsla(325,90%,60%,.3)" },
    green:  { color: "var(--success)", glow: "var(--success-glow)", border: "hsla(142,70%,45%,.3)" },
  };
  const { color, glow, border } = accentMap[accent] || accentMap.violet;

  if (loading) {
    return (
      <div className="glass-panel stat-card" style={{ borderColor: border }}>
        <div className="skeleton-item" style={{ height: "20px", width: "60%", marginBottom: "1rem" }} />
        <div className="skeleton-item" style={{ height: "40px", width: "40%" }} />
      </div>
    );
  }

  return (
    <div className="glass-panel stat-card" style={{ borderColor: border, boxShadow: `0 8px 24px ${glow}` }}>
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon" style={{ color }}>{icon}</span>
      </div>
      <div className="stat-value" style={{ color }}>{value ?? "—"}</div>
    </div>
  );
};

export default StatCard;
