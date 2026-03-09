"use client"

import { useState } from "react"
import { AddProductModal } from "@/components/add-product-modal"
import { EditProductModal } from "@/components/edit-product-modal"

export default function ProductsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const products = [
        {
            id: 1,
            name: "SoundWave X1 Wireless",
            sku: "SW-X1-W",
            category: "Electronics",
            price: "$299.00",
            stock: 82,
            stockPercentage: 82,
            status: "Active",
            statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        },
        {
            id: 2,
            name: "Nordic Classic Watch",
            sku: "NCW-01",
            category: "Accessories",
            price: "$185.00",
            stock: 12,
            stockPercentage: 12,
            status: "Low Stock",
            statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        },
        {
            id: 3,
            name: "Lumix Retro Pro Cam",
            sku: "LUM-RP-01",
            category: "Electronics",
            price: "$1,249.00",
            stock: 45,
            stockPercentage: 45,
            status: "Active",
            statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        },
        {
            id: 4,
            name: "Velocity Rush Runners",
            sku: "VRR-01",
            category: "Apparel",
            price: "$120.00",
            stock: 0,
            stockPercentage: 0,
            status: "Inactive",
            statusColor: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        },
        {
            id: 5,
            name: "Essential Pima Cotton Tee",
            sku: "EPC-T-01",
            category: "Apparel",
            price: "$45.00",
            stock: 145,
            stockPercentage: 100,
            status: "Active",
            statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        },
        {
            id: 6,
            name: "Instant Focus Lens 50mm",
            sku: "IFL-50-01",
            category: "Electronics",
            price: "$89.00",
            stock: 34,
            stockPercentage: 34,
            status: "Active",
            statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        },
        {
            id: 7,
            name: "Artisan Leather Tote",
            sku: "ALT-01",
            category: "Accessories",
            price: "$320.00",
            stock: 5,
            stockPercentage: 5,
            status: "Low Stock",
            statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        }
    ]

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
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                                <select className="appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                                    <option>Category</option>
                                    <option>Electronics</option>
                                    <option>Accessories</option>
                                    <option>Apparel</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                                </div>
                            </div>
                            <div className="relative">
                                <select className="appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                                    <option>Stock Status</option>
                                    <option>In Stock</option>
                                    <option>Low Stock</option>
                                    <option>Out of Stock</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                                </div>
                            </div>
                            <div className="relative">
                                <select className="appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                                    <option>Sort By</option>
                                    <option>Newest First</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Stock Level</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">swap_vert</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 dark:text-white">{product.name}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{product.sku}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{product.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5 min-w-[100px]">
                                                <div className="flex items-center justify-between text-[11px] font-bold">
                                                    <span>{product.stock} units</span>
                                                    <span className={product.stock === 0 ? "text-red-500" : product.stock < 20 ? "text-amber-500" : "text-primary"}>
                                                        {product.stockPercentage}%
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${product.stock === 0 ? "bg-red-500" : product.stock < 20 ? "bg-amber-500" : "bg-primary"}`} 
                                                        style={{ width: `${product.stockPercentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${product.statusColor}`}>
                                                {product.status}
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
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Showing 1 to {products.length} of 42 products</p>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors" disabled>
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white transition-colors">1</button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">2</button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">3</button>
                            <button className="flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                product={editingProduct}
            />
        </div>
    )
}
