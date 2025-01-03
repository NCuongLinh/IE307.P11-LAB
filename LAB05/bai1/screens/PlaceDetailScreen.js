import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPlaces } from '../database/data';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PlaceDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { placeId, placeTitle } = route.params;

  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Theo dõi trạng thái tải

  navigation.setOptions({ title: placeTitle });
  
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const places = await getPlaces();
        const selectedPlace = places.find((p) => p.id === placeId);

        if (selectedPlace) {
          setPlace(selectedPlace);
        } else {
          Alert.alert('Place not found', 'The place with the given ID could not be found.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch place data.');
      } finally {
        setIsLoading(false); 
      }
    };

    fetchPlace();
  }, [placeId]);

  const handleViewOnMap = () => {
    if (place) {
      navigation.navigate('Map', {
        latitude: place.latitude,
        longitude: place.longitude,
        isFromPlaceDetail: true,  
      });
    } else {
      Alert.alert('No location available.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.errorContainer}>
        <Text>Place not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <Text style={styles.locationText}>{place.locationName || 'Unnamed'}</Text>


      <TouchableOpacity onPress={handleViewOnMap} style={styles.button}>
        <Text style={styles.buttonText}>
          <FontAwesome name="map" size={16} color="#24a0ed" /> View on Map
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  locationText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 60,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center',
    borderColor: '#24a0ed',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',

  },
});

export default PlaceDetailScreen;
