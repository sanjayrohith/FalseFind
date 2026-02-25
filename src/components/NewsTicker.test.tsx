import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { NewsTicker } from './NewsTicker';

describe('NewsTicker Unit Tests', () => {
  it('renders without errors', () => {
    const { container } = render(<NewsTicker />);
    expect(container).toBeTruthy();
  });

  it('renders correct number of news boxes', () => {
    const { container } = render(<NewsTicker />);
    const newsBoxes = container.querySelectorAll('.border-2.border-foreground');
    expect(newsBoxes.length).toBe(4); // SAMPLE_NEWS has 4 items
  });

  it('each box contains headline, category, and timestamp', () => {
    const { container } = render(<NewsTicker />);
    const newsBoxes = container.querySelectorAll('.border-2.border-foreground');
    
    newsBoxes.forEach((newsBox) => {
      // Check for headline
      const headline = newsBox.querySelector('h3.font-headline');
      expect(headline).not.toBeNull();
      expect(headline?.textContent).toBeTruthy();
      
      // Check for category badge
      const categoryBadge = newsBox.querySelector('.inline-flex');
      expect(categoryBadge).not.toBeNull();
      expect(categoryBadge?.textContent).toBeTruthy();
      
      // Check for timestamp
      const timestamp = newsBox.querySelector('p.text-muted-foreground');
      expect(timestamp).not.toBeNull();
      expect(timestamp?.textContent).toBeTruthy();
    });
  });
});

/**
 * Feature: newspaper-ui-enhancements, Property 2: News box structure completeness
 * 
 * For any rendered news box, it should contain all three required child elements:
 * a headline element, a category badge element, and a timestamp element
 * 
 * Validates: Requirements 3.3
 */
describe('NewsTicker Property Tests', () => {
  it('Property 2: News box structure completeness - all news boxes contain headline, category badge, and timestamp', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // We're testing the static component
        () => {
          const { container } = render(<NewsTicker />);
          
          // Get all news boxes - they are the direct children with border-2 class
          const newsBoxes = container.querySelectorAll('.border-2.border-foreground');
          
          // Verify we have news boxes to test (should be 4 based on SAMPLE_NEWS)
          expect(newsBoxes.length).toBeGreaterThan(0);
          
          // For each news box, verify it contains all required elements
          newsBoxes.forEach((newsBox) => {
            // Check for headline element (h3 with font-headline class)
            const headline = newsBox.querySelector('h3.font-headline');
            expect(headline).not.toBeNull();
            expect(headline?.textContent?.trim()).not.toBe('');
            
            // Check for category badge element (div with inline-flex from Badge component)
            const categoryBadge = newsBox.querySelector('.inline-flex');
            expect(categoryBadge).not.toBeNull();
            expect(categoryBadge?.textContent?.trim()).not.toBe('');
            
            // Check for timestamp element (p with text-muted-foreground)
            const timestamp = newsBox.querySelector('p.text-muted-foreground');
            expect(timestamp).not.toBeNull();
            expect(timestamp?.textContent?.trim()).not.toBe('');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: newspaper-ui-enhancements, Property 3: Animation duration bounds
   * 
   * For any CSS animation or transition applied to news boxes, the duration value
   * should be greater than or equal to 0.3s and less than or equal to 1.5s
   * 
   * Validates: Requirements 4.1
   */
  it('Property 3: Animation duration bounds - animation duration is between 0.3s and 1.5s', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // We're testing the static component
        () => {
          const { container } = render(<NewsTicker />);
          
          // Get all news boxes with animation class
          const newsBoxes = container.querySelectorAll('.news-box-animate');
          
          // Verify we have news boxes to test
          expect(newsBoxes.length).toBeGreaterThan(0);
          
          // For each news box, verify animation duration is within bounds
          newsBoxes.forEach((newsBox) => {
            const computedStyle = window.getComputedStyle(newsBox);
            const animationDuration = computedStyle.animationDuration;
            
            // Parse duration (format: "0.6s" or "600ms")
            let durationInSeconds = 0;
            if (animationDuration.endsWith('s') && !animationDuration.endsWith('ms')) {
              durationInSeconds = parseFloat(animationDuration);
            } else if (animationDuration.endsWith('ms')) {
              durationInSeconds = parseFloat(animationDuration) / 1000;
            }
            
            // Verify duration is within bounds (0.3s to 1.5s)
            expect(durationInSeconds).toBeGreaterThanOrEqual(0.3);
            expect(durationInSeconds).toBeLessThanOrEqual(1.5);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: newspaper-ui-enhancements, Property 4: Animation delay progression
   * 
   * For any sequence of news boxes, each subsequent box should have an animation-delay
   * value greater than or equal to the previous box's delay, creating a staggered effect
   * 
   * Validates: Requirements 4.2
   */
  it('Property 4: Animation delay progression - delays are in ascending order', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // We're testing the static component
        () => {
          const { container } = render(<NewsTicker />);
          
          // Get all news boxes with animation class
          const newsBoxes = Array.from(container.querySelectorAll('.news-box-animate'));
          
          // Verify we have news boxes to test
          expect(newsBoxes.length).toBeGreaterThan(0);
          
          // Extract animation delays
          const delays: number[] = [];
          newsBoxes.forEach((newsBox) => {
            const computedStyle = window.getComputedStyle(newsBox);
            const animationDelay = computedStyle.animationDelay;
            
            // Parse delay (format: "0s", "0.2s", "200ms", etc.)
            let delayInSeconds = 0;
            if (animationDelay.endsWith('s') && !animationDelay.endsWith('ms')) {
              delayInSeconds = parseFloat(animationDelay);
            } else if (animationDelay.endsWith('ms')) {
              delayInSeconds = parseFloat(animationDelay) / 1000;
            }
            
            delays.push(delayInSeconds);
          });
          
          // Verify delays are in ascending order (or equal)
          for (let i = 1; i < delays.length; i++) {
            expect(delays[i]).toBeGreaterThanOrEqual(delays[i - 1]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
