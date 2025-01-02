import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

const MapScreen = ({ route, navigation }) => {
  const { setLocation } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [placeName, setPlaceName] = useState('');

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setPlaceName(data.display_name); // Lấy tên địa điểm từ kết quả API
      } else {
        setPlaceName('Unknown Location');
      }
    } catch (error) {
      console.error('Error fetching place name:', error);
      setPlaceName('Error fetching location');
    }
  };

  const confirmLocation = () => {
    if (!selectedLocation) {
      Alert.alert('No location selected!');
      return;
    }
    setLocation({ ...selectedLocation, name: placeName }); // Thêm tên địa điểm
    navigation.goBack();
  };

  return (
    <View style={styles.body}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.869492315581493,
          longitude: 106.80227156728506,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>

      {selectedLocation && (
        <View style={styles.infoBox}>
          <Text style={styles.locationText}>
            {placeName || 'Fetching location...'}
          </Text>
          <TouchableOpacity onPress={confirmLocation} style={styles.button}>
            <Text style={styles.buttonText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      )}
      
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
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
    backgroundColor: '#3498db',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MapScreen;
