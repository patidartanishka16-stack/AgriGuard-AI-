import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useAgri, t, INDIAN_STATES } from "@/lib/agri-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { MapPin, CloudSun, Sprout, Droplets } from "lucide-react";

export const Route = createFileRoute("/advisory")({
  head: () => ({ meta: [{ title: "Location Advisory — AgriGuard AI" }] }),
  component: Advisory,
});

function adviceFor(state: string) {
  // Simple mock keyed by region clusters
  const south = ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana", "Puducherry"];
  const north = ["Punjab", "Haryana", "Himachal Pradesh", "Uttarakhand", "Delhi", "Jammu and Kashmir", "Ladakh"];
  const east = ["West Bengal", "Bihar", "Odisha", "Jharkhand", "Assam"];
  const west = ["Maharashtra", "Gujarat", "Rajasthan", "Goa"];

  if (south.includes(state)) return {
    weather: "Humid, 28-32°C, monsoon active",
    crops: ["Rice", "Coconut", "Banana", "Spices"],
    soil: "Lateritic — slightly acidic. Add lime if pH < 6.",
    tip: "Watch for fungal diseases due to humidity.",
  };
  if (north.includes(state)) return {
    weather: "Warm days, cool nights, 22-30°C",
    crops: ["Wheat", "Mustard", "Sugarcane", "Apples (HP/UK)"],
    soil: "Alluvial — fertile, mildly alkaline.",
    tip: "Irrigate early morning to reduce evaporation.",
  };
  if (east.includes(state)) return {
    weather: "Hot & humid, frequent showers",
    crops: ["Rice", "Jute", "Tea", "Pulses"],
    soil: "Alluvial & red — keep drainage clear.",
    tip: "Monitor for stem borers in paddy fields.",
  };
  if (west.includes(state)) return {
    weather: "Dry to semi-arid, 30-36°C",
    crops: ["Cotton", "Soybean", "Groundnut", "Bajra"],
    soil: "Black/regur — high moisture retention.",
    tip: "Drip irrigation recommended to save water.",
  };
  return {
    weather: "Varied — check local forecast",
    crops: ["Rice", "Maize", "Pulses"],
    soil: "Mixed — test soil pH and nutrients.",
    tip: "Rotate crops to maintain soil fertility.",
  };
}

function Advisory() {
  const a = useAgri();
  const nav = useNavigate();
  useEffect(() => { if (!a.user) nav({ to: "/login" }); }, [a.user, nav]);
  if (!a.user) return null;

  const advice = useMemo(() => adviceFor(a.user?.state ?? ""), [a.user?.state]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Location-Based Advisory</h1>
        <p className="text-sm text-muted-foreground">Tips tailored to your state.</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <Label className="text-sm">{t("selectState", a.lang)}</Label>
          <div className="mt-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <Select value={a.user.state} onValueChange={(v) => a.setState(v)}>
              <SelectTrigger className="w-full max-w-sm h-11"><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-72">
                {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><CloudSun className="h-4 w-4 text-primary" /> Weather</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{advice.weather}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Droplets className="h-4 w-4 text-primary" /> Soil Conditions</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{advice.soil}</p></CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Sprout className="h-4 w-4 text-primary" /> Recommended Crops</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {advice.crops.map((c) => (
                <span key={c} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">{c}</span>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-accent/20 p-3 text-sm">💡 {advice.tip}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}