import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryScreen from './CategoriesScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useCart } from '../context/CartContext';

 
const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const { cartItemCount } = useCart();

  return (
    <Tab.Navigator screenOptions={{ headerShown: true, tabBarInactiveTintColor: 'black'}} >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore1" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="cart-shopping" size={size} color={color} />
            ),
            tabBarBadge: cartItemCount > 0 ? cartItemCount : null, 
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
            ),
            headerShown: false
        }
        
      }
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
