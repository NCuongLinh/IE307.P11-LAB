import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const validEmail = '';
  const validPassword = '';

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
