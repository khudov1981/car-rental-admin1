import React, { useState } from 'react'
import './CarCard.css'

const CarCard = ({ car, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false)

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

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="car-card">
      <div className="car-image">
        {imageError ? (
          <div className="image-placeholder">
            <div className="placeholder-icon">🚗</div>
          </div>
        ) : (
          <img 
            src={car.image} 
            alt={`${car.brand} ${car.model}`}
            onError={handleImageError}
          />
        )}
      </div>
      
      <div className="car-info">
        <div className="car-header">
          <h3>{car.brand} {car.model}</h3>
          <span className={`status-badge ${getStatusClass(car.status)}`}>
            {getStatusText(car.status)}
          </span>
        </div>
        
        <div className="car-details">
          <p><strong>Год:</strong> {car.year}</p>
          <p><strong>Цвет:</strong> {car.color}</p>
          <p><strong>Номер:</strong> {car.plate}</p>
          <p><strong>Цена/день:</strong> {car.pricePerDay} руб.</p>
        </div>
        
        <div className="car-actions">
          <button className="edit-button" onClick={() => onEdit(car)}>
            Редактировать
          </button>
          <button className="delete-button" onClick={() => onDelete(car.id)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarCard