import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "./api";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  initials: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = async () => {
    try {
      const data = await api<{ ok: true; user: AuthUser | null }>("/api/me", { method: "GET" });
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const logout = async () => {
    await api("/api/logout", { method: "POST", body: "{}" });
    setUser(null);
  };

  const value = useMemo(() => ({ user, ready, refresh, logout }), [user, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
