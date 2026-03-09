"use client"

import React, { useState, useEffect } from "react"
import { createProduct, fetchCatalogBase, type CategoryDto, type PriceTypeDto } from "@/lib/api/products-api"

interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
    onProductCreated?: () => void
}

export function AddProductModal({ isOpen, onClose, onProductCreated }: AddProductModalProps) {
    // Form state
    const [name, setName] = useState("")
    const [sku, setSku] = useState("")
    const [barcode, setBarcode] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [price, setPrice] = useState("")

    // Catalog base data
    const [categories, setCategories] = useState<CategoryDto[]>([])
    const [priceTypes, setPriceTypes] = useState<PriceTypeDto[]>([])

    // UI state
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")

    // Load categories and price types when modal opens
    useEffect(() => {
        if (!isOpen) return
        setIsLoading(true)
        fetchCatalogBase()
            .then((data) => {
                setCategories(data.categories)
                setPriceTypes(data.priceTypes)
            })
            .catch((err) => {
                console.error("Error loading catalog base:", err)
                setError("Could not load categories. Please try again.")
            })
            .finally(() => setIsLoading(false))
    }, [isOpen])

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setName("")
            setSku("")
            setBarcode("")
            setDescription("")
            setCategoryId("")
            setPrice("")
            setError("")
        }
    }, [isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Basic validation
        if (!name.trim()) return setError("Product name is required.")
        if (!sku.trim()) return setError("SKU is required.")
        if (!categoryId) return setError("Please select a category.")

        setIsSaving(true)
        try {
            // Build pricing array – use first priceType if available
            const prices = price && parseFloat(price) > 0 && priceTypes.length > 0
                ? [{ priceTypeId: priceTypes[0].id, price: parseFloat(price), currency: "USD" }]
                : []

            await createProduct({
                categoryId,
                name: name.trim(),
                sku: sku.trim(),
                barcode: barcode.trim(),
                description: description.trim(),
                images: [],
                prices,
            })

            onProductCreated?.()
            onClose()
        } catch (err: any) {
            console.error("Error creating product:", err)
            setError(err.message || "Failed to create product. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

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

                {/* Error Message */}
                {error && (
                    <div className="mx-8 mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {error}
                    </div>
                )}

                {/* Modal Content (Two Columns) */}
                <form onSubmit={handleSubmit}>
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
                            <div className="space-y-6">
                                {/* Product Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="prod-name">Product Name *</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                        id="prod-name"
                                        placeholder="e.g. Artisanal Coffee Beans"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* SKU */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="prod-sku">SKU *</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                        id="prod-sku"
                                        placeholder="e.g. ACB-001"
                                        type="text"
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">Category *</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none transition-all"
                                            id="category"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            required
                                        >
                                            <option disabled value="">
                                                {isLoading ? "Loading categories..." : "Select a category"}
                                            </option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                </div>

                                {/* Price and Barcode Row */}
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
                                                step="0.01"
                                                min="0"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="barcode">Barcode</label>
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            id="barcode"
                                            placeholder="e.g. 7501234567890"
                                            type="text"
                                            value={barcode}
                                            onChange={(e) => setBarcode(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="description">Short Description (Optional)</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        id="description"
                                        placeholder="Briefly describe the product..."
                                        rows={2}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 sm:gap-6 mt-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="w-full sm:w-auto text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors text-sm py-2"
                        >
                            Cancel and exit
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-60"
                        >
                            {isSaving ? (
                                <>
                                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                    Save Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
