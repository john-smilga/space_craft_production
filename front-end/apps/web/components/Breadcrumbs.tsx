'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  projects: 'Projects',
  planograms: 'Planograms',
  users: 'Users',
  stores: 'Stores',
  displays: 'Displays',
  'my-profile': 'My Profile',
  invite: 'Invite User',
  new: 'New',
  edit: 'Edit',
};

const isDynamicSegment = (segment: string): boolean => {
  // Check if segment looks like an ID (UUID or number)
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment) || /^\d+$/.test(segment);
};

const formatSlug = (slug: string): string => {
  // Convert slug to readable format (e.g., "nyc-001" -> "NYC-001")
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-');
};

const getSegmentLabel = (segment: string, index: number, segments: string[]): string => {
  const parentSegment = index > 0 ? segments[index - 1] : '';

  // Handle store slugs (not numeric IDs)
  if (parentSegment === 'stores' && !isDynamicSegment(segment)) {
    return formatSlug(segment);
  }

  // Handle display slugs (not numeric IDs)
  if (parentSegment === 'displays' && !isDynamicSegment(segment)) {
    return segment
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  // Handle user slugs (not numeric IDs)
  if (parentSegment === 'users' && !isDynamicSegment(segment)) {
    // Convert slug back to readable username format
    return segment
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  // Handle project slugs (format: store_code-project_name)
  if (parentSegment === 'projects' && !isDynamicSegment(segment)) {
    // Extract project name from slug
    // Format: store-code-project-name -> extract "project name"
    // Store codes are typically "CITY-NUMBER" (2 parts) or "CITY" (1 part)
    const parts = segment.split('-');

    // If we have more than 2 parts, assume first 2 are store code (CITY-NUMBER format)
    // If we have 2-3 parts, assume first 1-2 are store code
    // This is a heuristic - not perfect but works for most cases
    if (parts.length > 2) {
      // Likely format: CITY-NUMBER-PROJECT-NAME
      const projectNameParts = parts.slice(2);
      return projectNameParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    } else if (parts.length === 2) {
      // Could be: CITY-PROJECT or CITY-NUMBER
      // If second part looks like a number, it's likely store code, so show both
      // Otherwise, assume first is store code, second is project
      if (/^\d+$/.test(parts[1])) {
        // Second part is a number, so this is likely "CITY-NUMBER" (incomplete slug)
        return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      } else {
        // Second part is not a number, likely "CITY-PROJECT"
        return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      }
    }
    // Fallback: format the whole slug
    return segment
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  // Handle planogram slugs (after planograms segment)
  if (parentSegment === 'planograms' && !isDynamicSegment(segment)) {
    return segment
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  // Handle dynamic segments (IDs)
  if (isDynamicSegment(segment)) {
    if (parentSegment === 'projects') return `Project #${segment}`;
    if (parentSegment === 'layouts') return `Layout #${segment}`;
    return `#${segment}`;
  }

  // Handle known route labels
  const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

  return label;
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on the main dashboard page
  if (pathname === '/dashboard') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const items = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const label = getSegmentLabel(segment, index, segments);
    const isLast = index === segments.length - 1;

    return { path, label, isLast };
  });

  return (
    <Breadcrumb className='mb-6'>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.path}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className='font-medium'>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
