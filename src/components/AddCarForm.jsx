import React, { useState } from 'react'
import './EditCarForm.css'

const AddCarForm = ({ onAdd, onCancel }) => {
  const [plate, setPlate] = useState('')
  const [photos, setPhotos] = useState(Array(5).fill(null)) // Заглушка для 5 фото

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валидация обязательных полей
    if (!plate) {
      alert('Пожалуйста, введите госномер')
      return
    }
    
    const newCar = {
      plate: plate.toUpperCase(),
      // Добавляем заглушку для фото
      photos: photos.map((_, index) => `https://images.unsplash.com/photo-${index + 1}?w=300&h=200&fit=crop`)
    }
    
    onAdd(newCar)
  }

  const handlePlateChange = (e) => {
    // Формат госномера: X000XX000 (1 буква, 3 цифры, 2 буквы, 2-3 цифры региона)
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9А-Я]/g, '')
    
    // Ограничиваем длину до 9 символов
    if (value.length > 9) {
      value = value.substring(0, 9)
    }
    
    setPlate(value)
  }

  // Форматирование отображаемого значения госномера
  const formatPlateDisplay = (value) => {
    if (!value) return ''
    
    // Формат: X000XX000 (1 буква, 3 цифры, 2 буквы, 2-3 цифры региона)
    const cleanValue = value.replace(/[^A-Z0-9А-Я]/g, '')
    
    if (cleanValue.length <= 1) {
      return cleanValue
    } else if (cleanValue.length <= 4) {
      return cleanValue.substring(0, 1) + cleanValue.substring(1).replace(/\D/g, '')
    } else if (cleanValue.length <= 6) {
      const letterPart = cleanValue.substring(0, 1)
      const numberPart = cleanValue.substring(1, 4)
      const letterPart2 = cleanValue.substring(4, 6)
      return letterPart + numberPart + letterPart2
    } else {
      const letterPart = cleanValue.substring(0, 1)
      const numberPart = cleanValue.substring(1, 4)
      const letterPart2 = cleanValue.substring(4, 6)
      const regionPart = cleanValue.substring(6, 9)
      return letterPart + numberPart + letterPart2 + regionPart
    }
  }

  // Заглушка для фото - просто отображаем пустые блоки
  const renderPhotoPlaceholders = () => {
    return (
      <div className="photos-grid">
        {photos.map((_, index) => (
          <div key={index} className="photo-placeholder">
            <div className="photo-placeholder-content">
              <span className="photo-placeholder-text">Фото {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="edit-car-form-overlay">
      <div className="edit-car-form">
        <div className="form-header">
          <h3>Добавление автомобиля</h3>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="plate">Государственный номер *:</label>
            <input
              type="text"
              id="plate"
              value={formatPlateDisplay(plate)}
              onChange={handlePlateChange}
              placeholder="Введите госномер"
              maxLength="9"
              className="form-input"
              autoFocus
            />
            <div className="input-hint">Формат: X000XX000</div>
          </div>
          
          <div className="form-group">
            <label>Фотографии автомобиля:</label>
            <div className="photos-info">
              <div className="input-hint">Необходимо загрузить минимум 5 фотографий</div>
            </div>
            {renderPhotoPlaceholders()}
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="save-button">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCarForm