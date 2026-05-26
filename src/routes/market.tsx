import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAgri, t } from "@/lib/agri-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Route = createFileRoute("/market")({
  head: () => ({ meta: [{ title: "Crop Market Insights — AgriGuard AI" }] }),
  component: Market,
});

const crops = [
  { name: "Tomato", price: 38, change: 12, demand: "High", trend: "up" },
  { name: "Wheat", price: 24, change: 5, demand: "High", trend: "up" },
  { name: "Soybean", price: 46, change: 8, demand: "Export ↑", trend: "up" },
  { name: "Onion", price: 30, change: -4, demand: "Medium", trend: "down" },
  { name: "Cotton", price: 65, change: 3, demand: "Stable", trend: "up" },
  { name: "Rice", price: 28, change: -2, demand: "Medium", trend: "down" },
];

const profit = [
  { crop: "Soybean", invest: 18000, returns: 42000, why: "Export demand rising 18% YoY" },
  { crop: "Tomato", invest: 12000, returns: 30000, why: "Prices up 12% this week" },
  { crop: "Wheat", invest: 15000, returns: 28000, why: "Steady demand in north India" },
];

function Market() {
  const a = useAgri();
  const nav = useNavigate();
  useEffect(() => { if (!a.user) nav({ to: "/login" }); }, [a.user, nav]);
  if (!a.user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{t("marketInsights", a.lang)}</h1>
        <p className="text-sm text-muted-foreground">Trending crops, prices, and profit opportunities.</p>
      </div>

      {/* Highlight banners */}
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { t: "Wheat demand high", d: "Buyers active across Punjab & Haryana", c: "var(--success)" },
          { t: "Soybean export increasing", d: "+18% over last quarter", c: "var(--success)" },
          { t: "Tomato prices rising", d: "+12% this week, hold stocks", c: "var(--warning)" },
        ].map((b) => (
          <div key={b.t} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.c }} />
              <span className="text-sm font-semibold">{b.t}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </div>

      {/* Prices table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" /> Live Market Prices (₹/kg)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {crops.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-lg border bg-card/50 p-3">
                <div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">Demand: {c.demand}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">₹{c.price}</div>
                  <div
                    className={`flex items-center justify-end gap-1 text-xs font-medium ${
                      c.trend === "up" ? "text-[var(--success)]" : "text-destructive"
                    }`}
                  >
                    {c.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(c.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Import / Export */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-[var(--success)]" /> Export Trending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>🌱 Soybean</span><span className="text-[var(--success)]">+18%</span></li>
              <li className="flex justify-between"><span>🌾 Basmati Rice</span><span className="text-[var(--success)]">+12%</span></li>
              <li className="flex justify-between"><span>🌶 Spices</span><span className="text-[var(--success)]">+9%</span></li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingDown className="h-4 w-4 text-destructive" /> Import Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>🌻 Edible Oils</span><span className="text-destructive">+22%</span></li>
              <li className="flex justify-between"><span>🫘 Pulses</span><span className="text-destructive">+8%</span></li>
              <li className="flex justify-between"><span>🥜 Cashew</span><span className="text-destructive">+5%</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Profit Suggestions */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="h-4 w-4 text-accent-foreground" /> {t("profitTips", a.lang)}
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {profit.map((p) => {
            const margin = p.returns - p.invest;
            const pct = Math.round((margin / p.invest) * 100);
            return (
              <Card key={p.crop} className="bg-gradient-to-br from-primary/5 to-accent/10">
                <CardContent className="p-5">
                  <div className="text-xs uppercase text-muted-foreground">Suggested</div>
                  <div className="mt-1 text-2xl font-bold">{p.crop}</div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">Investment</div>
                      <div className="font-semibold">₹{p.invest.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Returns</div>
                      <div className="font-semibold text-[var(--success)]">₹{p.returns.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[var(--success)]/15 px-2 py-1 text-xs font-semibold text-[var(--success)]">
                    +{pct}% est. profit
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{p.why}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}