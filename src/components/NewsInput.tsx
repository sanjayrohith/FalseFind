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

  return (
    <div className="border-2 border-foreground bg-card relative overflow-hidden">
      {/* Newspaper texture */}
      <div className="absolute inset-0 newspaper-texture opacity-30 pointer-events-none" />

      {/* Header band */}
      <div className="bg-foreground text-background px-4 py-3 flex items-center gap-3">
        <FileText className="h-5 w-5" />
        <h2 className="font-headline font-bold uppercase tracking-wider text-sm">
          Submit Article for Verification
        </h2>
      </div>

      <div className="p-6 relative space-y-4">
        <div className="space-y-3">
          <div className="grid gap-2">
            <label className="text-xs font-headline uppercase tracking-widest text-muted-foreground">
              Claimed Source (Optional)
            </label>
            <Select value={claimedSource} onValueChange={setClaimedSource} disabled={isBusy}>
              <SelectTrigger className="h-11 rounded-none border-2 border-border bg-background/50">
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

          <div className="relative">
            <Textarea
              placeholder="Paste your news headline or article text here for verification...

Example: 'Scientists discover revolutionary new energy source that could power cities for centuries' or 'SHOCKING revelation that you won't believe!!!'"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[180px] resize-none font-body text-base bg-background/50 border-2 border-border focus:border-foreground transition-colors rounded-none"
              disabled={isBusy}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-mono">{text.length} chars</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={text.trim().length === 0 || isBusy}
            className="flex-1 h-12 text-base font-headline font-bold uppercase tracking-wider rounded-none border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
            variant="outline"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying Story...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Verify This Story
              </>
            )}
          </Button>

          <Button
            onClick={handleScrape}
            disabled={text.trim().length === 0 || isBusy}
            className="flex-1 h-12 text-base font-headline font-bold uppercase tracking-wider rounded-none border-2 border-foreground bg-foreground text-background hover:bg-foreground/90 transition-all"
            size="lg"
          >
            {isScraping ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Scraping Web...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-5 w-5" />
                Scrap the Web
              </>
            )}
          </Button>
        </div>

        {/* Decorative corner marks */}
        <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-muted-foreground/30" />
        <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-muted-foreground/30" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-muted-foreground/30" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-muted-foreground/30" />
      </div>
    </div>
  );
}
