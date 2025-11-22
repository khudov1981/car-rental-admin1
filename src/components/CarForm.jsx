import React, { useState } from 'react'
import './CarForm.css'
import { getCarInfoByPlate } from '../data/plateVinDatabase'
import { checkCarExists } from '../data/cars'
import ImageUploader from './ImageUploader'

const CarForm = ({ 
  car = null, 
  onSubmit, 
  onCancel, 
  cars = [],
  mode = 'add' // 'add' или 'edit'
}) => {
  const [formData, setFormData] = useState({
    plate: car?.plate || '',
    insurance: car?.insurance || '',
    casco: car?.casco || '',
    pricePerDay: car?.pricePerDay || '',
    photos: car?.photos || Array(5).fill(null)
  })
  
  const [carInfo, setCarInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [carExistsError, setCarExistsError] = useState('')

  // Функция для поиска автомобиля по госномеру (только для добавления)
  const searchCarByPlate = () => {
    if (mode !== 'add') return
    
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
    
    // Проверяем, существует ли автомобиль с таким госномером (только для добавления)
    if (mode === 'add' && checkCarExists(formData.plate.toUpperCase(), cars)) {
      setCarExistsError('Автомобиль с таким госномером уже существует в базе')
      return
    }
    
    if (!formData.pricePerDay || parseInt(formData.pricePerDay) <= 0) {
      alert('Пожалуйста, введите корректную стоимость за сутки')
      return
    }
    
    let carData
    
    if (mode === 'add') {
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
    } else {
      // Режим редактирования
      carData = {
        ...car,
        plate: formData.plate.toUpperCase(),
        insurance: formData.insurance.toUpperCase(),
        casco: formData.casco.toUpperCase(),
        pricePerDay: formData.pricePerDay,
        photos: formData.photos
      }
    }
    
    onSubmit(carData)
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

  // Форматирование отображаемого значения ОСАГО
  const formatInsuranceDisplay = (value) => {
    if (!value) return ''
    
    // Формат: XXX0000000000 (3 буквы, 10 цифр)
    const cleanValue = value.replace(/[^A-Z0-9]/g, '')
    
    if (cleanValue.length <= 3) {
      return cleanValue
    } else {
      const letterPart = cleanValue.substring(0, 3)
      const numberPart = cleanValue.substring(3, 13)
      return letterPart + numberPart
    }
  }

  // Проверка валидности формы (только для добавления)
  const isFormValid = () => {
    if (mode !== 'add') return true
    
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
    <div className="edit-car-form-overlay">
      <div className="edit-car-form">
        <div className="form-header">
          <h3>{mode === 'add' ? 'Добавление автомобиля' : 'Редактирование автомобиля'}</h3>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        
        {mode === 'edit' && car && (
          <div className="car-info">
            <div className="car-brand-model">{car.brand} {car.model}</div>
            <div className="car-year">{car.year} год</div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="plate">Государственный номер *:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                id="plate"
                value={formatPlateDisplay(formData.plate)}
                onChange={(e) => handleInputChange('plate', e.target.value)}
                placeholder="Введите госномер"
                maxLength="9"
                className="form-input"
                autoFocus
                style={{ flex: 1 }}
              />
              {mode === 'add' && (
                <button 
                  type="button" 
                  onClick={searchCarByPlate}
                  disabled={loading || !formData.plate}
                  className="tg-button"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {loading ? 'Поиск...' : 'Найти авто'}
                </button>
              )}
            </div>
            <div className="input-hint">Формат: X000XX000</div>
            {error && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
                {error}
              </div>
            )}
            {carExistsError && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
                {carExistsError}
              </div>
            )}
          </div>
          
          {/* Отображаем информацию об автомобиле, если она найдена (только для добавления) */}
          {mode === 'add' && carInfo && (
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
            {mode === 'add' && carInfo && (!formData.pricePerDay || !isPriceValid()) && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
                Пожалуйста, введите стоимость за сутки
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Фотографии автомобиля{mode === 'add' ? ' *' : ''}:</label>
            <div className="photos-info">
              <div className="input-hint">
                {mode === 'add' ? 'Необходимо загрузить 5 фотографий' : 'Загрузите до 5 фотографий'}
              </div>
            </div>
            <ImageUploader
              photos={formData.photos}
              onPhotosChange={(photos) => handleInputChange('photos', photos)}
              maxPhotos={5}
              mode={mode}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Отмена
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={mode === 'add' && !isFormValid()}
            >
              {mode === 'add' ? 'Добавить' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CarForm