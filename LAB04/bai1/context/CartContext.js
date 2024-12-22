import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [firstCart, setFirstCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };
    const setFetchedCart = (fetchedCart) => {
        setFirstCart(fetchedCart);
    };
    const updateCartItemQuantity = (updatedItem) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === updatedItem.productId ? updatedItem : item
            )
        );
    };

    const removeProductFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
    };



    return (
        <CartContext.Provider value={{ cart, addToCart, setFetchedCart, firstCart, updateCartItemQuantity, removeProductFromCart   }}>
            {children}
        </CartContext.Provider>
    );
};
