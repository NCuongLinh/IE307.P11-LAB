import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MediaScreen from '../screens/MediaScreen';
import RecordScreen from '../screens/RecordScreen';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
 
const Stack = createStackNavigator();

const MediaStack = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Media"
        component={MediaScreen}
        options={({ navigation }) => {
          return {
            title: 'My Gallery',
            headerRight: () => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Record')}
              >
                <FontAwesome name="video-camera" size={35} color="tomato" />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25
            }
          }
        }}

      />
      <Stack.Screen
        name="Record"
        component={RecordScreen}
        options={{
          title: 'Record Video',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25
          }
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 30
  }
});


export default MediaStack;