import { useState, useEffect, useCallback } from 'react';
import { getDatasets } from '../services/api';

/**
 * Custom hook to handle datasets fetching, loading, errors, and pagination.
 * 
 * @param {Object} initialParams - Initial search, filter, and pagination parameters
 */
export const useDatasets = (initialParams = {}) => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 9,
    search: '',
    type: '',
    language: '',
    category: '',
    ...initialParams,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    count: 0,
  });

  const fetchDatasets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Clean undefined or empty parameters
      const cleanParams = Object.keys(params).reduce((acc, key) => {
        if (params[key] !== undefined && params[key] !== '') {
          acc[key] = params[key];
        }
        return acc;
      }, {});

      const result = await getDatasets(cleanParams);
      if (result.success) {
        setDatasets(result.data || []);
        setPagination({
          page: result.page || 1,
          totalPages: result.totalPages || 1,
          count: result.count || 0,
        });
      } else {
        throw new Error(result.message || 'Failed to fetch datasets');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  // Helper to merge new parameters or update page
  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
      // If we are applying filters, default to page 1 unless page is explicitly updated
      page: newParams.page !== undefined ? newParams.page : 1,
    }));
  }, []);

  return {
    datasets,
    loading,
    error,
    params,
    pagination,
    updateParams,
    refetch: fetchDatasets,
  };
};

export default useDatasets;
