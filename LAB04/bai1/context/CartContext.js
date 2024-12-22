import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [firstCart, setFirstCart] = useState([]);

    // Set cart when it's fetched (if applicable)
    useEffect(() => {
        if (firstCart.length > 0) {
            setCart(firstCart);
        }
    }, [firstCart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingProductIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (existingProductIndex >= 0) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
                return [...prevCart, { ...item, quantity: 1 }]; // Make sure to set initial quantity to 1
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
                    ? { ...item, quantity: updatedItem.quantity } // Cập nhật số lượng của sản phẩm đúng
                    : item // Các sản phẩm khác không thay đổi
            )
        );
    };

    const removeProductFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, setFetchedCart, firstCart, updateCartItemQuantity, removeProductFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
