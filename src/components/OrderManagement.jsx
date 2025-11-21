import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'Иванов И.И.', car: 'Toyota Camry', startDate: '2023-08-01', endDate: '2023-08-10', status: 'active' },
    { id: 2, customer: 'Петров П.П.', car: 'Honda Civic', startDate: '2023-07-25', endDate: '2023-08-05', status: 'completed' },
    { id: 3, customer: 'Сидоров С.С.', car: 'Ford Focus', startDate: '2023-08-03', endDate: '2023-08-15', status: 'active' }
  ]);

  return (
    <div>
      <h2>Управление заказами</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Создать заказ
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Клиент</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Автомобиль</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Дата начала</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Дата окончания</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Статус</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{order.customer}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{order.car}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{order.startDate}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{order.endDate}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>
                {order.status === 'active' ? 'Активен' : 'Завершен'}
              </td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>
                <button style={{ 
                  marginRight: '0.5rem',
                  padding: '0.25rem 0.5rem', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Редактировать
                </button>
                <button style={{ 
                  padding: '0.25rem 0.5rem', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Подробнее
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;