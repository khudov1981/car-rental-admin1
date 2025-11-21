import React, { useState } from 'react'
import './EditCarForm.css'

const EditCarForm = ({ car, onSave, onCancel }) => {
  const [plate, setPlate] = useState(car.plate)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...car, plate: plate.toUpperCase() })
  }

  const handlePlateChange = (e) => {
    // Ограничиваем ввод только буквами и цифрами
    const value = e.target.value.replace(/[^a-zA-Z0-9а-яА-Я]/g, '')
    setPlate(value.toUpperCase())
  }

  return (
    <div className="edit-car-form-overlay">
      <div className="edit-car-form">
        <div className="form-header">
          <h3>Редактирование автомобиля</h3>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        
        <div className="car-info">
          <div className="car-brand-model">{car.brand} {car.model}</div>
          <div className="car-year">{car.year} год</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="plate">Государственный номер:</label>
            <input
              type="text"
              id="plate"
              value={plate}
              onChange={handlePlateChange}
              placeholder="Введите госномер"
              maxLength="9"
              className="form-input"
              autoFocus
            />
            <div className="input-hint">Только буквы и цифры</div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="save-button">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCarForm