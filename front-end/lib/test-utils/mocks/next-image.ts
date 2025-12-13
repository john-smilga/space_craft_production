import React from 'react';
import { vi } from 'vitest';

// Mock next/image component
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement('img', { ...props, alt: props.alt });
  },
}));








