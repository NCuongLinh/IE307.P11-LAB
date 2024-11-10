import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import HelpScreen from '../screens/HelpsScreen'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />)
        }}
      />
      <Drawer.Screen name="Notifications" component={NotificationScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />)
        }}
      />
      <Drawer.Screen name="Helps" component={HelpScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="help-circle" size={size} color={color} />)
        }}
      />
    </Drawer.Navigator>

  );
}
export default HomeDrawer;
