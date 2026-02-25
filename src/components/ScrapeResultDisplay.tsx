import { ScrapeResult } from '@/hooks/useFakeNewsDetector';
import { Badge } from '@/components/ui/badge';
import { Globe, ExternalLink, Search, ShieldCheck, ShieldAlert, ShieldQuestion, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrapeResultDisplayProps {
    result: ScrapeResult;
}

const verdictConfig: Record<string, { label: string; icon: React.ReactNode; className: string; stampClass: string }> = {
    REAL: {
        label: 'REAL',
        icon: <ShieldCheck className="h-5 w-5" />,
        className: 'text-success border-success bg-success/10',
        stampClass: 'text-success border-success -rotate-12',
    },
    FAKE: {
        label: 'FAKE',
        icon: <ShieldAlert className="h-5 w-5" />,
        className: 'text-destructive border-destructive bg-destructive/10',
        stampClass: 'text-destructive border-destructive rotate-6',
    },
    UNVERIFIED: {
        label: 'UNVERIFIED',
        icon: <ShieldQuestion className="h-5 w-5" />,
        className: 'text-muted-foreground border-muted-foreground bg-muted/30',
        stampClass: 'text-muted-foreground border-muted-foreground -rotate-6',
    },
};

const providerLabels: Record<string, string> = {
    gnews: '📰 GNews',
    factcheck: '✓ Google Fact Check',
    duckduckgo: '🦆 DuckDuckGo',
};

export function ScrapeResultDisplay({ result }: ScrapeResultDisplayProps) {
    const config = verdictConfig[result.verdict] ?? verdictConfig.UNVERIFIED;
    const confidencePercent = Math.round(result.confidence * 100);

    return (
        <div className="border-2 border-foreground bg-card relative overflow-hidden animate-fade-in">
            {/* Newspaper texture */}
            <div className="absolute inset-0 newspaper-texture opacity-30 pointer-events-none" />

            {/* Header band */}
            <div className="bg-foreground text-background px-4 py-3 flex items-center gap-3">
                <Globe className="h-5 w-5" />
                <h2 className="font-headline font-bold uppercase tracking-wider text-sm">
                    Web Investigation Report
                </h2>
                <div className="ml-auto text-xs opacity-70">
                    {new Date(result.timestamp).toLocaleTimeString()}
                </div>
            </div>

            <div className="p-6 relative space-y-5">
                {/* Big Verdict Section */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground mb-1">
                            Web Verification Verdict
                        </div>
                        <p className="font-body text-sm leading-relaxed mt-2">
                            {result.explanation}
                        </p>
                    </div>

                    {/* Verdict Stamp */}
                    <div className={cn(
                        "border-4 rounded px-5 py-3 text-center shrink-0",
                        config.stampClass
                    )}>
                        <div className="font-headline font-bold text-xl uppercase tracking-widest flex items-center gap-2">
                            {config.icon}
                            {config.label}
                        </div>
                        <div className="font-mono text-xs mt-1">
                            {confidencePercent}% confidence
                        </div>
                    </div>
                </div>

                {/* Search query + providers row */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex items-center gap-2 p-3 bg-secondary/40 border border-border">
                        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-xs font-headline uppercase tracking-wider text-muted-foreground">
                            Query:
                        </span>
                        <span className="text-sm font-body italic truncate">"{result.queryUsed}"</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-secondary/40 border border-border">
                        <span className="text-xs font-headline uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                            APIs:
                        </span>
                        <div className="flex gap-1.5 flex-wrap">
                            {result.providersUsed.map((p) => (
                                <Badge
                                    key={p}
                                    variant="outline"
                                    className="rounded-none border text-[10px] font-headline uppercase tracking-wider"
                                >
                                    {providerLabels[p] ?? p}
                                </Badge>
                            ))}
                            {result.providersUsed.length === 0 && (
                                <span className="text-xs text-muted-foreground">none available</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Fact Checks Section (if any) */}
                {result.factChecks.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-foreground" />
                            <span className="text-xs font-headline uppercase tracking-wider font-bold">
                                Existing Fact-Checks
                            </span>
                        </div>
                        {result.factChecks.map((fc, index) => (
                            <a
                                key={index}
                                href={fc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border-2 border-foreground bg-background/50 p-4 hover:bg-secondary/30 transition-colors group"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            {fc.publisher && (
                                                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5">
                                                    {fc.publisher}
                                                </span>
                                            )}
                                            {fc.rating && (
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "rounded-none border text-[10px] font-headline uppercase tracking-wider",
                                                        fc.rating.toLowerCase().includes('false') || fc.rating.toLowerCase().includes('fake')
                                                            ? 'text-destructive border-destructive'
                                                            : fc.rating.toLowerCase().includes('true') || fc.rating.toLowerCase().includes('correct')
                                                                ? 'text-success border-success'
                                                                : 'text-warning border-warning'
                                                    )}
                                                >
                                                    Rating: {fc.rating}
                                                </Badge>
                                            )}
                                        </div>
                                        <h4 className="font-headline font-bold text-sm leading-snug line-clamp-2 mb-1 group-hover:underline">
                                            {fc.title}
                                        </h4>
                                        {fc.claim_text && (
                                            <p className="text-xs text-muted-foreground font-body italic line-clamp-2">
                                                Claim: "{fc.claim_text}"
                                            </p>
                                        )}
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* News Sources Section */}
                {result.sources.length > 0 && (
                    <div className="space-y-3">
                        <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground">
                            Sources Found ({result.sourcesFound})
                        </div>
                        {result.sources.map((source, index) => (
                            <a
                                key={index}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border-2 border-border bg-background/50 p-4 hover:bg-secondary/30 transition-colors group"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5">
                                                {source.source_name || source.domain}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="rounded-none border text-[10px] font-headline uppercase tracking-wider"
                                            >
                                                {providerLabels[source.provider] ?? source.provider}
                                            </Badge>
                                        </div>
                                        <h4 className="font-headline font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:underline">
                                            {source.title}
                                        </h4>
                                        {source.snippet && (
                                            <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-3">
                                                {source.snippet}
                                            </p>
                                        )}
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {result.sources.length === 0 && result.factChecks.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                        <Globe className="h-10 w-10 mx-auto mb-2 opacity-40" />
                        <p className="font-body text-sm">No web sources found for this claim.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
