import React, { createContext, useState } from 'react';

 
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const validEmail = 'mor_2314';  // Chỉ có thể set mặc định mor_2314 và 83r5^_ (Lý do: Issue #61 github.com/keikaavousi/fake-store-api)
  const validPassword = '83r5^_';

  const login = (email, password) => {
    if (email === validEmail && password === validPassword) {
      setUserInfo({ email });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = (navigation) => {
    setUserInfo(null);
    navigation.navigate('LoginScreen');
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, validEmail, validPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
