"use client"

import { useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"

interface MobileSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const pathname = usePathname()

    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose()
        }
        document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [isOpen, handleClose])

    const initialPathRef = useRef(pathname)

    useEffect(() => {
        // Reset the initial path when modal opens
        if (isOpen) {
            initialPathRef.current = pathname
        }
    }, [isOpen, pathname])

    useEffect(() => {
        // Only close if pathname changed AFTER the modal was opened
        if (isOpen && pathname !== initialPathRef.current) {
            handleClose()
        }
    }, [pathname, isOpen, handleClose])

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center pt-20 px-4"
            style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={handleClose}
        >
            {/* Search Bar Container */}
            <div
                className="w-full max-w-md relative group"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                        />
                    </svg>
                </div>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products, customers, orders..."
                    className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-xl shadow-slate-200/50 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base transition-all duration-300"
                />
            </div>

            {/* Empty State / Results Area */}
            <main
                className="flex-grow w-full flex flex-col items-center justify-start mt-12 text-center px-8"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-slate-500/60 text-sm font-medium animate-pulse">
                    Start typing to find anything in your CRM...
                </p>
            </main>

            {/* Footer Cancel Button */}
            <footer className="pb-10 w-full flex justify-center">
                <button
                    type="button"
                    onClick={handleClose}
                    className="bg-white/80 border border-slate-200 px-6 py-2 rounded-full text-slate-600 text-sm font-medium shadow-sm hover:bg-white active:scale-95 transition-all"
                >
                    Cancel
                </button>
            </footer>
        </div>
    )
}
