import { useFakeNewsDetector } from '@/hooks/useFakeNewsDetector';
import { NewsInput } from '@/components/NewsInput';
import { VerdictDisplay } from '@/components/VerdictDisplay';
import { ScrapeResultDisplay } from '@/components/ScrapeResultDisplay';
import { HistoryPanel } from '@/components/HistoryPanel';
import { NewsTicker } from '@/components/NewsTicker';
import { Newspaper, Shield, AlertTriangle, Globe } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const {
    isAnalyzing,
    currentResult,
    history,
    analyzeNews,
    clearHistory,
    loadFromHistory,
    error,
    isScraping,
    scrapeResult,
    scrapeError,
    scrapeNews,
  } = useFakeNewsDetector();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isBusy = isAnalyzing || isScraping;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Newspaper texture overlay */}
      <div className="fixed inset-0 opacity-[0.08] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      {/* ===== HEADER — Newspaper Masthead ===== */}
      <header className="border-b-4 border-foreground bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2 text-xs border-b border-border text-muted-foreground">
            <span className="font-mono">Est. 2024</span>
            <span className="font-medium">{currentDate}</span>
            <span className="font-mono">Vol. 1 No. 1</span>
          </div>

          {/* Main masthead */}
          <div className="py-5 sm:py-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px flex-1 bg-foreground max-w-[80px] sm:max-w-[100px]" />
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
              <div className="h-px flex-1 bg-foreground max-w-[80px] sm:max-w-[100px]" />
            </div>
            <h1 className="font-newspaper-title text-3xl sm:text-4xl md:text-6xl tracking-wide">
              The Veritas Tribune
            </h1>
            <p className="font-headline text-xs sm:text-sm md:text-base mt-2 italic text-muted-foreground">
              "Separating Fact from Fiction Since the Digital Age"
            </p>
            <div className="newspaper-divider mt-4 max-w-sm sm:max-w-md mx-auto" />
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="container mx-auto px-4 py-6 sm:py-8 relative">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-foreground text-background text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <Newspaper className="h-3 w-3" />
            News Verification Department
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr,300px] gap-6 lg:gap-8 items-start">

          {/* ===== LEFT COLUMN — News Ticker ===== */}
          <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            <div className="border-r-4 border-foreground pr-4 mb-3">
              <h2 className="font-headline font-bold text-base uppercase tracking-wider flex items-center gap-2">
                Latest Headlines
                <span className="w-6 h-0.5 bg-foreground inline-block" />
              </h2>
            </div>
            <NewsTicker />
          </aside>

          {/* ===== CENTER COLUMN — Main Content ===== */}
          <div className="space-y-6">
            {/* Breaking News Banner */}
            {isBusy && (
              <div className="bg-accent text-accent-foreground py-3 px-4 flex items-center justify-center gap-3">
                <span className="font-headline font-bold uppercase tracking-wider text-sm loading-dot">
                  {isScraping
                    ? '🌐 Breaking: Web Investigation in Progress 🌐'
                    : '⚡ Breaking: Analysis in Progress ⚡'}
                </span>
              </div>
            )}

            {/* Input Card */}
            <NewsInput
              onAnalyze={analyzeNews}
              isAnalyzing={isAnalyzing}
              onScrape={scrapeNews}
              isScraping={isScraping}
            />

            {/* Error displays */}
            {error && (
              <Alert className="border-2 border-destructive bg-destructive/10 card-depth">
                <AlertDescription className="text-sm font-body">{error}</AlertDescription>
              </Alert>
            )}

            {scrapeError && (
              <Alert className="border-2 border-destructive bg-destructive/10 card-depth">
                <AlertDescription className="text-sm font-body">{scrapeError}</AlertDescription>
              </Alert>
            )}

            {/* Results */}
            {currentResult && !isAnalyzing && (
              <VerdictDisplay result={currentResult} />
            )}

            {scrapeResult && !isScraping && (
              <ScrapeResultDisplay result={scrapeResult} />
            )}

            {/* Loading — Scraping */}
            {isScraping && (
              <div className="border-2 border-border bg-card p-10 sm:p-12 text-center relative overflow-hidden card-depth verdict-enter">
                <div className="absolute inset-0 newspaper-texture opacity-30" />
                <div className="relative">
                  <Globe className="h-14 w-14 mx-auto mb-4 text-muted-foreground/60 animate-bounce" />
                  <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2">Scraping the Web…</h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Our investigators are searching the internet for evidence
                  </p>
                  <div className="flex justify-center gap-1.5 mt-5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-foreground/60 rounded-full loading-dot"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Loading — Analyzing */}
            {isAnalyzing && (
              <div className="border-2 border-border bg-card p-10 sm:p-12 text-center relative overflow-hidden card-depth verdict-enter">
                <div className="absolute inset-0 newspaper-texture opacity-30" />
                <div className="relative">
                  <Newspaper className="h-14 w-14 mx-auto mb-4 text-muted-foreground/60 animate-bounce" />
                  <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2">Investigating…</h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Our verification team is examining the evidence
                  </p>
                  <div className="flex justify-center gap-1.5 mt-5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-foreground/60 rounded-full loading-dot"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!currentResult && !scrapeResult && !isBusy && (
              <div className="border-2 border-dashed border-border bg-card/50 p-8 sm:p-10 text-center card-depth">
                <div className="max-w-md mx-auto">
                  <AlertTriangle className="h-10 w-10 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="font-headline text-lg sm:text-xl font-bold mb-2">
                    Submit Your Story for Review
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    In an era of information overload, truth matters. Paste any news headline
                    or article above to run it through our verification analysis, or use
                    <strong> Scrape the Web</strong> to search the internet for corroborating evidence.
                  </p>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <Alert className="border-2 border-foreground bg-secondary/30">
              <AlertDescription className="text-[11px] text-center font-body leading-relaxed">
                <span className="font-bold uppercase tracking-wider">Notice to Readers:</span>{' '}
                This publication is intended for educational and demonstration purposes only.
                Always verify news through multiple reputable sources before sharing.
              </AlertDescription>
            </Alert>
          </div>

          {/* ===== RIGHT COLUMN — History Sidebar ===== */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border-l-4 border-foreground pl-4 mb-3 hidden lg:block">
              <h2 className="font-headline font-bold text-base uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-0.5 bg-foreground inline-block" />
                Archives
              </h2>
            </div>
            <HistoryPanel
              history={history}
              onSelect={loadFromHistory}
              onClear={clearHistory}
            />
          </aside>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t-4 border-foreground mt-10 sm:mt-12 bg-card">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <div className="font-newspaper-title text-xl sm:text-2xl mb-2">The Veritas Tribune</div>
            <p className="text-[11px] text-muted-foreground font-body">
              © 2024 The Veritas Tribune • All Rights Reserved • Fighting Misinformation One Story at a Time
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
