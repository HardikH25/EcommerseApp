import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartFromWL'));
        if (savedCart) {
            setCartItems(savedCart);
        }
        const savedWishlist = JSON.parse(localStorage.getItem('wishlistFromWL'));
        if (savedWishlist) {
            setWishlistItems(savedWishlist);
        }
    }, []);

    const addToCart = useCallback((product) => {
        const isPresent = cartItems.some((item) => item.id === product.id);
        
        if (isPresent) {
            toast.info(`${product.title} quantity increased!`);
        } else {
            toast.success(`${product.title} added to cart!`);
        }

        setCartItems((prevItems) => {
            const newCart = isPresent 
                ? prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...prevItems, { ...product, quantity: 1 }];
            localStorage.setItem('cartFromWL', JSON.stringify(newCart));
            return newCart;
        });
    }, [cartItems]);

    const removeFromCart = useCallback((productId) => {
        toast.error("Item removed from cart!");
        
        setCartItems((prevItems) => {
            const newCart = prevItems.filter((item) => item.id !== productId);
            localStorage.setItem('cartFromWL', JSON.stringify(newCart));
            return newCart;
        });
    }, []);

    const updateQuantity = useCallback((productId, type) => {
        setCartItems((prevItems) => {
            const newCart = prevItems.map((item) => {
                if (item.id === productId) {
                    let newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
                    return { ...item, quantity: Math.max(1, newQuantity) }; // prevent 0
                }
                return item;
            });
            localStorage.setItem('cartFromWL', JSON.stringify(newCart));
            return newCart;
        });
    }, []);

    const toggleWishlist = useCallback((product) => {
        const isPresent = wishlistItems.some((item) => item.id === product.id);

        if (isPresent) {
            toast.info("Removed from wishlist!");
        } else {
            toast.success("Added to wishlist!");
        }

        setWishlistItems((prevItems) => {
            const newWishlist = isPresent 
                ? prevItems.filter((item) => item.id !== product.id)
                : [...prevItems, product];
            localStorage.setItem('wishlistFromWL', JSON.stringify(newWishlist));
            return newWishlist;
        });
    }, [wishlistItems]);

    const cartTotals = useMemo(() => {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18;
        const total = subtotal + tax;
        
        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
            itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
        };
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity,
            cartTotals,
            wishlistItems,
            toggleWishlist
        }}>
            {children}
        </CartContext.Provider>
    );
};
