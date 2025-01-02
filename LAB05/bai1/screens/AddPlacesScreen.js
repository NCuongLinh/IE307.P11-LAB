import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { savePlace } from '../database/data';  // Import hàm lưu
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddPlacesScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [title, setTitle] = useState('');

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      if (data && data.address) {
        return data.display_name; // Hoặc một trường khác như `data.address.city`
      }
      return 'Unknown Location';
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      return 'Unknown Location';
    }
  };

  // Request camera and library permissions
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle picking image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle taking a photo
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  // Navigate to MapScreen to select a location
  const navigateToMap = () => {
    navigation.navigate('Map', {
      setLocation: (newLocation) => setLocation(newLocation),
    });
  };

  const saveCurrentPlace = async () => {
    if (image && location) {
      const locationName = await reverseGeocode(location.latitude, location.longitude);
      savePlace(title, locationName, image, location.latitude, location.longitude);
      Alert.alert('Place saved!');
    } else {
      Alert.alert('Please select an image and location!');
    }
  };
  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>

        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={setTitle} />
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No image taken yet.</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>
              <Ionicons name="image" size={16} color="#24a0ed"/> Pick Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Text style={styles.buttonText}>
              <Entypo name="camera" size={16} color="#24a0ed" /> Take Image
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          {location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={location} />
            </MapView>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No location picked yet.</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={getCurrentLocation} style={styles.button}>
            <Text style={styles.buttonText}>
              <MaterialIcons name="place" size={16} color="#24a0ed" /> Locate User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToMap} style={styles.button}>
            <Text style={styles.buttonText}>
              <FontAwesome name="map" size={16} color="#24a0ed" /> Pick on Map
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={saveCurrentPlace} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>
            Add Place
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center',
    borderColor: '#24a0ed',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    marginLeft: 8, // Tạo khoảng cách giữa icon và text
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    resizeMode: 'contain',
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#24a0ed',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignSelf: 'center',
    borderColor: '#24a0ed',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  placeholderContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20, 
  },
  mapContainer: {
    marginBottom: 20,
  },
  placeholder: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  placeholderText: {
    color: '#757575',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddPlacesScreen;
