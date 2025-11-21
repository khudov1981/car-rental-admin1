import React, { useState } from 'react';

const CarManagement = () => {
  const [cars, setCars] = useState([
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2022, status: 'available' },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2021, status: 'rented' },
    { id: 3, brand: 'Ford', model: 'Focus', year: 2020, status: 'maintenance' }
  ]);

  return (
    <div>
      <h2>Управление автомобилями</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Добавить автомобиль
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Марка</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Модель</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Год</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Статус</th>
            <th style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{car.brand}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{car.model}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>{car.year}</td>
              <td style={{ border: '1px solid #dee2e6', padding: '0.75rem' }}>
                {car.status === 'available' ? 'Доступен' : 
                 car.status === 'rented' ? 'Арендован' : 'На обслуживании'}
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
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarManagement;