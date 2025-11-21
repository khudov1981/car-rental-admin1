import React, { useState, useMemo } from 'react'
import CarCard from './CarCard'
import CarSearch from './CarSearch'
import './CarList.css'

const CarList = ({ cars, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: 'all', brand: 'all' })

  // Получаем уникальные марки для фильтра
  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(cars.map(car => car.brand))]
    return brands
  }, [cars])

  // Фильтрация и поиск
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Поиск по тексту
      const matchesSearch = !searchTerm || 
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.plate.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Фильтр по статусу
      const matchesStatus = filters.status === 'all' || car.status === filters.status
      
      // Фильтр по марке
      const matchesBrand = filters.brand === 'all' || car.brand === filters.brand
      
      return matchesSearch && matchesStatus && matchesBrand
    })
  }, [cars, searchTerm, filters])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🚗</div>
        <h3>Нет автомобилей</h3>
        <p>Добавьте первый автомобиль, чтобы начать</p>
      </div>
    )
  }

  return (
    <div className="car-list-container">
      <CarSearch 
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      
      {filteredCars.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Автомобили не найдены</h3>
          <p>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      ) : (
        <div className="car-list">
          <div className="results-info">
            Найдено: {filteredCars.length} из {cars.length}
          </div>
          {filteredCars.map(car => (
            <CarCard 
              key={car.id}
              car={car}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CarList