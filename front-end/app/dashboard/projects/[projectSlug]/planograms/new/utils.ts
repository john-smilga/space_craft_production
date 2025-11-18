// Helper to get the top-level category group from a category path
export const getTopLevelGroup = (categoryPath: string): string | null => {
  const parts = categoryPath.split('/');
  if (parts.length >= 1) {
    return parts[0]; // e.g., "fresh" from "fresh/meat/beef"
  }
  return null;
};

// Helper to format category display name
export const getCategoryDisplayName = (categoryPath: string): string => {
  // Convert "fresh/meat/beef" to "Beef"
  const parts = categoryPath.split('/');
  const lastPart = parts[parts.length - 1];
  return lastPart
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
