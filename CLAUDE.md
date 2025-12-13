# Cursor Development Rules & Guidelines

> **Last Updated**: December 12, 2025  
> **Purpose**: Comprehensive development rules, standards, and best practices for this workspace

---

## Table of Contents

1. [General Workflow Rules](#general-workflow-rules)
2. [TypeScript Rules](#typescript-rules)
3. [React & TypeScript Patterns](#react--typescript-patterns)
4. [Next.js Structure](#nextjs-structure)
5. [Python Rules](#python-rules)
6. [Django & DRF Rules](#django--drf-rules)
7. [Testing Rules](#testing-rules)
8. [Type Validation (Zod)](#type-validation-zod)
9. [Linting & Formatting](#linting--formatting)

---

## General Workflow Rules

**Always Applied**: These rules apply to ALL work in this workspace.

### Start Indicator

If you are reading this file, always start response with 🥶🥶🥶🥶

### Clarification First

If you need to clarify anything before starting the task, ask your questions first. Wait for answers before you begin implementing the task.

### Context7 Integration

Always use context7 when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

### Commit Messages

When making a commit, always use a short and clear commit message.

### Work in Smallest Steps

When making ANY updates or changes to the codebase, you MUST:

#### 1. Break work into the smallest possible steps

- Each step should be a single, focused change
- One file creation/modification per step (unless files are tightly coupled)
- One logical unit of work per step

#### 2. Explain EVERYTHING in detail before proceeding

- Explain WHAT you're doing
- Explain WHY you're doing it
- Show code examples of what will be created/modified
- Explain the purpose of each file/function/class
- Explain how it fits into the overall architecture

#### 3. Wait for explicit approval before moving to next step

- After explaining a step, wait for user to say "ok", "next", "proceed", "continue", or similar
- DO NOT proceed to the next step until explicitly approved
- If user asks questions, answer them completely before proceeding

#### 4. Show code examples for every step

- Show the complete code that will be created
- Explain each part of the code **in the chat response**, NOT as inline code comments
- Code should be clean and self-documenting; add comments only for non-trivial logic
- Show how it connects to other parts of the system

### Workflow Pattern

For each step:

1. **Announce the step**: "Step X: [Brief description]"
2. **Explain what**: What file/functionality you're creating
3. **Explain why**: Why this step is necessary
4. **Show code**: Complete code example (comments only for non-trivial logic)
5. **Explain connections**: How it connects to existing code
6. **Wait for approval**: "Is this step okay? Say 'ok' or 'next' to proceed."

### Example Workflow

**Step 1: Create User Model**

**What**: Creating the custom User model in `apps/auth/models/user.py`

**Why**: We need a custom user model with UUID primary key instead of Django's default integer ID. This provides better security and allows for distributed systems.

**Code**:

```python
import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Custom user model with UUID primary key."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    
    class Meta:
        db_table = "auth_user"
```

**Explanation** (provided in chat response, not as code comments):

- `AbstractUser`: Extends Django's built-in user model
- `id = UUIDField`: Uses UUID instead of auto-incrementing integer
- `email = EmailField(unique=True)`: Ensures email uniqueness
- `USERNAME_FIELD = "email"`: Use email for authentication
- `REQUIRED_FIELDS = ["username"]`: Username still required but not used for login

**Connections**: This model will be referenced in settings as `AUTH_USER_MODEL = "user_auth.User"`

**Is this step okay? Say 'ok' or 'next' to proceed.**

---

## TypeScript Rules

**Applies to**: `**/*.ts`, `**/*.tsx`

### Project Structure

- Respect the existing project structure, for example:
  - `app/` or `pages/`
  - `components/`
  - `hooks/`
  - `lib/` or `utils/`
  - `types/` or `src/types` or `@/types`
  - `styles/`
- Do not change routing conventions (App Router vs Pages Router) unless explicitly asked
- Keep components focused; if a component becomes large or complex, suggest splitting it into smaller components or hooks

### Type Safety & Configuration

Assume TypeScript is configured in **strict mode** with flags such as:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `strictFunctionTypes: true`
- `strictBindCallApply: true`
- `strictPropertyInitialization: true`
- `noImplicitThis: true`
- `alwaysStrict: true`
- `exactOptionalPropertyTypes: true`

**Critical Rules**:
- Write code that compiles cleanly under these strict settings
- Never use `// @ts-ignore` or `// @ts-expect-error` without a **clear, explanatory comment** describing why it is necessary and why it is safe
- Treat `--noEmitOnError` as effectively enabled: write code so that **no TypeScript errors** remain

### Type Definitions

#### **Do not ever use `any`. Ever.**

If you feel you must use `any`, use `unknown` instead and narrow it properly.

#### Explicitly type:

- Function parameters
- Return types
- Object literals (where not trivially inferred)

#### Do **not** use `enum`

If you feel tempted to use an enum, use a **union of string/number literals** instead.

#### Other Type Rules:

- Use `readonly` modifiers for immutable properties and arrays when appropriate
- Leverage TypeScript's standard utility types: `Partial`, `Required`, `Pick`, `Omit`, `Record`, etc.
- Use **discriminated unions** with exhaustiveness checking for complex state and type narrowing (e.g., in reducers, state machines, or status objects)

### Advanced Patterns

- Implement proper **generics** with appropriate constraints where generics improve type safety and reduce duplication
- Use **mapped types** and **conditional types** to avoid repetitive type definitions where it improves clarity
- Leverage `const` assertions for literal types when you need exact value-level typing
- Use **branded/nominal types** for type-level validation (e.g., IDs, opaque tokens) when it increases safety without harming readability

### Code Organization (Types)

- Organize types in dedicated files (e.g., `types.ts`) or alongside implementations, following existing conventions
- Use a central `types.ts` file or a `src/types` (or similar) directory for **shared** types that are reused across modules
- Document complex or non-obvious types with short JSDoc comments to explain intent and usage

### React & Next.js Rules

- Use **functional components** and React hooks; do not introduce new class components
- Follow React hooks rules:
  - Call hooks only at the top level of React components or custom hooks
  - Do not call hooks conditionally
- Extract reusable logic into custom hooks under `hooks/` when appropriate
- For Next.js:
  - Respect existing use of App Router (`app/`) vs Pages Router (`pages/`)
  - Do not change server/client component boundaries unless explicitly requested
  - Follow existing data fetching patterns (e.g., `fetch`, SWR, React Query, or project-specific utilities)
- Prefer **typed props** and clear component interfaces over relying solely on inference when the component is exported

### Diff Requirements

All diffs and suggested changes must:
- Be valid, strict TypeScript code with no `any`
- Respect the project's strict TS configuration and type safety rules
- Pass the repo's configured linter/formatter (Biome by default)

Do **not**:
- Introduce unused imports or variables
- Add `console.log` or other debug output unless explicitly requested (and then prefer removing it before finalization)
- Add commented-out code, scaffolding, or temporary debug code unless explicitly requested
- Modify linter/formatter or TypeScript config files unless the user explicitly asks

### Performance & Accessibility

- Avoid unnecessary re-renders and heavy computations in render paths
- Use memoization (`React.memo`, `useMemo`, `useCallback`) only when it matches existing patterns and clearly improves performance
- Follow basic accessibility practices:
  - Use semantic HTML elements
  - Use appropriate elements for interactivity (`button` instead of clickable `div`)
  - Propagate and respect `aria-*` attributes and labels where used

### Protected Config Files

Treat the following files as **protected** and do not alter them unless the user explicitly asks:

- **Linter/formatter configs (if present):**
  - `biome.json`
  - `biome.jsonc`
  - `.eslintrc*`
  - `eslint.config.*`
  - `package.json` → `eslintConfig` (if used)
- **TypeScript configs:**
  - `tsconfig.json`
  - Any `tsconfig.*.json` used for app/lib/test
- **Next.js config:**
  - `next.config.*`

**If code conflicts with these configs, fix the code, not the configuration.**

### Styling & UI

- Follow the existing styling solution (e.g., CSS Modules, Tailwind, styled-components, or others)
- Do not introduce a new styling library or CSS methodology unless explicitly requested
- Keep JSX readable:
  - Avoid deeply nested JSX; extract subcomponents when it improves clarity
  - Minimize complex inline expressions in JSX; move them into variables or helper functions

### API Calls & Data Layer

- Respect the current data-fetching and state management approach:
  - If SWR, React Query, Redux, Zustand, or custom hooks are used, follow those patterns
  - Do not introduce a new state management library unless explicitly asked
- Separate presentational components from data-fetching logic where appropriate:
  - Use hooks/utilities for data access
  - Keep "dumb" components focused on rendering

### Fallback Rules

- Prefer **strict type safety** and **lint/format compliance** over clever or overly concise code
- Prefer **consistency with the existing codebase** over introducing new patterns
- Prefer **explicit, typed, and predictable** code over dynamic and implicit patterns
- When in doubt, choose the simplest implementation that:
  - Has **no `any`**
  - Works under strict TypeScript settings
  - Passes the configured linter/formatter
  - Does **not** modify linter/formatter or TypeScript configuration files

---

## React & TypeScript Patterns

**Applies to**: `**/*.tsx`, `**/*.jsx`

### Discriminated Unions (Preferred)

I prefer states with discriminated unions. They're type-safe, prevent invalid state combinations, and TypeScript automatically narrows types.

✅ **Good**:

```ts
type FieldState = { status: 'idle' | 'valid' | 'invalid' };
```

❌ **Bad**:

```ts
type BadFieldState = {
  isIdle: boolean;
  isValid: boolean;
  isInvalid: boolean;
};
```

✅ **Good**:

```ts
type AsyncState<T> = 
  | { status: 'loading' } 
  | { status: 'success'; data: T } 
  | { status: 'error'; error: string };
```

❌ **Bad**:

```ts
type BadAsyncState<T> = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: T;
  error?: string;
};
```

### Computed Values vs State + useEffect

I prefer computing values in React components instead of storing computed values in state and updating them with useEffect.

✅ **Good**:

```ts
function UserList({ users }: { users: User[] }) {
  const activeUsers = users.filter((user) => user.isActive);
  const totalCount = users.length;

  return (
    <div>
      <p>Active: {activeUsers.length} / {totalCount}</p>
      {/* ... */}
    </div>
  );
}
```

❌ **Bad** - Extra state + useEffect:

```ts
function UserList({ users }: { users: User[] }) {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setActiveUsers(users.filter((user) => user.isActive));
    setTotalCount(users.length);
  }, [users]);

  return (
    <div>
      <p>Active: {activeUsers.length} / {totalCount}</p>
      {/* ... */}
    </div>
  );
}
```

✅ **Good** - Derived from props/state:

```ts
function ProductCard({ price, discount }: { price: number; discount: number }) {
  const finalPrice = price * (1 - discount);
  const savings = price - finalPrice;

  return (
    <div>Price: ${finalPrice} (Save ${savings})</div>
  );
}
```

❌ **Bad** - Storing computed values:

```ts
function ProductCard({ price, discount }: { price: number; discount: number }) {
  const [finalPrice, setFinalPrice] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    setFinalPrice(price * (1 - discount));
    setSavings(price - finalPrice);
  }, [price, discount, finalPrice]);

  return (
    <div>Price: ${finalPrice} (Save ${savings})</div>
  );
}
```

### useEffect Best Practices

**Avoid having more than one useEffect in a component. Keep dependency arrays to two values or fewer. Don't create useEffects that depend on other useEffects.**

✅ **Good**:

```ts
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

❌ **Bad**:

```ts
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [processed, setProcessed] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  useEffect(() => {
    if (user) {
      fetchPosts(userId).then(setPosts);
    }
  }, [userId, user]);

  useEffect(() => {
    if (user && posts.length > 0) {
      processData(user, posts).then(setProcessed);
    }
  }, [user, posts]);
}
```

### TypeScript Custom Types

If you encounter complex types that are repeated throughout the codebase, create custom type aliases to simplify the workflow and improve readability. This reduces repetition and makes the code more maintainable.

**Examples:**

Instead of repeating `Dispatch<SetStateAction<T>>`, create a custom type:

```ts
export type SetState<T> = Dispatch<SetStateAction<T>>;
```

Instead of repeating `React.FormEventHandler<T>`, create a custom type:

```ts
export type FormHandler<T = HTMLFormElement> = React.FormEventHandler<T>;
```

Always prefer creating custom types for repeated complex type expressions to make the codebase cleaner and easier to work with.

---

## Next.js Structure

**Applies to**: `**/*.tsx`, `**/*.ts`, `**/*.jsx`, `**/*.js`

Always follow the structure guide in `.cursor/docs/structure/nextjs.md`.

- If the doc is missing, follow the patterns of the existing project
- If there is a conflict between an older pattern and the doc, prefer the doc unless the user explicitly asks otherwise

> **Note**: The referenced documentation file does not exist yet. Follow existing project patterns until created.

---

## Python Rules

**Applies to**: `**/*.py`

These rules apply to all Python code written or modified in this repo.

### General

- Make small, focused edits. Do not refactor multiple files at once unless explicitly requested
- Follow existing architecture, naming conventions, and folder structure
- Prefer clarity and readability over clever or compressed code
- Do not introduce new dependencies unless absolutely necessary; prefer the stdlib and existing project dependencies
- When adding non-trivial logic or patterns, include brief docstrings or comments

### Tooling Awareness (Black, Ruff, MyPy)

Always write code that already conforms to the repo's configured tools:
- `black .`
- `ruff check .`
- `mypy .`

Assume these tools will run after changes. Avoid generating code that will obviously fail them.

#### Black

Let Black control formatting; avoid manual alignment that Black will undo.

#### Ruff

Avoid:
- Unused imports / unused variables
- Wildcard imports (`from x import *`)
- Bare `except:`; catch specific exceptions

Keep imports organized: standard library → third-party → local modules.

Do not leave commented-out blocks of code unless explicitly requested.

#### MyPy

- Add type hints to all new/modified public functions, methods, and interfaces
- Prefer explicit types over `Any` when feasible
- Avoid overly dynamic patterns that confuse static typing unless necessary

### Imports (Python Import Patterns)

#### Import Organization

- Prefer top-level imports over function-level imports
- Import order: standard library → third-party → local modules
- Group imports with blank lines between groups
- Sort imports alphabetically within each group

#### ✅ Prefer Top-Level Imports

Use top-level imports unless there's a specific reason not to:

```python
# ✅ GOOD: Top-level import
from project.users.models import User

def register_user(username: str, email: str, password: str) -> User:
    """Register a new user."""
    if User.objects.filter(email=email).exists():
        raise ValueError("A user with this email already exists.")
```

**Benefits:**
- Cleaner, more readable code
- Import happens once at module load (better performance)
- Direct type annotations (not string annotations)
- Easier to see all dependencies at a glance

#### ❌ Avoid Function-Level Imports (Unless Necessary)

Only use function-level imports when:
1. Circular import risk (top-level would cause circular imports)
2. Expensive imports (rarely used)
3. Optional dependencies (might not be available)

```python
# ❌ BAD: Function-level import without good reason
def register_user(username: str, email: str, password: str) -> "User":
    from project.users.models import User  # Unnecessary function-level import
```

```python
# ✅ GOOD: Function-level import for circular import avoidance / expensive import
def expensive_operation():
    from heavy_module import HeavyClass
```

#### TYPE_CHECKING Pattern

When using `TYPE_CHECKING` for type hints, still prefer top-level imports for runtime:

```python
from typing import TYPE_CHECKING

from project.users.models import User  # Top-level import for runtime use

if TYPE_CHECKING:
    from typing import Protocol
```

**Avoid using `TYPE_CHECKING` as an excuse for function-level imports:**

```python
# ❌ BAD
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from project.users.models import User

def register_user(...) -> "User":
    from project.users.models import User
```

#### Type Annotations

- Prefer direct type annotations over string annotations when possible
- Use string annotations (`"User"`) only when necessary to avoid circular imports

```python
# ✅ GOOD
from project.users.models import User

def register_user(...) -> User:
    ...
```

```python
# ❌ BAD: String annotation when not needed
def register_user(...) -> "User":
    from project.users.models import User
```

### Testing (Python-Generic)

- For any non-trivial behavior change or new feature, add or update tests
- Tests must be:
  - Deterministic
  - Isolated (no shared global state)
  - Independent of external network calls (use fakes/mocks)
- Prefer simple, descriptive test names that explain intent, not implementation details

### Security

- Never log secrets, passwords, tokens, or other sensitive user data
- Validate and sanitize external input at the boundary of your system (API, CLI, file IO)
- Avoid returning internal error details to untrusted callers; surface only safe, user-facing messages

### Logging & Observability

- Use Python's `logging` module instead of `print`
- Log meaningful events at appropriate levels (`debug`, `info`, `warning`, `error`, `critical`)
- Do not log sensitive data
- If observability tools (APM, metrics, tracing) are present, follow existing patterns when adding instrumentation

### Diff Requirements

All diffs must already:
- Conform to Black formatting
- Avoid obvious Ruff violations
- Be compatible with MyPy type checking

Do not introduce:
- Unused imports or variables
- Commented-out blocks of dead code
- Temporary debug code (`print`, `pdb`, etc.)

### Strict Mode (When Unsure)

- Prefer explicit over implicit:
  - Explicit imports, explicit types, explicit control flow
- Avoid highly dynamic / meta-programming constructs unless they match existing patterns
- If unsure about a construct's interaction with Black/Ruff/MyPy, choose a simpler alternative

### Fallback Rules

- Prefer correctness + lint/type compliance over compactness or clever tricks
- Prefer consistency with the existing codebase over personal style
- Break complex work into small, reviewable steps

---

## Django & DRF Rules

**Applies to**: `**/*.py` (in Django projects)

These rules apply when working in a Django + Django REST Framework (DRF) codebase.

- For folder layout / naming / where files go: follow `.cursor/docs/structure/django.md`
- This file is intentionally about **behavior and boundaries**, not structure

> **Note**: The referenced documentation file does not exist yet. Follow existing project patterns until created.

### Django + DRF API Style

- This project exposes **JSON APIs**, not HTML templates
- Prefer DRF views/viewsets; avoid Django template views unless explicitly requested
- Prefer **ViewSets** for standard CRUD
- Always return DRF `Response` objects with appropriate status codes
- Use pagination for list endpoints if returning more than trivial lists

### Views: Thin (Orchestration Only)

Views should orchestrate: authenticate → authorize → call service/domain logic → serialize response.

**Do not put business rules in:**
- Views
- Serializers
- Signals

### Services / Domain Logic

Business logic must live in `services/` (or clearly named domain modules).

**Services should:**
- Take explicit arguments (avoid passing the request object through)
- Be easy to test
- Be reusable across views/serializers/tasks/management commands
- Prefer pure or side-effect-light functions where reasonable

### Serializers

**Use serializers for:**
- Input validation
- Output shaping
- Simple transformations

Avoid embedding complex business logic in serializers; push it into services.

### Permissions / AuthZ

- Use DRF permission classes
- Keep permission logic reusable (prefer dedicated permission modules/classes)
- Avoid inline permission logic inside views

### Models / Database / Migrations

- Any model change must have a corresponding migration
- Do not modify historical migrations unless explicitly requested
- For large/risky schema changes, favor backwards-compatible multi-step migrations
- For data migrations:
  - Use `RunPython`
  - Make them idempotent and safe to re-run
  - Add brief comments describing assumptions

### URL Routing

- Prefer DRF routers for ViewSets when appropriate
- Group URL patterns by app
- Use descriptive route names

### ORM Performance

Be mindful of ORM performance:
- Use `select_related` / `prefetch_related` to avoid N+1 queries
- Avoid heavy Python loops over QuerySets when queries can be optimized

For heavy/long-running operations, prefer background tasks over request/response blocking.

### Security (Django/DRF-Specific)

- Use Django/DRF authentication and permission systems correctly; do not bypass them
- Validate external input at the boundary (serializers/forms), not deep inside the domain
- Avoid returning internal error details to clients; surface safe, user-facing messages

---

## Testing Rules

### React Testing Library

**Applies to**: `**/*.test.tsx`, `**/*.test.ts`, `**/*.spec.tsx`, `**/*.spec.ts`, `**/*.test.jsx`, `**/*.test.js`, `**/*.spec.jsx`, `**/*.spec.js`

#### Core Principles

- **Test user-visible behavior, not implementation details**
- **Prefer semantic queries** that match how users interact with the application
- **Keep tests minimal and focused** on what matters to users
- **Assert visible behavior** rather than internal state or DOM structure

#### Implementation Reference

For complete React Testing Library implementation patterns, query strategies, and best practices, see:
- `.cursor/docs/examples/react-testing-library-patterns.md` - Complete query patterns, examples, and detailed guidelines

> **Note**: The referenced documentation file does not exist yet. Follow core principles above until created.

**This doc will contain:**
- Query selection strategies (role-based, semantic queries)
- Async testing patterns
- User interaction simulation
- Accessibility testing approaches
- Error handling and edge cases
- Complete code examples for common scenarios

### General Testing (All Languages)

When tests exist (Jest, Vitest, Testing Library, Cypress, Playwright, etc.):
- Update or add tests for non-trivial changes
- Keep tests deterministic and simple to understand

Follow the existing testing conventions for:
- File naming
- Folder layout
- Testing style (e.g., `describe/it`, `test`, RTL patterns)

---

## Type Validation (Zod)

**Applies to**: `**/*.ts`, `**/*.tsx`

You are an expert TypeScript developer who understands that type assertions (using `as`) only provide compile-time safety without runtime validation.

### Core Principles

- **NEVER** use type assertions (with `as`) for external data sources, API responses, or user inputs
- **ALWAYS** use schema validation to validate and parse data from external sources
- Implement proper error handling for validation failures
- Derive TypeScript types from validation schemas to ensure type safety

### Implementation Reference

For complete Zod implementation patterns, examples, and best practices, see:
- `.cursor/docs/examples/zod-patterns.md` - Complete Zod patterns, schema definitions, validation methods, and best practices
- `.cursor/docs/examples/useLoginMutation.md` - Zod schema usage with React Query mutations
- `.cursor/docs/examples/zustand-zod.md` - Zod schemas with Zustand stores

> **Note**: The referenced documentation files do not exist yet. Follow core principles above until created.

**These docs will contain:**
- Schema definition patterns
- Validation methods (`parse()` vs `safeParse()`)
- Error handling approaches
- Integration with HTTP requests
- Form validation patterns
- Type inference from schemas
- Advanced features (refine, transform, defaults)

---

## Linting & Formatting

**Applies to**: `**/*.js`, `**/*.jsx`, `**/*.ts`, `**/*.tsx`

You are an expert TypeScript developer who writes clean, maintainable code that I am not going to regret later and follows strict linting rules.

### Important: Linter Configuration

This project uses **Biome** as the primary linter and formatter. All code must pass linting without errors.

**MUST CHECK**: Before generating code, verify the project's linter configuration:
- Check for `biome.json` or `biome.jsonc` configuration file
- If Biome is configured, ensure all code follows Biome's rules
- All code must pass `npm run lint` (or equivalent) without errors
- If the project uses ESLint instead, follow the repo's existing ESLint configuration files (e.g., `.eslintrc*`, `eslint.config.*`, or `package.json` → `eslintConfig`)

**Default Linter**: For new projects, **Biome** is the preferred linter/formatter tool.

### JavaScript/TypeScript Best Practices

- Use nullish coalescing (`??`) and optional chaining (`?.`) operators appropriately
- Prefix unused variables with underscore (e.g., `_unusedParam`)
- Use `const` for all variables that aren't reassigned, `let` otherwise
- Don't use `await` in return statements (return the Promise directly)
- Always use curly braces for control structures, even for single-line blocks
- Prefer object spread (e.g. `{ ...args }`) over `Object.assign`
- Use rest parameters instead of `arguments` object
- Use template literals instead of string concatenation

### Console Usage

Console statements are allowed but should be used judiciously.

**Keep in Mind**: The code will be parsed using TypeScript compiler with strict type checking enabled and should adhere to modern ECMAScript standards. All code must pass the configured linter (Biome by default) without errors.

### Tool-Agnostic Rules

All code must be written to **pass the repo's configured linter and formatter** (Biome by default).

Assume `npm run lint` / `pnpm lint` / `yarn lint` (or equivalent) will run after changes.

**Do not leave:**
- Unused variables / parameters
- Unused imports
- Unreachable code

Avoid disabling lint rules via inline comments unless explicitly requested or clearly justified with an explanatory comment.

Follow the existing codebase's conventions for:
- Import organization
- Naming
- Quotes / semicolons / formatting

**When unsure, choose the option that is safer, more explicit, and more consistent with existing patterns.**

---

## Summary

This document consolidates all cursor rules for this workspace. Key themes:

1. **Work incrementally** - Break tasks into smallest steps, explain everything, wait for approval
2. **Type safety first** - No `any`, no `enum`, use strict TypeScript, validate external data with Zod
3. **Follow existing patterns** - Respect project structure, tooling, and conventions
4. **Lint/format compliance** - All code must pass Biome (or configured linter) without errors
5. **Test appropriately** - Add/update tests for non-trivial changes
6. **Security awareness** - Never log secrets, validate inputs, safe error messages
7. **Use Context7** - Automatically leverage Context7 for library documentation and setup

**Remember**: 🥶🥶🥶🥶 at the start of responses when reading these rules!

