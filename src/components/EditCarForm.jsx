import React, { useState } from 'react'
import './EditCarForm.css'

const EditCarForm = ({ car, onSave, onCancel }) => {
  const [plate, setPlate] = useState(car.plate || '')
  const [insurance, setInsurance] = useState(car.insurance || '')
  const [casco, setCasco] = useState(car.casco || '')
  const [pricePerDay, setPricePerDay] = useState(car.pricePerDay || car.price || '')
  const [photos, setPhotos] = useState(car.photos || [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ 
      ...car, 
      plate: plate.toUpperCase(),
      insurance: insurance.toUpperCase(),
      casco: casco.toUpperCase(),
      pricePerDay: pricePerDay,
      photos: photos
    })
  }

  const handlePlateChange = (e) => {
    // Формат госномера: X000XX000 (1 буква, 3 цифры, 2 буквы, 2-3 цифры региона)
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9А-Я]/g, '')
    
    // Ограничиваем длину до 9 символов (без учета дефиса)
    if (value.length > 9) {
      value = value.substring(0, 9)
    }
    
    setPlate(value)
  }

  const handleInsuranceChange = (e) => {
    // Формат ОСАГО: 3 буквы, 10 цифр (всего 13 символов)
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    
    // Ограничиваем длину до 13 символов
    if (value.length > 13) {
      value = value.substring(0, 13)
    }
    
    setInsurance(value)
  }

  const handleCascoChange = (e) => {
    // Формат КАСКО: произвольная строка до 20 символов
    let value = e.target.value.toUpperCase()
    
    // Ограничиваем длину до 20 символов
    if (value.length > 20) {
      value = value.substring(0, 20)
    }
    
    setCasco(value)
  }

  const handlePriceChange = (e) => {
    // Цена: только цифры
    let value = e.target.value.replace(/[^0-9]/g, '')
    
    // Ограничиваем длину до 10 символов
    if (value.length > 10) {
      value = value.substring(0, 10)
    }
    
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
            <label htmlFor="insurance">Номер страховки (ОСАГО):</label>
            <input
              type="text"
              id="insurance"
              value={formatInsuranceDisplay(insurance)}
              onChange={handleInsuranceChange}
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
              value={casco}
              onChange={handleCascoChange}
              placeholder="Введите номер КАСКО"
              maxLength="20"
              className="form-input"
            />
            <div className="input-hint">Произвольная строка до 20 символов</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="pricePerDay">Цена аренды (в день):</label>
            <input
              type="text"
              id="pricePerDay"
              value={pricePerDay}
              onChange={handlePriceChange}
              placeholder="Введите цену"
              maxLength="10"
              className="form-input"
            />
            <div className="input-hint">Только цифры</div>
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