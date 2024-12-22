import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = ({ route }) => {
    const [firstCart, setFirstCart] = useState(null);
    const { cart, setFetchedCart, updateCartItemQuantity, removeProductFromCart } = useCart(); // Access context
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        // Fetch initial cart data
        fetch('https://fakestoreapi.com/carts/user/2')
            .then((res) => res.json())
            .then((json) => {
                if (json.length > 0) {
                    setFirstCart(json[0]);
                    setFetchedCart(json[0].products);
                }
            });
    }, []);

    useEffect(() => {
        if (firstCart) {
            const productIds = firstCart.products.map((item) => item.productId);
            const fetchProductDetails = productIds.map((id) =>
                fetch(`https://fakestoreapi.com/products/${id}`)
                    .then((res) => res.json())
            );

            Promise.all(fetchProductDetails)
                .then((details) => setProductDetails(details));
        }
    }, [firstCart]);

    const handleQuantityChange = (item, action) => {
        const updatedItem = {
            ...item,
            quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1,
        };

        if (updatedItem.quantity < 1) updatedItem.quantity = 1; // Prevent negative or zero quantities

        // Update cart and firstCart
        updateCartItemQuantity(updatedItem); // Update in context (cart)

        if (firstCart) {
            const updatedFirstCart = {
                ...firstCart,
                products: firstCart.products.map((prod) =>
                    prod.productId === item.productId ? updatedItem : prod
                ),
            };
            setFirstCart(updatedFirstCart); // Update in local state (firstCart)
        }
    };

    const handleRemoveProduct = (productId) => {
        // Remove from both cart and firstCart
        removeProductFromCart(productId); // Remove from cart in context

        if (firstCart) {
            const updatedFirstCart = {
                ...firstCart,
                products: firstCart.products.filter((item) => item.productId !== productId),
            };
            setFirstCart(updatedFirstCart); // Remove from firstCart
        }
    };

    const totalItemPrice = () => {
        return combinedProducts.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0).toFixed(2); // Làm tròn đến 2 chữ số thập phân
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <View style={styles.productContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.productActionContainer}>
                    <Text style={styles.productText}>${item.price}</Text>
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
                <Text style={styles.totalText}>
                    Total: ${totalItemPrice()}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveProduct(item.productId)}>
                    <Text style={styles.removeText}>X</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    const combinedProducts = [
        ...cart,
        ...(firstCart
            ? firstCart.products.map((cartItem) => {
                const productDetail = productDetails.find(
                    (product) => product.id === cartItem.productId
                );
                return { ...cartItem, ...productDetail };
            })
            : []),
    ];

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <FlatList
                    data={combinedProducts}
                    keyExtractor={(item, index) => (item.productId || item.id || index).toString()}
                    renderItem={renderProduct}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalPrice}>Total Amount: ${totalItemPrice()}</Text>
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
        justifyContent: 'center'
    },
    productActionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
