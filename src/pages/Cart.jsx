import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { FiArrowRight } from 'react-icons/fi';

function Cart() {
    const { cartItems, cartTotals } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>
                <div className="bg-white/5 border border-white/10 p-10 rounded-full mb-10 shadow-[0_0_50px_rgba(255,255,255,0.03)] relative group">
                    <div className="absolute inset-0 bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <svg className="w-20 h-20 text-gray-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Your Cart is a Workspace</h2>
                <p className="text-gray-400 mb-12 text-center text-xl font-light max-w-md leading-relaxed">It seems you haven't curated any pieces yet. Start your journey below.</p>
                <Link to="/products" className="bg-white text-black font-black py-5 px-12 rounded-full hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 uppercase tracking-widest text-sm">
                    Begin Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-6xl">
            <h1 className="text-4xl font-black text-white mb-10 drop-shadow-md">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3 flex flex-col gap-5">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-[#111]/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 sticky top-28">
                        <h2 className="text-2xl font-bold text-white mb-6 pb-5 border-b border-white/10">Summary</h2>
                        
                        <div className="space-y-5 mb-8">
                            <div className="flex justify-between text-gray-300">
                                <span>Subtotal ({cartTotals.itemCount} items)</span>
                                <span className="font-medium text-white">₹{cartTotals.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Tax (18%)</span>
                                <span className="font-medium text-white">₹{cartTotals.tax}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Shipping</span>
                                <span className="font-medium text-green-400">Complimentary</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mb-10">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-gray-300">Total</span>
                                <span className="text-4xl font-black text-white tracking-tighter">₹{cartTotals.total}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="w-full bg-linear-to-r from-gray-100 to-white hover:from-white hover:to-gray-200 text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 text-lg">
                            Proceed to Checkout <FiArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
