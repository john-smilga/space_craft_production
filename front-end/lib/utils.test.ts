import { describe, it, expect } from 'vitest';
import { formatDate } from './utils';

describe('formatDate', () => {
  it('should format a valid date string to short date format', () => {
    const result = formatDate('2024-01-15T10:30:00Z');
    expect(result).toBe('Jan 15, 2024');
  });

  it('should return "N/A" for null input', () => {
    const result = formatDate(null);
    expect(result).toBe('N/A');
  });

  it('should return "N/A" for undefined input', () => {
    const result = formatDate(undefined);
    expect(result).toBe('N/A');
  });

  it('should return "N/A" for empty string', () => {
    const result = formatDate('');
    expect(result).toBe('N/A');
  });

  it('should handle different months correctly', () => {
    const marchDate = formatDate('2024-03-10T12:00:00Z');
    const decDate = formatDate('2024-12-25T12:00:00Z');
    const julyDate = formatDate('2024-07-04T12:00:00Z');
    
    expect(marchDate).toMatch(/Mar \d{1,2}, 2024/);
    expect(decDate).toMatch(/Dec 2[45], 2024/);
    expect(julyDate).toMatch(/Jul [34], 2024/);
  });

  it('should handle leap year dates', () => {
    const result = formatDate('2024-02-29T12:00:00Z');
    expect(result).toMatch(/Feb (28|29), 2024/);
  });

  it('should handle dates from different years', () => {
    const june2023 = formatDate('2023-06-15T12:00:00Z');
    const nov2025 = formatDate('2025-11-20T12:00:00Z');
    
    expect(june2023).toMatch(/Jun 1[45], 2023/);
    expect(nov2025).toMatch(/Nov (19|20), 2025/);
  });

  it('should handle dates with time components', () => {
    const result = formatDate('2024-08-30T23:59:59Z');
    expect(result).toBe('Aug 30, 2024');
  });

  it('should handle ISO date strings without time', () => {
    const result = formatDate('2024-05-10');
    expect(result).toMatch(/May (9|10), 2024/);
  });
});

