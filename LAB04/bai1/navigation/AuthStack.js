import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen';
import Entypo from '@expo/vector-icons/Entypo';
import EditProfileScreen from '../screens/EditProfileScreen';

 

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: true, }}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
