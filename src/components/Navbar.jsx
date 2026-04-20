import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

function Navbar() {
    const { cartTotals, wishlistItems } = useContext(CartContext);

    return (
        <nav className="bg-[#050505]/70 backdrop-blur-xl border-b border-white/10 p-4 sticky top-0 z-50 shadow-2xl">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-black bg-linear-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-sm">
                    ShopEase
                </Link>

                <div className="hidden md:flex space-x-8 text-gray-300 font-medium tracking-wide">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <Link to="/products" className="hover:text-white transition-colors">Products</Link>
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/wishlist" className="relative text-gray-300 hover:text-red-400 transition-colors">
                        <FiHeart size={24} />
                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-red-500/40">
                                {wishlistItems.length}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors">
                        <FiShoppingCart size={24} />
                        {cartTotals.itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gray-100 text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-white/20">
                                {cartTotals.itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
