import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeBottom from '../navigation/HomeBottom'
import EditNoteScreen from '../screen/EditNoteScreen'
import AddNoteScreen from '../screen/AddNoteScreen'
import { SettingsContext } from '../context/SettingsContext';
import {useContext} from 'react';

 
const Stack = createStackNavigator();

const NavigationStack = () => {
  const { isDarkMode } = useContext(SettingsContext);

  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
     }}>
      <Stack.Screen
        name="HomeBottom"
        component={HomeBottom}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ title: 'AddNote', headerShown: true, headerTitleStyle: { fontWeight: 'bold' } }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{ title: 'EditNote', headerShown: true, headerTitleStyle: { fontWeight: 'bold' } }}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;