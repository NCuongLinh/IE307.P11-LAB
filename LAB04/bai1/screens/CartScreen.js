import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
    const { cart, setFetchedCart, updateCartItemQuantity, removeProductFromCart } = useCart();
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        // Fetch cart đầu tiên của user
        fetch('https://fakestoreapi.com/carts/user/2')
            .then((res) => res.json())
            .then((json) => {
                if (json.length > 0) {
                    setFetchedCart(json[0].products.map(product => ({ id: product.productId, quantity: product.quantity })));
                }
            })
            .catch((error) => console.error("Failed to fetch cart data:", error));
    }, []);

    useEffect(() => {
        const productIds = cart.map((item) => item.id);
        const fetchProductDetails = productIds.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json())
                .catch(() => null) 
        );

        Promise.all(fetchProductDetails)
            .then((details) => setProductDetails(details.filter(Boolean))); 
    }, [cart]);

    const handleQuantityChange = (item, action) => {
        const newQuantity = action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
        updateCartItemQuantity({ ...item, quantity: newQuantity });
    };

    const handleRemoveProduct = (id) => {
        removeProductFromCart(id);
    };

    const totalItemPrice = (item) => (item.price * (item.quantity || 1)).toFixed(2);

    const combinedProducts = cart.map((cartItem) => {
        const productDetail = productDetails.find((product) => product.id === cartItem.id);
        return { ...cartItem, ...productDetail }; //  cart item + product detail
    });

    const renderProduct = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productTitle}>{item.title || "Product not found"}</Text>
            <View style={styles.productContainer}>
                <Image source={{ uri: item.image || '' }} style={styles.image} />
                <View style={styles.productActionContainer}>
                    <Text style={styles.productText}>${item.price || 0}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => handleQuantityChange(item, 'decrease')}>
                            <Text style={styles.quantityChanger}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityChanger}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => handleQuantityChange(item, 'increase')}>
                            <Text style={styles.quantityChanger}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.totalText}>Total: ${totalItemPrice(item)}</Text>
                <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
                    <Text style={styles.removeText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                {combinedProducts.length > 0 ? (
                    <FlatList
                        data={combinedProducts}
                        keyExtractor={(item, index) => (item.id || index).toString()}
                        renderItem={renderProduct}
                    />
                ) : (
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                )}
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalPrice}>
                    Total Amount: $
                    {combinedProducts
                        .reduce((total, item) => total + (item.price * item.quantity || 0), 0)
                        .toFixed(2)}
                </Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#aaa',
        marginTop: 50,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 5,
        backgroundColor: '#fff',
    },
    removeText: {
        color: 'red',
        marginInlineStart: 20,
        textAlign: 'center',
        fontSize: 25,
    },
    productItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    productTitle: {
        fontSize: 20,
        marginBottom: 5,
    },
    productText: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productActionContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
    },
    quantityChanger: {
        fontSize: 23,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#f9f9f9',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#24a0ed',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    checkoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CartScreen;
