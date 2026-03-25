import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, LogIn } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();

  // If user is already logged in and is admin, redirect to dashboard
  if (!loading && user?.role === "admin") {
    setLocation("/admin/dashboard");
    return null;
  }

  // If user is logged in but not admin, show error
  if (!loading && user && user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="p-8">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Access Denied</h1>
            <p className="text-center text-muted-foreground mb-6">
              You don't have admin privileges. Please contact the administrator if you believe this is an error.
            </p>
            <Button className="w-full" variant="outline" onClick={() => setLocation("/")}>
              Return to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // If not logged in, show login prompt
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-teal-600 rounded-full">
              <span className="text-white font-bold text-xl font-label">AFI</span>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Admin Dashboard</h1>
            <p className="text-center text-muted-foreground mb-8">
              Sign in with your Angaza Future account to access the admin panel
            </p>
            <a href={getLoginUrl()}>
              <Button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In with Manus
              </Button>
            </a>
            <p className="text-xs text-muted-foreground text-center mt-6">
              Only authorized administrators can access this area
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-amber-400 rounded-full animate-spin">
          <div className="w-10 h-10 bg-slate-900 rounded-full"></div>
        </div>
        <p className="text-white">Loading...</p>
      </div>
    </div>
  );
}
