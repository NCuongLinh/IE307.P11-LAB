import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useCart } from '../context/CartContext';

 
const CartScreen = ({ navigation }) => {
    const { cart, setFetchedCart, updateCartItemQuantity, removeProductFromCart } = useCart();
    const [productDetails, setProductDetails] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/carts/user/2')
            .then((res) => res.json())
            .then((json) => {
                if (json.length > 0) {
                    setFetchedCart(json[0].products.map(product => ({ id: product.productId, quantity: product.quantity })));
                }
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const productIds = cart.map((item) => item.id);
        const fetchProductDetails = productIds.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json()),
        );

        Promise.all(fetchProductDetails)
            .then((details) => setProductDetails(details.filter(Boolean)))
    }, [cart]);

    const handleRemoveProduct = () => {
        if (!selectedProduct) return;

        if (cart.length === 1) {
            // Nếu là product cuối cùng
            fetch(`https://fakestoreapi.com/carts/7`, { method: 'DELETE' })
                .then(() => {
                    setFetchedCart([]); // Empty cart
                    removeProductFromCart(selectedProduct.id) // Do fakestoreapi nên xóa product trong context
                })
        } else {
            // Xóa sản phẩm và cập nhật giỏ hàng
            fetch(`https://fakestoreapi.com/carts/7`, {
                method: 'PUT',
                body: JSON.stringify(
                    {
                        userId: 3,
                        date: 2019 - 12 - 10,
                        products: [{ productId: 1, quantity: 3 }]
                    }
                ),
            })
                .then(() => {
                    removeProductFromCart(selectedProduct.id); // Xóa product khỏi context
                })
        }

        setModalVisible(false);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleQuantityChange = (item, action) => {
        const newQuantity = action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
        if (newQuantity === 0) {
            handleOpenModal(item);
        } else {
            updateCartItemQuantity({ ...item, quantity: newQuantity });
        }
    };

    const totalAmount = cart.reduce((total, item) => {
        const productDetail = productDetails.find((product) => product.id === item.id);
        return total + (productDetail ? productDetail.price * item.quantity : 0);
    }, 0);

    const combinedProducts = cart.map((cartItem) => {
        const productDetail = productDetails.find((product) => product.id === cartItem.id);
        return { ...cartItem, ...productDetail };
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
                <Text style={styles.totalText}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
                <TouchableOpacity onPress={() => handleOpenModal(item)}>
                    <Text style={styles.removeText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

        if (loading) {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#24A0ED" />
                </View>
            );
        }

    return (
        <View style={styles.body}>
            {combinedProducts.length > 0 ? (
                <>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text>Are you sure you want to delete this product?</Text>
                                <View style={styles.modalActions}>
                                    <TouchableOpacity onPress={handleRemoveProduct} style={styles.modalButtonYes}>
                                        <Text style={styles.modalButtonText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButtonNo}>
                                        <Text style={styles.modalButtonText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <FlatList
                        data={combinedProducts}
                        keyExtractor={(item, index) => (item.id || index).toString()}
                        renderItem={renderProduct}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.totalPrice}>Total Amount: ${totalAmount.toFixed(2)}</Text>
                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>You have no products in your cart.</Text>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Home')} // Điều hướng về HomeScreen
                    >
                        <Text style={styles.homeButtonText}>SHOPPING NOW!</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        backgroundColor: '#fff',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    modalButtonYes: {
        padding: 20,
        paddingHorizontal: 50,
        borderRadius: 5,
        backgroundColor: 'red'
    },
    modalButtonNo: {
        padding: 20,
        paddingHorizontal: 50,
        borderRadius: 5,
        backgroundColor: '#24a0ed'
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 15,
        marginBottom: 5,
    },
    homeButton: {
        backgroundColor: '#24a0ed',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    homeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CartScreen;
