import { AnalysisResult } from '@/hooks/useFakeNewsDetector';
import { Badge } from '@/components/ui/badge';
import { FileSearch, Stamp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerdictDisplayProps {
  result: AnalysisResult;
}

export function VerdictDisplay({ result }: VerdictDisplayProps) {
  const labelText = result.fakeNews.label || 'UNKNOWN';
  const normalizedLabel = labelText.toLowerCase();
  const verdictTone = normalizedLabel.includes('fake') || normalizedLabel.includes('false')
    ? 'destructive'
    : normalizedLabel.includes('real') || normalizedLabel.includes('true') || normalizedLabel.includes('verified')
      ? 'success'
      : 'warning';

  return (
    <div className="border-2 border-foreground bg-card relative overflow-hidden animate-fade-in">
      {/* Newspaper texture */}
      <div className="absolute inset-0 newspaper-texture opacity-30 pointer-events-none" />
      
      {/* Header band */}
      <div className="bg-foreground text-background px-4 py-3 flex items-center gap-3">
        <FileSearch className="h-5 w-5" />
        <h2 className="font-headline font-bold uppercase tracking-wider text-sm">
          Verification Report
        </h2>
        <div className="ml-auto text-xs opacity-70">
          {new Date(result.timestamp).toLocaleTimeString()}
        </div>
      </div>

      <div className="p-6 relative space-y-6">
        {/* Summary */}
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground">
              Derived Title
            </div>
            <h3 className="font-headline text-2xl font-bold mt-1">
              {result.title || 'Untitled'}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 font-body">
              Claimed source: <span className="font-mono">{result.claimedSource || 'UNKNOWN'}</span>
            </p>
          </div>

          <div className={cn(
            "absolute -right-2 top-0 border-4 rounded px-4 py-2 font-headline font-bold text-sm uppercase tracking-widest opacity-80",
            verdictTone === 'destructive' && 'text-destructive border-destructive rotate-6',
            verdictTone === 'success' && 'text-success border-success -rotate-12',
            verdictTone === 'warning' && 'text-warning border-warning -rotate-6'
          )}>
            <Stamp className="h-4 w-4 inline mr-1" />
            {labelText}
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-2 border-border bg-background/50 p-4">
            <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground mb-2">
              Fake News Analysis
            </div>
            <div className="flex items-center justify-between gap-3">
              <Badge variant="outline" className="rounded-none border-2 font-headline uppercase tracking-wider">
                {result.fakeNews.label}
              </Badge>
              <span className="font-mono text-xl font-bold">
                {result.fakeNews.confidence}
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-2 font-mono">confidence</div>
          </div>

          <div className="border-2 border-border bg-background/50 p-4">
            <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground mb-2">
              Style Analysis
            </div>
            <div className="flex items-center justify-between gap-3">
              <Badge variant="outline" className="rounded-none border-2 font-headline uppercase tracking-wider">
                {result.styleAnalysis.predictedSource}
              </Badge>
              <span className="font-mono text-xl font-bold">
                {result.styleAnalysis.confidence}
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-2 font-mono">confidence</div>
          </div>
        </div>

        <div className="border-2 border-border bg-secondary/50 p-4 flex items-center justify-between">
          <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground">
            Impersonation Check
          </div>
          <Badge
            variant="outline"
            className={cn(
              "rounded-none border-2 font-headline uppercase tracking-wider",
              result.impersonationDetected ? 'text-destructive border-destructive' : 'text-success border-success'
            )}
          >
            {result.impersonationDetected ? 'Impersonation Detected' : 'No Impersonation'}
          </Badge>
        </div>

        {/* Analyzed Text Preview - styled like a clipping */}
        <div className="relative p-4 bg-secondary/30 border-2 border-dashed border-border">
          <div className="absolute -top-3 left-4 bg-card px-2 text-xs font-headline uppercase tracking-wider text-muted-foreground">
            Submitted Article
          </div>
          <p className="font-body text-sm italic leading-relaxed line-clamp-4 mt-1">
            "{result.content}"
          </p>
        </div>
      </div>
    </div>
  );
}
