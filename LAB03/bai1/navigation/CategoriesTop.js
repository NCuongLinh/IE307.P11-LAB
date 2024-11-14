import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoriesScreen1 from '../screens/categories/CategoriesScreen1'
import CategoriesScreen2 from '../screens/categories/CategoriesScreen2'
import CategoriesScreen3 from '../screens/categories/CategoriesScreen3'

const Tab = createMaterialTopTabNavigator();

function CategoriesTop() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Categories1" component={CategoriesScreen1} />
      <Tab.Screen name="Categories2" component={CategoriesScreen2} />
      <Tab.Screen name="Categories3" component={CategoriesScreen3} />
    </Tab.Navigator>
  );
}

export default CategoriesTop;