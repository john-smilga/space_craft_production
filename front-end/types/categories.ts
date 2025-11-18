export interface Category {
  slug: string;
  name: string;
}

export interface SelectableCategory {
  id: number;
  slug: string;
  name: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface SelectableCategoriesResponse {
  categories: SelectableCategory[];
}
