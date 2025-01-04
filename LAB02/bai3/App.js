import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import { AuthProvider } from './context/AuthContext';

 
export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer >
      <AuthStack/>
      

    </NavigationContainer>
    </AuthProvider>

  );
}
