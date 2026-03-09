"use client"

import { useState, FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { loginAction } from "@/lib/auth/actions"
import { useAppStore } from "@/store/useAppStore"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { setTenantId: setGlobalTenantId, setUser } = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [tenantId, setTenantId] = useState("managua")

  useEffect(() => {
    // Extract tenant from subdomain
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    // If we have a subdomain like tenant.domain.com or tenant.localhost
    if (parts.length > 2 && parts[0] !== 'www') {
      setTenantId(parts[0]);
    } else if (parts.length === 2 && parts[1] === 'localhost') {
      setTenantId(parts[0]);
    } else if (hostname === 'localhost') {
      // Fallback for direct localhost access without subdomain
      setTenantId('managua'); 
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5168/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Id": tenantId,
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || "Login failed. Please check your credentials.")
      }

      const data = await response.json()
      
      if (data.token) {
        // Set the secure cookie via Server Action
        await loginAction(data.token, tenantId);
        
        // Update global store
        setGlobalTenantId(tenantId);
        setUser({
          id: "1", // Ideally read from JWT payload or response
          email: email,
          name: "Manager", 
          role: "Admin"
        });
        
        // Redirect to dashboard (middleware will allow it now)
        router.push("/dashboard/products")
      } else {
        throw new Error("Invalid response from server.")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
        {/* Header / Logo Area */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center size-12 rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-3xl">point_of_sale</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            SwiftPOS
          </h1>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 sm:p-8 md:p-10 z-10 mx-4">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Please enter your details to access your dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Email Address
              </Label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10">mail</span>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-6 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </Label>
                <a href="#" className="text-xs font-bold text-primary hover:underline underline-offset-4">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10">lock</span>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-6 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-slate-400"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center px-1 space-x-2">
              <Checkbox id="remember" className="border-slate-300 text-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <Label htmlFor="remember" className="text-sm font-normal text-slate-600 dark:text-slate-400 cursor-pointer">
                Stay signed in for 30 days
              </Label>
            </div>

            {/* Sign In Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group text-base"
            >
              <span>{isLoading ? "Signing in..." : "Sign In to Dashboard"}</span>
              {!isLoading && <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              New to SwiftPOS?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline underline-offset-4">Create an account</Link>
            </p>
          </div>
        </div>

        {/* System Status Badge */}
        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm z-10">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">System Online</span>
        </div>

        {/* Background Decoration */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
        </div>
      </div>
    </div>
  )
}
