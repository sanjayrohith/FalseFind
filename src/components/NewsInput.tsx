import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, Loader2, FileText, Globe } from 'lucide-react';

interface NewsInputProps {
  onAnalyze: (text: string, claimedSource: string) => void;
  isAnalyzing: boolean;
  onScrape: (text: string) => void;
  isScraping: boolean;
}

export function NewsInput({ onAnalyze, isAnalyzing, onScrape, isScraping }: NewsInputProps) {
  const [text, setText] = useState('');
  const [claimedSource, setClaimedSource] = useState('UNKNOWN');

  const handleSubmit = () => {
    if (text.trim().length > 0) {
      onAnalyze(text.trim(), claimedSource || 'UNKNOWN');
    }
  };

  const handleScrape = () => {
    if (text.trim().length > 0) {
      onScrape(text.trim());
    }
  };

  const isBusy = isAnalyzing || isScraping;
  const hasText = text.trim().length > 0;

  return (
    <div className="border-2 border-foreground bg-card relative overflow-hidden card-depth-lg">
      {/* Newspaper texture */}
      <div className="absolute inset-0 newspaper-texture opacity-30 pointer-events-none" />

      {/* Header band */}
      <div className="bg-foreground text-background px-5 py-3.5 flex items-center gap-3">
        <FileText className="h-5 w-5" />
        <h2 className="font-headline font-bold uppercase tracking-wider text-sm">
          Submit Article for Verification
        </h2>
      </div>

      <div className="p-5 sm:p-7 relative space-y-5">
        <div className="space-y-4">
          {/* Source selector */}
          <div className="grid gap-2">
            <label className="text-xs font-headline uppercase tracking-widest text-muted-foreground">
              Claimed Source (Optional)
            </label>
            <Select value={claimedSource} onValueChange={setClaimedSource} disabled={isBusy}>
              <SelectTrigger className="h-11 rounded-none border-2 border-border bg-background/50 transition-colors duration-200 hover:border-foreground/40 focus:border-foreground">
                <SelectValue placeholder="UNKNOWN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNKNOWN">UNKNOWN</SelectItem>
                <SelectItem value="POLITICS">POLITICS</SelectItem>
                <SelectItem value="WORLD NEWS">WORLD NEWS</SelectItem>
                <SelectItem value="BUSINESS">BUSINESS</SelectItem>
                <SelectItem value="TECH">TECH</SelectItem>
                <SelectItem value="ENTERTAINMENT">ENTERTAINMENT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Textarea with focus glow */}
          <div className="relative">
            <Textarea
              placeholder={`Paste your news headline or article text here for verification…\n\ne.g. "Scientists discover revolutionary new energy source" or "SHOCKING revelation that you won't believe!!!"`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] resize-none font-body text-base leading-relaxed bg-background/50 border-2 border-border rounded-none px-5 py-4 placeholder:text-muted-foreground/50 placeholder:italic textarea-editorial transition-all duration-200"
              disabled={isBusy}
            />
            {/* Character counter */}
            <div className="absolute bottom-3 right-4 flex items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground/60 bg-background/60 px-2 py-0.5">
                {text.length} chars
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons — Verify is dominant, Scrape is secondary */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* PRIMARY CTA — Verify This Story */}
          <Button
            onClick={handleSubmit}
            disabled={!hasText || isBusy}
            className="flex-[2] h-14 text-base font-headline font-bold uppercase tracking-wider rounded-none bg-foreground text-background border-2 border-foreground hover:bg-foreground/90 disabled:opacity-40 cta-primary"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Sources…
              </>
            ) : (
              <>
                <Search className="mr-2.5 h-5 w-5" />
                Verify This Story
              </>
            )}
          </Button>

          {/* SECONDARY CTA — Scrape the Web */}
          <Button
            onClick={handleScrape}
            disabled={!hasText || isBusy}
            className="flex-1 h-14 text-base font-headline font-bold uppercase tracking-wider rounded-none border-2 border-foreground bg-transparent text-foreground hover:bg-foreground/5 disabled:opacity-40 cta-secondary"
            variant="outline"
            size="lg"
          >
            {isScraping ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Scraping…
              </>
            ) : (
              <>
                <Globe className="mr-2.5 h-5 w-5" />
                Scrape the Web
              </>
            )}
          </Button>
        </div>

        {/* Decorative corner marks */}
        <div className="absolute top-14 left-3 w-3.5 h-3.5 border-l-2 border-t-2 border-muted-foreground/20" />
        <div className="absolute top-14 right-3 w-3.5 h-3.5 border-r-2 border-t-2 border-muted-foreground/20" />
        <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-l-2 border-b-2 border-muted-foreground/20" />
        <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-r-2 border-b-2 border-muted-foreground/20" />
      </div>
    </div>
  );
}
