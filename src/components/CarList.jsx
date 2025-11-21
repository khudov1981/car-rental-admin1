import React, { useState, useMemo } from 'react'
import CarCard from './CarCard'
import CarSearch from './CarSearch'

const CarList = ({ cars, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: 'all', brand: 'all' })
  const [sortBy, setSortBy] = useState('brand')

  // Получаем уникальные марки для фильтра
  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(cars.map(car => car.brand))]
    return brands
  }, [cars])

  // Сортировка автомобилей
  const sortedCars = useMemo(() => {
    const sorted = [...cars].sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return a.pricePerDay - b.pricePerDay
        case 'priceDesc':
          return b.pricePerDay - a.pricePerDay
        case 'yearDesc':
          return b.year - a.year
        case 'yearAsc':
          return a.year - b.year
        case 'brand':
        default:
          return a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model)
      }
    })
    return sorted
  }, [cars, sortBy])

  // Фильтрация и поиск
  const filteredCars = useMemo(() => {
    return sortedCars.filter(car => {
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
  }, [sortedCars, searchTerm, filters])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSort = (sort) => {
    setSortBy(sort)
  }

  if (!cars || cars.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'var(--tg-theme-hint-color, #999999)'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '16px',
          opacity: '0.3'
        }}>🚗</div>
        <h3 style={{
          margin: '0 0 8px 0',
          color: 'var(--tg-theme-text-color, #000000)',
          fontSize: '1.2rem'
        }}>Нет автомобилей</h3>
        <p style={{
          margin: '0',
          fontSize: '0.9rem'
        }}>Добавьте первый автомобиль, чтобы начать</p>
      </div>
    )
  }

  return (
    <div style={{
      width: '100%'
    }}>
      <CarSearch 
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />
      
      {filteredCars.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center',
          color: 'var(--tg-theme-hint-color, #999999)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px',
            opacity: '0.3'
          }}>🔍</div>
          <h3 style={{
            margin: '0 0 8px 0',
            color: 'var(--tg-theme-text-color, #000000)',
            fontSize: '1.2rem'
          }}>Автомобили не найдены</h3>
          <p style={{
            margin: '0',
            fontSize: '0.9rem'
          }}>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            padding: '8px 0',
            fontSize: '0.9rem',
            color: 'var(--tg-theme-hint-color, #666666)',
            textAlign: 'center'
          }}>
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