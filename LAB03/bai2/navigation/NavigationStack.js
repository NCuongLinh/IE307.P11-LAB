import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeBottom from '../navigation/HomeBottom'
import EditNoteScreen from '../screen/EditNoteScreen'


const Stack = createStackNavigator();

const NavigationStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen
          name="HomeBottom"
          component={HomeBottom}
          options={{title: 'Welcome'}}
        />
                <Stack.Screen
          name="EditNote"
          component={EditNoteScreen}
          options={{title: 'edit'}}
        />
      </Stack.Navigator>
  );
};

export default NavigationStack;