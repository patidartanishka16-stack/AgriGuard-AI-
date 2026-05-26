import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAgri, t, INDIAN_STATES } from "@/lib/agri-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { User, LogOut, Moon, Sun, Languages } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — AgriGuard AI" }] }),
  component: Profile,
});

function Profile() {
  const a = useAgri();
  const nav = useNavigate();
  useEffect(() => { if (!a.user) nav({ to: "/login" }); }, [a.user, nav]);
  if (!a.user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <User className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">{a.user.username}</div>
            <div className="text-sm text-muted-foreground">Farmer · {a.user.state}</div>
          </div>
          <Button variant="outline" onClick={() => { a.logout(); nav({ to: "/" }); }}>
            <LogOut className="mr-2 h-4 w-4" /> {t("logout", a.lang)}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label>{t("selectState", a.lang)}</Label>
            <Select value={a.user.state} onValueChange={(v) => a.setState(v)}>
              <SelectTrigger className="mt-1 h-11"><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-72">
                {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <Languages className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Language</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => a.setLang(a.lang === "en" ? "hi" : "en")}>
              {a.lang === "en" ? "English" : "हिंदी"}
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              {a.dark ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
              <span className="text-sm font-medium">Theme</span>
            </div>
            <Button variant="outline" size="sm" onClick={a.toggleDark}>
              {a.dark ? "Dark" : "Light"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Activity History</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {a.history.length === 0 && (
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          )}
          {a.history.map((h) => (
            <div key={h.id} className="flex justify-between rounded-lg border p-3 text-sm">
              <div>
                <div className="font-medium">{h.type}</div>
                <div className="text-xs text-muted-foreground">{h.detail}</div>
              </div>
              <span className="text-xs text-muted-foreground">{h.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}