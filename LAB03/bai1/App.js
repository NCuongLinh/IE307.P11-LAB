import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, StyleSheet, View, Button, Alert } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import { AuthProvider } from './context/AuthContext';

//22520767 Nguyễn Cương Lĩnh

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer >
      <AuthStack/>
      

    </NavigationContainer>
    </AuthProvider>

  );
}
