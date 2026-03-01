import Link from "next/link"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
            {/* Sidebar Navigation */}
            <aside className="w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">storefront</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none">POS Admin</h1>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Premium Plan</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl transition-all">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
                        <span className="text-sm font-semibold">Products</span>
                    </Link>
                    <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="text-sm font-medium">Orders</span>
                    </Link>
                    <Link href="/dashboard/customers" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-sm font-medium">Customers</span>
                    </Link>
                    <Link href="/dashboard/reports" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                        <span className="material-symbols-outlined">analytics</span>
                        <span className="text-sm font-medium">Reports</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
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
            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth">
                {children}
            </main>
        </div>
    )
}
