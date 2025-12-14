import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { PaginatedResponse, MutationOptions } from '../types';

/**
 * Wrapper for useQuery that handles paginated responses
 * Automatically extracts 'results' from DRF pagination
 */
export function usePaginatedQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<PaginatedResponse<T>>,
  options?: Omit<UseQueryOptions<T[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.results;
    },
    ...options,
  });
}

/**
 * Wrapper for useMutation that handles common patterns:
 * - Success/error toast notifications
 * - Query invalidation
 * - Custom success callbacks
 */
export function useAppMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData> = {}
) {
  const queryClient = useQueryClient();
  const {
    successMessage,
    errorMessage,
    invalidateQueries = [],
    onSuccess: customOnSuccess,
  } = options;

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: async (data) => {
      for (const queryKey of invalidateQueries) {
        await queryClient.invalidateQueries({ queryKey });
      }

      if (successMessage) {
        toast.success(successMessage);
      }

      if (customOnSuccess) {
        await customOnSuccess(data);
      }
    },
    onError: (error) => {
      // For axios errors, extract the response data which contains validation errors
      const apiError = error as any;
      const errorDetails = apiError.response?.data;
      
      // Log the full error details to console for debugging
      // eslint-disable-next-line no-console
      console.error('API Error Details:', {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: errorDetails,
        message: error.message,
      });
      
      // Show a user-friendly message in the toast
      const message = errorMessage || error.message || 'An error occurred';
      toast.error(message);
    },
  });
}
