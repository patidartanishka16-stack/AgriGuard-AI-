import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAgri, t } from "@/lib/agri-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskCard } from "@/components/RiskCard";
import { Progress } from "@/components/ui/progress";
import {
  Sprout, Bug, Droplets, CloudSun, FlaskConical, TrendingUp,
  Upload, Sparkles, MessageSquare, Bell, ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AgriGuard AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const a = useAgri();
  const nav = useNavigate();
  useEffect(() => { if (!a.user) nav({ to: "/login" }); }, [a.user, nav]);
  if (!a.user) return null;

  const tip = a.lang === "en"
    ? "Inspect leaves early morning — dew makes pest eggs more visible."
    : "सुबह जल्दी पत्तियों की जांच करें — ओस में कीट के अंडे आसानी से दिखते हैं।";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t("welcome", a.lang)}, {a.user.username} 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            {a.user.state} · {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="h-11">
            <Link to="/scan"><Upload className="mr-2 h-4 w-4" /> {t("uploadCrop", a.lang)}</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link to="/advisory">{t("advisory", a.lang)}</Link>
          </Button>
        </div>
      </div>

      {/* Risk dashboard */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Smart Farm Overview</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RiskCard title={t("diseaseRisk", a.lang)} value="Low" level="safe" icon={Sprout} hint="No signs detected" />
          <RiskCard title={t("pestRisk", a.lang)} value="High" level="high" icon={Bug} hint="Next 3 days" />
          <RiskCard title={t("soilMoisture", a.lang)} value="28%" level="medium" icon={Droplets} hint="Below ideal range" />
          <RiskCard title={t("soilPh", a.lang)} value="5.6" level="medium" icon={FlaskConical} hint="Acidic — add lime" />
        </div>
      </section>

      {/* Soil & Weather & Irrigation */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FlaskConical className="h-4 w-4 text-primary" /> {t("soilPh", a.lang)} Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Acidic</span><span>Neutral</span><span>Alkaline</span>
              </div>
              <Progress value={(5.6 / 14) * 100} className="mt-1 h-2" />
              <div className="mt-2 text-2xl font-bold">pH 5.6</div>
              <p className="text-xs text-muted-foreground">Soil is acidic. Recommended action:</p>
              <ul className="mt-2 text-xs space-y-1 list-disc pl-4 text-muted-foreground">
                <li>Apply agricultural lime (200 kg/acre)</li>
                <li>Mix compost to balance nutrients</li>
                <li>Re-test pH after 2 weeks</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CloudSun className="h-4 w-4 text-primary" /> {t("weather", a.lang)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-4xl font-bold">29°C</div>
                <div className="text-xs text-muted-foreground">Partly cloudy</div>
              </div>
              <div className="ml-auto text-right text-sm">
                <div>💧 Humidity 78%</div>
                <div>🌬 Wind 12 km/h</div>
                <div>🌧 Rain tomorrow</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
              {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
                <div key={d} className="rounded-lg bg-muted py-2">
                  <div className="font-medium">{d}</div>
                  <div className="text-muted-foreground">{[28, 27, 30, 31][i]}°</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Droplets className="h-4 w-4 text-primary" /> {t("irrigation", a.lang)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-primary">Water Today</div>
            <p className="text-sm text-muted-foreground">
              Soil moisture is low. Apply ~25mm water across the field.
            </p>
            <div className="mt-3 rounded-lg bg-card p-3 text-sm">
              ⏭ Next check: <strong>in 2 days</strong>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pest forecast + Daily tip + Chatbot */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bug className="h-4 w-4 text-destructive" /> Pest Risk Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-destructive/10 p-3 text-sm">
              <strong className="text-destructive">High risk in next 3 days</strong>
              <p className="mt-1 text-muted-foreground">
                Rising humidity (78%) favors aphid & whitefly outbreaks.
              </p>
            </div>
            <ul className="mt-3 text-xs space-y-1 text-muted-foreground">
              <li>• Spray neem oil at dusk</li>
              <li>• Set up yellow sticky traps</li>
              <li>• Monitor underside of leaves daily</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-accent-foreground" /> {t("dailyTip", a.lang)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{tip}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1">🌾 Rotation</span>
              <span className="rounded-full bg-secondary px-3 py-1">🐝 Pollinators</span>
              <span className="rounded-full bg-secondary px-3 py-1">💧 Save water</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4 text-primary" /> {t("chatbot", a.lang)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-xl bg-muted p-3 text-sm">
              👋 Hi! Ask me anything about your crops.
            </div>
            <Button variant="outline" className="w-full" disabled>
              Coming soon
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Notifications & History */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-primary" /> {t("notifications", a.lang)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {a.notifications.length === 0 && (
              <p className="text-sm text-muted-foreground">All clear 🌱</p>
            )}
            {a.notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-lg border p-3">
                <ShieldAlert className={`mt-0.5 h-4 w-4 ${
                  n.level === "danger" ? "text-destructive"
                  : n.level === "warn" ? "text-[var(--warning)]" : "text-primary"
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                </div>
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" /> {t("recentActivity", a.lang)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {a.history.length === 0 && (
              <p className="text-sm text-muted-foreground">No activity yet. Try a crop scan!</p>
            )}
            {a.history.slice(0, 5).map((h) => (
              <div key={h.id} className="flex items-start justify-between gap-3 rounded-lg border p-3 text-sm">
                <div>
                  <div className="font-medium">{h.type}</div>
                  <div className="text-xs text-muted-foreground">{h.detail}</div>
                </div>
                <span className="text-[10px] text-muted-foreground">{h.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Future scope */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">{t("futureScope", a.lang)}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "🎙 Voice Assistant", d: "Hands-free farming queries" },
            { t: "📩 SMS Alerts", d: "Offline notifications" },
            { t: "🛰 Satellite Data", d: "Field-level intelligence" },
            { t: "🏛 Govt Schemes", d: "Subsidies & insurance" },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border bg-card p-4">
              <div className="text-sm font-semibold">{f.t}</div>
              <div className="text-xs text-muted-foreground">{f.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}