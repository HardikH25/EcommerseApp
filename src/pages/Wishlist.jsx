import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function Wishlist() {
    const { wishlistItems } = useContext(CartContext);

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-red-500/[0.02] to-transparent pointer-events-none"></div>
                <div className="bg-red-500/5 border border-red-500/10 p-10 rounded-full mb-10 shadow-[0_0_50px_rgba(239,68,68,0.03)] relative group">
                    <div className="absolute inset-0 bg-red-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <svg className="w-20 h-20 text-red-500/60 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Your Vault is Empty</h2>
                <p className="text-gray-400 mb-12 text-center text-xl font-light max-w-md leading-relaxed">Save the exceptional items you discover so they're never forgotten.</p>
                <Link to="/products" className="bg-white text-black font-black py-5 px-12 rounded-full hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 uppercase tracking-widest text-sm">
                    Explore Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <div className="flex items-center gap-4 mb-10">
                <h1 className="text-4xl font-black text-white drop-shadow-md">Curated Vault</h1>
                <span className="bg-white/10 border border-white/10 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                    {wishlistItems.length} items
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {wishlistItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
