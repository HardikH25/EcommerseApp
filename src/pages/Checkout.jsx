import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';


//PRD validation utilizing Yup
const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    zip: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(5, 'Must be at least 5 digits').required('ZIP Code is required')
});

function Checkout() {
    const { cartItems, cartTotals } = useContext(CartContext);
    const navigate = useNavigate();

    // PRD: React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const orderId = uuidv4().substring(0, 8).toUpperCase();
        toast.success(`Order #${orderId} Placed Successfully for ${data.firstName}! 🎉`);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-white">
                <p className="text-gray-400 mb-4 text-lg">You have no items to checkout.</p>
                <Link to="/products" className="text-white font-bold hover:underline">Return to collection</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-5xl">
            <h1 className="text-4xl font-black text-white mb-10">Secure Checkout</h1>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Shipping Details form */}
                <div className="md:w-2/3 bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-8">Shipping Interface</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">First Name</label>
                                <input {...register('firstName')} className={`w-full p-4 border rounded-xl outline-none focus:ring-2 bg-black/40 text-white placeholder-gray-500 shadow-inner ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-white/20'}`} placeholder="John" />
                                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Last Name</label>
                                <input {...register('lastName')} className={`w-full p-4 border rounded-xl outline-none focus:ring-2 bg-black/40 text-white placeholder-gray-500 shadow-inner ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-white/20'}`} placeholder="Doe" />
                                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                            <input {...register('email')} className={`w-full p-4 border rounded-xl outline-none focus:ring-2 bg-black/40 text-white placeholder-gray-500 shadow-inner ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-white/20'}`} placeholder="john@example.com" />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Delivery Address</label>
                            <input {...register('address')} className={`w-full p-4 border rounded-xl outline-none focus:ring-2 bg-black/40 text-white placeholder-gray-500 shadow-inner ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-white/20'}`} placeholder="123 Luxury Ave, Suite 100" />
                            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">City</label>
                                <input {...register('city')} className={`w-full p-4 border rounded-xl outline-none focus:ring-2 bg-black/40 text-white placeholder-gray-500 shadow-inner ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-white/20'}`} placeholder="Metropolis" />
                                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">ZIP Code</label>
                                <input {...register('zip')} className={`w-full p-4 border rounded-xl outline-none focus:ring-2 bg-black/40 text-white placeholder-gray-500 shadow-inner ${errors.zip ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-white/20'}`} placeholder="10001" />
                                {errors.zip && <p className="text-red-400 text-xs mt-1">{errors.zip.message}</p>}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-6 pt-6 border-t border-white/10">Payment Method</h2>
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10 mb-8 text-gray-300 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="w-5 h-5 rounded-full border-4 border-white bg-black"></div>
                            <span className="font-medium">Cash on Delivery (COD)</span>
                        </div>

                        <button type="submit" className="w-full bg-white hover:bg-gray-200 text-black font-black py-5 rounded-2xl flex justify-center items-center gap-3 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 text-lg uppercase tracking-wider">
                            <FiCheckCircle size={24} /> Confirm Order
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="md:w-1/3">
                    <div className="bg-[#111]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 sticky top-28 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6">Order Overview</h2>
                        
                        <div className="space-y-4 mb-8 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="h-14 w-14 bg-white rounded-lg p-1.5 flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{item.title}</p>
                                        <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-bold text-sm text-gray-200">₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 border-t border-white/10 pt-6 text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-white font-medium">₹{cartTotals.subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="text-white font-medium">₹{cartTotals.tax}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-white/10 mt-6 pt-6">
                            <span className="font-bold text-gray-300">Total</span>
                            <span className="text-2xl font-black text-white">₹{cartTotals.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
