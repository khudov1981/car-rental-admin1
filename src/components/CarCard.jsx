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

  return (
    <div className={`car-card ${showDeleted ? 'deleted' : ''}`}>
      {/* Компактный вид */}
      <div className="car-summary" onClick={showDeleted ? null : toggleExpand} style={{ cursor: showDeleted ? 'default' : 'pointer' }}>
        <div className="car-basic-info">
          <h3 className="car-title">{car.brand} {car.model}</h3>
          <div className="car-plate">{car.plate}</div>
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