import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          const message = error.message;
          if (!message.includes('validation')) {
            toast.error(message);
          }
        }
      },
    },
  },
});

