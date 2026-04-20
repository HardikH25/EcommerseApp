import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartFromWL');
        return saved ? JSON.parse(saved) : [];
    });
    const [wishlistItems, setWishlistItems] = useState(() => {
        const saved = localStorage.getItem('wishlistFromWL');
        return saved ? JSON.parse(saved) : [];
    });
    
    // Persist state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartFromWL', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('wishlistFromWL', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Cross-tab synchronization
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'cartFromWL') {
                setCartItems(e.newValue ? JSON.parse(e.newValue) : []);
            }
            if (e.key === 'wishlistFromWL') {
                setWishlistItems(e.newValue ? JSON.parse(e.newValue) : []);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = useCallback((product) => {
        const isPresent = cartItems.some((item) => item.id === product.id);
        
        if (isPresent) {
            toast.info(`${product.title} quantity increased!`);
        } else {
            toast.success(`${product.title} added to cart!`);
        }

        setCartItems((prevItems) => {
            return isPresent 
                ? prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...prevItems, { ...product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        toast.error("Item removed from cart!");
        
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId, type) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === productId) {
                    let newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
                    return { ...item, quantity: Math.max(1, newQuantity) }; // prevent 0
                }
                return item;
            });
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
            return isPresent 
                ? prevItems.filter((item) => item.id !== product.id)
                : [...prevItems, product];
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
