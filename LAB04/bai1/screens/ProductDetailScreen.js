import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({ title: product.title });
        setLoading(false)
    }, [navigation, product.title]);

        if (loading) {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#24A0ED" />
                </View>
            );
        }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <Text style={styles.rating}>
                {product.rating.rate}
                <Entypo name="star" size={20} color="yellow" />
                ({product.rating.count} reviews)
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    rating: {
        fontWeight: 'bold',
        marginBlockEnd: 50,
    }

});

export default ProductDetailScreen;
