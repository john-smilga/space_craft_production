import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/axios';

interface UsePaginatedFetchOptions {
  enabled?: boolean;
  pageSize?: number;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface UsePaginatedFetchResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  page: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  refetch: () => Promise<void>;
}

export function usePaginatedFetch<T>(baseUrl: string | null, options?: UsePaginatedFetchOptions): UsePaginatedFetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const pageSize = options?.pageSize ?? 10;

  const fetchData = useCallback(async () => {
    if (!baseUrl || options?.enabled === false) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${page}&page_size=${pageSize}`;
      const response = await api.get<PaginatedResponse<T>>(url);

      setData(response.data.results);
      setTotalCount(response.data.count);
      setHasNext(response.data.next !== null);
      setHasPrevious(response.data.previous !== null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, page, pageSize, options?.enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext]);

  const previousPage = useCallback(() => {
    if (hasPrevious) {
      setPage((prev) => prev - 1);
    }
  }, [hasPrevious]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data,
    loading,
    error,
    page,
    totalCount,
    totalPages,
    hasNext,
    hasPrevious,
    goToPage,
    nextPage,
    previousPage,
    refetch: fetchData,
  };
}
