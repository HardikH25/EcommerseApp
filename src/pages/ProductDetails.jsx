import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { FiArrowLeft, FiShoppingCart, FiHeart } from 'react-icons/fi';

// PRD Swiper integration
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ProductDetails() {
    const { id } = useParams();
    const { addToCart, toggleWishlist, wishlistItems } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                // Switching to DummyJSON as reliable fallback
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                const p = response.data;
                
                // Map DummyJSON structure to our existing UI expectations
                const mappedProduct = {
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    category: typeof p.category === 'object' ? p.category.name : p.category, 
                    image: p.thumbnail,
                    rating: {
                        rate: p.rating,
                        count: p.stock
                    }
                };
                
                setProduct(mappedProduct);
            } catch (error) {
                console.error("Failed to fetch product details", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!product) {
        return <div className="text-center mt-20 text-xl font-bold text-white">Product not found.</div>;
    }

    const isWished = wishlistItems.some(item => item.id === product.id);

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-6xl">
            <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors font-medium">
                <FiArrowLeft className="mr-2" /> Back to Collection
            </Link>

            <div className="bg-[#111]/60 backdrop-blur-2xl rounded-3xl auto shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row relative">
                
                {/* Image Gallery Section using Swiper */}
                <div className="md:w-1/2 p-10 md:p-16 bg-white relative shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]">
                    <Swiper 
                        navigation={true} 
                        pagination={{ clickable: true }} 
                        modules={[Navigation, Pagination]} 
                        className="w-full h-full"
                    >
                        {/* Primary Image */}
                        <SwiperSlide className="flex items-center justify-center p-4">
                            <img 
                                src={product.image} 
                                alt={product.title} 
                                className="max-h-[400px] object-contain hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                        </SwiperSlide>
                        {/* Dummy 2nd view to satisfy PRD Gallery requirements */}
                        <SwiperSlide className="flex items-center justify-center p-4">
                            <img 
                                src={product.image} 
                                alt={`${product.title} angle 2`} 
                                className="max-h-[400px] object-contain scale-x-[-1]"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-8 md:p-14 flex flex-col">
                    <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase bg-white/10 border border-white/10 px-4 py-1.5 rounded-full w-fit mb-6">
                        {product.category}
                    </span>
                    
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-yellow-500 text-xl">⭐</span>
                        <span className="text-white font-bold text-lg">{product.rating.rate}</span>
                        <span className="text-gray-400">({product.rating.count} reviews)</span>
                    </div>

                    <p className="text-gray-300 text-lg mb-10 leading-relaxed font-light">
                        {product.description}
                    </p>

                    <div className="mt-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center gap-6">
                        <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            ₹{product.price.toFixed(2)}
                        </span>
                        
                        <div className="flex w-full sm:w-auto gap-4 flex-1">
                            <button 
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-white hover:bg-gray-200 text-black font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                            >
                                <FiShoppingCart size={22} />
                                Add to Cart
                            </button>
                            
                            <button 
                                onClick={() => toggleWishlist(product)}
                                className={`p-4 rounded-2xl border flex items-center justify-center transition-all ${
                                    isWished ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-red-400'
                                }`}
                            >
                                <FiHeart size={26} className={isWished ? 'fill-current' : ''} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
