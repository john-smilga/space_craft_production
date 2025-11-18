import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/axios';

type OperationType = 'create' | 'update' | 'delete';

interface UseMutationOptions {
  toastResource?: string;
  operation?: OperationType;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}

interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<{ data: TData | null; error: string | null }>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

function getDefaultSuccessMessage(toastResource?: string, operation?: OperationType): string {
  if (!toastResource) return 'Operation completed successfully';

  const resource = toastResource.charAt(0).toUpperCase() + toastResource.slice(1);

  switch (operation) {
    case 'create':
      return `${resource} created successfully`;
    case 'update':
      return `${resource} updated successfully`;
    case 'delete':
      return `${resource} deleted successfully`;
    default:
      return `${resource} updated successfully`;
  }
}

/**
 * Attempts to infer the operation type from the mutation function
 * by analyzing the function's string representation for HTTP methods and URL patterns
 */
function inferOperation(mutationFn: Function): OperationType | null {
  const fnString = mutationFn.toString();

  // Check for HTTP methods
  if (fnString.includes('.delete(')) return 'delete';
  if (fnString.includes('.post(')) return 'create';
  if (fnString.includes('.put(') || fnString.includes('.patch(')) return 'update';

  return null;
}

export function useMutation<TData, TVariables>(mutationFn: (variables: TVariables) => Promise<TData>, options?: UseMutationOptions): UseMutationResult<TData, TVariables> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showToast = options?.showToast !== false; // Default to true

  // Auto-detect operation if not provided
  const operation = options?.operation || inferOperation(mutationFn) || undefined;

  const mutate = async (variables: TVariables): Promise<{ data: TData | null; error: string | null }> => {
    setLoading(true);
    setError(null);
    try {
      const data = await mutationFn(variables);

      if (showToast) {
        const successMessage = options?.successMessage || getDefaultSuccessMessage(options?.toastResource, operation);
        toast.success(successMessage);
      }

      return { data, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || options?.errorMessage || 'Operation failed';
      setError(errorMessage);

      if (showToast) {
        toast.error(errorMessage);
      }

      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setLoading(false);
  };

  return { mutate, loading, error, reset };
}
