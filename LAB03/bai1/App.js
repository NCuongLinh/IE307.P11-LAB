import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, StyleSheet, View, Button, Alert } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import { AuthProvider } from './context/AuthContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeDetailsScreen from './screens/HomeDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';

//22520767 Nguyễn Cương Lĩnh


export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer >
      <NavigationStack/>
    
    </NavigationContainer>

    </AuthProvider>

  );
}
