'use client';

import { useState } from 'react';
import TopLevelCategorySelector from './TopLevelCategorySelector';
import CategoryTabs from './CategoryTabs';
import { Label } from '@/components/ui/label';

interface CategorySelectorProps {
  selectedCategoryIds: number[];
  onCategoriesChange: (categoryIds: number[]) => void;
}

export default function CategorySelector({ selectedCategoryIds, onCategoriesChange }: CategorySelectorProps) {
  const [selectedTopLevel, setSelectedTopLevel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTopLevelSelect = (slug: string) => {
    if (slug === '') {
      setSelectedTopLevel(null);
      setActiveTab(null);
      onCategoriesChange([]);
    } else {
      setSelectedTopLevel(slug);
      setActiveTab(null); // Reset tab when top-level changes
      onCategoriesChange([]); // Clear selections when changing top-level
    }
  };

  const handleTabClick = (tabSlug: string) => {
    // If switching to a different tab, clear selected categories
    if (activeTab && activeTab !== tabSlug && selectedCategoryIds.length > 0) {
      onCategoriesChange([]);
    }
    setActiveTab(tabSlug);
  };

  const handleCategoryToggle = (categoryId: number) => {
    if (selectedCategoryIds.includes(categoryId)) {
      onCategoriesChange(selectedCategoryIds.filter((id) => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategoryIds, categoryId]);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <Label>
          Categories <span className='text-destructive'>*</span>
        </Label>
      </div>

      <TopLevelCategorySelector selectedTopLevel={selectedTopLevel} onSelect={handleTopLevelSelect} />

      {selectedTopLevel && <CategoryTabs parentSlug={selectedTopLevel} activeTab={activeTab} onTabClick={handleTabClick} selectedCategoryIds={selectedCategoryIds} onCategoryToggle={handleCategoryToggle} />}
    </div>
  );
}
