/**
 * @deprecated Category colors are now assigned on the backend.
 * This file is kept for backward compatibility only.
 *
 * Colors are now included in the layout item meta from the backend.
 * Use item.meta.color directly instead of calling this function.
 */

/**
 * Default color for null/empty categories
 */
const DEFAULT_CATEGORY_COLOR = '#9ca3af'; // Gray

/**
 * @deprecated Use item.meta.color from backend instead.
 * Fallback function for backward compatibility.
 */
export function getCategoryColor(category: string | null): string {
  return DEFAULT_CATEGORY_COLOR;
}

/**
 * @deprecated Colors are now assigned on the backend.
 * This function is no longer needed.
 */
export function initializeCategoryColors(_categories: string[]): void {
  // No-op: colors are now assigned on the backend
}
