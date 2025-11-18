export interface Store {
  id: number;
  name: string;
  store_code: string;
  slug: string;
  address: string;
  company: {
    id: number;
    name: string;
  };
  created_at: string;
  created_by: {
    id: number;
    username: string;
  } | null;
}

export interface StoresResponse {
  stores: Store[];
}

export interface StoreResponse {
  store: Store;
}
