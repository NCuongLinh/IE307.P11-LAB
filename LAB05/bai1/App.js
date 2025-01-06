import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PlacesStack from './stacks/PlacesStack';
import MediaStack from './stacks/MediaStack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, LogBox } from "react-native";

const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: '#24a0ed',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 20,
        },
        tabBarStyle: {
          height: 66,
          paddingBottom: 10,
        },
      })}>
        <Tab.Screen name="PlacesStack" component={PlacesStack} options={() => ({
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="place" size={30} color={color} />
          ),
          title: 'Places',
          
        })} />
        <Tab.Screen name="MediaStack" component={MediaStack} options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="perm-media" size={30} color={color} />
          ),
          title: 'Media',
        }
      }
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
