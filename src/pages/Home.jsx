import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-white/5 backdrop-blur-md rounded-3xl mx-4 my-8 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Inner ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gray-500/10 blur-[100px] pointer-events-none"></div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl z-10">
                Welcome to <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 via-gray-300 to-gray-500">ShopEase</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl font-light z-10">
                Experience shopping redefined. Premium products, unmatched quality, curated just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 z-10">
                <Link to="/products" className="bg-linear-to-r from-gray-100 to-gray-300 hover:from-white hover:to-gray-200 text-black font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                    Explore Collection
                </Link>
                <Link to="/cart" className="bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-10 rounded-full shadow-sm border border-white/20 transition-all duration-300 backdrop-blur-sm">
                    View Cart
                </Link>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
                {/* Feature 1 */}
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors">
                    <div className="bg-white/10 p-4 rounded-xl mb-6 text-gray-200 ring-1 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
                    <p className="text-sm text-gray-400">Seamless delivery shipped directly to your threshold.</p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors">
                    <div className="bg-white/10 p-4 rounded-xl mb-6 text-gray-200 ring-1 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Secure Vault</h3>
                    <p className="text-sm text-gray-400">Bank-level encryption keeping your data entirely private.</p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors">
                    <div className="bg-white/10 p-4 rounded-xl mb-6 text-gray-200 ring-1 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Curated Luxury</h3>
                    <p className="text-sm text-gray-400">Hand-selected catalogs ensuring supreme quality.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
