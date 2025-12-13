export interface Project {
  id: number;
  name: string;
  slug: string;
  store?: {
    id: number;
    name: string;
    store_code: string;
    slug: string;
  } | null;
  store_name?: string;
  store_code?: string;
  company: {
    id: number;
    name: string;
  } | null;
  created_at: string;
  created_by?: {
    id: number;
    username: string;
  } | null;
}

export interface ProjectsResponse {
  projects: Project[];
}

export type ProjectResponse = Project;

export interface CreateProjectInput {
  name: string;
  store: number;
}

export interface UpdateProjectInput {
  name?: string;
}

