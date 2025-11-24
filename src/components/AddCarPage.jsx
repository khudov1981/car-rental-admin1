import React, { useState } from 'react'
import './AddCarPage.css'
import { getCarInfoByPlate } from '../data/plateVinDatabase'
import { checkCarExists } from '../data/cars'
import ImageUploader from './ImageUploader'
import { formatPlateDisplay, formatInsuranceDisplay } from '../utils/formatters'

const AddCarPage = ({ 
  cars = [],
  onAddCar,
  onBack
}) => {
  const [formData, setFormData] = useState({
    plate: '',
    insurance: '',
    casco: '',
    pricePerDay: '',
    photos: Array(5).fill(null)
  })
  
  const [carInfo, setCarInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [carExistsError, setCarExistsError] = useState('')

  // Функция для поиска автомобиля по госномеру
  const searchCarByPlate = () => {
    if (!formData.plate) {
      setError('Пожалуйста, введите госномер')
      return
    }
    
    // Проверяем, существует ли автомобиль с таким госномером
    if (checkCarExists(formData.plate.toUpperCase(), cars)) {
      setError('Автомобиль с таким госномером уже существует в базе')
      setCarInfo(null)
      return
    }
    
    setLoading(true)
    setError('')
    
    // Имитируем задержку для лучшего UX
    setTimeout(() => {
      const result = getCarInfoByPlate(formData.plate.toUpperCase())
      
      if (result.success) {
        setCarInfo(result.data)
        setError('')
        setCarExistsError('')
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
    if (!formData.plate) {
      alert('Пожалуйста, введите госномер')
      return
    }
    
    // Проверяем, существует ли автомобиль с таким госномером
    if (checkCarExists(formData.plate.toUpperCase(), cars)) {
      setCarExistsError('Автомобиль с таким госномером уже существует в базе')
      return
    }
    
    if (!formData.pricePerDay || parseInt(formData.pricePerDay) <= 0) {
      alert('Пожалуйста, введите корректную стоимость за сутки')
      return
    }
    
    let carData
    
    // Если информация об автомобиле найдена, используем её
    carData = {
      plate: formData.plate.toUpperCase(),
      pricePerDay: parseInt(formData.pricePerDay),
      photos: [...formData.photos],
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
      })
    }
    
    onAddCar(carData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Очищаем ошибки при изменении полей
    if (field === 'plate') {
      setCarInfo(null)
      setError('')
      setCarExistsError('')
    }
  }

  // Проверка валидности формы
  const isFormValid = () => {
    // Форма валидна только если:
    // 1. Введен госномер
    // 2. Найдена информация об автомобиле
    // 3. Введена корректная цена
    return formData.plate.trim().length > 0 && 
           carInfo !== null && 
           formData.pricePerDay.trim().length > 0 && 
           parseInt(formData.pricePerDay) > 0
  }

  // Проверка валидности стоимости
  const isPriceValid = () => {
    return formData.pricePerDay && parseInt(formData.pricePerDay) > 0
  }

  return (
    <div className="add-car-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Назад
        </button>
        <h2>Добавление автомобиля</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="add-car-form">
        <div className="form-group">
          <label htmlFor="plate">Государственный номер *:</label>
          <div className="input-group">
            <input
              type="text"
              id="plate"
              value={formatPlateDisplay(formData.plate)}
              onChange={(e) => handleInputChange('plate', e.target.value)}
              placeholder="Введите госномер"
              maxLength="9"
              className="form-input"
              autoFocus
            />
            <button 
              type="button" 
              onClick={searchCarByPlate}
              disabled={loading || !formData.plate}
              className="tg-button search-button"
            >
              {loading ? 'Поиск...' : 'Найти авто'}
            </button>
          </div>
          <div className="input-hint">Формат: X000XX000</div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          {carExistsError && (
            <div className="error-message">
              {carExistsError}
            </div>
          )}
        </div>
        
        {/* Отображаем информацию об автомобиле, если она найдена */}
        {carInfo && (
          <div className="car-info-card">
            <h3>Найден автомобиль:</h3>
            <div className="car-details">
              <div className="car-detail">
                <span className="detail-label">Марка:</span>
                <span className="detail-value">{carInfo.brand}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">Модель:</span>
                <span className="detail-value">{carInfo.model}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">Год:</span>
                <span className="detail-value">{carInfo.year}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">Цвет:</span>
                <span className="detail-value">{carInfo.color}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">КПП:</span>
                <span className="detail-value">
                  {carInfo.transmission === 'automatic' ? 'Автоматическая' : 'Механическая'}
                </span>
              </div>
              <div className="car-detail">
                <span className="detail-label">VIN:</span>
                <span className="detail-value">{carInfo.vin}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="insurance">Номер страховки (ОСАГО):</label>
          <input
            type="text"
            id="insurance"
            value={formatInsuranceDisplay(formData.insurance)}
            onChange={(e) => handleInputChange('insurance', e.target.value)}
            placeholder="Введите номер ОСАГО"
            maxLength="13"
            className="form-input"
          />
          <div className="input-hint">Формат: XXX0000000000 (3 буквы, 10 цифр)</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="casco">Номер КАСКО:</label>
          <input
            type="text"
            id="casco"
            value={formData.casco}
            onChange={(e) => handleInputChange('casco', e.target.value)}
            placeholder="Введите номер КАСКО"
            maxLength="20"
            className="form-input"
          />
          <div className="input-hint">Произвольная строка до 20 символов</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="pricePerDay">Стоимость за сутки (руб.) *:</label>
          <input
            type="text"
            id="pricePerDay"
            value={formData.pricePerDay}
            onChange={(e) => handleInputChange('pricePerDay', e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="Введите стоимость"
            className="form-input"
            style={{
              borderColor: carInfo && (!formData.pricePerDay || !isPriceValid()) ? 'red' : ''
            }}
          />
          <div className="input-hint">Только цифры</div>
          {carInfo && (!formData.pricePerDay || !isPriceValid()) && (
            <div className="error-message">
              Пожалуйста, введите стоимость за сутки
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label>Фотографии автомобиля *:</label>
          <div className="photos-info">
            <div className="input-hint">
              Необходимо загрузить 5 фотографий
            </div>
          </div>
          <ImageUploader
            photos={formData.photos}
            onPhotosChange={(photos) => handleInputChange('photos', photos)}
            maxPhotos={5}
            mode="add"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onBack}>
            Отмена
          </button>
          <button 
            type="submit" 
            className="save-button"
            disabled={!isFormValid()}
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCarPage