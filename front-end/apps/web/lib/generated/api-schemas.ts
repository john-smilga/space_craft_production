import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const LoginRequest = z
  .object({ email: z.string().min(1).email(), password: z.string().min(1) })
  .strict();
const RoleEnum = z.enum(["admin", "member"]);
const Company = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    tax_id: z.string().max(100).nullish(),
    description: z.string().nullish(),
    created_at: z.string().datetime({ offset: true }),
  })
  .strict();
const User = z
  .object({
    id: z.number().int(),
    username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/),
    email: z.string().max(254).email().optional(),
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    role: RoleEnum.optional(),
    company: Company,
    slug: z.string(),
    is_active: z.boolean().optional(),
    date_joined: z.string().datetime({ offset: true }),
  })
  .strict();
const LogoutResponse = z.object({ message: z.string() }).strict();
const RegisterRequestRequest = z
  .object({
    token: z.string().min(1),
    password: z.string().min(1),
    username: z.string().min(1).max(150).optional(),
  })
  .strict();
const CompanyInfo = z
  .object({ id: z.number().int(), name: z.string() })
  .strict();
const ValidateInvitationResponse = z
  .object({
    valid: z.boolean(),
    email: z.string().email(),
    company: CompanyInfo.nullable(),
  })
  .strict();
const Category = z
  .object({
    id: z.number().int(),
    slug: z.string(),
    name: z.string(),
    path: z.string().optional(),
    has_children: z.boolean().optional(),
  })
  .strict();
const CategoryListResponse = z
  .object({ categories: z.array(Category) })
  .strict();
const CategoryChildrenResponse = z
  .object({ categories: z.array(Category), has_children: z.boolean() })
  .strict();
const CategoryIdsRequestRequest = z
  .object({ category_ids: z.array(z.number().int()) })
  .strict();
const Product = z
  .object({
    id: z.number().int(),
    name: z.string(),
    pack_width_in: z.number(),
    pack_height_in: z.number(),
    margin: z.number(),
    sales_velocity: z.number(),
    overall_score: z.number(),
    category: z.string().optional(),
    color: z.string().optional(),
    expiration_stability: z.number().optional(),
    seasonality: z.number().optional(),
  })
  .strict();
const ProductListResponse = z.object({ products: z.array(Product) }).strict();
const TypeEnum = z.enum([
  "gondola",
  "endcap",
  "wall_unit",
  "refrigerated_case",
  "freezer_case",
  "island_display",
  "checkout_counter",
  "shelf",
  "rack",
  "bin",
  "other",
]);
const DisplayCategoryEnum = z.enum(["standard", "custom"]);
const DisplayList = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    type: TypeEnum,
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    display_category: DisplayCategoryEnum,
    slug: z.string(),
  })
  .strict();
const PaginatedDisplayListList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(DisplayList),
  })
  .strict();
const DisplayCreateRequest = z
  .object({
    name: z.string().min(1).max(255),
    type: TypeEnum,
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
  })
  .strict();
const Display = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    type: TypeEnum,
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    display_category: DisplayCategoryEnum,
    company: z.number().int().nullable(),
    company_name: z.string(),
    slug: z.string(),
    created_by: z.number().int().nullable(),
    created_by_username: z.string(),
    created_at: z.string().datetime({ offset: true }),
  })
  .strict();
const DisplayUpdateRequest = z
  .object({
    name: z.string().min(1).max(255),
    type: TypeEnum,
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
  })
  .strict();
const DisplayUpdate = z
  .object({
    name: z.string().max(255),
    type: TypeEnum,
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
  })
  .strict();
const PatchedDisplayUpdateRequest = z
  .object({
    name: z.string().min(1).max(255),
    type: TypeEnum,
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
  })
  .partial()
  .strict();
const PaginatedDisplayList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(Display),
  })
  .strict();
const DisplayType = z.object({ value: z.string(), label: z.string() }).strict();
const PaginatedDisplayTypeList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(DisplayType),
  })
  .strict();
const SeasonC9aEnum = z.enum(["spring", "summer", "fall", "winter"]);
const PlanogramList = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    slug: z.string(),
    season: SeasonC9aEnum.optional(),
    project_name: z.string(),
    project_slug: z.string(),
    display_name: z.string(),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    category_ids: z.array(z.number().int()),
    categories: z.array(z.object({}).partial().strict().passthrough()),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
  })
  .strict();
const PaginatedPlanogramListList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(PlanogramList),
  })
  .strict();
const PlanogramCreateSeasonEnum = z.enum([
  "spring",
  "summer",
  "fall",
  "winter",
]);
const PlanogramCreateRequest = z
  .object({
    name: z.string().min(1).max(255),
    season: PlanogramCreateSeasonEnum.optional(),
    project: z.number().int(),
    display: z.number().int().optional(),
    width_in: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    height_in: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    depth_in: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    shelf_count: z.number().int().optional(),
    shelf_spacing: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    category_ids: z.array(z.number().int()).optional(),
  })
  .strict();
const Planogram = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    slug: z.string(),
    season: SeasonC9aEnum.optional(),
    project: z.number().int(),
    project_name: z.string(),
    project_slug: z.string(),
    display: z.number().int(),
    display_name: z.string(),
    company: z.number().int(),
    company_name: z.string(),
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    category_ids: z.array(z.number().int()),
    categories: z.array(z.object({}).partial().strict().passthrough()),
    created_by: z.number().int(),
    created_by_username: z.string(),
    updated_by: z.number().int(),
    updated_by_username: z.string(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
  })
  .strict();
const PlanogramUpdateRequest = z
  .object({
    name: z.string().min(1).max(255),
    season: SeasonC9aEnum.optional(),
    display: z.number().int().optional(),
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    category_ids: z.array(z.number().int()).optional(),
  })
  .strict();
const PatchedPlanogramUpdateRequest = z
  .object({
    name: z.string().min(1).max(255),
    season: SeasonC9aEnum,
    display: z.number().int(),
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    category_ids: z.array(z.number().int()),
  })
  .partial()
  .strict();
const PlanogramUpdate = z
  .object({
    name: z.string().max(255),
    season: SeasonC9aEnum.optional(),
    display: z.number().int().optional(),
    width_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    height_in: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    depth_in: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    shelf_count: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    shelf_spacing: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    category_ids: z.array(z.number().int()).optional(),
  })
  .strict();
const AIOverviewResponse = z.object({ overview: z.string() }).strict();
const GridConfig = z
  .object({
    cols: z.number().int(),
    rows: z.number().int(),
    cellWidthIn: z.number(),
    normalizedWidthIn: z.number(),
    normalizedHeightIn: z.number(),
  })
  .strict();
const LayoutItemMeta = z
  .object({
    id: z.number().int(),
    name: z.string(),
    category: z.string(),
    color: z.string().optional(),
    score: z.number(),
    pack_width_in: z.number(),
    pack_height_in: z.number(),
  })
  .strict();
const LayoutItem = z
  .object({
    i: z.string(),
    x: z.number().int(),
    y: z.number().int(),
    w: z.number().int(),
    h: z.number().int(),
    meta: LayoutItemMeta,
  })
  .strict();
const LayoutRow = z
  .object({
    id: z.number().int(),
    category: z.string().nullable(),
    name: z.string(),
    items: z.array(LayoutItem),
  })
  .strict();
const Layout = z
  .object({ grid: GridConfig, rows: z.array(LayoutRow) })
  .strict();
const GridConfigRequest = z
  .object({
    cols: z.number().int(),
    rows: z.number().int(),
    cellWidthIn: z.number(),
    normalizedWidthIn: z.number(),
    normalizedHeightIn: z.number(),
  })
  .strict();
const LayoutItemMetaRequest = z
  .object({
    id: z.number().int(),
    name: z.string().min(1),
    category: z.string().min(1),
    color: z.string().optional(),
    score: z.number(),
    pack_width_in: z.number(),
    pack_height_in: z.number(),
  })
  .strict();
const LayoutItemRequest = z
  .object({
    i: z.string().min(1),
    x: z.number().int(),
    y: z.number().int(),
    w: z.number().int(),
    h: z.number().int(),
    meta: LayoutItemMetaRequest,
  })
  .strict();
const LayoutRowRequest = z
  .object({
    id: z.number().int(),
    category: z.string().min(1).nullable(),
    name: z.string().min(1),
    items: z.array(LayoutItemRequest),
  })
  .strict();
