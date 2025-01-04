import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
 
const MapScreen = ({ route, navigation }) => {
  // Get latitude and longitude from route params
  const { latitude, longitude, isFromPlaceDetail } = route.params;

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: latitude ?? 10.869492315581493,
    longitude: longitude ?? 106.80227156728506,
  });
  const [placeName, setPlaceName] = useState('');

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    if (typeof latitude === 'number' && typeof longitude === 'number') {
      setSelectedLocation({ latitude, longitude });

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setPlaceName(data.display_name);
        } else {
          setPlaceName('Unknown Location');
        }
      } catch (error) {
        console.error('Error fetching place name:', error);
        setPlaceName('Error fetching location');
      }
    } else {
      console.error('Invalid coordinates:', latitude, longitude);
    }
  };

  const confirmLocation = () => {
    if (!selectedLocation) {
      Alert.alert('No location selected!');
      return;
    }
    setLocation({ ...selectedLocation, name: placeName });
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (isFromPlaceDetail) {
          return null;
        } else {
          return (
            <TouchableOpacity onPress={confirmLocation} style={styles.headerRight}>
              <Ionicons name="save" size={28} color="black" />
            </TouchableOpacity>
          );
        }
      },
    });
  }, [navigation, selectedLocation, placeName, isFromPlaceDetail]);

  return (
    <View style={styles.body}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude || 10.869492315581493,
          longitude: longitude || 106.80227156728506,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
            <Marker coordinate={selectedLocation} title={placeName ? placeName : "Loading..."}/>

        )}
      </MapView>

      {selectedLocation && (
        <View style={styles.infoBox}>
          <Text style={styles.locationText}>
            {placeName || 'Fetching location...'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoBox: {
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  headerRight: {
    marginRight: 20,
  },
});

export default MapScreen;
