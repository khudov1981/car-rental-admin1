import React, { useState } from 'react'
import './CarCard.css'

const CarCard = ({ car, onEdit, onDelete, onRestore, showDeleted }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Доступен'
      case 'rented': return 'Арендован'
      case 'maintenance': return 'На обслуживании'
      default: return 'Неизвестно'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'available': return 'status-available'
      case 'rented': return 'status-rented'
      case 'maintenance': return 'status-maintenance'
      default: return ''
    }
  }

  const getTransmissionText = (transmission) => {
    switch (transmission) {
      case 'automatic': return 'АКП'
      case 'manual': return 'МКП'
      case 'robot': return 'Робот'
      case 'cvt': return 'Вариатор'
      default: return transmission
    }
  }

  const getTransmissionClass = (transmission) => {
    switch (transmission) {
      case 'automatic': return 'transmission-automatic'
      case 'manual': return 'transmission-manual'
      case 'robot': return 'transmission-robot'
      case 'cvt': return 'transmission-cvt'
      default: return ''
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const formatDeletedAt = (deletedAt) => {
    if (!deletedAt) return ''
    const date = new Date(deletedAt)
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
    <div className={`car-card ${showDeleted ? 'deleted' : ''}`}>
      {/* Компактный вид */}
      <div className="car-summary" onClick={showDeleted ? null : toggleExpand} style={{ cursor: showDeleted ? 'default' : 'pointer' }}>
        <div className="car-basic-info">
          <h3 className="car-title">{car.brand} {car.model}</h3>
          <div className="car-plate">{formatPlateDisplay(car.plate)}</div>
        </div>
        <div className="car-meta">
          {showDeleted ? (
            <div className="deleted-info">
              <div className="deleted-date">Удален: {formatDeletedAt(car.deletedAt)}</div>
            </div>
          ) : (
            <>
              <span className={`status-badge ${getStatusClass(car.status)}`}>
                {getStatusText(car.status)}
              </span>
              <div className="car-price">{car.pricePerDay} руб/день</div>
              <span className={`transmission-badge ${getTransmissionClass(car.transmission)}`}>
                {getTransmissionText(car.transmission)}
              </span>
            </>
          )}
        </div>
        <div className="expand-icon">
          {showDeleted ? null : (isExpanded ? '▲' : '▼')}
        </div>
      </div>

      {/* Кнопка восстановления для удаленных авто (всегда видна) */}
      {showDeleted && (
        <div className="restore-actions">
          <button className="restore-button" onClick={() => onRestore(car.id)}>
            Восстановить
          </button>
        </div>
      )}

      {/* Раскрытый вид с дополнительной информацией */}
      {isExpanded && !showDeleted && (
        <div className="car-details-expanded">
          {/* Фотографии автомобиля */}
          {car.photos && car.photos.length > 0 && (
            <div className="car-photos">
              <div className="photos-grid">
                {car.photos.slice(0, 3).map((photo, index) => (
                  <div key={index} className="photo-thumbnail">
                    <img src={photo} alt={`Фото ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="car-detail-row">
            <span className="detail-label">Год:</span>
            <span className="detail-value">{car.year}</span>
          </div>
          <div className="car-detail-row">
            <span className="detail-label">Цвет:</span>
            <span className="detail-value">{car.color}</span>
          </div>
          <div className="car-detail-row">
            <span className="detail-label">Коробка:</span>
            <span className="detail-value">{getTransmissionText(car.transmission)}</span>
          </div>
          {car.insurance && (
            <div className="car-detail-row">
              <span className="detail-label">ОСАГО:</span>
              <span className="detail-value">{formatInsuranceDisplay(car.insurance)}</span>
            </div>
          )}
          {car.casco && (
            <div className="car-detail-row">
              <span className="detail-label">КАСКО:</span>
              <span className="detail-value">{car.casco}</span>
            </div>
          )}
          <div className="car-actions-expanded">
            <button className="edit-button" onClick={() => onEdit(car)}>
              Редактировать
            </button>
            <button className="delete-button" onClick={() => onDelete(car.id)}>
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarCard