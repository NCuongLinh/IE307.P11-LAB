import { StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack'
import { SettingsProvider } from './context/SettingsContext';

//22520767 Nguyễn Cương Lĩnh

export default function App() {
  return (
    <SettingsProvider>
    <NavigationContainer>
      <NavigationStack/>


    </NavigationContainer>
    </SettingsProvider>
  );
}
