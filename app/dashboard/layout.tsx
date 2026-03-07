"use client"

import Link from "next/link"
import { useState } from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 ${isMobileMenuOpen ? 'translate-x-0 cursor-default' : '-translate-x-full'}`}>
                <div className="p-6 flex items-center justify-between lg:justify-start gap-3">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">storefront</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-none">POS Admin</h1>
                            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Premium Plan</p>
                        </div>
                    </div>
                    {/* Close Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 space-y-1 mt-4">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
                        <span className="text-sm font-semibold">Products</span>
                    </Link>
                    <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="text-sm font-medium">Orders</span>
                    </Link>
                    <Link href="/dashboard/customers" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-sm font-medium">Customers</span>
                    </Link>
                    <Link href="/dashboard/reports" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="material-symbols-outlined">analytics</span>
                        <span className="text-sm font-medium">Reports</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                    <div className="mt-6 flex items-center gap-3 px-2">
                        <div
                            className="size-10 rounded-full bg-slate-200 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxPdCk_Q3nycpnSgikleWQKU9SXFqNm9y9o-8w5oXxiRLISRI0jJSwCBs4vJ4r_fucd8I35LrrM7m7hoqrBOVoS-mUi9TOD-ajetX4_PuApCsgGPr46qUMNy26PgFvypMcW7Ydnf6XzA34WDppzBY7KiBuBRVDTvZ8gO-0Wo9mWWaGpMa7M0MwLkyHeDFRWcX3H4GrLoocLX4ovR7rlT8uAbksNd1j0TF0k0yLmabOeNbuoK1vz6S8No461SXh54Fxyz10kBoQspg')" }}
                        ></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Alex Rivera</p>
                            <p className="text-xs text-slate-500 truncate">Store Manager</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth flex flex-col relative">
                {/* Mobile Header (Only visible on lg and below if we don't have header handled elsewhere, 
                    but our pages e.g. products page has a header. To ensure mobile users can open the menu, 
                    we place a floating action button or inline header here since pages manage their own headers.) 
                */}
                <div className="lg:hidden sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-slate-600 hover:text-primary dark:text-slate-300 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl leading-none">menu</span>
                    </button>
                    <div className="flex-1 flex items-center gap-2">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-sm">storefront</span>
                        </div>
                        <h1 className="text-lg font-bold leading-none">POS Admin</h1>
                    </div>
                </div>

                {children}
            </main>
        </div>
    )
}
