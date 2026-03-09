"use client"

import { useEffect } from "react"
import Link from "next/link"

interface AppLauncherModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AppLauncherModal({ isOpen, onClose }: AppLauncherModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            {/* Modal Backdrop Click Target */}
            <div className="absolute inset-0" onClick={onClose}></div>
            
            {/* App Launcher Modal */}
            <div className="relative w-full max-w-[840px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-2xl">apps</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold leading-tight">App Launcher</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Select a module to switch workspace</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                {/* Search Bar */}
                <div className="px-6 py-4">
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
                        <input className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base transition-all placeholder:text-slate-400" placeholder="Search apps or items..." type="text"/>
                    </div>
                </div>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 pt-2">
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 px-2">Core Modules</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {/* Customers */}
                            <Link href="/dashboard/customers" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">group</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Customers</span>
                            </Link>
                            {/* Sales */}
                            <Link href="/dashboard" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Sales</span>
                            </Link>
                            {/* Inventory */}
                            <Link href="/dashboard/products" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">inventory_2</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Inventory</span>
                            </Link>
                            {/* Products */}
                            <Link href="/dashboard/products" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">category</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Products</span>
                            </Link>
                            {/* Orders */}
                            <Link href="/dashboard/orders" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">receipt_long</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Orders</span>
                            </Link>
                            {/* Reports */}
                            <Link href="/dashboard/reports" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">monitoring</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Reports</span>
                            </Link>
                            {/* Employees */}
                            <Link href="/dashboard" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">badge</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Employees</span>
                            </Link>
                            {/* Payments */}
                            <Link href="/dashboard" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">credit_card</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Payments</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 px-2">Administration</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {/* Settings */}
                            <Link href="/dashboard/settings" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-slate-600 flex items-center justify-center text-white shadow-lg shadow-slate-600/20 group-hover:rotate-45 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">settings</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Settings</span>
                            </Link>
                            {/* Security */}
                            <Link href="/dashboard/settings" onClick={onClose} className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-slate-600 flex items-center justify-center text-white shadow-lg shadow-slate-600/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                                </div>
                                <span className="mt-3 font-semibold text-sm">Security</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Modal Footer */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                        View All Modules
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs hidden sm:flex">
                            <span className="material-symbols-outlined text-base">info</span>
                            Press ESC to close
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
