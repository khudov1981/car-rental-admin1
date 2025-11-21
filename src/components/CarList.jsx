import React, { useState, useMemo } from 'react'
import CarCard from './CarCard'
import CarSearch from './CarSearch'

const CarList = ({ cars, onEdit, onDelete, onRestore, showDeleted }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: 'all', brand: 'all' })
  const [sortBy, setSortBy] = useState('newest') // По умолчанию сортируем по новизне

  // Маппинг русских названий марок автомобилей
  const brandTranslations = {
    'тойота': 'Toyota',
    'тойоте': 'Toyota',
    'тойоты': 'Toyota',
    'бмв': 'BMW',
    'бэха': 'BMW',
    'беха': 'BMW',
    'мерседес': 'Mercedes',
    'мерсы': 'Mercedes',
    'мерс': 'Mercedes',
    'ауди': 'Audi',
    'фольксваген': 'Volkswagen',
    'фольцваген': 'Volkswagen',
    'ваген': 'Volkswagen',
    'вольво': 'Volvo',
    'форд': 'Ford',
    'хонда': 'Honda',
    'мазда': 'Mazda',
    'ниссан': 'Nissan',
    'лексус': 'Lexus',
    'инфинити': 'Infiniti',
    'акура': 'Acura',
    'субару': 'Subaru',
    'митсубиси': 'Mitsubishi',
    'мазерати': 'Maserati',
    'феррари': 'Ferrari',
    'ламборгини': 'Lamborghini',
    'порше': 'Porsche',
    'бентли': 'Bentley',
    'роллс': 'Rolls-Royce',
    'астон': 'Aston Martin',
    'макларен': 'McLaren',
    'тесла': 'Tesla',
    'шевроле': 'Chevrolet',
    'шевролет': 'Chevrolet',
    'опель': 'Opel',
    'сааб': 'Saab',
    'скания': 'Scania',
    'ман': 'MAN',
    'ивеко': 'Iveco',
    'дэу': 'Daewoo',
    'киа': 'Kia',
    'хендэ': 'Hyundai',
    'хюндэ': 'Hyundai',
    'маз': 'MAZ',
    'камаз': 'KAMAZ',
    'газ': 'GAZ',
    'уаз': 'UAZ',
    'лада': 'Lada',
    'ваз': 'VAZ',
    'жигули': 'Lada',
    'самара': 'Lada',
    'калина': 'Lada',
    'приора': 'Lada',
    'гранта': 'Lada',
    'веста': 'Lada'
  }

  // Получаем уникальные марки для фильтра
  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(cars.map(car => car.brand))]
    return brands
  }, [cars])

  // Сортировка автомобилей
  const sortedCars = useMemo(() => {
    const sorted = [...cars].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          // Сортировка по новизне (новые автомобили первыми)
          // Используем id как признак новизны (новые авто имеют больший id)
          return b.id - a.id
        case 'priceAsc':
          return a.pricePerDay - b.pricePerDay
        case 'priceDesc':
          return b.pricePerDay - a.pricePerDay
        default:
          // По умолчанию сортируем по новизне
          return b.id - a.id
      }
    })
    return sorted
  }, [cars, sortBy])

  // Фильтрация и поиск
  const filteredCars = useMemo(() => {
    return sortedCars.filter(car => {
      // Поиск по тексту (с поддержкой русских названий)
      const matchesSearch = !searchTerm || 
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // Проверка на русские названия марок
        (brandTranslations[searchTerm.toLowerCase()] && 
         car.brand.toLowerCase() === brandTranslations[searchTerm.toLowerCase()].toLowerCase()) ||
        // Проверка на частичное совпадение с русскими названиями
        Object.keys(brandTranslations).some(russianBrand => 
          russianBrand.includes(searchTerm.toLowerCase()) && 
          car.brand.toLowerCase() === brandTranslations[russianBrand].toLowerCase()
        )
      
      // Фильтр по статусу
      const matchesStatus = filters.status === 'all' || car.status === filters.status
      
      // Фильтр по марке
      const matchesBrand = filters.brand === 'all' || car.brand === filters.brand
      
      return matchesSearch && matchesStatus && matchesBrand
    })
  }, [sortedCars, searchTerm, filters, brandTranslations])

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
        }}>{showDeleted ? 'Нет удаленных автомобилей' : 'Нет автомобилей'}</h3>
        <p style={{
          margin: '0',
          fontSize: '0.9rem'
        }}>{showDeleted ? 'Все автомобили активны' : 'Добавьте первый автомобиль, чтобы начать'}</p>
      </div>
    )
  }

  return (
    <div style={{
      width: '100%'
    }}>
      {!showDeleted && (
        <CarSearch 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
        />
      )}
      
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
          }}>{showDeleted ? 'Удаленные автомобили не найдены' : 'Автомобили не найдены'}</h3>
          <p style={{
            margin: '0',
            fontSize: '0.9rem'
          }}>{showDeleted ? 'Нет удаленных автомобилей по заданным критериям' : 'Попробуйте изменить параметры поиска или фильтры'}</p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {!showDeleted && (
            <div style={{
              padding: '8px 0',
              fontSize: '0.9rem',
              color: 'var(--tg-theme-hint-color, #666666)',
              textAlign: 'center'
            }}>
              Найдено: {filteredCars.length} из {cars.length}
            </div>
          )}
          {filteredCars.map(car => (
            <CarCard 
              key={car.id}
              car={car}
              onEdit={onEdit}
              onDelete={onDelete}
              onRestore={onRestore}
              showDeleted={showDeleted}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CarList