import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function RegisterPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
                {/* Logo / Branding Header */}
                <div className="mb-8 flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
                        <span className="material-symbols-outlined">point_of_sale</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">SwiftPOS</span>
                </div>

                {/* Registration Card Container */}
                <div className="w-full max-w-[480px] overflow-hidden rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">

                    {/* Heading Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                            Create your account
                        </h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Start managing your business with our minimalist POS.
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form className="space-y-5">
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</Label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">person</span>
                                <Input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full rounded-lg border-slate-200 bg-slate-50 py-6 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus-visible:border-primary focus-visible:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">mail</span>
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full rounded-lg border-slate-200 bg-slate-50 py-6 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus-visible:border-primary focus-visible:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</Label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">lock</span>
                                <Input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full rounded-lg border-slate-200 bg-slate-50 py-6 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus-visible:border-primary focus-visible:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</Label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">verified_user</span>
                                <Input
                                    type="password"
                                    placeholder="Repeat your password"
                                    className="w-full rounded-lg border-slate-200 bg-slate-50 py-6 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus-visible:border-primary focus-visible:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex py-2 gap-3">
                            <Checkbox id="terms" className="mt-1 border-slate-300 text-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            <Label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-normal cursor-pointer flex gap-1">
                                By signing up, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline inline">Privacy Policy.</a>
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-lg transition-all flex items-center justify-center gap-2 group text-base focus-visible:ring-4 focus-visible:ring-primary/30">
                            Sign Up
                            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-8 border-t border-slate-100 pt-6 text-center dark:border-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{" "}
                            <Link href="/" className="font-bold text-primary hover:text-primary/80 transition-colors">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Support Link */}
                <div className="mt-8 text-center">
                    <a href="#" className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined text-sm">help_outline</span>
                        Need help with registration? Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}
