import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Панель управления</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <div style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Автомобили</h3>
          <p>Всего: 25</p>
          <p>Доступно: 18</p>
        </div>
        <div style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Заказы</h3>
          <p>Активных: 12</p>
          <p>Завершенных: 45</p>
        </div>
        <div style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Клиенты</h3>
          <p>Всего: 87</p>
          <p>Постоянных: 23</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;