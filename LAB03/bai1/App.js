import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import { AuthProvider } from './context/AuthContext';

//22520767 Nguyễn Cương Lĩnh

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer >
      <NavigationStack/>
    
    </NavigationContainer>

    </AuthProvider>

  );
}
