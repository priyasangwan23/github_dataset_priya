import { useState, useEffect } from "react";
import { getDatasetCount, getTypeAnalysis } from "../services/api";

export const useStats = () => {
  const [count, setCount] = useState(null);
  const [typeDistribution, setTypeDistribution] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [countRes, typeRes] = await Promise.all([
          getDatasetCount(),
          getTypeAnalysis(),
        ]);
        if (!cancelled) {
          setCount(countRes.count ?? null);
          setTypeDistribution(typeRes || {});
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message || "Failed to load stats.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { count, typeDistribution, loading, error };
};

export default useStats;
