import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { ConfigProvider, theme } from 'antd';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login on mount
  useEffect(() => {
    const saved = localStorage.getItem('isLoggedIn');
    if (saved === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = (values: any) => {
    console.log('Login success:', values);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <ConfigProvider theme={{
      token: {
        borderRadius: 8,
        colorPrimary: '#1890ff',
      },
      algorithm: theme.defaultAlgorithm,
    }}>
      <div className="min-h-screen bg-gray-100">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard onLogout={handleLogout} />
        )}
      </div>
    </ConfigProvider>
  )
}

export default App
