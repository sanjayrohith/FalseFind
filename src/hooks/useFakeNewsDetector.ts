import { useState, useEffect } from 'react';

export interface AnalysisResult {
  id: string;
  text: string;
  title: string;
  content: string;
  claimedSource: string;
  fakeNews: {
    label: string;
    confidence: number;
  };
  styleAnalysis: {
    predictedSource: string;
    confidence: number;
  };
  impersonationDetected: boolean;
  timestamp: Date;
}

export interface ScrapeSource {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

export interface ScrapeResult {
  queryUsed: string;
  sourcesFound: number;
  sources: ScrapeSource[];
  summary: string; // "SUPPORTED" | "DISPUTED" | "MIXED" | "UNVERIFIED"
  timestamp: Date;
}

const API_URL = 'http://127.0.0.1:8000/analyze';
const SCRAPE_API_URL = 'http://127.0.0.1:8000/scrape-verify';

const deriveTitle = (text: string) => {
  const normalized = text.trim().replace(/\s+/g, ' ');
  if (!normalized) {
    return '';
  }
  const sentenceMatch = normalized.match(/[^.!?]+[.!?]/);
  if (sentenceMatch?.[0]) {
    return sentenceMatch[0].trim().replace(/[.!?]+$/, '');
  }
  const words = normalized.split(' ');
  return words.slice(0, 12).join(' ').trim();
};

export function useFakeNewsDetector() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Scrape state
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult | null>(null);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('newsCheckHistory');
    if (saved) {
      const parsed = JSON.parse(saved)
        .filter((item: AnalysisResult) => item?.fakeNews && item?.styleAnalysis)
        .map((item: AnalysisResult) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      setHistory(parsed);
    }
  }, []);

  const saveToHistory = (result: AnalysisResult) => {
    const updated = [result, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('newsCheckHistory', JSON.stringify(updated));
  };

  const analyzeNews = async (text: string, claimedSource: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return null;
    }

    const normalizedClaimedSource = (claimedSource || 'UNKNOWN').toUpperCase();

    setError(null);
    setIsAnalyzing(true);

    const title = deriveTitle(trimmedText);
    const payload = {
      title,
      content: trimmedText,
      claimed_source: normalizedClaimedSource
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }

      const data = await response.json();

      const result: AnalysisResult = {
        id: crypto.randomUUID(),
        text: trimmedText,
        title,
        content: trimmedText,
        claimedSource: normalizedClaimedSource,
        fakeNews: {
          label: data?.fake_news?.label ?? 'UNKNOWN',
          confidence: data?.fake_news?.confidence ?? 0
        },
        styleAnalysis: {
          predictedSource: data?.style_analysis?.predicted_source ?? 'UNKNOWN',
          confidence: data?.style_analysis?.confidence ?? 0
        },
        impersonationDetected: normalizedClaimedSource === 'UNKNOWN'
          ? false
          : Boolean(data?.impersonation_detected),
        timestamp: new Date()
      };

      setCurrentResult(result);
      saveToHistory(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to analyze this story right now.');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scrapeNews = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return null;
    }

    setScrapeError(null);
    setScrapeResult(null);
    setIsScraping(true);

    try {
      const response = await fetch(SCRAPE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: trimmedText })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Scrape request failed with status ${response.status}`);
      }

      const data = await response.json();

      const result: ScrapeResult = {
        queryUsed: data?.query_used ?? '',
        sourcesFound: data?.sources_found ?? 0,
        sources: (data?.sources ?? []).map((s: Record<string, string>) => ({
          title: s.title ?? '',
          url: s.url ?? '',
          snippet: s.snippet ?? '',
          domain: s.domain ?? '',
        })),
        summary: data?.summary ?? 'UNVERIFIED',
        timestamp: new Date(),
      };

      setScrapeResult(result);
      return result;
    } catch (err) {
      setScrapeError(err instanceof Error ? err.message : 'Unable to scrape the web right now.');
      return null;
    } finally {
      setIsScraping(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('newsCheckHistory');
  };

  const loadFromHistory = (result: AnalysisResult) => {
    setCurrentResult(result);
  };

  return {
    isAnalyzing,
    currentResult,
    history,
    analyzeNews,
    clearHistory,
    loadFromHistory,
    setCurrentResult,
    error,
    // Scrape
    isScraping,
    scrapeResult,
    scrapeError,
    scrapeNews,
  };
}

