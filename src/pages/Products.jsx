import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

function Products() {
    const { products, categories, loading, error } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [priceRange, setPriceRange] = useState("All");


    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const processedProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

            let matchesPrice = true;
            if (priceRange === "0-50") matchesPrice = product.price <= 50;
            if (priceRange === "50-100") matchesPrice = product.price > 50 && product.price <= 100;
            if (priceRange === "100+") matchesPrice = product.price > 100;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        switch(sortOption) {
            case 'price-low':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-high':
                return filtered.sort((a, b) => b.price - a.price);
            case 'rating':
                return filtered.sort((a, b) => b.rating.rate - a.rating.rate);
            default: 
                return filtered;
        }
    }, [products, debouncedSearchQuery, selectedCategory, priceRange, sortOption]);

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-black text-white mb-10 text-center tracking-tight drop-shadow-lg">
                The Collection
            </h1>

            <div className="flex flex-col gap-6 bg-[#111]/60 backdrop-blur-xl p-6 rounded-3xl mb-10 border border-white/10 shadow-2xl">
                
                <div className="relative w-full">
                    <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full py-3 pl-12 pr-4 text-white bg-black/40 border border-white/10 rounded-full outline-none transition-all focus:border-gray-500 focus:bg-black/60 focus:ring-4 focus:ring-white/5 placeholder-gray-500 shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
                                    selectedCategory === cat
                                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105"
                                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <select 
                            value={priceRange} 
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-2 outline-none w-full md:w-auto"
                        >
                            <option value="All">All Prices</option>
                            <option value="0-50">₹0 - ₹50</option>
                            <option value="50-100">₹50 - ₹100</option>
                            <option value="100+">₹100+</option>
                        </select>
                        <select 
                            value={sortOption} 
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-2 outline-none w-full md:w-auto"
                        >
                            <option value="newest">Sort: Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-[40vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            ) : processedProducts.length === 0 ? (
                <div className="text-center py-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                    <p className="text-gray-400 text-lg mb-4">No products found matching your criteria.</p>
                    <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setPriceRange("All"); setSortOption("newest"); }} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors border border-white/10">
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {processedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;
