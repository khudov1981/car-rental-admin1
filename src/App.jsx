import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CarManagement from './components/CarManagement';
import OrderManagement from './components/OrderManagement';
import CustomerManagement from './components/CustomerManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
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