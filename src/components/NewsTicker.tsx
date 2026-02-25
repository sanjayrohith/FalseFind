import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface NewsItem {
  headline: string;
  category: string;
  url: string;
  source: string;
  published_at: string;
  time_ago?: string;
  image?: string;
}

const HEADLINES_API = 'http://127.0.0.1:8000/headlines';

// Static fallback shown while loading or if API fails
const FALLBACK: NewsItem[] = [
  { headline: 'Global Leaders Discuss New Trade Agreements', category: 'POLITICS', url: '', source: '', published_at: '', time_ago: '' },
  { headline: 'AI Breakthrough Enables Faster Drug Discovery', category: 'TECH', url: '', source: '', published_at: '', time_ago: '' },
  { headline: 'Stock Markets Rally on Strong Earnings Reports', category: 'BUSINESS', url: '', source: '', published_at: '', time_ago: '' },
  { headline: 'Award-Winning Film Director Announces New Project', category: 'ENTERTAINMENT', url: '', source: '', published_at: '', time_ago: '' },
  { headline: 'UN Launches Initiative for Climate Resilience', category: 'WORLD', url: '', source: '', published_at: '', time_ago: '' },
];

export const NewsTicker = () => {
  const [headlines, setHeadlines] = useState<NewsItem[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchHeadlines = async () => {
      try {
        const resp = await fetch(HEADLINES_API);
        if (!resp.ok) throw new Error('Failed');
        const data = await resp.json();
        if (!cancelled && data.headlines?.length) {
          setHeadlines(data.headlines);
        }
      } catch {
        // Keep fallback headlines
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchHeadlines();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-4" aria-label="Latest headlines from around the world">
      {loading && (
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-xs font-headline uppercase tracking-wider">Loading headlines…</span>
        </div>
      )}
      {headlines.map((newsItem, index) => {
        const content = (
          <article
            key={index}
            className="border-2 border-foreground bg-card p-4 space-y-2 news-box-animate hover:bg-secondary/30 transition-colors"
            style={{
              '--animation-delay': `${index * 0.15}s`
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

            {/* Source + Time */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
              {newsItem.source && (
                <span className="font-mono truncate max-w-[120px]">{newsItem.source}</span>
              )}
              {newsItem.source && newsItem.time_ago && <span>·</span>}
              {newsItem.time_ago && <time>{newsItem.time_ago}</time>}
            </div>
          </article>
        );

        // Wrap in a link if URL exists
        if (newsItem.url) {
          return (
            <a
              key={index}
              href={newsItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          );
        }
        return content;
      })}
    </div>
  );
};
