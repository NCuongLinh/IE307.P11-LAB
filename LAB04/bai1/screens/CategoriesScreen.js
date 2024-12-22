import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useCart } from '../context/CartContext'

//22520767 Nguyễn Cương Lĩnh

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, cart, firstCart } = useCart();


  useEffect(() => {
    // Fetch danh sách các categories
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));

    // Fetch tất cả sản phẩm khi load trang
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    // Fetch sản phẩm theo category đã chọn
    if (selectedCategory !== 'all') {
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } else {
      // Fetch lại tất cả sản phẩm khi không chọn category
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [selectedCategory]);

  const icons = {
    all: require('../assets/icon/all.png'),
    electronics: require('../assets/icon/electronics.png'),
    jewelery: require('../assets/icon/jewelery.png'),
    "men's clothing": require('../assets/icon/men.png'),
    "women's clothing": require('../assets/icon/women.png'),
  };

  const handleAddToCart = (item) => {
    const isInCart = cart.some(cartItem => cartItem.id === item.id);
    const isInFirstCart = firstCart.some(cartItem => cartItem.productId === item.id);

    if (isInCart || isInFirstCart) {
      Alert.alert('Message', `This product is already in your cart.`);
      return;
    }

    addToCart({ id: item.id, title: item.title, price: item.price, image: item.image });
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

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>

        {/* Danh sách categories có thể cuộn ngang */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setSelectedCategory('all')}>
            <Image source={icons['all']} style={styles.icon} />
            <Text style={[
              styles.categoryItem,
              selectedCategory === 'all' && styles.selectedCategoryItem,
            ]}
              numberOfLines={1}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category, index) => (
            <TouchableOpacity style={styles.iconButton} key={index} onPress={() => setSelectedCategory(category)}>
              <Image source={icons[category]} style={styles.icon} />
              <Text style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategoryItem,
              ]}
                numberOfLines={1}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hiển thị danh sách sản phẩm */}
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          renderItem={renderItem}
        />
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
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 20,
  },
  categoryList: {
    marginVertical: 10,
  },
  categoryItem: {
    textAlign: 'center',
    flexWrap: 'nowrap',
    overflow: 'visible',
    width: 90,

  },
  productItem: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  selectedCategoryItem: {
    color: 'blue',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  iconButton: {
    height: 80,
    width: 100,
    alignItems: 'center',
  },
  ratingContainer: {
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
  }
});

export default CategoryScreen;
