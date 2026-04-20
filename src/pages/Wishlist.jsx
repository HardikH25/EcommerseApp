import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function Wishlist() {
    const { wishlistItems } = useContext(CartContext);

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-full mb-8 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/20 blur-xl"></div>
                    <svg className="w-16 h-16 text-red-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Your Vault is Empty</h2>
                <p className="text-gray-400 mb-10 text-center text-lg max-w-md">Save luxury items you love so you don't lose sight of them.</p>
                <Link to="/products" className="bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]">
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
