import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                // FakeStoreAPI is currently down/blocking via Cloudflare (HTTP 403)
                // We use DummyJSON as a reliable fallback and adapt its schema 
                // to match our existing FakeStoreAPI structure so we don't have to 
                // rewrite any components (Adapter Pattern).
                const [productsRes, catRes] = await Promise.all([
                    axios.get('https://dummyjson.com/products?limit=50'),
                    axios.get('https://dummyjson.com/products/categories')
                ]);
                
                // Map DummyJSON products to FakeStoreAPI structure
                const mappedProducts = productsRes.data.products.map(p => ({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    category: typeof p.category === 'object' ? p.category.name : p.category, 
                    image: p.thumbnail, // Map thumbnail to image
                    rating: {
                        rate: p.rating, // Map rating number to rate
                        count: p.stock  // Map stock to count
                    }
                }));

                // Map DummyJSON categories to array of strings
                const mappedCategories = catRes.data.map(c => typeof c === 'object' ? c.name : c);

                setProducts(mappedProducts);
                setCategories(["All", ...mappedCategories]);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return { products, categories, loading, error };
}
