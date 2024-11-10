import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'
import MainScreen from '../screens/MainScreen'
import HomeDetailsScreen from '../screens/HomeDetailsScreen';
import NotificationDetailsScreen from '../screens/NotificationDetailsScreen';


const Stack = createStackNavigator();

//22520767 Nguyễn Cương Lĩnh

const NavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="HomeDetailsScreen" component={HomeDetailsScreen}
        options={{
          headerShown: true,
          title: 'HomeDetails'
        }} />
      <Stack.Screen name="NotificationDetailsScreen" component={NotificationDetailsScreen}
        options={{
          headerShown: true,
          title: 'NotificationDetails'
        }} />

    </Stack.Navigator>

  );
};

export default NavigationStack;
