import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import CarouselComponent from '../components/CarouselComponent';
import Entypo from '@expo/vector-icons/Entypo';
import { useCart } from '../context/CartContext'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//22520767 Nguyễn Cương Lĩnh

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [jewelery, setJewelery] = useState([]);
    const { addToCart, cart, firstCart } = useCart();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all products
        const fetchProducts = fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
        // Fetch jewelery
        const fetchJewelery = fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res => res.json())
            .then(data => setJewelery(data));

        Promise.all([fetchProducts, fetchJewelery])
            .finally(() => setLoading(false));
    }, []);

    const handleAddToCart = (item) => {
        const isInCart = cart.some(cartItem => cartItem.id === item.id);

        if (isInCart) {
            Alert.alert('Message', `This product is already in your cart.`);
            return;
        }

        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: 1
        });
        Alert.alert('Success', `${item.title} has been added to your cart!`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.productTitle} >
                {item.title}
            </Text>
            <Text>${item.price}</Text>
            <View style={styles.itemColumn}>
                <View style={styles.ratingContainer}>
                    <Text>
                        {item.rating.rate}
                        <Entypo name="star" size={20} color="yellow" />
                        ({item.rating.count})
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(item)}>
                    <Text style={styles.addToCartButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#24A0ED" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.title} >
                    Submit and embrace to consumerism
                </Text>
                <CarouselComponent />
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        Hot Deal
                    </Text>
                    <FontAwesome5 name="fire" size={24} color="red" style={styles.icon} />
                </View>
                <View style={styles.productList}>
                    <FlatList
                        data={products}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        scrollEnabled={false}
                        renderItem={renderItem}
                    />
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        New Arrivals
                        <MaterialCommunityIcons name="medal" size={24} color="gold" style={styles.icon} />
                    </Text>
                </View>
                <View style={styles.productList}>
                    <FlatList
                        data={jewelery}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        scrollEnabled={false}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    body: {
        backgroundColor: '#F2F4F7',
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F4F7',
        marginHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 22,
        fontStyle: 'italic',
    },
    header: {
        textAlign: 'left',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'cover',
        marginBottom: 5,
        backgroundColor: 'white',
    },
    productList: {
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        marginBlock: 5
    },
    addToCartButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginInlineEnd: 20
    },
    addToCartButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    itemColumn: {
        flexDirection: 'row',
    },
    productTitle: {
        lineHeight: 20,
        height: 40,
    },
    itemColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    ratingContainer: {
        flex: 1,
    },
});
export default HomeScreen
