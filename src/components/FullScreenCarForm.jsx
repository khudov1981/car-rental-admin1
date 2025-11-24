import React, { useState } from 'react';
import './FullScreenCarForm.css';

const FullScreenCarForm = ({ onSubmit, onCancel }) => {
  const [plate, setPlate] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Простая валидация
    if (!plate || !pricePerDay) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    onSubmit({
      plate: plate.toUpperCase(),
      pricePerDay: parseInt(pricePerDay),
      brand: 'Не указано',
      model: 'Не указано',
      year: new Date().getFullYear(),
      color: 'Не указан',
      transmission: 'automatic'
    });
  };

  return (
    <div className="fullscreen-overlay">
      <div className="fullscreen-header">
        <button className="back-button" onClick={onCancel}>
          ←
        </button>
        <div className="fullscreen-title">Добавление автомобиля</div>
        <div style={{ width: '40px' }}></div>
      </div>
      
      <div className="fullscreen-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Государственный номер *</label>
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="Введите госномер"
              className="form-input"
              style={{ width: '100%', padding: '12px', margin: '8px 0' }}
            />
          </div>
          
          <div className="form-group">
            <label>Стоимость за сутки (руб.) *</label>
            <input
              type="number"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              placeholder="Введите стоимость"
              className="form-input"
              style={{ width: '100%', padding: '12px', margin: '8px 0' }}
            />
          </div>
        </form>
      </div>
      
      <div className="fullscreen-actions">
        <button className="fullscreen-cancel-button" onClick={onCancel}>
          Отмена
        </button>
        <button className="fullscreen-save-button" onClick={handleSubmit}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default FullScreenCarForm;