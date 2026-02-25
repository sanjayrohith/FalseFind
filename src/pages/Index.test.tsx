import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import Index from './Index';

/**
 * Feature: newspaper-ui-enhancements, Property 1: Responsive visibility threshold
 * 
 * For any viewport width, when the width is below 1024px, the news ticker component
 * should not be visible (should have hidden class applied)
 * 
 * Validates: Requirements 2.3, 5.1
 */
describe('Index Page Responsive Tests', () => {
  it('Property 1: Responsive visibility threshold - ticker has hidden class for mobile', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // We're testing the static component
        () => {
          const { container } = render(<Index />);
          
          // Find the news ticker aside element
          const tickerAside = container.querySelector('aside.hidden');
          
          // Verify the ticker aside exists and has the hidden class
          expect(tickerAside).not.toBeNull();
          
          // Verify it also has lg:block class for showing on large screens
          expect(tickerAside?.classList.contains('lg:block')).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: newspaper-ui-enhancements, Property 5: Layout adaptation
   * 
   * For any viewport width, when the news ticker visibility changes (shown/hidden),
   * the main content area grid columns should adjust accordingly to maintain proper spacing
   * 
   * Validates: Requirements 5.3
   */
  it('Property 5: Layout adaptation - grid adjusts for different screen sizes', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // We're testing the static component
        () => {
          const { container } = render(<Index />);
          
          // Find the main grid container
          const gridContainer = container.querySelector('.grid');
          
          // Verify the grid exists
          expect(gridContainer).not.toBeNull();
          
          // Verify it has responsive grid classes
          // Should have grid-cols-1 for mobile
          expect(gridContainer?.classList.contains('grid-cols-1')).toBe(true);
          
          // Should have lg:grid-cols-[280px,1fr,320px] for large screens
          const hasLargeGridClass = Array.from(gridContainer?.classList || []).some(
            (className) => className.includes('lg:grid-cols-')
          );
          expect(hasLargeGridClass).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
