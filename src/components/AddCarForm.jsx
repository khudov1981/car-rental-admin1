import React, { useState } from 'react'
import './EditCarForm.css'
import { getCarInfoByPlate } from '../data/plateVinDatabase'

const AddCarForm = ({ onAdd, onCancel }) => {
  const [plate, setPlate] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [photos, setPhotos] = useState(Array(5).fill(null)) // Заглушка для 5 фото
  const [carInfo, setCarInfo] = useState(null) // Информация об автомобиле из базы данных
  const [loading, setLoading] = useState(false) // Состояние загрузки
  const [error, setError] = useState('') // Ошибка при поиске автомобиля

  // Функция для поиска автомобиля по госномеру
  const searchCarByPlate = () => {
    if (!plate) {
      setError('Пожалуйста, введите госномер')
      return
    }
    
    setLoading(true)
    setError('')
    
    // Имитируем задержку для лучшего UX
    setTimeout(() => {
      const result = getCarInfoByPlate(plate.toUpperCase())
      
      if (result.success) {
        setCarInfo(result.data)
        setError('')
      } else {
        setCarInfo(null)
        setError(result.message)
      }
      
      setLoading(false)
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валидация обязательных полей
    if (!plate) {
      alert('Пожалуйста, введите госномер')
      return
    }
    
    if (!pricePerDay || parseInt(pricePerDay) <= 0) {
      alert('Пожалуйста, введите корректную стоимость за сутки')
      return
    }
    
    // Если информация об автомобиле найдена, используем её
    const newCar = {
      plate: plate.toUpperCase(),
      pricePerDay: parseInt(pricePerDay),
      // Если есть информация об автомобиле, добавляем её
      ...(carInfo ? {
        brand: carInfo.brand,
        model: carInfo.model,
        year: carInfo.year,
        color: carInfo.color,
        transmission: carInfo.transmission,
        vin: carInfo.vin
      } : {
        // Если нет информации, используем заглушки
        brand: 'Не указано',
        model: 'Не указано',
        year: new Date().getFullYear(),
        color: 'Не указан',
        transmission: 'automatic'
      }),
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
    // Очищаем информацию об автомобиле при изменении госномера
    setCarInfo(null)
    setError('')
  }

  const handlePriceChange = (e) => {
    // Разрешаем только цифры
    const value = e.target.value.replace(/[^0-9]/g, '')
    setPricePerDay(value)
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                id="plate"
                value={formatPlateDisplay(plate)}
                onChange={handlePlateChange}
                placeholder="Введите госномер"
                maxLength="9"
                className="form-input"
                autoFocus
                style={{ flex: 1 }}
              />
              <button 
                type="button" 
                onClick={searchCarByPlate}
                disabled={loading || !plate}
                className="tg-button"
                style={{ whiteSpace: 'nowrap' }}
              >
                {loading ? 'Поиск...' : 'Найти авто'}
              </button>
            </div>
            <div className="input-hint">Формат: X000XX000</div>
            {error && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
                {error}
              </div>
            )}
          </div>
          
          {/* Отображаем информацию об автомобиле, если она найдена */}
          {carInfo && (
            <div className="form-group" style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Найден автомобиль:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><strong>Марка:</strong> {carInfo.brand}</div>
                <div><strong>Модель:</strong> {carInfo.model}</div>
                <div><strong>Год:</strong> {carInfo.year}</div>
                <div><strong>Цвет:</strong> {carInfo.color}</div>
                <div><strong>КПП:</strong> {carInfo.transmission === 'automatic' ? 'Автоматическая' : 'Механическая'}</div>
                <div><strong>VIN:</strong> {carInfo.vin}</div>
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="pricePerDay">Стоимость за сутки (руб.) *:</label>
            <input
              type="text"
              id="pricePerDay"
              value={pricePerDay}
              onChange={handlePriceChange}
              placeholder="Введите стоимость"
              className="form-input"
            />
            <div className="input-hint">Только цифры</div>
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
            <button 
              type="submit" 
              className="save-button"
              disabled={!plate || !pricePerDay || parseInt(pricePerDay) <= 0}
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCarForm