import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

export type StoreType = z.infer<typeof schemas.Store>;
export type CreateStoreInput = z.infer<typeof schemas.StoreCreateRequest>;
export type UpdateStoreInput = z.infer<typeof schemas.StoreUpdateRequest>;
export type StoresResponse = z.infer<typeof schemas.PaginatedStoreListList>;

