import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createStackNavigator();

//22520767 Nguyễn Cương Lĩnh

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
