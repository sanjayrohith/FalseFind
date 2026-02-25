import React from 'react';
import { Badge } from '@/components/ui/badge';

// NewsItem interface with required fields
interface NewsItem {
  id: string;
  headline: string;
  category: string;
  timestamp: string;
  animationDelay: number; // in seconds
}

// Sample news data with 4 items covering different categories
const SAMPLE_NEWS: NewsItem[] = [
  {
    id: '1',
    headline: 'Local Community Rallies for Literacy Program',
    category: 'LOCAL',
    timestamp: '2 hours ago',
    animationDelay: 0
  },
  {
    id: '2',
    headline: 'Tech Innovation Summit Announces Breakthrough',
    category: 'TECH',
    timestamp: '4 hours ago',
    animationDelay: 0.2
  },
  {
    id: '3',
    headline: 'Environmental Policy Changes Take Effect',
    category: 'WORLD',
    timestamp: '6 hours ago',
    animationDelay: 0.4
  },
  {
    id: '4',
    headline: 'Markets Show Steady Growth in Q4',
    category: 'BUSINESS',
    timestamp: '8 hours ago',
    animationDelay: 0.6
  }
];

export const NewsTicker = () => {
  return (
    <div className="space-y-4" aria-label="News ticker with sample headlines">
      {SAMPLE_NEWS.map((newsItem) => (
        <article
          key={newsItem.id}
          className="border-2 border-foreground bg-card p-4 space-y-2 news-box-animate"
          style={{ 
            '--animation-delay': `${newsItem.animationDelay}s`
          } as React.CSSProperties}
        >
          {/* Headline */}
          <header>
            <h3 className="font-headline text-sm font-bold leading-tight">
              {newsItem.headline}
            </h3>
          </header>
          
          {/* Category Badge */}
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            {newsItem.category}
          </Badge>
          
          {/* Timestamp */}
          <p className="text-xs text-muted-foreground font-body">
            <time>{newsItem.timestamp}</time>
          </p>
        </article>
      ))}
    </div>
  );
};
