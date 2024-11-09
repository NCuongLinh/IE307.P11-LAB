import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouriteScreen from './FavouritesScreen';
import CategoryScreen from './CategoriesScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarInactiveTintColor: 'black'}} >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          title: 'Home', 
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore1" size={size} color={color} />
            ),
            title: 'Categories', 
            headerShown: true,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="heart-fill" size={size} color={color} />
            ),
            tabBarBadge:3,
            title: 'Favourites', 
            headerShown: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
            ),
            title: 'Profile', 
            headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
