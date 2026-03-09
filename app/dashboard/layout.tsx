"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { AppLauncherModal } from "@/components/app-launcher-modal"
import { MobileSearchModal } from "@/components/mobile-search-modal"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false)
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="flex-shrink-0 z-50 flex flex-col w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-4 sm:gap-6">

                        <button 
                            onClick={() => setIsAppLauncherOpen(true)}
                            className="flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                        >
                            <span className="material-symbols-outlined">apps</span>
                        </button>
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                                <span className="material-symbols-outlined text-xl">database</span>
                            </div>
                            <span className="hidden sm:block text-lg font-bold tracking-tight">CRM POS</span>
                        </Link>
                    </div>
                
                    <div className="hidden sm:flex flex-1 max-w-xl px-4 lg:px-8">
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                            </div>
                            <input className="block w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-3 text-sm placeholder-slate-500 focus:ring-2 focus:ring-primary dark:text-slate-200 outline-none transition-all" placeholder="Search..." type="text"/>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-3">
                        {/* Mobile Search Button */}
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                setIsMobileSearchOpen(true)
                            }}
                            className="flex sm:hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors z-50 relative pointer-events-auto cursor-pointer"
                        >
                            <span className="material-symbols-outlined pointer-events-none">search</span>
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
                        </button>
                        <div className="ml-1 sm:ml-2 h-9 w-9 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                            <img className="h-full w-full object-cover" alt="User profile avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIWJVqzso74XSryGSa3q6R_DjCfeZ0ifulGzqM0rxGDg4_C0ZUzmhQA3Zql5zAATxCT9JumV4VKvIikZTm0jOdHUIRsgpiT34X1qWTIvfVM8ykTSlvdA8S4m2uEJx__BPbGwtRrCSrx0HTpl3A7VnnH04lSdkSCjON60tCrFvoVOJGtcd7cCT_YKtEt12qWb3k61cc1_9Khpd2m4AJpfHn6A8UtvPZdYed91FNU6dDMgAAy_hrf183B_QB2DEwg0eXirDVg2eHXew"/>
                        </div>
                    </div>
                </div>

                {/* Sub-navigation (App Tabs) */}
                <div className={`lg:flex items-center gap-1 overflow-x-auto px-4 sm:px-6 py-2 no-scrollbar border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 ${isMobileMenuOpen ? 'flex flex-col items-start w-full absolute top-16 left-0 bg-white dark:bg-slate-900 shadow-xl border-b pb-4 z-40' : 'hidden'}`}>
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors w-full lg:w-auto ${pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        Dashboard
                    </Link>
                    <Link href="/dashboard/products" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors w-full lg:w-auto ${pathname.includes('/dashboard/products') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        Products
                    </Link>
                    <Link href="/dashboard/orders" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors w-full lg:w-auto ${pathname.includes('/dashboard/orders') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        Orders
                    </Link>
                    <Link href="/dashboard/customers" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors w-full lg:w-auto ${pathname.includes('/dashboard/customers') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        Customers
                    </Link>
                    <Link href="/dashboard/reports" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors w-full lg:w-auto ${pathname.includes('/dashboard/reports') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        Reports
                    </Link>
                     <Link href="/dashboard/settings" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors w-full lg:w-auto ${pathname.includes('/dashboard/settings') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        Settings
                    </Link>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 top-16 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col relative overflow-y-auto">
                <div className="w-full mx-auto">
                    {children}
                </div>
            </main>

            <AppLauncherModal 
                isOpen={isAppLauncherOpen} 
                onClose={() => setIsAppLauncherOpen(false)} 
            />

            <MobileSearchModal 
                isOpen={isMobileSearchOpen} 
                onClose={() => setIsMobileSearchOpen(false)} 
            />
        </div>
    )
}
