import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('isDarkMode');
        const storedFontSize = await AsyncStorage.getItem('fontSize');

        if (storedDarkMode !== null) setIsDarkMode(JSON.parse(storedDarkMode));
        if (storedFontSize !== null) setFontSize(parseInt(storedFontSize, 10));
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };
    loadSettings();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Failed to save dark mode', error);
    }
  };

  const updateFontSize = async (size) => {
    try {
      setFontSize(size);
      await AsyncStorage.setItem('fontSize', size.toString());
    } catch (error) {
      console.error('Failed to save font size', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ isDarkMode, toggleDarkMode, fontSize, updateFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
};
