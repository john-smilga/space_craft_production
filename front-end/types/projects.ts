export interface Project {
  id: number;
  name: string;
  slug: string;
  store: {
    id: number;
    name: string;
    store_code: string;
    slug: string;
  } | null;
  company: {
    id: number;
    name: string;
  } | null;
  created_at: string;
  created_by: {
    id: number;
    username: string;
  } | null;
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface ProjectResponse {
  project: Project;
}
