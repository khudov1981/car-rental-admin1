import React, { useState } from 'react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Иванов Иван Иванович', phone: '+7 (999) 123-45-67', email: 'ivanov@example.com', orders: 5 },
    { id: 2, name: 'Петров Петр Петрович', phone: '+7 (999) 234-56-78', email: 'petrov@example.com', orders: 3 },
    { id: 3, name: 'Сидоров Сидор Сидорович', phone: '+7 (999) 345-67-89', email: 'sidorov@example.com', orders: 2 }
  ]);

  return (
    <div>
      <h2>Управление клиентами</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Добавить клиента
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Имя</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Телефон</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Email</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Количество заказов</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{customer.name}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{customer.phone}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{customer.email}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{customer.orders}</td>
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

export default CustomerManagement;