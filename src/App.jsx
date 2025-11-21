import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CarManagement from './components/CarManagement';
import OrderManagement from './components/OrderManagement';
import CustomerManagement from './components/CustomerManagement';
import { loadScript } from './utils/scriptLoader';
import './App.css';

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(null);

  useEffect(() => {
    // Пример безопасной загрузки внешнего скрипта
    // В реальном приложении здесь может быть загрузка библиотеки для работы с картами,
    // аналитики или других внешних сервисов
    /*
    loadScript('https://example.com/some-external-library.js')
      .then(() => {
        setScriptLoaded(true);
        console.log('Внешний скрипт успешно загружен');
      })
      .catch((error) => {
        setScriptError(error.message);
        console.error('Ошибка загрузки внешнего скрипта:', error);
      });
    */
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation />
        {scriptError && (
          <div style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '1rem', 
            margin: '1rem', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px' 
          }}>
            Ошибка загрузки внешнего скрипта: {scriptError}
          </div>
        )}
        {scriptLoaded && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            padding: '1rem', 
            margin: '1rem', 
            border: '1px solid #c3e6cb', 
            borderRadius: '4px' 
          }}>
            Внешний скрипт успешно загружен
          </div>
        )}
        <main style={{ padding: '0 2rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cars" element={<CarManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;