"use client";

import { useState, useTransition, useCallback } from "react";
import { Lock, Eye, EyeOff, Loader2, Shield, AlertCircle } from "lucide-react";
import AdminRoster from "@/components/AdminRoster";
import { verifyAdminPassword, getRegistrations, type AdminStudent } from "@/app/admin/actions";

export default function AdminPage() {
  const [authenticated,  setAuthenticated]  = useState(false);
  const [password,       setPassword]       = useState("");
  const [showPassword,   setShowPassword]   = useState(false);
  const [authError,      setAuthError]      = useState("");
  const [students,       setStudents]       = useState<AdminStudent[]>([]);
  const [isPending,      startTransition]   = useTransition();
  const [isLoading,      setIsLoading]      = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    startTransition(async () => {
      const ok = await verifyAdminPassword(password);
      if (ok) {
        const data = await getRegistrations();
        setStudents(data);
        setAuthenticated(true);
      } else {
        setAuthError("Incorrect password. Please try again.");
      }
    });
  };

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    startTransition(async () => {
      const data = await getRegistrations();
      setStudents(data);
      setIsLoading(false);
    });
  }, []);

  if (!authenticated) {
    return (
      <div className="bg-surface-950 min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-crimson/20 border border-brand-crimson/30
                            flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-brand-crimson-light" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Admin Access</h1>
            <p className="text-white/50 text-sm">Enter your password to access the command center</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="form-label" htmlFor="admin-password">Admin Password</label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="form-input pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="form-error mt-2">
                    <AlertCircle className="w-3 h-3" /> {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending || !password}
                className="btn-crimson w-full py-3 disabled:opacity-40"
              >
                {isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
                ) : (
                  <><Shield className="w-4 h-4" /> Access Admin Panel</>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-white/20 mt-4">
            Access restricted to authorized administrators only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-950 min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="section-tag-crimson mb-2">Admin Command Center</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Master <span className="text-brand-gold">Roster</span>
            </h1>
            <p className="text-white/40 text-sm mt-1">OMAKKA Cup 2026 – Season 3 Registrations</p>
          </div>
          <button
            onClick={() => { setAuthenticated(false); setPassword(""); setStudents([]); }}
            className="btn-outline text-sm px-4 py-2"
          >
            <Lock className="w-3.5 h-3.5" /> Logout
          </button>
        </div>

        <AdminRoster
          students={students}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
}