const LayoutRequest = z
  .object({ grid: GridConfigRequest, rows: z.array(LayoutRowRequest) })
  .strict();
const PlanogramLayoutRequest = z.object({ layout: LayoutRequest }).strict();
const AddProductItem = z
  .object({ id: z.number().int().gte(1), quantity: z.number().int().gte(1) })
  .strict();
const AddProductsRequest = z
  .object({
    row_id: z.number().int().gte(0),
    products: z.array(AddProductItem),
  })
  .strict();
const ProjectList = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    slug: z.string(),
    store_name: z.string(),
    store_code: z.string(),
    created_at: z.string().datetime({ offset: true }),
  })
  .strict();
const PaginatedProjectListList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(ProjectList),
  })
  .strict();
const ProjectCreateRequest = z
  .object({ name: z.string().min(1).max(255), store: z.number().int() })
  .strict();
const Project = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    slug: z.string(),
    store: z.number().int(),
    store_name: z.string(),
    store_code: z.string(),
    store_slug: z.string(),
    company: z.number().int(),
    company_name: z.string(),
    created_by: z.number().int().nullable(),
    created_by_username: z.string(),
    created_at: z.string().datetime({ offset: true }),
  })
  .strict();
const ProjectUpdateRequest = z
  .object({ name: z.string().min(1).max(255) })
  .strict();
const ProjectUpdate = z.object({ name: z.string().max(255) }).strict();
const PatchedProjectUpdateRequest = z
  .object({ name: z.string().min(1).max(255) })
  .partial()
  .strict();
const StoreList = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    store_code: z.string().max(50),
    slug: z.string(),
    company_name: z.string(),
    created_at: z.string().datetime({ offset: true }),
  })
  .strict();
const PaginatedStoreListList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(StoreList),
  })
  .strict();
const StoreCreateRequest = z
  .object({
    name: z.string().min(1).max(255),
    store_code: z.string().min(1).max(50),
    address: z.string().min(1),
  })
  .strict();
const Store = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    store_code: z.string().max(50),
    address: z.string(),
    company: z.number().int(),
    company_name: z.string(),
    slug: z.string(),
    created_by: z.number().int().nullable(),
    created_by_username: z.string(),
    created_at: z.string().datetime({ offset: true }),
  })
  .strict();
const StoreUpdateRequest = z
  .object({ name: z.string().min(1).max(255), address: z.string().min(1) })
  .strict();
const StoreUpdate = z
  .object({ name: z.string().max(255), address: z.string() })
  .strict();
const PatchedStoreUpdateRequest = z
  .object({ name: z.string().min(1).max(255), address: z.string().min(1) })
  .partial()
  .strict();
const PaginatedUserList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(User),
  })
  .strict();
const UserRequest = z
  .object({
    username: z
      .string()
      .min(1)
      .max(150)
      .regex(/^[\w.@+-]+$/),
    email: z.string().max(254).email().optional(),
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    role: RoleEnum.optional(),
    is_active: z.boolean().optional(),
  })
  .strict();
const UserUpdateRequest = z
  .object({
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.string().max(254).email(),
    role: RoleEnum,
  })
  .partial()
  .strict();
const UserUpdate = z
  .object({
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.string().max(254).email(),
    role: RoleEnum,
  })
  .partial()
  .strict();
const PatchedUserUpdateRequest = z
  .object({
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.string().max(254).email(),
    role: RoleEnum,
  })
  .partial()
  .strict();
const UserInviteRequest = z
  .object({
    email: z.string().min(1).email(),
    username: z.string().min(1).max(150),
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    role: RoleEnum.optional().default("member"),
  })
  .strict();
const UserInviteResponse = z
  .object({
    message: z.string(),
    invitation_token: z.string(),
    invitation_link: z.string(),
    user: User,
  })
  .strict();
const PatchedUserRequest = z
  .object({
    username: z
      .string()
      .min(1)
      .max(150)
      .regex(/^[\w.@+-]+$/),
    email: z.string().max(254).email(),
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    role: RoleEnum,
    is_active: z.boolean(),
  })
  .partial()
  .strict();

