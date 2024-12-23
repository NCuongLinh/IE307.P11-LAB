import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [firstCart, setFirstCart] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        // Tính tổng số lượng product cho tabbarbadge
        const totalCount = cart.length;
        setCartItemCount(totalCount);
    }, [cart]);

    // Set cart khi được fetch từ API
    useEffect(() => {
        if (firstCart.length > 0) {
            setCart(firstCart);
        }
    }, [firstCart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            // Check product có trong cart chưa
            const existingProductIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (existingProductIndex >= 0) {
                // Nếu có tồn tại thì tăng quantity +=1
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                // Nếu chưc có product thì thêm vào product
                return [...prevCart, { ...item, quantity: 1 }]; // Set quantity ban đầu = 1
            }
        });
    };

    const setFetchedCart = (fetchedCart) => {
        setFirstCart(fetchedCart);
    };

    const updateCartItemQuantity = (updatedItem) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === updatedItem.id
                    ? { ...item, quantity: updatedItem.quantity } // Update quantity
                    : item 
            )
        );
    };

    const removeProductFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, setFetchedCart, firstCart, updateCartItemQuantity, removeProductFromCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
