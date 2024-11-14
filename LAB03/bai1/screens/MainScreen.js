import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouriteScreen from './FavouritesScreen';
import ProfileScreen from './ProfileScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeDrawer from '../navigation/HomeDrawer'
import CategoriesTop from '../navigation/CategoriesTop'

//22520767 Nguyễn Cương Lĩnh

const Tab = createBottomTabNavigator();

const MainScreen = () => {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarInactiveTintColor: 'black' }} >
      <Tab.Screen
        name="HomeDrawer"
        component={HomeDrawer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          title: 'Home',
        }}
      />

      <Tab.Screen
        name="CategoriesTop"
        component={CategoriesTop}
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
          tabBarBadge: 3,
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
