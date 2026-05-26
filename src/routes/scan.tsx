import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAgri, t } from "@/lib/agri-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, ImageIcon, Sparkles, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/scan")({
  head: () => ({ meta: [{ title: "Crop Scan — AgriGuard AI" }] }),
  component: ScanPage,
});

const mockResults = [
  { name: "Leaf Blight", severity: "high" as const, med: "Mancozeb 75% WP", dose: "2g per litre water, spray every 10 days", prevent: "Avoid overhead watering; ensure airflow between rows." },
  { name: "Powdery Mildew", severity: "medium" as const, med: "Sulfur-based fungicide", dose: "3g per litre, foliar spray", prevent: "Prune for sunlight; remove infected leaves." },
  { name: "Healthy Crop", severity: "low" as const, med: "No treatment needed", dose: "Continue regular care", prevent: "Maintain weekly inspections and balanced fertilization." },
  { name: "Bacterial Spot", severity: "medium" as const, med: "Copper oxychloride", dose: "2.5g per litre, weekly", prevent: "Use disease-free seeds; rotate crops." },
];

function colorOf(level: "low" | "medium" | "high") {
  return level === "low" ? "var(--success)" : level === "medium" ? "var(--warning)" : "var(--destructive)";
}

function ScanPage() {
  const a = useAgri();
  const nav = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [result, setResult] = useState<typeof mockResults[number] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!a.user) nav({ to: "/login" }); }, [a.user, nav]);
  if (!a.user) return null;

  const onFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = (e) => setImg(e.target?.result as string);
    r.readAsDataURL(f);
    setResult(null);
  };

  const analyze = () => {
    if (!img) return;
    setLoading(true);
    setTimeout(() => {
      const r = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(r);
      a.pushHistory("Crop scan", `${r.name} — ${r.severity} severity`);
      setLoading(false);
    }, 1200);
  };

  const reset = () => { setImg(null); setResult(null); };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Crop Disease Scan</h1>
        <p className="text-sm text-muted-foreground">Upload a leaf photo for instant mock AI analysis.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">{t("preview", a.lang)}</CardTitle></CardHeader>
          <CardContent>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            {!img ? (
              <button
                onClick={() => fileRef.current?.click()}
                className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition hover:bg-muted"
              >
                <ImageIcon className="h-10 w-10" />
                <span className="font-medium">Click to upload</span>
                <span className="text-xs">PNG, JPG up to 10MB</span>
              </button>
            ) : (
              <div className="space-y-3">
                <img src={img} alt="Crop preview" className="aspect-video w-full rounded-xl object-cover" />
                <div className="flex gap-2">
                  <Button onClick={analyze} disabled={loading} className="flex-1 h-11">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {loading ? "Analyzing..." : t("analyze", a.lang)}
                  </Button>
                  <Button onClick={reset} variant="outline" className="h-11">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            {!img && (
              <Button onClick={() => fileRef.current?.click()} className="mt-3 w-full h-11">
                <Upload className="mr-2 h-4 w-4" /> {t("uploadCrop", a.lang)}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Disease Detection Result</CardTitle></CardHeader>
          <CardContent>
            {!result ? (
              <div className="grid h-full place-items-center py-10 text-center text-muted-foreground">
                <div>
                  <Sparkles className="mx-auto mb-2 h-8 w-8 opacity-60" />
                  <p className="text-sm">Upload an image and click Analyze.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className="rounded-xl p-4"
                  style={{ background: `color-mix(in oklab, ${colorOf(result.severity)} 15%, transparent)` }}
                >
                  <div className="text-xs uppercase text-muted-foreground">Detected</div>
                  <div className="mt-1 text-2xl font-bold" style={{ color: colorOf(result.severity) }}>
                    {result.name}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
                      style={{ background: colorOf(result.severity) }}
                    >
                      {result.severity.toUpperCase()} SEVERITY
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold">💊 Recommended Treatment</div>
                    <p className="text-muted-foreground">{result.med}</p>
                  </div>
                  <div>
                    <div className="font-semibold">📏 Dosage</div>
                    <p className="text-muted-foreground">{result.dose}</p>
                  </div>
                  <div>
                    <div className="font-semibold">🛡 Prevention</div>
                    <p className="text-muted-foreground">{result.prevent}</p>
                  </div>
                  <div>
                    <div className="font-semibold">🌱 Crop Care</div>
                    <p className="text-muted-foreground">
                      Water consistently, monitor for new symptoms weekly, and remove affected debris from the field.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}