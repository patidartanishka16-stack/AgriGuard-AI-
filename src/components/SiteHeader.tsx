import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Leaf, Moon, Sun, Languages, LogOut, User } from "lucide-react";
import { useAgri } from "@/lib/agri-store";
import { t } from "@/lib/agri-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function SiteHeader() {
  const a = useAgri();
  const { location } = useRouterState();
  const path = location.pathname;

  const navItems = a.user
    ? [
        { to: "/dashboard", label: t("dashboard", a.lang) },
        { to: "/scan", label: t("scan", a.lang) },
        { to: "/market", label: t("market", a.lang) },
        { to: "/advisory", label: t("advisory", a.lang) },
        { to: "/profile", label: t("profile", a.lang) },
      ]
    : [];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold">{t("appName", a.lang)}</div>
            <div className="text-[10px] text-muted-foreground hidden sm:block">
              {t("tagline", a.lang)}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                path === n.to ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => a.setLang(a.lang === "en" ? "hi" : "en")}
            title="Language"
          >
            <Languages className="h-4 w-4" />
            <span className="ml-1 text-xs font-bold">{a.lang === "en" ? "EN" : "हि"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={a.toggleDark} title="Theme">
            {a.dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {a.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {a.notifications.length > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full px-1 text-[10px]">
                      {a.notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>{t("notifications", a.lang)}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {a.notifications.length === 0 && (
                  <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                    All clear 🌱
                  </div>
                )}
                {a.notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    onClick={() => a.markRead(n.id)}
                    className="flex-col items-start gap-1 py-2"
                  >
                    <div className="flex w-full items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          n.level === "danger"
                            ? "bg-destructive"
                            : n.level === "warn"
                              ? "bg-[var(--warning)]"
                              : "bg-primary"
                        }`}
                      />
                      <span className="text-sm font-medium">{n.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{n.body}</p>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {a.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="hidden sm:inline text-sm">{a.user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{a.user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">{t("profile", a.lang)}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={a.logout}>
                  <LogOut className="mr-2 h-4 w-4" /> {t("logout", a.lang)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">{t("login", a.lang)}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">{t("signup", a.lang)}</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {a.user && (
        <nav className="md:hidden flex items-center gap-1 overflow-x-auto px-3 pb-2">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${
                path === n.to ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}