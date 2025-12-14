import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Export the TYPES (not the schemas) for backward compatibility
export type Display = z.infer<typeof schemas.Display>;
export type DisplayType = z.infer<typeof schemas.TypeEnum>;
export type DisplayModel = z.infer<typeof schemas.Display>;
export type DisplayListType = z.infer<typeof schemas.DisplayList>;
export type CreateDisplayInput = z.infer<typeof schemas.DisplayCreateRequest>;
export type UpdateDisplayInput = z.infer<typeof schemas.DisplayUpdateRequest>;
export type DisplaysResponse = z.infer<typeof schemas.PaginatedDisplayListList>;

