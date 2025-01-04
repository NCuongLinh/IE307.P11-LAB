import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { getPlaces } from '../database/data';
 
const PlacesScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const placesData = await getPlaces(); 
      setPlaces(placesData); 
    };

    const unsubscribe = navigation.addListener('focus', fetchPlaces); 
    return unsubscribe;
  }, [navigation]);

  const getPlaceById = (id) => {
    const place = places.find((p) => p.id === id); 
    return place;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {places.map((place) => (
          <View key={place.id} style={styles.placeContainer}>
            <TouchableOpacity
            style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('PlaceDetail', { placeId: place.id, placeTitle: place.title }) 
              }
            >

              <Image source={{ uri: place.imageUri }} style={styles.image} />
              <View style={styles.textContainer}>
              <Text style={styles.title}>{place.title}</Text>
              <Text style={styles.locationText}>{place.locationName || 'Unnamed'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  placeContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  textContainer: {
    gap: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    width: 210,
    elipsizeMode: 'tail',
  },
});

export default PlacesScreen;
