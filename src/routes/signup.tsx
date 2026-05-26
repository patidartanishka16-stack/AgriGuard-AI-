import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAgri, t } from "@/lib/agri-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — AgriGuard AI" }] }),
  component: SignupPage,
});

function SignupPage() {
  const a = useAgri();
  const nav = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (a.signup(u, p)) nav({ to: "/dashboard" });
    else setErr("Please enter username and password");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Leaf className="h-6 w-6" />
        </div>
        <h1 className="mt-3 text-2xl font-bold">{t("signup", a.lang)}</h1>
      </div>
      <Card>
        <CardHeader><CardTitle>Create your account</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
              <Label>{t("username", a.lang)}</Label>
              <Input value={u} onChange={(e) => setU(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>{t("password", a.lang)}</Label>
              <Input type="password" value={p} onChange={(e) => setP(e.target.value)} />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <Button type="submit" className="w-full h-11">{t("signup", a.lang)}</Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                {t("login", a.lang)}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}