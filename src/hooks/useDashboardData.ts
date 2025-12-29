import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/dashboardService';
import { DashboardResponse } from '../types/dashboard';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
