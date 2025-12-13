/**
 * Django REST Framework paginated response format
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Options for mutation wrapper
 */
export interface MutationOptions<TData = unknown> {
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: string[][];
  onSuccess?: (data: TData) => void | Promise<void>;
}
