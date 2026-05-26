import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AgriContext, type Lang, type Notif, type User } from "./agri-store";

const LS = "agriguard.state.v1";
const USERS = "agriguard.users.v1";

interface Persist {
  user: User | null;
  lang: Lang;
  dark: boolean;
  notifications: Notif[];
  history: { id: string; type: string; detail: string; time: string }[];
}

const defaultNotifs: Notif[] = [
  { id: "n1", title: "High pest risk in next 3 days", body: "Humidity rising — inspect leaves for aphids.", level: "danger", time: "2h ago" },
  { id: "n2", title: "Irrigation required", body: "Soil moisture below 30%. Water today.", level: "warn", time: "5h ago" },
  { id: "n3", title: "Soil pH imbalance warning", body: "pH dropping to 5.6 (acidic). Add lime.", level: "warn", time: "1d ago" },
  { id: "n4", title: "Weather alert", body: "Light rain expected tomorrow.", level: "info", time: "1d ago" },
  { id: "n5", title: "Market price up", body: "Tomato prices increased 12% this week.", level: "info", time: "2d ago" },
];

function load(): Persist {
  if (typeof window === "undefined") {
    return { user: null, lang: "en", dark: false, notifications: defaultNotifs, history: [] };
  }
  try {
    const raw = localStorage.getItem(LS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { user: null, lang: "en", dark: false, notifications: defaultNotifs, history: [] };
}

export function AgriProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persist>(() => load());

  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(state));
    if (state.dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      login: (username: string, password: string) => {
        const users = JSON.parse(localStorage.getItem(USERS) || "{}");
        if (users[username] && users[username] === password) {
          setState((s) => ({ ...s, user: { username, state: s.user?.state || "Maharashtra" } }));
          return true;
        }
        // demo fallback: any non-empty creds work
        if (username && password) {
          setState((s) => ({ ...s, user: { username, state: s.user?.state || "Maharashtra" } }));
          return true;
        }
        return false;
      },
      signup: (username: string, password: string) => {
        if (!username || !password) return false;
        const users = JSON.parse(localStorage.getItem(USERS) || "{}");
        users[username] = password;
        localStorage.setItem(USERS, JSON.stringify(users));
        setState((s) => ({ ...s, user: { username, state: "Maharashtra" } }));
        return true;
      },
      logout: () => setState((s) => ({ ...s, user: null })),
      setLang: (lang: Lang) => setState((s) => ({ ...s, lang })),
      toggleDark: () => setState((s) => ({ ...s, dark: !s.dark })),
      setState: (st: string) =>
        setState((s) => ({ ...s, user: s.user ? { ...s.user, state: st } : s.user })),
      pushHistory: (type: string, detail: string) =>
        setState((s) => ({
          ...s,
          history: [
            { id: crypto.randomUUID(), type, detail, time: new Date().toLocaleString() },
            ...s.history,
          ].slice(0, 20),
        })),
      markRead: (id: string) =>
        setState((s) => ({ ...s, notifications: s.notifications.filter((n) => n.id !== id) })),
    }),
    [state],
  );

  return <AgriContext.Provider value={value}>{children}</AgriContext.Provider>;
}