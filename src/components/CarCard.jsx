import React, { useState } from 'react'
import './CarCard.css'

const CarCard = ({ car, onEdit, onDelete }) => {
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="car-card">
      {/* Компактный вид */}
      <div className="car-summary" onClick={toggleExpand}>
        <div className="car-basic-info">
          <h3 className="car-title">{car.brand} {car.model}</h3>
          <div className="car-plate">{car.plate}</div>
        </div>
        <div className="car-meta">
          <span className={`status-badge ${getStatusClass(car.status)}`}>
            {getStatusText(car.status)}
          </span>
          <div className="car-price">{car.pricePerDay} руб/день</div>
        </div>
        <div className="expand-icon">
          {isExpanded ? '▲' : '▼'}
        </div>
      </div>

      {/* Раскрытый вид с дополнительной информацией */}
      {isExpanded && (
        <div className="car-details-expanded">
          <div className="car-detail-row">
            <span className="detail-label">Год:</span>
            <span className="detail-value">{car.year}</span>
          </div>
          <div className="car-detail-row">
            <span className="detail-label">Цвет:</span>
            <span className="detail-value">{car.color}</span>
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