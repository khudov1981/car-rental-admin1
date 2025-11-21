import React, { useState } from 'react'
import './EditCarForm.css'

const AddCarForm = ({ onAdd, onCancel }) => {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [transmission, setTransmission] = useState('automatic')
  const [insurance, setInsurance] = useState('')
  const [casco, setCasco] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валидация обязательных полей
    if (!brand || !model || !year || !color || !plate || !pricePerDay) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }
    
    const newCar = {
      brand: brand.trim(),
      model: model.trim(),
      year: parseInt(year),
      color: color.trim(),
      plate: plate.toUpperCase(),
      pricePerDay: parseInt(pricePerDay),
      transmission,
      insurance: insurance.toUpperCase(),
      casco: casco.toUpperCase()
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
    } else if (cleanValue.length <= 13) {
      const letterPart = cleanValue.substring(0, 3)
      const numberPart = cleanValue.substring(3, 13)
      return letterPart + numberPart
    } else {
      return cleanValue.substring(0, 13)
    }
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
            <label htmlFor="brand">Марка *:</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Введите марку"
              className="form-input"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="model">Модель *:</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Введите модель"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="year">Год выпуска *:</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Введите год"
              min="1900"
              max={new Date().getFullYear() + 1}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="color">Цвет *:</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Введите цвет"
              className="form-input"
            />
          </div>
          
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
            />
            <div className="input-hint">Формат: X000XX000</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="pricePerDay">Цена за день (руб.) *:</label>
            <input
              type="number"
              id="pricePerDay"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              placeholder="Введите цену"
              min="0"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="transmission">Тип коробки передач:</label>
            <select
              id="transmission"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="form-input"
            >
              <option value="automatic">Автоматическая</option>
              <option value="manual">Механическая</option>
              <option value="robot">Робот</option>
              <option value="cvt">Вариатор</option>
            </select>
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