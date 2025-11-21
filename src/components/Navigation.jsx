import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ 
      backgroundColor: '#333', 
      padding: '1rem',
      marginBottom: '2rem'
    }}>
      <ul style={{ 
        listStyle: 'none', 
        display: 'flex', 
        justifyContent: 'center',
        margin: 0,
        padding: 0
      }}>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Главная</Link>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/cars" style={{ color: 'white', textDecoration: 'none' }}>Автомобили</Link>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>Заказы</Link>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/customers" style={{ color: 'white', textDecoration: 'none' }}>Клиенты</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;