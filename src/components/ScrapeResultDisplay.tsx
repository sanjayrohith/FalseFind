import { ScrapeResult } from '@/hooks/useFakeNewsDetector';
import { Badge } from '@/components/ui/badge';
import { Globe, ExternalLink, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrapeResultDisplayProps {
    result: ScrapeResult;
}

const summaryConfig: Record<string, { label: string; className: string }> = {
    SUPPORTED: {
        label: '✓ SUPPORTED',
        className: 'text-success border-success bg-success/10',
    },
    DISPUTED: {
        label: '✗ DISPUTED',
        className: 'text-destructive border-destructive bg-destructive/10',
    },
    MIXED: {
        label: '⚠ MIXED',
        className: 'text-warning border-warning bg-warning/10',
    },
    UNVERIFIED: {
        label: '? UNVERIFIED',
        className: 'text-muted-foreground border-muted-foreground bg-muted/30',
    },
};

export function ScrapeResultDisplay({ result }: ScrapeResultDisplayProps) {
    const config = summaryConfig[result.summary] ?? summaryConfig.UNVERIFIED;

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
                {/* Summary verdict */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground">
                            Web Verification Verdict
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 font-body">
                            Found <span className="font-mono font-bold">{result.sourcesFound}</span> source{result.sourcesFound !== 1 ? 's' : ''} discussing this claim
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className={cn(
                            'rounded-none border-2 font-headline uppercase tracking-widest text-sm px-4 py-2',
                            config.className
                        )}
                    >
                        {config.label}
                    </Badge>
                </div>

                {/* Search query used */}
                <div className="flex items-center gap-2 p-3 bg-secondary/40 border border-border">
                    <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-xs font-headline uppercase tracking-wider text-muted-foreground">
                        Query:
                    </span>
                    <span className="text-sm font-body italic truncate">"{result.queryUsed}"</span>
                </div>

                {/* Source cards */}
                {result.sources.length > 0 && (
                    <div className="space-y-3">
                        <div className="text-xs font-headline uppercase tracking-wider text-muted-foreground">
                            Sources Found
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
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5">
                                                {source.domain}
                                            </span>
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

                {result.sources.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                        <Globe className="h-10 w-10 mx-auto mb-2 opacity-40" />
                        <p className="font-body text-sm">No web sources found for this claim.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
