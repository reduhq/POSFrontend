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
            category: "Electronics",
            price: "$299.00",
            status: "IN STOCK",
            statusColor: "bg-green-100 text-green-600",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPPj_yUYMNT3eiiDbu6yaLudRJESfxRQBWMl7cRhkt8YjpBkCIvWZm39D_8Xj_TtjGagFLtYjnMhl74OIhZa_JwkPqHfzCvjAdHOkzW_dhaxxXIXy8m5IEdMVxJS378twtL9zZIU6mHNf8oJT5U4G5OLfDjCiy1JO_mFswNifU0qe4Vi7M1csjFdjVJYlPcnhjQugIkDPfy0nIUVx6TYa09X-JntwXa2uFMhJwhLPGlvDIMdL2vjWovD4TLV_Qc6yAVPVARqMnSOo"
        },
        {
            id: 2,
            name: "Nordic Classic Watch",
            category: "Accessories",
            price: "$185.00",
            status: "LOW STOCK",
            statusColor: "bg-amber-100 text-amber-600",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7I_PI-ykXffcCU5StrXfAyKAthebcLEUInFaR6w9_rzig9AC721c4JObOi_6LUnkV0QgpfSXkSNSx9Yvl6TT8o9l7DUfja8I0XXTqNcxKJOtOjzncNbS0MT4O_IjVubFM5_P2XdBBO-hFI5ifLb7hL0XJ8E18ytK5XDQhyX6rJR_UgoqyKs2WS4HDhxcyo9xgaLQHo5PVleR9urf6oHWzX9CQmcb57NLkmj3S8IUZi80dehBkkuAEkH_x4IC8ozC9S0PRwyGE5HM"
        },
        {
            id: 3,
            name: "Lumix Retro Pro Cam",
            category: "Electronics",
            price: "$1,249.00",
            status: "IN STOCK",
            statusColor: "bg-green-100 text-green-600",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCULNwgqKxGPOw1Bf8_TXLK2XuL3RpKoxg6XL656Jk8mOZevNS7n9Akg48l_nHs9OxkriboASdR9WhI3OFfRpPz8rHoVjDZonf9PRA0A2Ktm0aZ5AKjZ-lDBPpat5j85_2ENs1n12RxJjDbwAMWCdIMPdnAViAmRULyjfHxGE-MthXNnH1S2CY4O6YJMSZAumualmQ60Bmc8G9GXQOnLWsPslmBXtSgIpN0mZhDEpNbI4-aY9K3p865a0JwV_eMkX6nd9ymgWWRrbc"
        },
        {
            id: 4,
            name: "Velocity Rush Runners",
            category: "Apparel",
            price: "$120.00",
            status: "OUT OF STOCK",
            statusColor: "bg-red-100 text-red-600",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_DCW_yKKTq-L8wTHuGaPKA7kLNLLu6dQQYnDGQjkkUzqemvb65S-V9Puw6oRfi7YcliTN87tcrjHpoCkbkbb-ObUBjVJpRwuE7GGtvDeUUYSNqwTZP3CO2m-Th4g3Gv5T6z8Yax78ACtLeFeWR2oFEuANQ_eAHI-x35i4LB8Z1RL3koslls-bHZFofnYCMRch_rDiC7F6LPXj3FTUijPjgpvrO25ZCU4fbICazhfwDibvx43L2L8ohhSofuLJty47sQlXKOomZn0"
        },
        {
            id: 5,
            name: "Essential Pima Cotton Tee",
            category: "Apparel",
            price: "$45.00",
            status: "IN STOCK",
            statusColor: "bg-green-100 text-green-600",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAQZaN1wWMlokgbFpEh9dRz7AIGot4P7GA_CM5Hoq0soHLRjgGUWINDV1yxopSPrURq_uBFW_ELzm7-mPm0CAQH_y0Un7-E7Wc2erwctyEVGn7oljZiloA5CpTv2rP6Swe4t3RMB8UFRK95wfT-dV9gbpA1ueY71GUQg0lQuImd8qqa-uuUTFBI2L-_CdFJDeAwiQyrVnJasTB5nrlxHVFMlbQ6RNFl-hKr6iQ9l4ayGe-YuD635LcrqbO0AEICE7SRvts0H1AcpA"
        },
        {
            id: 6,
            name: "Instant Focus Lens 50mm",
            category: "Electronics",
            price: "$89.00",
            status: "IN STOCK",
            statusColor: "bg-green-100 text-green-600",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNLlY1un-HAMXTjK_OPIvU9oYrd4JVU5H4YSVi_245c2SjMm1pVNeFWUArYhlJuylBNIr53tJlDpD3w70GEqEexEdUFQb2_3rItVKR8D4ijEbUBrCiMdKX0U8-pjAj39ZuJsF_UItKbocE6Pv7gIE7xFWTdwhBJvxguBGGPAdD2cxYNsHXl58sTyO63RluKTYLHZ1H1VPoqMyJk2HoXDpOBx16whl7uhOxJBWXNmhESq40hravJPEQMYOTcGZksyapYW2gA7ZA0us"
        },
        {
            id: 7,
            name: "Artisan Leather Tote",
            category: "Accessories",
            price: "$320.00",
            status: "IN STOCK",
            statusColor: "bg-green-100 text-green-600",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfQ1A3QDWE97YEe1ZI6BuqFX51qSuGZaBxQaq99ShfKtvI_tV-PlBrlMS9H7_uVQgxo-jJP66pd4eSuaOWIBa-n_dPj2wQdVilBfERoAbUFbedtpv1ebasmms9SjbNXVqsBQiWND8FhnE0cBdgDDofxu4wLOhq3s-iFKwR5sy1Xh-FN2BdKrdQMB3X3H1eKYrSXd39E-NHOeRVF7i7ucisF_OPrsLk9OTlkAmyc4YRwVY8-yQ2lQECifyfU0eE-3OCGVM6vwiuoMY"
        }
    ]

    return (
        <>
            {/* Top Header */}
            <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <span>Dashboard</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-primary font-medium">Products</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Products</h2>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden lg:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-800 border-none outline-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white p-2.5 sm:px-6 sm:py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-xl sm:text-lg">add</span>
                        <span className="hidden sm:inline">Add Product</span>
                    </button>
                </div>
            </header>

            {/* Filters & Category Chips */}
            <section className="px-8 mb-8 overflow-x-auto">
                <div className="flex items-center gap-3 min-w-max pb-2">
                    <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-md">All Products</button>
                    <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">Electronics</button>
                    <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">Apparel</button>
                    <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">Accessories</button>
                    <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">Home Decor</button>
                    <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
                    <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">tune</span>
                        More Filters
                    </button>
                </div>
            </section>

            {/* Product Grid */}
            <section className="px-8 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {products.map((product) => (
                        <div key={product.id} className="group relative bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20">
                            <div className="aspect-square w-full rounded-lg bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${product.image}')` }}
                                ></div>
                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => { setEditingProduct(product); setIsEditModalOpen(true); }}
                                        className="p-2 bg-white/90 backdrop-blur rounded-full text-slate-700 hover:text-primary hover:bg-white shadow-lg transition-colors flex"
                                    >
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button className="p-2 bg-white/90 backdrop-blur rounded-full text-slate-700 hover:text-red-500 hover:bg-white shadow-lg transition-colors flex">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{product.category}</span>
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${product.statusColor}`}>
                                        {product.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="text-primary font-bold text-sm">{product.price}</p>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card Skeleton */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-4">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <p className="font-bold text-slate-500 group-hover:text-primary">Add New Product</p>
                    </button>

                </div>
            </section>

            {/* Pagination/Footer Stats */}
            <footer className="px-8 py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500 text-center sm:text-left">Showing <span className="font-bold text-slate-900 dark:text-white">7</span> of <span className="font-bold text-slate-900 dark:text-white">124</span> products</p>
                <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                    <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors flex">
                        <span className="material-symbols-outlined text-xl">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold flex items-center justify-center">1</button>
                    <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors text-sm font-bold flex items-center justify-center">2</button>
                    <button className="hidden sm:flex w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors text-sm font-bold items-center justify-center">3</button>
                    <span className="text-slate-400 mx-1">...</span>
                    <button className="hidden sm:flex w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors text-sm font-bold items-center justify-center">18</button>
                    <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors flex">
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                    </button>
                </div>
            </footer>
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                product={editingProduct}
            />
        </>
    )
}
