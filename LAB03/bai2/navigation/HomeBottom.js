import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import SettingScreen from '../screen/SettingScreen'
import { DefaultTheme } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useContext} from 'react';
import { SettingsContext } from '../context/SettingsContext';

const Tab = createBottomTabNavigator();

function HomeBottom() {
  const { isDarkMode } = useContext(SettingsContext);
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: isDarkMode ? 'black' : 'white', 
      },
      tabBarActiveTintColor: isDarkMode ? '#0097FA' : '#0097FA', 
      tabBarInactiveTintColor: isDarkMode ? 'white' : 'black', 

    }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          title: 'Home',
        }}

      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen} 
        options={{
          headerShown:true,
          tabBarIcon:({color, size}) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
        />
    </Tab.Navigator>
  );
}

export default HomeBottom;