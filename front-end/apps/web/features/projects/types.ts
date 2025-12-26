import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Export the TYPE (not the schema) as Project for backward compatibility
export type Project = z.infer<typeof schemas.Project>;
export type ProjectListType = z.infer<typeof schemas.ProjectList>;
export type CreateProjectInput = z.infer<typeof schemas.ProjectCreateRequest>;
export type UpdateProjectInput = z.infer<typeof schemas.ProjectUpdateRequest>;

