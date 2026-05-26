import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export type RiskLevel = "safe" | "medium" | "high";

const styles: Record<RiskLevel, { bg: string; text: string; label: string; dot: string }> = {
  safe: { bg: "bg-[var(--success)]/10", text: "text-[var(--success)]", label: "Safe", dot: "bg-[var(--success)]" },
  medium: { bg: "bg-[var(--warning)]/15", text: "text-[var(--warning)]", label: "Medium", dot: "bg-[var(--warning)]" },
  high: { bg: "bg-destructive/10", text: "text-destructive", label: "High", dot: "bg-destructive" },
};

export function RiskCard({
  title,
  value,
  level,
  hint,
  icon: Icon,
}: {
  title: string;
  value: string;
  level: RiskLevel;
  hint?: string;
  icon?: LucideIcon;
}) {
  const s = styles[level];
  return (
    <Card className={`border-0 shadow-sm ${s.bg}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </span>
          {Icon && <Icon className={`h-4 w-4 ${s.text}`} />}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${s.text}`}>{value}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}