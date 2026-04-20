import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="flex flex-col sm:flex-row items-center gap-5 bg-white/5 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/10 relative group hover:bg-white/10 transition-colors">
            
            <button 
                onClick={() => removeFromCart(item.id)}
                className="absolute top-3 right-3 sm:static sm:order-last p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
                <FiTrash2 size={20} />
            </button>

            <div className="h-28 w-28 flex-shrink-0 p-3 bg-white rounded-xl border border-white/20 flex items-center justify-center shadow-inner">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-full w-full object-contain" 
                />
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0 pr-6 sm:pr-0">
                <h3 className="font-bold text-white text-lg truncate mb-1.5">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3 sm:mb-0 hidden sm:block line-clamp-1">{item.description}</p>
                <p className="font-bold text-gray-200 text-xl sm:hidden">₹{item.price.toFixed(2)}</p>
            </div>

            <div className="hidden sm:block text-right min-w-[90px]">
                <p className="font-bold text-gray-200 text-lg">₹{item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center mt-3 sm:mt-0 border border-white/10 rounded-xl overflow-hidden bg-black/40 shadow-inner">
                <button 
                    onClick={() => updateQuantity(item.id, 'decrease')}
                    className="p-3 hover:bg-white/10 active:bg-white/20 text-gray-300 transition-colors"
                >
                    <FiMinus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-white">
                    {item.quantity}
                </span>
                <button 
                    onClick={() => updateQuantity(item.id, 'increase')}
                    className="p-3 hover:bg-white/10 active:bg-white/20 text-gray-300 transition-colors"
                >
                    <FiPlus size={16} />
                </button>
            </div>

            <div className="hidden sm:block text-right min-w-[100px] font-black text-white text-xl tracking-tight">
                ₹{(item.price * item.quantity).toFixed(2)}
            </div>

        </div>
    );
}

export default CartItem;
