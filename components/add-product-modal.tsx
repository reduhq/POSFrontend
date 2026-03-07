"use client"

import React from "react"

interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            {/* Modal Card */}
            <div
                className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col mx-2 sm:mx-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Add New Product</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Create a new entry in your digital catalog.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Modal Content (Two Columns) */}
                <div className="flex flex-col md:flex-row gap-0">
                    {/* Left: Image Upload */}
                    <div className="w-full md:w-2/5 p-8 bg-slate-50/50 dark:bg-slate-800/30 border-r border-slate-100 dark:border-slate-800">
                        <p className="text-slate-900 dark:text-slate-100 font-semibold mb-4">Product Image</p>
                        <div className="relative group">
                            <div className="aspect-square w-full rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">photo_camera</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Drag & drop image</p>
                                    <p className="text-xs text-slate-400">JPG, PNG or WEBP (Max 5MB)</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-primary text-sm">info</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Tip: Use a high-quality photo with a plain background for better visibility in the POS terminal.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form Fields */}
                    <div className="w-full md:w-3/5 p-8">
                        <form className="space-y-6">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="prod-name">Product Name</label>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    id="prod-name"
                                    placeholder="e.g. Artisanal Coffee Beans"
                                    type="text"
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">Category</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none transition-all"
                                        id="category"
                                        defaultValue=""
                                    >
                                        <option disabled value="">Select a category</option>
                                        <option value="beverages">Beverages</option>
                                        <option value="bakery">Bakery & Pastry</option>
                                        <option value="snacks">Snacks</option>
                                        <option value="merch">Merchandise</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>

                            {/* Price and Stock Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="price">Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                                        <input
                                            className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            id="price"
                                            placeholder="0.00"
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="stock">Stock Quantity</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        id="stock"
                                        placeholder="0"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Description (Extra field for modern feel) */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="description">Short Description (Optional)</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    id="description"
                                    placeholder="Briefly describe the product..."
                                    rows={2}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 sm:gap-6 mt-auto">
                    <button onClick={onClose} className="w-full sm:w-auto text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors text-sm py-2">
                        Cancel and exit
                    </button>
                    <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    )
}
