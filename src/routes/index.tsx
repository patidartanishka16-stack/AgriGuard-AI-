import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAgri, t } from "@/lib/agri-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf, Upload, Sparkles, Sprout, CloudSun, TrendingUp, Bug, Droplets,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriGuard AI — Predict. Protect. Prosper." },
      { name: "description", content: "Smart farming platform for disease detection, soil health, pest risk, irrigation, and crop market insights." },
      { property: "og:title", content: "AgriGuard AI" },
      { property: "og:description", content: "Predict. Protect. Prosper. — for every farmer." },
    ],
  }),
  component: Home,
});

function Home() {
  const a = useAgri();
  const navigate = useNavigate();

  const go = (to: string) => {
    if (!a.user) navigate({ to: "/login" });
    else navigate({ to });
  };

  const features = [
    { icon: Sprout, title: "Disease Detection", body: "Upload a leaf photo, get an instant mock diagnosis with severity." },
    { icon: Droplets, title: "Soil & Irrigation", body: "Soil pH, moisture & water timing — no guesswork." },
    { icon: Bug, title: "Pest Risk Prediction", body: "Forecasts based on humidity & weather conditions." },
    { icon: CloudSun, title: "Location Advisory", body: "Pick your state for targeted Indian farming tips." },
    { icon: TrendingUp, title: "Market Insights", body: "See trending crops, prices, and profit suggestions." },
    { icon: Sparkles, title: "Smart Notifications", body: "Alerts for pests, irrigation, pH, weather, and prices." },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-accent/10" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-primary">
                <Leaf className="h-3.5 w-3.5" /> {t("appName", a.lang)}
              </div>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
                {t("tagline", a.lang)}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                {a.lang === "en"
                  ? "A simple, farmer-friendly platform to detect crop diseases, monitor soil, predict pests and grow profits."
                  : "फसल रोग पहचान, मिट्टी निगरानी, कीट अनुमान और बेहतर मुनाफे के लिए सरल मंच।"}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="h-12 px-6 text-base" onClick={() => go("/scan")}>
                  <Upload className="mr-2 h-5 w-5" /> {t("uploadCrop", a.lang)}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 text-base"
                  onClick={() => go("/dashboard")}
                >
                  {t("getStarted", a.lang)}
                </Button>
              </div>
              <div className="mt-6 flex gap-4 text-xs text-muted-foreground">
                <span>🌱 Mock AI demo</span>
                <span>📱 Mobile-friendly</span>
                <span>🇮🇳 28 states + UTs</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.slice(0, 4).map((f) => (
                <Card key={f.title} className="border-0 bg-card/80 shadow-sm backdrop-blur">
                  <CardContent className="p-5">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-3 text-sm font-semibold">{f.title}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{f.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Everything a farmer needs</h2>
        <p className="mt-2 text-muted-foreground">Simple cards. Big buttons. Clear actions.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardContent className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center">
          <h3 className="text-xl font-semibold">Ready to protect your farm?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Create a free account in seconds.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/signup">{t("signup", a.lang)}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">{t("login", a.lang)}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
