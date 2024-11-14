import React, { createContext, useState } from 'react';

//22520767 Nguyễn Cương Lĩnh

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const validEmail = '22520767@gm.uit.edu.vn';
  const validPassword = 'nguyencuonglinh';

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
