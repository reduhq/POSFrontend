"use client"

import { useState, useEffect, useCallback } from "react"
import { AddProductModal } from "@/components/add-product-modal"
import { EditProductModal } from "@/components/edit-product-modal"
import { fetchProducts, type ProductDto } from "@/lib/api/products-api"

// ─── Helpers ─────────────────────────────────────────────────────────

function getStatusInfo(product: ProductDto) {
    if (!product.isActive) {
        return {
            label: "Inactive",
            color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
        }
    }
    return {
        label: "Active",
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    }
}

function getDisplayPrice(product: ProductDto): string {
    if (product.prices.length === 0) return "—"
    const first = product.prices[0]
    return `$${first.price.toFixed(2)}`
}

// ─── Page Component ──────────────────────────────────────────────────

export default function ProductsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)

    const [products, setProducts] = useState<ProductDto[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const loadProducts = useCallback(async () => {
        setIsLoading(true)
        setError("")
        try {
            const data = await fetchProducts()
            setProducts(data)
        } catch (err: any) {
            console.error("Error fetching products:", err)
            setError(err.message || "Could not load products.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    return (
        <div className="flex-1 px-6 py-8 md:px-12 bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Products</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your inventory, pricing, and availability.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        Add Product
                    </button>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
                        <span className="material-symbols-outlined">error</span>
                        <span>{error}</span>
                        <button onClick={loadProducts} className="ml-auto text-red-600 dark:text-red-400 hover:underline font-medium">
                            Retry
                        </button>
                    </div>
                )}

                {/* Product List Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    {/* Filters Area */}
                    <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center border-b border-slate-100 dark:border-slate-800">
                        <div className="relative flex-1 max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                            </div>
                            <input 
                                className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                                placeholder="Search product name or SKU..." 
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Loading products...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && products.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="size-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-slate-400">inventory_2</span>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">No products yet</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get started by adding your first product to the catalog.</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                                Add First Product
                            </button>
                        </div>
                    )}

                    {/* Table */}
                    {!isLoading && products.length > 0 && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">SKU</th>
                                            <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-center">Status</th>
                                            <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {products.map((product) => {
                                            const status = getStatusInfo(product)
                                            return (
                                                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-slate-900 dark:text-white">{product.name}</div>
                                                        {product.description && (
                                                            <div className="text-xs text-slate-400 mt-0.5 max-w-[200px] truncate">{product.description}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{product.sku}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                            {product.categoryName || "Uncategorized"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">{getDisplayPrice(product)}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${status.color}`}>
                                                            {status.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button 
                                                                onClick={() => { setEditingProduct(product); setIsEditModalOpen(true); }}
                                                                className="p-1.5 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                                                            >
                                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                                            </button>
                                                            <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors focus:outline-none">
                                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Showing {products.length} product{products.length !== 1 ? "s" : ""}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductCreated={loadProducts}
            />
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                product={editingProduct}
            />
        </div>
    )
}
