import { AnalysisResult } from '@/hooks/useFakeNewsDetector';
import { Badge } from '@/components/ui/badge';
import { FileSearch, Stamp, ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerdictDisplayProps {
  result: AnalysisResult;
}

export function VerdictDisplay({ result }: VerdictDisplayProps) {
  const labelText = result.fakeNews.label || 'UNKNOWN';
  const normalizedLabel = labelText.toLowerCase();
  const isFake = normalizedLabel.includes('fake') || normalizedLabel.includes('false');
  const isReal = normalizedLabel.includes('real') || normalizedLabel.includes('true') || normalizedLabel.includes('verified');

  const verdictTone = isFake ? 'destructive' : isReal ? 'success' : 'warning';

  const displayLabel = isFake ? 'LIKELY FALSE' : isReal ? 'LIKELY TRUE' : 'UNCERTAIN';
  const VerdictIcon = isFake ? ShieldAlert : isReal ? ShieldCheck : AlertTriangle;

  return (
    <div className="border-2 border-foreground bg-card relative overflow-hidden card-depth-lg verdict-enter">
      {/* Newspaper texture */}
      <div className="absolute inset-0 newspaper-texture opacity-30 pointer-events-none" />

      {/* Header band */}
      <div className="bg-foreground text-background px-5 py-3.5 flex items-center gap-3">
        <FileSearch className="h-5 w-5" />
        <h2 className="font-headline font-bold uppercase tracking-wider text-sm">
          Verification Report
        </h2>
        <div className="ml-auto text-xs opacity-70 font-mono">
          {new Date(result.timestamp).toLocaleTimeString()}
        </div>
      </div>

      <div className="p-5 sm:p-7 relative space-y-6">
        {/* Title + Verdict Stamp */}
        <div className="relative flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-headline uppercase tracking-wider text-muted-foreground mb-1">
              Derived Title
            </div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold leading-tight">
              {result.title || 'Untitled'}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 font-body">
              Claimed source: <span className="font-mono text-xs bg-secondary/50 px-1.5 py-0.5">{result.claimedSource || 'UNKNOWN'}</span>
            </p>
          </div>

          {/* Stamp — animated entrance */}
          <div
            className={cn(
              "stamp-enter shrink-0 border-4 rounded px-5 py-3 text-center",
              verdictTone === 'destructive' && 'text-destructive border-destructive',
              verdictTone === 'success' && 'text-success border-success',
              verdictTone === 'warning' && 'text-warning border-warning'
            )}
            style={{
              '--stamp-rotation': verdictTone === 'success' ? '-12deg' : verdictTone === 'destructive' ? '6deg' : '-6deg'
            } as React.CSSProperties}
          >
            <VerdictIcon className="h-5 w-5 mx-auto mb-1" />
            <div className="font-headline font-bold text-sm uppercase tracking-widest whitespace-nowrap">
              {displayLabel}
            </div>
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Fake News Analysis */}
          <div className="border-2 border-border bg-background/50 p-5 card-depth transition-shadow duration-200 hover:card-depth-lg">
            <div className="text-[11px] font-headline uppercase tracking-wider text-muted-foreground mb-3">
              Fake News Analysis
            </div>
            <div className="flex items-end justify-between gap-3">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-none border-2 font-headline uppercase tracking-wider text-xs",
                  verdictTone === 'destructive' && 'text-destructive border-destructive',
                  verdictTone === 'success' && 'text-success border-success',
                  verdictTone === 'warning' && 'text-warning border-warning',
                )}
              >
                {result.fakeNews.label}
              </Badge>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold leading-none">
                  {result.fakeNews.confidence}
                </span>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">confidence</div>
              </div>
            </div>
          </div>

          {/* Style Analysis */}
          <div className="border-2 border-border bg-background/50 p-5 card-depth transition-shadow duration-200 hover:card-depth-lg">
            <div className="text-[11px] font-headline uppercase tracking-wider text-muted-foreground mb-3">
              Style Analysis
            </div>
            <div className="flex items-end justify-between gap-3">
              <Badge variant="outline" className="rounded-none border-2 font-headline uppercase tracking-wider text-xs">
                {result.styleAnalysis.predictedSource}
              </Badge>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold leading-none">
                  {result.styleAnalysis.confidence}
                </span>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Impersonation Check */}
        <div className="border-2 border-border bg-secondary/50 p-5 flex items-center justify-between card-depth">
          <div className="text-[11px] font-headline uppercase tracking-wider text-muted-foreground">
            Impersonation Check
          </div>
          <Badge
            variant="outline"
            className={cn(
              "rounded-none border-2 font-headline uppercase tracking-wider text-xs",
              result.impersonationDetected ? 'text-destructive border-destructive' : 'text-success border-success'
            )}
          >
            {result.impersonationDetected ? 'Impersonation Detected' : 'No Impersonation'}
          </Badge>
        </div>

        {/* Submitted Article Clipping */}
        <div className="relative p-5 bg-secondary/20 border-2 border-dashed border-border">
          <div className="absolute -top-3 left-4 bg-card px-2 text-[11px] font-headline uppercase tracking-wider text-muted-foreground">
            Submitted Article
          </div>
          <p className="font-body text-sm italic leading-relaxed line-clamp-4 mt-1 text-muted-foreground">
            "{result.content}"
          </p>
        </div>
      </div>
    </div>
  );
}
