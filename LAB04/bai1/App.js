import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


 
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer >
          <AuthStack />


        </NavigationContainer>
      </CartProvider>
    </AuthProvider>

  );
}
