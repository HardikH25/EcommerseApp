import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
    const { addToCart, toggleWishlist, wishlistItems } = useContext(CartContext);

    const isWished = wishlistItems.some(item => item.id === product.id);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#111111]/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-white/10 flex flex-col h-full relative group"
        >
            
            <button 
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 p-2.5 bg-black/40 backdrop-blur-md rounded-full shadow-lg border border-white/10 hover:bg-black/60 transition-colors z-20"
            >
                <FiHeart size={18} className={isWished ? "fill-red-500 text-red-500" : "text-gray-300 drop-shadow-md"} />
            </button>

            <Link to={`/products/${product.id}`} className="aspect-[4/3] p-8 overflow-hidden flex items-center justify-center bg-white cursor-pointer relative">

                <div className="absolute inset-0 bg-linear-to-b from-black/5 to-black/20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500"></div>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="h-full w-full object-contain hover:scale-110 transition-transform duration-500 ease-in-out relative z-10"
                />
            </Link>

            <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-gray-300 uppercase bg-white/10 px-2.5 py-1.5 rounded-md border border-white/5">
                        {product.category}
                    </span>
                </div>

                <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-white/90 text-sm mb-2 line-clamp-2 hover:text-white transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-yellow-500 text-sm drop-shadow-md">⭐</span>
                    <span className="text-gray-200 text-sm font-medium">{product.rating.rate}</span>
                    <span className="text-gray-500 text-xs">({product.rating.count})</span>
                </div>

                <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4">
                    <span className="text-xl font-bold text-white tracking-tight">₹{product.price.toFixed(2)}</span>
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-white hover:bg-gray-200 text-black p-3.5 flex items-center justify-center rounded-xl shadow-lg shadow-white/10 active:scale-95 transition-all"
                    >
                        <FiShoppingCart size={18} />
                    </button>
                </div>
            </div>
            
        </motion.div>
    );
}

export default ProductCard;
