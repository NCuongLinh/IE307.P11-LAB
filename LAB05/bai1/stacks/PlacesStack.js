import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PlacesScreen from '../screens/PlacesScreen';
import AddPlacesScreen from '../screens/AddPlacesScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import MapScreen from '../screens/MapScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';

const Stack = createStackNavigator();

const PlacesStack = () => {
  const isFocused = useIsFocused();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Places"
        component={PlacesScreen}
        options={({ navigation }) => ({
          title: 'My Places',
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('AddPlaces')}
            >
              <AntDesign name="pluscircle" size={35} color="tomato" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        })}
      />
      <Stack.Screen
        name="AddPlaces"
        component={AddPlacesScreen}
        options={{
          title: 'Add a new place',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
            <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Add a new place',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
                  <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{
          title: 'Details',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />

    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 30,
  },
});

export default PlacesStack;
