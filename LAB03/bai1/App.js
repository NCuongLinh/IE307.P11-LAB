import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import { AuthProvider } from './context/AuthContext';

 
export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer >
      <NavigationStack/>
    
    </NavigationContainer>

    </AuthProvider>

  );
}
