import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';

export function useDeleteProjectMutation(projectSlug: string) {
  return useAppMutation<void, void>(
    async () => {
      await api.delete(`/projects/${projectSlug}/`);
    },
    {
      successMessage: 'Project deleted successfully',
      errorMessage: 'Failed to delete project',
      invalidateQueries: [['projects'], ['project', projectSlug]],
    }
  );
}