export const schemas = {
  LoginRequest,
  RoleEnum,
  Company,
  User,
  LogoutResponse,
  RegisterRequestRequest,
  CompanyInfo,
  ValidateInvitationResponse,
  Category,
  CategoryListResponse,
  CategoryChildrenResponse,
  CategoryIdsRequestRequest,
  Product,
  ProductListResponse,
  TypeEnum,
  DisplayCategoryEnum,
  DisplayList,
  PaginatedDisplayListList,
  DisplayCreateRequest,
  Display,
  DisplayUpdateRequest,
  DisplayUpdate,
  PatchedDisplayUpdateRequest,
  PaginatedDisplayList,
  DisplayType,
  PaginatedDisplayTypeList,
  SeasonC9aEnum,
  PlanogramList,
  PaginatedPlanogramListList,
  PlanogramCreateSeasonEnum,
  PlanogramCreateRequest,
  Planogram,
  PlanogramUpdateRequest,
  PatchedPlanogramUpdateRequest,
  PlanogramUpdate,
  AIOverviewResponse,
  GridConfig,
  LayoutItemMeta,
  LayoutItem,
  LayoutRow,
  Layout,
  GridConfigRequest,
  LayoutItemMetaRequest,
  LayoutItemRequest,
  LayoutRowRequest,
  LayoutRequest,
  PlanogramLayoutRequest,
  AddProductItem,
  AddProductsRequest,
  ProjectList,
  PaginatedProjectListList,
  ProjectCreateRequest,
  Project,
  ProjectUpdateRequest,
  ProjectUpdate,
  PatchedProjectUpdateRequest,
  StoreList,
  PaginatedStoreListList,
  StoreCreateRequest,
  Store,
  StoreUpdateRequest,
  StoreUpdate,
  PatchedStoreUpdateRequest,
  PaginatedUserList,
  UserRequest,
  UserUpdateRequest,
  UserUpdate,
  PatchedUserUpdateRequest,
  UserInviteRequest,
  UserInviteResponse,
  PatchedUserRequest,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/api/auth/login/",
    alias: "auth_login_create",
    description: `Login existing user.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LoginRequest,
      },
    ],
    response: User,
  },
  {
    method: "post",
    path: "/api/auth/logout/",
    alias: "auth_logout_create",
    description: `Logout current user.`,
    requestFormat: "json",
    response: z.object({ message: z.string() }).strict(),
  },
  {
    method: "post",
    path: "/api/auth/register/",
    alias: "auth_register_create",
    description: `Register a new user using an invitation token.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: RegisterRequestRequest,
      },
    ],
    response: User,
  },
  {
    method: "get",
    path: "/api/auth/validate-invitation/",
    alias: "auth_validate_invitation_retrieve",
    description: `Validate an invitation token and return company info.`,
    requestFormat: "json",
    parameters: [
      {
        name: "token",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: ValidateInvitationResponse,
  },
  {
    method: "get",
    path: "/api/categories/",
    alias: "categories_retrieve",
    description: `Get top-level categories (e.g., fresh, frozen).`,
    requestFormat: "json",
    response: CategoryListResponse,
  },
  {
    method: "get",
    path: "/api/categories/:category_id/children/",
    alias: "categories_children_retrieve_2",
    description: `Get children categories by parent category ID.`,
    requestFormat: "json",
    parameters: [
      {
        name: "category_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CategoryChildrenResponse,
  },
  {
    method: "get",
    path: "/api/categories/:parent_slug/",
    alias: "categories_retrieve_2",
    description: `Get subcategories under a parent category (e.g., meat, seafood, produce under fresh).`,
    requestFormat: "json",
    parameters: [
      {
        name: "parent_slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: CategoryListResponse,
  },
  {
    method: "get",
    path: "/api/categories/:parent_slug/:tab_slug/",
    alias: "categories_retrieve_3",
    description: `Get selectable categories (with IDs) under a specific tab.`,
    requestFormat: "json",
    parameters: [
      {
        name: "parent_slug",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "tab_slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: CategoryListResponse,
  },
  {
    method: "post",
    path: "/api/categories/by-ids/",
    alias: "categories_by_ids_create",
    description: `Get category names from category IDs.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CategoryIdsRequestRequest,
      },
    ],
    response: CategoryListResponse,
  },
  {
    method: "get",
    path: "/api/categories/children/",
    alias: "categories_children_retrieve",
    description: `Get children categories by parent category ID.`,
    requestFormat: "json",
    response: CategoryChildrenResponse,
  },
  {
    method: "get",
    path: "/api/categories/leaf/",
    alias: "categories_leaf_retrieve",
    description: `Get all leaf categories (categories with products directly, not subcategories).`,
    requestFormat: "json",
    response: CategoryListResponse,
  },
  {
    method: "get",
    path: "/api/categories/path/",
    alias: "categories_path_retrieve",
    description: `Get children at a specific path in the category hierarchy.`,
    requestFormat: "json",
    parameters: [
      {
        name: "season",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: CategoryListResponse,
  },
  {
    method: "get",
    path: "/api/categories/path/:path/",
    alias: "categories_path_retrieve_2",
    description: `Get children at a specific path in the category hierarchy.`,
    requestFormat: "json",
    parameters: [
      {
        name: "path",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "season",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: CategoryListResponse,
  },
  {
    method: "get",
    path: "/api/category/:category_id/products/",
    alias: "category_products_retrieve",
    description: `Get products for a specific category ID with seasonal metrics.`,
    requestFormat: "json",
    parameters: [
      {
        name: "category_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "season",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: ProductListResponse,
  },
  {
    method: "get",
    path: "/api/displays/",
    alias: "displays_list",
    description: `ViewSet for Display CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: PaginatedDisplayListList,
  },
  {
    method: "post",
    path: "/api/displays/",
    alias: "displays_create",
    description: `Create a new custom display.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: DisplayCreateRequest,
      },
    ],
    response: Display,
  },
  {
    method: "get",
    path: "/api/displays/:slug/",
    alias: "displays_retrieve",
    description: `ViewSet for Display CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Display,
  },
  {
    method: "put",
    path: "/api/displays/:slug/",
    alias: "displays_update",
    description: `ViewSet for Display CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: DisplayUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: DisplayUpdate,
  },
  {
    method: "patch",
    path: "/api/displays/:slug/",
    alias: "displays_partial_update",
    description: `ViewSet for Display CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedDisplayUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: DisplayUpdate,
  },
  {
    method: "delete",
    path: "/api/displays/:slug/",
    alias: "displays_destroy",
    description: `Delete a display (cannot delete standard displays).`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/displays/standards/",
    alias: "displays_standards_list",
    description: `Get standard display templates.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: PaginatedDisplayList,
  },
  {
    method: "get",
    path: "/api/displays/types/",
    alias: "displays_types_list",
    description: `Get available display types.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: PaginatedDisplayTypeList,
  },
  {
    method: "get",
    path: "/api/planograms/",
    alias: "planograms_list",
    description: `ViewSet for Planogram CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: PaginatedPlanogramListList,
  },
  {
    method: "post",
    path: "/api/planograms/",
    alias: "planograms_create",
    description: `Create a new planogram with optional display selection.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PlanogramCreateRequest,
      },
    ],
    response: Planogram,
  },
  {
    method: "get",
    path: "/api/planograms/:slug/",
    alias: "planograms_retrieve",
    description: `Retrieve planogram details (no layout).`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Planogram,
  },
  {
    method: "put",
    path: "/api/planograms/:slug/",
    alias: "planograms_update",
    description: `Update planogram. Always regenerates and saves layout, overwriting manual changes.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PlanogramUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Planogram,
  },
  {
    method: "patch",
    path: "/api/planograms/:slug/",
    alias: "planograms_partial_update",
    description: `ViewSet for Planogram CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedPlanogramUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: PlanogramUpdate,
  },
  {
    method: "delete",
    path: "/api/planograms/:slug/",
    alias: "planograms_destroy",
    description: `ViewSet for Planogram CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/planograms/:slug/ai-overview/",
    alias: "planograms_ai_overview_create",
    description: `Generate AI-powered overview of the planogram layout.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ overview: z.string() }).strict(),
  },
  {
    method: "get",
    path: "/api/planograms/:slug/layout/",
    alias: "planograms_layout_retrieve",
    description: `Get planogram layout.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Layout,
  },
  {
    method: "post",
    path: "/api/planograms/:slug/layout/",
    alias: "planograms_layout_create",
    description: `Save planogram layout and return updated planogram data.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PlanogramLayoutRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Planogram,
  },
  {
    method: "post",
    path: "/api/planograms/:slug/layout/add-products/",
    alias: "planograms_layout_add_products_create",
    description: `Add products to planogram layout at specified row.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: AddProductsRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Layout,
  },
  {
    method: "get",
    path: "/api/products/by-categories/",
    alias: "products_by_categories_retrieve",
    description: `Get all products for multiple category IDs with seasonal metrics.`,
    requestFormat: "json",
    parameters: [
      {
        name: "category_ids",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "season",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: ProductListResponse,
  },
  {
    method: "get",
    path: "/api/projects/",
    alias: "projects_list",
    description: `ViewSet for Project CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: PaginatedProjectListList,
  },
  {
    method: "post",
    path: "/api/projects/",
    alias: "projects_create",
    description: `Create a new project.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ProjectCreateRequest,
      },
    ],
    response: Project,
  },
  {
    method: "get",
    path: "/api/projects/:slug/",
    alias: "projects_retrieve",
    description: `ViewSet for Project CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Project,
  },
  {
    method: "put",
    path: "/api/projects/:slug/",
    alias: "projects_update",
    description: `ViewSet for Project CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ name: z.string().min(1).max(255) }).strict(),
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ name: z.string().max(255) }).strict(),
  },
  {
    method: "patch",
    path: "/api/projects/:slug/",
    alias: "projects_partial_update",
    description: `ViewSet for Project CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({ name: z.string().min(1).max(255) })
          .partial()
          .strict(),
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ name: z.string().max(255) }).strict(),
  },
  {
    method: "delete",
    path: "/api/projects/:slug/",
    alias: "projects_destroy",
    description: `ViewSet for Project CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/projects/:slug/planograms/",
    alias: "projects_planograms_retrieve",
    description: `Get all planograms for a specific project.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ planograms: z.array(PlanogramList) }).strict(),
  },
  {
    method: "get",
    path: "/api/stores/",
    alias: "stores_list",
    description: `ViewSet for Store CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: PaginatedStoreListList,
  },
  {
    method: "post",
    path: "/api/stores/",
    alias: "stores_create",
    description: `Create a new store (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: StoreCreateRequest,
      },
    ],
    response: Store,
  },
  {
    method: "get",
    path: "/api/stores/:slug/",
    alias: "stores_retrieve",
    description: `ViewSet for Store CRUD operations.`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Store,
  },
  {
    method: "put",
    path: "/api/stores/:slug/",
    alias: "stores_update",
    description: `Update a store (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: StoreUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: StoreUpdate,
  },
  {
    method: "patch",
    path: "/api/stores/:slug/",
    alias: "stores_partial_update",
    description: `Partially update a store (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedStoreUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: StoreUpdate,
  },
  {
    method: "delete",
    path: "/api/stores/:slug/",
    alias: "stores_destroy",
    description: `Delete a store (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users/",
    alias: "users_list",
    description: `ViewSet for User management (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: PaginatedUserList,
  },
  {
    method: "post",
    path: "/api/users/",
    alias: "users_create",
    description: `ViewSet for User management (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserRequest,
      },
    ],
    response: User,
  },
  {
    method: "get",
    path: "/api/users/:slug/",
    alias: "users_retrieve",
    description: `ViewSet for User management (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: User,
  },
  {
    method: "put",
    path: "/api/users/:slug/",
    alias: "users_update",
    description: `ViewSet for User management (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: UserUpdate,
  },
  {
    method: "patch",
    path: "/api/users/:slug/",
    alias: "users_partial_update",
    description: `ViewSet for User management (admin only).`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedUserUpdateRequest,
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: UserUpdate,
  },
  {
    method: "delete",
    path: "/api/users/:slug/",
    alias: "users_destroy",
    description: `Delete a user (cannot delete admins or self).`,
    requestFormat: "json",
    parameters: [
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/users/invite/",
    alias: "users_invite_create",
    description: `Create an invitation for a new user and return invitation details.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserInviteRequest,
      },
    ],
    response: UserInviteResponse,
  },
  {
    method: "get",
    path: "/api/users/me/",
    alias: "users_me_retrieve",
    description: `Get current user info.`,
    requestFormat: "json",
    response: User,
  },
  {
    method: "patch",
    path: "/api/users/me/username/",
    alias: "users_me_username_partial_update",
    description: `Update current user&#x27;s username.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedUserRequest,
      },
    ],
    response: User,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
