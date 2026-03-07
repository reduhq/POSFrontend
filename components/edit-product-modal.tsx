"use client"

import React from "react"
import Image from "next/image"

interface EditProductModalProps {
    isOpen: boolean
    onClose: () => void
    product: any // Replace with proper type later if needed
}

export function EditProductModal({ isOpen, onClose, product }: EditProductModalProps) {
    if (!isOpen || !product) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4" onClick={onClose}>
            {/* Modal Card */}
            <div
                className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col mx-2 sm:mx-0 border border-slate-200 dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 leading-none">Edit Product</h2>
                        <p className="text-slate-500 text-sm mt-1 sm:mt-2">Update inventory details for this item.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1">
                        <span className="material-symbols-outlined text-2xl sm:text-3xl leading-none">close</span>
                    </button>
                </div>

                {/* Modal Body (Form) */}
                <div className="p-6 sm:p-8 space-y-6">
                    {/* Image Preview Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className="size-20 sm:size-24 rounded-lg overflow-hidden bg-white border border-slate-200 dark:border-slate-700 flex-shrink-0 relative">
                            {/* Fallback pattern if Image fails, but here we use a simple div with bg if url is provided */}
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${product.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAOv80NzhNJWA88YdjkHyiE4r7hzOdBh8rrwSaUg3ZuCqs9MYxVTeuAFm_QW6phAHKD5604SdICX7V2WXz4ms-clCDwySWFwz2pnONJZQzrIJUJ89_6h1GkQam_x22oF_uCISFhxm8yRU3zZNLdk-QGN2fud7pRm-dHNjlPpocSn8DiNoyn5mZsCWKxjXYUOFbiYcpYqiZZoYbUYUMz2-CtYhSXGwb72IfVnsSf7a5JHWj7frvlr-aRp_xn1NZB29sEZKKzbVihwHU"}')` }}></div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100">Product Image</h4>
                            <p className="text-xs text-slate-500 mb-3">JPG, PNG or WEBP. Max 2MB.</p>
                            <div className="flex flex-wrap gap-2">
                                <button className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors text-slate-700 dark:text-slate-200">Replace</button>
                                <button className="text-xs font-bold px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">Remove</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Product Name */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Product Name</label>
                            <input
                                className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all px-4 outline-none text-slate-900 dark:text-white"
                                type="text"
                                defaultValue={product.name}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                            <div className="relative">
                                <select
                                    className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none px-4 outline-none text-slate-900 dark:text-white"
                                    defaultValue={product.category}
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Apparel">Apparel</option>
                                    <option value="Home Decor">Home Decor</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Price ($)</label>
                            <input
                                className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 px-4 outline-none text-slate-900 dark:text-white"
                                type="text"
                                defaultValue={product.price ? product.price.replace('$', '') : ''}
                            />
                        </div>

                        {/* Stock Quantity */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Stock Quantity</label>
                            <div className="flex items-center gap-2">
                                <button className="size-12 sm:size-14 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300 flex-shrink-0">
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <input
                                    className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 text-center font-bold outline-none text-slate-900 dark:text-white"
                                    type="number"
                                    defaultValue={42} // Defaulting to 42 since it wasn't in original mock
                                />
                                <button className="size-12 sm:size-14 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300 flex-shrink-0">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>

                        {/* SKU */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">SKU ID</label>
                            <input
                                className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 px-4 outline-none text-slate-900 dark:text-white"
                                type="text"
                                defaultValue={`SW-X${product.id}-BLU-042`}
                            />
                        </div>

                        {/* Description */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Short Description</label>
                            <textarea
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 px-4 py-3 resize-none outline-none text-slate-900 dark:text-white"
                                rows={3}
                                defaultValue="Premium wireless headphones with active noise cancellation, 40-hour battery life, and spatial audio support."
                            ></textarea>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="pt-6 mt-2 flex items-center justify-start border-t border-slate-100 dark:border-slate-800">
                        <button className="flex items-center gap-2 text-red-500 font-bold text-sm hover:underline p-2 -ml-2 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg leading-none">delete</span>
                            Delete Product
                        </button>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 sm:px-8 sm:py-6 bg-slate-50 dark:bg-slate-800/30 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 border-t border-slate-100 dark:border-slate-800 mt-auto sticky bottom-0 z-10">
                    <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        Cancel
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    )
}
